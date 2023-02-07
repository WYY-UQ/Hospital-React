import { Card, Form, Input, Button, Select, notification } from 'antd';
import React, { Component } from 'react';
import styles from './index.less';
import { PageContainer } from '@ant-design/pro-layout';
import { queryCommonDicts, queryRegions } from '@/services/common';
import { saveCompany, getCompany } from '@/services/company';
import Address from './components/Address';
import CertificateCard from './components/CertificateCard';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';

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

export default class CompanyEdit extends Component {
  constructor(props) {
    super(props);

    this.formRef = React.createRef();
    this.state = {
      regionList: [],
      contryList: [],
      typeList: [],
      certTypeList: [],
      initValues: {},
      form: {
        credentials: [
          {
            credentialNo: null,
            endDate: null,
            foreverValid: false,
            id: uuidv4(),
            startDate: null,
            type: null,
          },
        ],
      },
    };
  }

  async componentDidMount() {
    let { regionList, contryList, typeList, certTypeList } = this.state;
    regionList = (await queryRegions())?.data ?? [];
    contryList = regionList.filter((item) => item.level === 0);
    typeList = (await queryCommonDicts(26))?.data[0]?.dicts ?? [];
    certTypeList = (await queryCommonDicts(23))?.data[0]?.dicts ?? [];
    this.listenLocation();
    this.setState({
      regionList,
      certTypeList,
      contryList,
      typeList,
    });
  }

  listenLocation = async () => {
    const { companyId } = this.props.location.query;
    if (companyId) {
      const res = await getCompany(companyId);
      if (res) {
        const { credentials } = res.data;
        const form = {
          credentials,
        };

        const initValues = res.data;
        initValues.tmpAddress = {
          province: res.data?.province || null,
          district: res.data?.district || null,
          city: res.data?.city || null,
          address: res.data?.address || null,
        };
        form.credentials.forEach((item) => {
          if (item.endDate) {
            // eslint-disable-next-line no-param-reassign
            item.endDate = moment(item.endDate);
          }
          if (item.startDate) {
            // eslint-disable-next-line no-param-reassign
            item.startDate = moment(item.startDate);
          }
        });

        this.formRef?.current?.setFieldsValue(initValues);
        this.setState({
          initValues,
          form,
        });
      }
    }
  };

  onCredentialChange = (value, index) => {
    const { form } = this.state;
    form.credentials.splice(index, 1, value);
    this.setState({
      form,
    });
  };

  onFinish = async (values) => {
    const { form, initValues } = this.state;

    const postdData = {
      ...form,
      ...values,
      ...values.tmpAddress,
    };
    const res = await saveCompany({ company: { ...Object.assign(initValues, postdData) } });
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
      credentials: [
        {
          credentialNo: null,
          endDate: null,
          foreverValid: false,
          id: uuidv4(),
          startDate: null,
          type: null,
        },
      ],
    };
    this.setState({
      form,
    });
  };

  addCerts = () => {
    const { form } = this.state;
    form.credentials.push({
      credentialNo: null,
      endDate: null,
      foreverValid: false,
      id: uuidv4(),
      startDate: null,
      type: null,
    });
    this.setState({
      form,
    });
  };

  delCert = (index) => {
    const { form } = this.state;
    form.credentials.splice(index, 1);
    this.setState({
      form,
    });
  };

  render() {
    const { regionList, contryList, typeList, certTypeList, form } = this.state;
    return (
      <PageContainer title={false}>
        <div className={styles.medicineEditContainer}>
          <div>
            <Form ref={this.formRef} onFinish={this.onFinish} {...layout} name="basic">
              <Card title="基础信息">
                <Form.Item
                  label="药企名称"
                  name="companyName"
                  rules={[
                    {
                      required: true,
                      message: '请输入药企名称',
                    },
                  ]}
                >
                  <Input placeholder="请输入药企名称" />
                </Form.Item>

                <Form.Item
                  label="英文名"
                  name="enCompanyName"
                  rules={[
                    {
                      required: true,
                      message: '请输入英文名',
                    },
                  ]}
                >
                  <Input placeholder="请输入英文名" />
                </Form.Item>

                <Form.Item
                  label="国别"
                  name="country"
                  rules={[
                    {
                      required: true,
                      message: '请选择国别',
                    },
                  ]}
                >
                  <Select
                    placeholder="请选择国别"
                    showSearch
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {contryList.map((item) => (
                      <Option key={item.regionName} value={item.regionName}>
                        {item.regionName}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item
                  label="地址"
                  name="tmpAddress"
                  rules={[
                    {
                      required: true,
                      message: '请输入地址',
                    },
                  ]}
                >
                  <Address regionList={regionList}></Address>
                </Form.Item>

                <Form.Item
                  label="企业性质"
                  name="type"
                  rules={[
                    {
                      required: true,
                      message: '请选择企业性质',
                    },
                  ]}
                >
                  <Select
                    placeholder="请选择企业性质"
                    showSearch
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {typeList.map((item) => (
                      <Option key={item.key} value={item.key}>
                        {item.value}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Card>

              <Card
                title="药企证件"
                style={{ marginTop: '20px' }}
                extra={
                  <Button type="primary" onClick={this.addCerts}>
                    添加新证件
                  </Button>
                }
              >
                {form.credentials.map((item, index) => (
                  <CertificateCard
                    key={item.id}
                    value={item}
                    index={index}
                    onDel={this.delCert}
                    certTypeList={certTypeList}
                    onChange={(value) => this.onCredentialChange(value, index)}
                  ></CertificateCard>
                ))}
              </Card>

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
