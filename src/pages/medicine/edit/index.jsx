import { Card, Form, Input, Button, Select, notification } from 'antd';
import React, { Component } from 'react';
import styles from './index.less';
import { PageContainer } from '@ant-design/pro-layout';
import { queryCommonDicts, queryTags, queryRegions, queryObjects } from '@/services/common';
import Alias from '@/components/Alias';
import { PlusOutlined } from '@ant-design/icons';
import TagCard from './components/TagCard';
import HospitalGradeModal from '@/components/HospitalGradeModal';
import ProvinceModal from '@/components/ProvinceModal';
import { querySubstances } from '@/services/material';
import { saveDrug, getDrug } from '@/services/medicine';
import { getPinYinCode, getWubiCode } from 'lancet-pywb/PY_WB';
import DrugClassification from '@/components/DrugClassification';
import pinyin from 'pinyin';
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

export default class MedicineEdit extends Component {
  constructor(props) {
    super(props);

    this.formRef = React.createRef();
    this.state = {
      medicineCategoryList: [],
      acidAlkaliRootList: [],
      regionList: [],
      tagList: [],
      substancesList: [],
      sysList: [],
      hosiptalLevelList: [],
      hosiptalVisiable: false,
      provinceModalVisble: false,
      currentProvince: '',
      initValues: {},
      formData: {},
      form: {
        commonTags: [
          {
            hospitalLevelTags: [
              {
                levelCode: '',
                levelName: '',
                tags: [],
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
    let acidAlkaliRootList = [];
    let hosiptalLevelList = [];
    let substancesList = [];
    let sysList = [];
    if (dictRes) {
      const tempMedicineCategorDict = dictRes.data.find((item) => item.dictType === 4);
      if (tempMedicineCategorDict?.dicts) {
        medicineCategoryList = tempMedicineCategorDict?.dicts;
      }
      const tempAcidAlkaliRootDict = dictRes.data.find((item) => item.dictType === 6);
      if (tempAcidAlkaliRootDict?.dicts) {
        acidAlkaliRootList = tempAcidAlkaliRootDict?.dicts;
      }
      const tempHosiptalLevelDict = dictRes.data.find((item) => item.dictType === 3);
      if (tempHosiptalLevelDict?.dicts) {
        hosiptalLevelList = tempHosiptalLevelDict?.dicts;
      }
      const sysListDict = dictRes.data.find((item) => item.dictType === 5);
      if (sysListDict?.dicts) {
        sysList = sysListDict?.dicts;
      }
    }
    let tagList = [];
    const tagsRes = await queryTags(2);
    if (tagsRes?.data?.length) {
      tagList = tagsRes.data;
    }
    const regionsRes = await queryRegions();
    let regionList = [];
    if (regionsRes) {
      regionList = regionsRes.data.filter((item) => item.level === 1);
    }
    const substancesRes = await queryObjects({
      type: 1,
    });

    substancesList = substancesRes?.data ?? [];

    this.listenLocation();
    this.setState({
      medicineCategoryList,
      acidAlkaliRootList,
      substancesList,
      tagList,
      regionList,
      hosiptalLevelList,
      sysList,
    });
  }

  listenLocation = async () => {
    const { drugId } = this.props.location.query;
    if (drugId) {
      const res = await getDrug(drugId);
      if (res) {
        const { commonTags } = res.data;
        const form = {
          commonTags,
        };
        res?.data?.drugCategories?.forEach((item) => {
          // eslint-disable-next-line no-param-reassign
          item.id = uuidv4();
        });
        this.formRef?.current?.setFieldsValue(res.data);
        this.setState({
          initValues: res.data,
          form,
        });
      }
    }
  };

  openHosiptalModal = (currentProvince) => {
    this.setState({
      hosiptalVisiable: true,
      currentProvince,
    });
  };

  openProviceModal = () => {
    this.setState({
      provinceModalVisble: true,
    });
  };

  onProviceModalClose = (province) => {
    const { form } = this.state;
    if (province) {
      const provinceTag = form.commonTags.find((item) => !item.province);
      let unifiedLevelTag = null;
      if (provinceTag) {
        unifiedLevelTag = provinceTag.hospitalLevelTags.find((item) => !item.levelCode);
      }
      form.commonTags.push({
        hospitalLevelTags: [
          {
            levelCode: '',
            levelName: '',
            tags: unifiedLevelTag ? JSON.parse(JSON.stringify(unifiedLevelTag.tags)) : [],
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
    const { form, currentProvince } = this.state;
    if (level) {
      const provinceTag = form.commonTags.find((item) => item.province === currentProvince);
      if (provinceTag) {
        const unifiedLevelTag = provinceTag.hospitalLevelTags.find((item) => !item.levelCode);
        provinceTag.hospitalLevelTags.push({
          ...level,
          tags: JSON.parse(JSON.stringify(unifiedLevelTag.tags)),
        });
      }
    }
    this.setState({
      hosiptalVisiable: false,
      form,
    });
  };

  onTagChange(province, levelCode, tags) {
    const { form } = this.state;
    const provinceTag = form.commonTags.find((item) => item.province === province);
    if (provinceTag) {
      const tag = provinceTag.hospitalLevelTags.find((item) => item.levelCode === levelCode);
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
    form.commonTags.splice(index, 1);
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
    const res = await saveDrug({ drug: { ...Object.assign(initValues, postdData) } });
    if (res) {
      notification.success({
        description: '保存成功',
        message: '提示',
      });
      this.onReset();
    }
  };

  onValuesChange = (changedValues, all) => {
    this.setState({
      formData: all,
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
      commonTags: [
        {
          hospitalLevelTags: [
            {
              levelCode: '',
              levelName: '',
              tags: [],
            },
          ],
          province: '',
        },
      ],
    };
    this.setState({
      form,
    });
    history.replace('/medicine/management')
  };

  render() {
    const {
      medicineCategoryList,
      acidAlkaliRootList,
      substancesList,
      tagList,
      hosiptalVisiable,
      provinceModalVisble,
      form,
      regionList,
      hosiptalLevelList,
      sysList,
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
              initialValues={{ canBeSecMaterial: false }}
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
                  label="药物名称"
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: '请输入药物名称',
                    },
                  ]}
                >
                  <Input placeholder="请输入药物名称" onBlur={this.onNameBlur} />
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

                <Form.Item label="酸碱根" name="radicalCode">
                  <Select placeholder="请选择酸碱根">
                    {acidAlkaliRootList.map((item) => (
                      <Option key={item.value} value={item.key}>
                        {item.value}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item label="药物分类" name="drugCategories">
                  <DrugClassification sysList={sysList} />
                </Form.Item>

                <Form.Item
                  name="substanceId"
                  label="物质清单"
                  rules={[
                    {
                      required: true,
                      message: '请选择物质清单',
                    },
                  ]}
                >
                  <Select
                    placeholder="请选择物质清单"
                    showSearch
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {substancesList.map((item) => (
                      <Option key={item.key} value={item.key}>
                        {item.value}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Card>

              {form.commonTags.map((item, index) => {
                return (
                  <Card
                    key={item.province}
                    title={item.province ? `${item.province}标签` : '统一药物标签'}
                    style={{ marginTop: '30px' }}
                    extra={
                      <div>
                        <Button
                          onClick={() => {
                            this.openHosiptalModal(item.province);
                          }}
                          type="primary"
                        >
                          新增医院等级配置
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
                    {item.hospitalLevelTags.map((level) => (
                      <TagCard
                        key={level.levelCode}
                        tagList={tagList}
                        tags={level.tags}
                        title={level.levelName}
                        onChange={(tags) => {
                          this.onTagChange(item.province, level.levelCode, tags);
                        }}
                      ></TagCard>
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
      </PageContainer>
    );
  }
}
