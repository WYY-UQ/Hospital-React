import { Card, Form, Input, Button, Select, notification, AutoComplete, Radio } from 'antd';
import React, { Component } from 'react';
import styles from './index.less';
import { PageContainer } from '@ant-design/pro-layout';
import {
  querySecMaterialDrugs,
  queryCompanies,
  queryExecutiveStandards,
  queryApprovalNos,
  queryUnits,
} from '@/services/common';
import Alias from '@/components/Alias';
import { saveProduct, getProduct } from '@/services/product';
import { getPinYinCode, getWubiCode } from 'lancet-pywb/PY_WB';
import ValidPeriod from './components/ValidPeriod';
import pinyin from 'pinyin';
import CommonNameList from './components/CommonNameList';
import Accessory from './components/Accessory';
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

export default class ProductEdit extends Component {
  constructor(props) {
    super(props);

    this.formRef = React.createRef();
    this.state = {
      unitList: [],
      companyList: [],
      packUnitList: [],
      validPeriodUnitList: [],
      secMaterialDrugList: [],
      executiveStandardList: [],
      approvalNoOptions: [],
      commonNameList: [],
      initValues: {},
      formData: {},
      form: {
        commonNameSpecs: [],
      },
    };
  }

  async componentDidMount() {
    let companyList = [];
    const commonNameList = [];
    let executiveStandardList = [];
    let secMaterialDrugList = [];

    const companyRes = await queryCompanies();
    if (companyRes) {
      companyList = companyRes.data;
    }

    this.listenLocation();
    const executiveStandardsRes = await queryExecutiveStandards();
    if (executiveStandardsRes) {
      executiveStandardList = executiveStandardsRes.data;
    }

    let unitList = [];
    const unitRes = await queryUnits(2);
    if (unitRes) {
      unitList = unitRes.data;
    }
    let packUnitList = [];
    const packUnitRes = await queryUnits(3);
    if (packUnitRes) {
      packUnitList = packUnitRes.data;
    }
    let validPeriodUnitList = [];
    const validPeriodUnitRes = await queryUnits(4);
    if (validPeriodUnitRes) {
      validPeriodUnitList = validPeriodUnitRes.data;
    }

    const secMaterialDrugsRes = await querySecMaterialDrugs();
    if (secMaterialDrugsRes) {
      secMaterialDrugList = secMaterialDrugsRes.data;
    }

    this.setState({
      companyList,
      packUnitList,
      validPeriodUnitList,
      unitList,
      secMaterialDrugList,
      commonNameList,
      executiveStandardList,
    });
  }

  listenLocation = async () => {
    const { productId } = this.props.location.query;
    if (productId) {
      const res = await getProduct(productId);
      if (res) {
        const { commonNameSpecs } = res.data;
        const form = {
          commonNameSpecs,
        };
        this.formRef?.current?.setFieldsValue(res.data);
        this.setState({
          initValues: res.data,
          form,
        });
      }
    }
  };

  onFinish = async (values) => {
    const { form, initValues } = this.state;
    const postdData = {
      ...form,
      ...values,
    };
    const res = await saveProduct({ product: { ...Object.assign(initValues, postdData) } });
    if (res) {
      notification.success({
        description: '保存成功',
        message: '提示',
      });
      this.onReset();
    }
  };

  onValuesChange = (changedValues, all) => {
    if (changedValues.commonNames) {
      const form = {
        commonNameSpecs: [],
      };
      form.commonNameSpecs = changedValues.commonNames.map((item) => {
        return {
          commonNameId: item.commonNameId,
          commonNameName: item.commonName,
          specsList: item.specses,
          standardCodes: [],
        };
      });
      this.setState({
        form,
      });
    }
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
      commonNameSpecs: [],
    };
    this.setState({
      form,
    });
    history.replace('/product/management');
  };

  addSpec = (index) => {
    const { form } = this.state;
    form.commonNameSpecs[index].standardCodes.push({
      key: Math.random(),
      specsUnit: null,
      specsValue: null,
      standardCode: '',
    });
    this.setState({
      form,
    });
  };

  delSpec = (index, codeIndex) => {
    const { form } = this.state;
    form.commonNameSpecs[index].standardCodes.splice(codeIndex, 1);
    this.setState({
      form,
    });
  };

  specChange = (index, codeIndex, value) => {
    const { form } = this.state;
    form.commonNameSpecs[index].standardCodes[codeIndex].specsValue = value.replace(/[^0-9]/gi, '');
    form.commonNameSpecs[index].standardCodes[codeIndex].specsUnit = value.replace(/\d+/g, '');
    this.setState({
      form,
    });
  };

  standardCodeChange = (index, codeIndex, e) => {
    const { form } = this.state;
    form.commonNameSpecs[index].standardCodes[codeIndex].standardCode = e.target.value;
    this.setState({
      form,
    });
  };

  onApprovalNoSearch = async (key) => {
    const res = await queryApprovalNos({ key });
    if (res?.data) {
      const approvalNoOptions = res.data.map((item) => {
        return {
          value: item,
        };
      });
      this.setState({
        approvalNoOptions,
      });
    }
  };

  render() {
    const {
      commonNameList,
      unitList,
      secMaterialDrugList,
      approvalNoOptions,
      form,
      executiveStandardList,
      packUnitList,
      companyList,
      validPeriodUnitList,
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
              initialValues={{ canBeSecMaterial: false, isImported: false }}
            >
              <Card title="基础信息">
                <Form.Item
                  label="上市许可持有人"
                  name="marketingOwnerId"
                  rules={[
                    {
                      required: true,
                      message: '请选择上市许可持有人',
                    },
                  ]}
                >
                  <Select
                    placeholder="请选择上市许可持有人"
                    showSearch
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {companyList.map((item) => (
                      <Option key={item.companyName} value={item.id}>
                        {item.companyName}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item
                  label="生产厂家"
                  name="manufactureId"
                  rules={[
                    {
                      required: true,
                      message: '请选择生产厂家',
                    },
                  ]}
                >
                  <Select
                    placeholder="请选择生产厂家"
                    showSearch
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {companyList.map((item) => (
                      <Option key={item.companyName} value={item.id}>
                        {item.companyName}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item
                  label="产品名称"
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: '请输入产品名称',
                    },
                  ]}
                >
                  <Input placeholder="请输入产品名称" onBlur={this.onNameBlur} />
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
                <Form.Item label="商品名称" name="commodityName">
                  <Input placeholder="请输入商品名称" />
                </Form.Item>
                <Form.Item label="批准文号" name="approvalNo">
                  <AutoComplete
                    placeholder="请输入批准文号"
                    onSearch={this.onApprovalNoSearch}
                    options={approvalNoOptions}
                  />
                </Form.Item>
                <Form.Item label="执行标准" name="executiveStandardCodes">
                  <Select mode="tags" placeholder="请选择执行标准">
                    {executiveStandardList.map((item) => (
                      <Option key={item}>{item}</Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item
                  label="是否进口"
                  name="isImported"
                  rules={[
                    {
                      required: true,
                      message: '是否进口',
                    },
                  ]}
                >
                  <Radio.Group>
                    <Radio value={true}>是</Radio>
                    <Radio value={false}>否</Radio>
                  </Radio.Group>
                </Form.Item>
                <Form.Item
                  label="通用名清单"
                  name="commonNames"
                  rules={[
                    {
                      required: true,
                      message: '请选择通用名清单',
                    },
                  ]}
                >
                  <CommonNameList commonNameList={commonNameList}></CommonNameList>
                </Form.Item>
                <Form.Item
                  label="最小制剂单位"
                  name="minPreparationUnit"
                  rules={[
                    {
                      required: true,
                      message: '请选择最小制剂单位',
                    },
                  ]}
                >
                  <Select
                    placeholder="请选择最小制剂单位"
                    showSearch
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {unitList.map((item) => (
                      <Option key={item} value={item}>
                        {item}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item label="最小包装单位" name="minPackUnit">
                  <Select
                    placeholder="最小包装单位"
                    showSearch
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {packUnitList.map((item) => (
                      <Option key={item} value={item}>
                        {item}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item label="保质期" name="validPeriod">
                  <ValidPeriod unitList={validPeriodUnitList} />
                </Form.Item>
              </Card>

              <Card title="辅料清单" style={{ marginTop: '30px' }}>
                <Form.Item label="选择辅料" name="accessories">
                  <Accessory secMaterialDrugList={secMaterialDrugList}></Accessory>
                </Form.Item>
              </Card>

              {form.commonNameSpecs
                .filter((item) => item?.commonNameName)
                .map((item, index) => (
                  <Card
                    key={item.commonNameId}
                    title={`${item.commonNameName}规格清单`}
                    style={{ marginTop: '30px' }}
                    extra={
                      <Button
                        onClick={() => {
                          this.addSpec(index);
                        }}
                        type="primary"
                      >
                        新增规格
                      </Button>
                    }
                  >
                    {item.standardCodes.map((code, codeIndex) => (
                      <Card title={false} key={code.key} style={{ marginTop: '30px' }}>
                        <div style={{ display: 'flex', width: '100%' }}>
                          <Form.Item label="规格" style={{ width: '100%', marginLeft: '12px' }}>
                            <Select
                              placeholder="请选择规格"
                              value={code.specsGroupId}
                              onChange={(value) => this.specChange(index, codeIndex, value)}
                            >
                              {item.specsList.map((spec) => (
                                <Option key={spec.key} value={spec.key}>
                                  {spec.value}
                                </Option>
                              ))}
                            </Select>
                          </Form.Item>
                          <Button
                            onClick={() => {
                              this.delSpec(index, codeIndex);
                            }}
                            danger
                          >
                            删除规格
                          </Button>
                        </div>
                        <Form.Item label="本位码">
                          <Input
                            value={code.standardCode}
                            placeholder="请输入本位码"
                            style={{ width: '530px' }}
                            onChange={(e) => this.standardCodeChange(index, codeIndex, e)}
                          ></Input>
                        </Form.Item>
                      </Card>
                    ))}
                  </Card>
                ))}

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
      </PageContainer>
    );
  }
}
