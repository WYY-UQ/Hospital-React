import { Card, Form, Input, Button, Select, notification, Radio } from 'antd';
import React, { Component } from 'react';
import styles from './index.less';
import { PageContainer } from '@ant-design/pro-layout';
import {
  queryCommonDicts,
  queryTags,
  queryRegions,
  queryDosages,
  queryUnits,
  queryObjects,
} from '@/services/common';
import Alias from '@/components/Alias';
import { PlusOutlined } from '@ant-design/icons';
import TagCard from './components/TagCard';
import HospitalGradeModal from '@/components/HospitalGradeModal';
import ProvinceModal from '@/components/ProvinceModal';
import { saveCommonName, getCommonName } from '@/services/common-name';
import DosageForm from './components/DosageForm';
import DDD from './components/DDD';
import Specification from './components/Specification';
import Drug from './components/Drug';
import { getPinYinCode, getWubiCode } from 'lancet-pywb/PY_WB';
import pinyin from 'pinyin';
import SpecificationModal from './components/SpecificationModal';
import DrugClassification from '@/components/DrugClassification';
import { v4 as uuidv4 } from 'uuid';
import { history } from 'umi';

const { Option } = Select;

const layout = {
  labelCol: {
    span: 3,
  },
  wrapperCol: {
    span: 13,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 6,
    span: 16,
  },
};

export default class CommonNameEdit extends Component {
  constructor(props) {
    super(props);

    this.formRef = React.createRef();
    this.state = {
      medicineCategoryList: [],
      regionList: [],
      tagList: [],
      sysList: [],
      unitList: [],
      concentration: false,
      drugsList: [],
      dosageList: [],
      typeList: [],
      hosiptalLevelList: [],
      hosiptalVisiable: false,
      provinceModalVisble: false,
      specsModalVisble: false,
      currentProvince: '',
      currentSpecsIndex: null,
      initValues: {},
      formData: {},
      form: {
        drugGroups: [
          {
            ratioType: null,
            drugs: [],
          },
        ],
        specsGroups: [
          {
            groupConverts: [],
            groupSpecs: [],
            concentration: null,
          },
        ],
        provinceTags: [
          {
            specsTags: [
              {
                hospitalLevelTags: [
                  {
                    levelCode: '',
                    levelName: '',
                    tags: [],
                  },
                ],
                specsUnit: null,
                specsValue: null,
              },
            ],
            province: '',
          },
        ],
      },
    };
  }

  async componentDidMount() {
    const dictRes = await queryCommonDicts(0);
    let medicineCategoryList = [];
    let hosiptalLevelList = [];
    let drugsList = [];
    let dosageList = [];
    let sysList = [];
    let typeList = [];
    if (dictRes) {
      const tempMedicineCategorDict = dictRes.data.find((item) => item.dictType === 4);
      if (tempMedicineCategorDict?.dicts) {
        medicineCategoryList = tempMedicineCategorDict?.dicts;
      }
      const tempHosiptalLevelDict = dictRes.data.find((item) => item.dictType === 3);
      if (tempHosiptalLevelDict?.dicts) {
        hosiptalLevelList = tempHosiptalLevelDict?.dicts;
      }
      const sysListDict = dictRes.data.find((item) => item.dictType === 5);
      if (sysListDict?.dicts) {
        sysList = sysListDict?.dicts;
      }

      const typeListDict = dictRes.data.find((item) => item.dictType === 33);
      if (typeListDict?.dicts) {
        typeList = typeListDict?.dicts;
      }
    }
    let tagList = [];
    const tagsRes = await queryTags(3);
    if (tagsRes?.data?.length) {
      tagList = tagsRes.data;
    }
    const regionsRes = await queryRegions();
    let regionList = [];
    if (regionsRes) {
      regionList = regionsRes.data.filter((item) => item.level === 1);
    }
    const drugsRes = await queryObjects({
      type: 2,
    });

    drugsList = drugsRes?.data ?? [];

    const dosagesRes = await queryDosages('');

    if (dosagesRes) {
      dosageList = dosagesRes.data;
    }

    let unitList = [];
    const unitRes = await queryUnits();
    if (unitRes) {
      unitList = unitRes.data;
    }

    this.listenLocation();
    this.setState({
      medicineCategoryList,
      drugsList,
      dosageList,
      tagList,
      regionList,
      hosiptalLevelList,
      unitList,
      sysList,
      typeList,
    });
  }

  listenLocation = async () => {
    const { commonNameId } = this.props.location.query;
    if (commonNameId) {
      const res = await getCommonName(commonNameId);
      if (res) {
        const { provinceTags, specsGroups, drugGroups, hasConcentration } = res.data;
        const form = {
          provinceTags,
          specsGroups,
          drugGroups,
        };
        res?.data?.drugCategories?.forEach((item) => {
          // eslint-disable-next-line no-param-reassign
          item.id = uuidv4();
        });
        this.formRef?.current?.setFieldsValue(res.data);
        this.setState({
          concentration: hasConcentration,
          initValues: res.data,
          form,
        });
      }
    }
  };

  openHosiptalModal = (currentProvince, currentSpecsIndex) => {
    this.setState({
      hosiptalVisiable: true,
      currentProvince,
      currentSpecsIndex,
    });
  };

  openProviceModal = () => {
    this.setState({
      provinceModalVisble: true,
    });
  };

  openSpecsModal = (currentProvince) => {
    this.setState({
      currentProvince,
      specsModalVisble: true,
    });
  };

  onSpecsClose = (specs) => {
    const { form, currentProvince } = this.state;
    if (specs) {
      const provinceTag = form.provinceTags.find((item) => item.province === currentProvince);
      let unifiedLevelTag = null;
      if (provinceTag) {
        unifiedLevelTag = provinceTag.specsTags
          .find((item) => !item.specsValue)
          ?.hospitalLevelTags.find((item) => !item.levelCode);
        provinceTag.specsTags.push({
          hospitalLevelTags: [
            {
              levelCode: '',
              levelName: '',
              tags: unifiedLevelTag ? JSON.parse(JSON.stringify(unifiedLevelTag.tags)) : [],
            },
          ],
          ...specs,
        });
      }
    }
    this.setState({
      specsModalVisble: false,
      form,
    });
  };

  onProviceModalClose = (province) => {
    const { form } = this.state;
    if (province) {
      const provinceTag = form.provinceTags.find((item) => !item.province);
      let unifiedLevelTag = null;
      if (provinceTag) {
        unifiedLevelTag = provinceTag.specsTags
          .find((item) => !item.specsValue)
          ?.hospitalLevelTags.find((item) => !item.levelCode);
      }
      form.provinceTags.push({
        specsTags: [
          {
            hospitalLevelTags: [
              {
                levelCode: '',
                levelName: '',
                tags: unifiedLevelTag ? JSON.parse(JSON.stringify(unifiedLevelTag.tags)) : [],
              },
            ],
            specsUnit: null,
            specsValue: null,
          },
        ],
        province,
      });
    }
    this.setState({
      provinceModalVisble: false,
      form,
    });
  };

  onHosiptalClose = (level) => {
    const { form, currentProvince, currentSpecsIndex } = this.state;
    if (level) {
      const provinceTag = form.provinceTags.find((item) => item.province === currentProvince);
      let unifiedLevelTag = null;
      if (provinceTag) {
        unifiedLevelTag = provinceTag.specsTags[currentSpecsIndex].hospitalLevelTags.find(
          (item) => !item.levelCode,
        );

        provinceTag.specsTags[currentSpecsIndex].hospitalLevelTags.push({
          levelCode: '',
          levelName: '',
          tags: unifiedLevelTag ? JSON.parse(JSON.stringify(unifiedLevelTag.tags)) : [],
        });
      }
    }
    this.setState({
      hosiptalVisiable: false,
      form,
    });
  };

  onTagChange(province, index, levelCode, tags) {
    const { form } = this.state;
    const provinceTag = form.provinceTags.find((item) => item.province === province);
    if (provinceTag) {
      const tag = provinceTag.specsTags[index].hospitalLevelTags.find(
        (item) => item.levelCode === levelCode,
      );
      if (tag) {
        tag.tags = tags;
      }
      this.setState({
        form,
      });
    }
  }

  delProviceTag = (index) => {
    const { form } = this.state;
    form.provinceTags.splice(index, 1);
    this.setState({
      form,
    });
  };

  onFinish = async (values) => {
    const { form, initValues } = this.state;
    const postdData = {
      ...form,
      ...values,
    };
    const res = await saveCommonName({ commonName: { ...Object.assign(initValues, postdData) } });
    if (res) {
      notification.success({
        description: '保存成功',
        message: '提示',
      });
      this.onReset();
    }
  };

  onValuesChange = (changedValues, all) => {
    const concentration = changedValues.hasConcentration ?? false;
    this.setState({
      formData: all,
      concentration,
    });
  };

  addSpecsGroups = () => {
    const { form } = this.state;
    form.specsGroups.push({
      groupConverts: [],
      groupSpecs: [],
      ratioType: null,
    });
    this.setState({
      form,
    });
  };

  delSpecsGroups = (index) => {
    const { form } = this.state;
    if (form.specsGroups.length === 1) {
      notification.warn({
        description: '最后一个了~不能再删了',
        message: '提示',
      });
      return;
    }
    form.specsGroups.splice(index, 1);
    this.setState({
      form,
    });
  };

  onSpecsGroupsChange = (value, index) => {
    const { form } = this.state;
    form.specsGroups.splice(index, 1, value);
    this.setState({
      form,
    });
  };

  addDrugGroups = () => {
    const { form } = this.state;
    form.drugGroups.push({
      ratioType: null,
      drugGroups: [],
    });
    this.setState({
      form,
    });
  };

  delDrugGroups = (index) => {
    const { form } = this.state;
    if (form.drugGroups.length === 1) {
      notification.warn({
        description: '最后一个了~不能再删了',
        message: '提示',
      });
      return;
    }
    form.drugGroups.splice(index, 1);
    this.setState({
      form,
    });
  };

  onDrugGroupsChange = (value, index) => {
    const { form } = this.state;
    form.drugGroups.splice(index, 1, value);
    this.setState({
      form,
    });
  };

  onNameBlur = (e) => {
    const { formData } = this.state;
    if (!formData.pinyin) {
      formData.pinyin = pinyin(e.target.value, {
        style: pinyin.STYLE_NORMAL,
      }).join('');
    }
    if (!formData.shortPinyin) {
      formData.shortPinyin = getPinYinCode(e.target.value).toLowerCase();
    }
    if (!formData.wubi) {
      formData.wubi = getWubiCode(e.target.value).toLowerCase();
    }
    this.formRef.current.setFieldsValue(formData);
  };

  onReset = () => {
    this.formRef.current.resetFields();
    const form = {
      drugGroups: [
        {
          ratioType: null,
          drugs: [],
        },
      ],
      specsGroups: [
        {
          groupConverts: [],
          groupSpecs: [],
          concentration: null,
        },
      ],
      provinceTags: [
        {
          specsTags: [
            {
              hospitalLevelTags: [
                {
                  levelCode: '',
                  levelName: '',
                  tags: [],
                },
              ],
              specsUnit: null,
              specsValue: null,
            },
          ],
          province: '',
        },
      ],
    };
    this.setState({
      form,
    });
    history.replace('/commonName/management');
  };

  render() {
    const {
      dosageList,
      medicineCategoryList,
      tagList,
      hosiptalVisiable,
      provinceModalVisble,
      form,
      regionList,
      specsModalVisble,
      drugsList,
      hosiptalLevelList,
      unitList,
      concentration,
      sysList,
      typeList,
    } = this.state;
    return (
      <PageContainer title={false}>
        <div className={styles.medicineEditContainer}>
          <div>
            <Form
              ref={this.formRef}
              onFinish={this.onFinish}
              onValuesChange={this.onValuesChange}
              {...layout}
              name="basic"
              initialValues={{ hasConcentration: false, isOtc: false }}
            >
              <Card title="基础信息">
                <Form.Item
                  label="药物类别"
                  name="type"
                  rules={[
                    {
                      required: true,
                      message: '请选择药物类别',
                    },
                  ]}
                >
                  <Select placeholder="请选择药物类别">
                    {medicineCategoryList.map((item) => (
                      <Option key={item.value} value={item.key}>
                        {item.value}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item
                  label="通用名"
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: '请输入通用名',
                    },
                  ]}
                >
                  <Input placeholder="请输入通用名" onBlur={this.onNameBlur} />
                </Form.Item>

                <Form.Item label="英文名" name="enName">
                  <Input placeholder="请输入英文名" />
                </Form.Item>

                <Form.Item
                  label="拼音"
                  name="pinyin"
                  rules={[
                    {
                      required: true,
                      message: '请输入拼音',
                    },
                  ]}
                >
                  <Input placeholder="请输入拼音" />
                </Form.Item>

                <Form.Item
                  label="短拼音"
                  name="shortPinyin"
                  rules={[
                    {
                      required: true,
                      message: '请输入短拼音',
                    },
                  ]}
                >
                  <Input placeholder="请输入短拼音" />
                </Form.Item>

                <Form.Item
                  label="五笔"
                  name="wubi"
                  rules={[
                    {
                      required: true,
                      message: '请输入五笔',
                    },
                  ]}
                >
                  <Input placeholder="请输入五笔" />
                </Form.Item>

                <Form.Item label="别名" name="aliases">
                  <Alias />
                </Form.Item>

                <Form.Item
                  label="单复方"
                  name="isCompound"
                  rules={[
                    {
                      required: true,
                      message: '请选择单复方',
                    },
                  ]}
                >
                  <Select placeholder="请选择单复方">
                    <Option value={false}>单方</Option>
                    <Option value={true}>复方</Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  label="剂型"
                  name="dosage"
                  rules={[
                    {
                      required: true,
                      message: '请输入剂型',
                    },
                  ]}
                >
                  <DosageForm dosageList={dosageList} />
                </Form.Item>

                <Form.Item label="DDD" name="ddd">
                  <DDD unitList={unitList} />
                </Form.Item>

                <Form.Item label="药物分类" name="drugCategories">
                  <DrugClassification sysList={sysList} />
                </Form.Item>

                <Form.Item
                  label="是否有浓度"
                  name="hasConcentration"
                  rules={[
                    {
                      required: true,
                      message: '是否有浓度',
                    },
                  ]}
                >
                  <Radio.Group onChange={this.onChange}>
                    <Radio value={true}>是</Radio>
                    <Radio value={false}>否</Radio>
                  </Radio.Group>
                </Form.Item>

                <Form.Item
                  label="是否OTC"
                  name="isOtc"
                  rules={[
                    {
                      required: true,
                      message: '是否OTC',
                    },
                  ]}
                >
                  <Radio.Group>
                    <Radio value={true}>是</Radio>
                    <Radio value={false}>否</Radio>
                  </Radio.Group>
                </Form.Item>

                <Form.Item label="中药煎法" name="frying">
                  <Input placeholder="请输入中药煎法" />
                </Form.Item>
              </Card>

              <Card
                title="规格组"
                style={{ marginTop: '30px' }}
                extra={
                  <Button type="primary" onClick={this.addSpecsGroups}>
                    新增规格组
                  </Button>
                }
              >
                {form.specsGroups.map((item, index) => {
                  return (
                    <Specification
                      value={item}
                      key={`specification_${index}`}
                      unitList={unitList}
                      typeList={typeList}
                      hasConcentration={concentration}
                      onChange={(value) => this.onSpecsGroupsChange(value, index)}
                      onDel={() => this.delSpecsGroups(index)}
                    />
                  );
                })}
              </Card>

              <Card
                title="成分清单"
                style={{ marginTop: '30px' }}
                extra={
                  <Button type="primary" onClick={this.addDrugGroups}>
                    新增药物组
                  </Button>
                }
              >
                {form.drugGroups?.map((item, index) => {
                  return (
                    <Drug
                      value={item}
                      key={`specification_${index}`}
                      unitList={unitList}
                      drugsList={drugsList}
                      onChange={(value) => this.onDrugGroupsChange(value, index)}
                      onDel={() => this.delDrugGroups(index)}
                    />
                  );
                })}
              </Card>

              {form.provinceTags?.map((item, index) => {
                return (
                  <Card
                    key={item.province}
                    title={item.province ? `${item.province}通用名标签` : '统一通用名标签'}
                    style={{ marginTop: '30px' }}
                    extra={
                      <div>
                        <Button
                          onClick={() => {
                            this.openSpecsModal(item.province);
                          }}
                          type="primary"
                        >
                          新增规格配置
                        </Button>
                        {item.province && (
                          <Button
                            style={{
                              marginLeft: '10px',
                            }}
                            onClick={() => {
                              this.delProviceTag(index);
                            }}
                            danger
                          >
                            删除省份标签
                          </Button>
                        )}
                      </div>
                    }
                  >
                    {item?.specsTags?.map((specsTag, specsIndex) => (
                      <Card
                        key={`${specsTag.specsValue}${specsTag.specsUnit}`}
                        title={
                          specsTag.specsValue && specsTag.specsUnit
                            ? `规格：${specsTag.specsValue}${specsTag.specsUnit}`
                            : '统一规格标签'
                        }
                        style={{ marginTop: specsIndex === 0 ? '' : '30px' }}
                        extra={
                          <div>
                            <Button
                              onClick={() => {
                                this.openHosiptalModal(item.province, specsIndex);
                              }}
                              type="primary"
                            >
                              新增医院等级配置
                            </Button>
                          </div>
                        }
                      >
                        {specsTag?.hospitalLevelTags?.map((tag) => (
                          <TagCard
                            key={tag.levelCode}
                            tagList={tagList}
                            tags={tag.tags}
                            title={tag.levelName}
                            onChange={(tags) => {
                              this.onTagChange(item.province, specsIndex, tag.levelCode, tags);
                            }}
                          ></TagCard>
                        ))}
                      </Card>
                    ))}
                  </Card>
                );
              })}

              <div className={styles.addProvinceConfigContainer} onClick={this.openProviceModal}>
                <div className={styles.addProvinceConfig}>
                  <PlusOutlined />
                  <div>添加省份配置</div>
                </div>
              </div>

              <Form.Item {...tailLayout} style={{ marginTop: '30px' }}>
                <Button type="primary" htmlType="submit">
                  提交
                </Button>
                <Button htmlType="button" className={styles.resetBtn} onClick={this.onReset}>
                  取消
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
        <HospitalGradeModal
          visible={hosiptalVisiable}
          onClose={this.onHosiptalClose}
          hospitalGradeList={hosiptalLevelList}
        ></HospitalGradeModal>
        <ProvinceModal
          visible={provinceModalVisble}
          regionList={regionList}
          onClose={this.onProviceModalClose}
        ></ProvinceModal>
        <SpecificationModal
          onClose={this.onSpecsClose}
          visible={specsModalVisble}
          specsGroups={form.specsGroups}
        ></SpecificationModal>
      </PageContainer>
    );
  }
}
