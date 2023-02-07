import { Card, Form, Input, Button, Select, notification } from 'antd';
import React, { Component } from 'react';
import styles from './index.less';
import { PageContainer } from '@ant-design/pro-layout';
import { queryCommonDicts, queryRegions } from '@/services/common';
import { saveHospital, getHospital } from '@/services/hospital';
import Address from './components/Address';
import CertificateCard from './components/CertificateCard';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import Level from './components/Level';
import ContactCard from './components/ContactCard';

const { Option } = Select;

const { TextArea } = Input;

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
      levelList: [],
      gradeList: [],
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
        contacts: [
          {
            email: null,
            id: uuidv4(),
            linkMan: null,
            tel: null,
          },
        ],
      },
    };
  }

  async componentDidMount() {
    let { regionList, contryList, typeList, certTypeList, levelList, gradeList } = this.state;
    regionList = (await queryRegions())?.data ?? [];
    contryList = regionList.filter((item) => item.level === 0);
    typeList = (await queryCommonDicts(24))?.data[0]?.dicts ?? [];
    certTypeList = (await queryCommonDicts(22))?.data[0]?.dicts ?? [];
    levelList = (await queryCommonDicts(3))?.data[0]?.dicts ?? [];
    gradeList = (await queryCommonDicts(25))?.data[0]?.dicts ?? [];
    this.listenLocation();
    this.setState({
      regionList,
      certTypeList,
      contryList,
      typeList,
      gradeList,
      levelList,
    });
  }

  listenLocation = async () => {
    const { hospitalId } = this.props.location.query;
    if (hospitalId) {
      const res = await getHospital(hospitalId);
      if (res) {
        const { credentials, contacts } = res.data;
        const form = {
          credentials,
          contacts,
        };

        const initValues = res.data;
        initValues.tmpAddress = {
          province: res.data?.province || null,
          district: res.data?.district || null,
          city: res.data?.city || null,
          address: res.data?.address || null,
        };
        initValues.tmpLevel = {
          level: res.data?.level || null,
          grade: res.data?.grade || null,
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
      ...values.tmpLevel,
    };
    const res = await saveHospital({ hospital: { ...Object.assign(initValues, postdData) } });
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
      contacts: [
        {
          email: null,
          id: uuidv4(),
          linkMan: null,
          tel: null,
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

  onContactChange = (value, index) => {
    const { form } = this.state;
    form.contacts.splice(index, 1, value);
    this.setState({
      form,
    });
  };

  delContact = (index) => {
    const { form } = this.state;
    form.contacts.splice(index, 1);
    this.setState({
      form,
    });
  };

  addContact = () => {
    const { form } = this.state;
    form.contacts.push({
      email: null,
      id: uuidv4(),
      linkMan: null,
      tel: null,
    });
    this.setState({
      form,
    });
  };

  render() {
    const { regionList, levelList, typeList, certTypeList, form, gradeList } = this.state;
    return (
      <PageContainer title={false}>
        <div className={styles.medicineEditContainer}>
          <div>
            <Form ref={this.formRef} onFinish={this.onFinish} {...layout} name="basic">
              <Card title="基础信息">
                <Form.Item
                  label="医院名称"
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: '请输入医院名称',
                    },
                  ]}
                >
                  <Input placeholder="请输入医院名称" />
                </Form.Item>

                <Form.Item
                  label="注册地址"
                  name="tmpAddress"
                  rules={[
                    {
                      required: true,
                      message: '请输入注册地址',
                    },
                  ]}
                >
                  <Address regionList={regionList}></Address>
                </Form.Item>

                <Form.Item
                  label="医院性质"
                  name="type"
                  rules={[
                    {
                      required: true,
                      message: '请选择医院性质',
                    },
                  ]}
                >
                  <Select
                    placeholder="请选择医院性质"
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

                <Form.Item
                  label="医院等级"
                  name="tmpLevel"
                  rules={[
                    {
                      required: true,
                      message: '请输入医院等级',
                    },
                  ]}
                >
                  <Level levelList={levelList} gradeList={gradeList}></Level>
                </Form.Item>

                <Form.Item
                  label="医院简介"
                  name="description"
                  rules={[
                    {
                      required: true,
                      message: '请输入医院简介',
                    },
                  ]}
                >
                  <TextArea placeholder="请输入医院简介" rows={4}></TextArea>
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

              <Card
                title="联系人"
                style={{ marginTop: '20px' }}
                extra={
                  <Button type="primary" onClick={this.addContact}>
                    添加联系人
                  </Button>
                }
              >
                {form.contacts.map((item, index) => (
                  <ContactCard
                    key={item.id}
                    value={item}
                    index={index}
                    onDel={this.delContact}
                    onChange={(value) => this.onContactChange(value, index)}
                  ></ContactCard>
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
