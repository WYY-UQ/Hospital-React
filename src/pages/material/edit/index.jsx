import { Card, Form, Input, Button, Select, notification } from 'antd';
import React, { Component } from 'react';
import styles from './index.less';
import { PageContainer } from '@ant-design/pro-layout';
import { queryCommonDicts, queryTags, queryRegions } from '@/services/common';
import Alias from '@/components/Alias';
import DrugClassification from '@/components/DrugClassification';
import MaterialCode from './components/MaterialCode';
import { PlusOutlined } from '@ant-design/icons';
import TagCard from './components/TagCard';
import HospitalGradeModal from '@/components/HospitalGradeModal';
import ProvinceModal from '@/components/ProvinceModal';
import { saveSubstance, querySubstance } from '@/services/material';
import { getPinYinCode, getWubiCode } from 'lancet-pywb/PY_WB';

import pinyin from 'pinyin';
import ChemicalFormulaEdit from './components/ChemicalFormulaEdit';
import { v4 as uuidv4 } from 'uuid';
import { history } from 'umi';

const { Option } = Select;

const layout = {
  labelCol: {
    span: 2,
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

export default class MaterialEdit extends Component {
  constructor(props) {
    super(props);

    this.formRef = React.createRef();
    this.state = {
      materialCategoryList: [],
      codeSchemeList: [],
      regionList: [],
      tagList: [],
      hosiptalLevelList: [],
      sysList: [],
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
    let materialCategoryList = [];
    let codeSchemeList = [];
    let hosiptalLevelList = [];
    let sysList = [];
    if (dictRes) {
      const tempMaterialCategorDict = dictRes.data.find((item) => item.dictType === 1);
      if (tempMaterialCategorDict?.dicts) {
        materialCategoryList = tempMaterialCategorDict?.dicts;
      }
      const tempCodeSchemeDict = dictRes.data.find((item) => item.dictType === 2);
      if (tempCodeSchemeDict?.dicts) {
        codeSchemeList = tempCodeSchemeDict?.dicts;
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
    const tagsRes = await queryTags(1);
    if (tagsRes?.data?.length) {
      tagList = tagsRes.data;
    }
    const regionsRes = await queryRegions();
    let regionList = [];
    if (regionsRes) {
      regionList = regionsRes.data.filter((item) => item.level === 1);
    }
    // setTimeout(() => this.listenLocation(), 0);
    this.listenLocation();
    this.setState({
      materialCategoryList,
      codeSchemeList,
      tagList,
      regionList,
      hosiptalLevelList,
      sysList,
    });
  }

  listenLocation = async () => {
    const { substanceId } = this.props.location.query;
    if (substanceId) {
      const res = await querySubstance(substanceId);
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
    const res = await saveSubstance({ substance: { ...Object.assign(initValues, postdData) } });
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
    history.replace('/material/management')
  };

  render() {
    const {
      materialCategoryList,
      codeSchemeList,
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
        <div className={styles.materialEditContainer}>
          <div>
            <Form
              ref={this.formRef}
              onValuesChange={this.onValuesChange}
              onFinish={this.onFinish}
              {...layout}
              name="basic"
            >
              <Card title="基础信息">
                <Form.Item label="物质类别" name="type">
                  <Select placeholder="请选择物质类别">
                    {materialCategoryList.map((item) => (
                      <Option key={item.value} value={item.key}>
                        {item.value}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item
                  label="物质名称"
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: '请输入物质名称',
                    },
                  ]}
                >
                  <Input placeholder="请输入物质名称" onBlur={this.onNameBlur} />
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
                  label="物质编码"
                  name="codes"
                  rules={[
                    {
                      required: true,
                      message: '请输入物质编码',
                    },
                  ]}
                >
                  <MaterialCode codeSchemeList={codeSchemeList} />
                </Form.Item>

                <Form.Item label="药物分类" name="drugCategories">
                  <DrugClassification sysList={sysList} />
                </Form.Item>

                <Form.Item label="化学分子式" name="chemicalFormula">
                  <Input placeholder="请输入化学分子式" />
                </Form.Item>

                <Form.Item label="化学结构式" name="chemicalCode">
                  <ChemicalFormulaEdit></ChemicalFormulaEdit>
                </Form.Item>
              </Card>

              {form.commonTags.map((item, index) => {
                return (
                  <Card
                    key={item.province}
                    title={item.province ? `${item.province}标签` : '统一物质标签'}
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
