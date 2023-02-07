import { PageContainer } from '@ant-design/pro-layout';
import { Card, Form, Button, Input, DatePicker, Radio, Select, notification } from 'antd';

import React, { Component } from 'react';
import styles from './index.less';
import { queryCommonNameWithCompanies, queryCommonDicts, queryUnits } from '@/services/common';

import Dragger from './Dragger';
import { v4 as uuidv4 } from 'uuid';
import { PlusOutlined } from '@ant-design/icons';
import PackageMethod from './PackageMethod';
import { saveDirection, getDirection } from '@/services/direction';
import moment from 'moment';

const { Group } = Radio;
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

export default class ScanEdit extends Component {
  constructor(props) {
    super(props);
    this.formRef = React.createRef();
    this.state = {
      commonNameList: [],
      vendorList: [],
      specsList: [],
      packageMethodList: [],
      unitList: [],
      initValues: {},
      form: {
        specses: [
          {
            id: uuidv4(),
            specsGroupId: null,
            packs: [
              {
                packType: null,
                levels: [
                  {
                    childUnit: null,
                    childValue: null,
                    levelNo: null,
                    parentUnit: null,
                    parentValue: null,
                  },
                ],
              },
            ],
          },
        ],
      },
    };
  }

  async componentDidMount() {
    // const commonNameListRes = await queryCommonNameWithCompanies();
    // let commonNameList = [];
    // if (commonNameListRes) {
    //   commonNameList = commonNameListRes.data;
    // }
    let packageMethodList = [];
    const dicRes = await queryCommonDicts(9);
    if (dicRes) {
      packageMethodList = dicRes.data[0]?.dicts ?? [];
    }
    let unitList = [];
    const unitRes = await queryUnits(null);
    if (unitRes) {
      unitList = unitRes.data;
    }

    this.listenLocation();
    this.setState({
      packageMethodList,
      unitList,
    });
  }

  listenLocation = async () => {
    const { directionId } = this.props.location.query;
    if (directionId) {
      const res = await getDirection(directionId);
      if (res) {
        res.data.versionDate = res.data?.versionDate ? moment(res.data.versionDate) : null;
        let commonNameList = [];
        let vendorList = [];
        let specsList = [];
        if (res?.data?.commonNameName) {
          const commonNameListRes = await queryCommonNameWithCompanies({
            key: res?.data?.commonNameName,
          });
          if (commonNameListRes) {
            commonNameList = commonNameListRes.data;
          }
        }
        if (res.data?.commonNameId) {
          const commonName = commonNameList.find((item) => item.id === res.data?.commonNameId);
          if (commonName) {
            vendorList = commonName.companies;
          }
        }

        if (res.data?.companyId) {
          const vendor = vendorList.find((item) => item.id === res.data?.companyId);
          if (vendor) {
            specsList = vendor.specses;
          }
        }
        const form = {};
        form.specses = res.data.specses;
        this.formRef?.current?.setFieldsValue(res.data);
        this.setState({
          specsList,
          vendorList,
          commonNameList,
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
    const res = await saveDirection({ direction: { ...Object.assign(initValues, postdData) } });
    if (res) {
      notification.success({
        description: '保存成功',
        message: '提示',
      });
      this.onReset();
    }
  };

  onReset = () => {
    this.formRef.current.resetFields();
    const form = {
      specses: [
        {
          id: uuidv4(),
          specsGroupId: null,
          packs: [
            {
              packType: null,
              levels: [
                {
                  childUnit: null,
                  childValue: null,
                  levelNo: null,
                  parentUnit: null,
                  parentValue: null,
                },
              ],
            },
          ],
        },
      ],
    };

    this.setState({
      form,
    });
  };

  onValuesChange = (changedValues) => {
    const { commonNameList, vendorList } = this.state;
    if (changedValues.commonNameId) {
      const commonName = commonNameList.find((item) => item.id === changedValues.commonNameId);
      if (commonName) {
        this.setState({
          vendorList: commonName.companies,
        });
      }
    }
    if (changedValues.companyId) {
      const vendor = vendorList.find((item) => item.id === changedValues.companyId);
      if (vendor) {
        this.setState({
          specsList: vendor.specses,
        });
      }
    }
  };

  onPackAdd = (index) => {
    const { form } = this.state;
    form.specses[index].packs.push({
      packType: null,
      levels: [
        {
          childUnit: null,
          childValue: null,
          levelNo: null,
          parentUnit: null,
          parentValue: null,
        },
      ],
    });
    this.setState({
      form,
    });
  };

  onSpecsesAdd = () => {
    const { form } = this.state;
    form.specses.push({
      id: uuidv4(),
      specsGroupId: null,
      packs: [
        {
          packType: null,
          levels: [
            {
              childUnit: null,
              childValue: null,
              levelNo: null,
              parentUnit: null,
              parentValue: null,
            },
          ],
        },
      ],
    });
    this.setState({
      form,
    });
  };

  packageMethodChange = (index, pageIndex, value) => {
    const { form } = this.state;
    form.specses[index].packs.splice(pageIndex, 1, value);
    this.setState({
      form,
    });
  };

  specChange = (index, value) => {
    const { form } = this.state;
    form.specses[index].specsGroupId = value;
    this.setState({
      form,
    });
  };

  handleSearch = async (key) => {
    const commonNameListRes = await queryCommonNameWithCompanies({ key });
    let commonNameList = [];
    if (commonNameListRes) {
      commonNameList = commonNameListRes.data;
    }
    this.setState({
      commonNameList,
    });
  };

  render() {
    const { commonNameList, vendorList, form, specsList, packageMethodList, unitList } = this.state;
    return (
      <PageContainer title={false}>
        <div className={styles.scanEditContainer}>
          <Form
            ref={this.formRef}
            {...layout}
            name="basic"
            onValuesChange={this.onValuesChange}
            onFinish={this.onFinish}
          >
            <Card>
              <Form.Item
                label="通用名"
                style={{ marginTop: '20px' }}
                name="commonNameId"
                rules={[
                  {
                    required: true,
                    message: '请选择通用名',
                  },
                ]}
              >
                <Select
                  placeholder="请选择通用名"
                  showSearch
                  defaultActiveFirstOption={false}
                  showArrow={false}
                  filterOption={false}
                  onSearch={this.handleSearch}
                  notFoundContent={null}
                >
                  {commonNameList.map((item) => (
                    <Option key={item.id} value={item.id}>
                      {item.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                label="厂商"
                style={{ marginTop: '20px' }}
                name="companyId"
                rules={[
                  {
                    required: true,
                    message: '请选择厂商',
                  },
                ]}
              >
                <Select
                  placeholder="请选择厂商"
                  showSearch
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {vendorList.map((item) => (
                    <Option key={item.id} value={item.id}>
                      {item.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                label="版本日期"
                style={{ marginTop: '20px' }}
                name="versionDate"
                rules={[
                  {
                    required: true,
                    message: '请输入版本日期',
                  },
                ]}
              >
                <DatePicker format="YYYY-MM-DD" style={{ width: '613px' }} />
              </Form.Item>

              <Form.Item
                label="版本类型"
                style={{ marginTop: '20px' }}
                name="versionType"
                rules={[
                  {
                    required: true,
                    message: '请选择版本类型',
                  },
                ]}
              >
                <Group>
                  <Radio value={1}>核准</Radio>
                  <Radio value={2}>修订</Radio>
                </Group>
              </Form.Item>

              <Form.Item
                label="说明书名称"
                style={{ marginTop: '20px' }}
                name="title"
                rules={[
                  {
                    required: true,
                    message: '请输入说明书名称',
                  },
                ]}
              >
                <Input placeholder="请输入说明书名称" />
              </Form.Item>

              <Form.Item
                label="扫描件"
                name="files"
                rules={[
                  {
                    required: true,
                    message: '请上传文件',
                  },
                ]}
              >
                <Dragger></Dragger>
              </Form.Item>

              {form.specses.map((item, index) => (
                <Card
                  style={{
                    marginTop: '30px',
                  }}
                  key={item.id}
                  title="产品规格"
                  extra={
                    <Button type="primary" onClick={() => this.onPackAdd(index)}>
                      添加包装
                    </Button>
                  }
                >
                  <Form.Item label="规格">
                    <Select
                      showSearch
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                      }
                      placeholder="请选择规格"
                      value={item.specsGroupId}
                      onChange={(value) => this.specChange(index, value)}
                    >
                      {specsList.map((spec) => (
                        <Option key={spec.key} value={spec.key}>
                          {spec.value}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                  {item.packs.map((pack, packIndex) => (
                    <PackageMethod
                      key={`pack_${packIndex}`}
                      value={pack}
                      onChange={(value) => {
                        this.packageMethodChange(index, packIndex, value);
                      }}
                      packageMethodList={packageMethodList}
                      unitList={unitList}
                    ></PackageMethod>
                  ))}
                </Card>
              ))}

              <div className={styles.addProvinceConfigContainer} onClick={this.onSpecsesAdd}>
                <div className={styles.addProvinceConfig}>
                  <PlusOutlined />
                  <div>添加规格</div>
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
            </Card>
          </Form>
        </div>
      </PageContainer>
    );
  }
}
