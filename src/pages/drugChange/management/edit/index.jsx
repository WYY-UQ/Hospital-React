import { Card, Form, Input, Button, Select, notification, Radio, Modal } from 'antd';
import React, { Component } from 'react';
import styles from './index.less';
import { PageContainer } from '@ant-design/pro-layout';
import { queryCommonDicts, queryTags, queryRegions, queryUnits } from '@/services/common';
import { getHospitalDrugChange, reviewHospitalDrugChange } from '@/services/hospital-side';
import { CloseCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';
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

const booleanOptions = [
  {
    value: '是',
    key: true,
  },
  {
    value: '否',
    key: false,
  },
];

export default class DrugChangeManagementEdit extends Component {
  constructor(props) {
    super(props);

    this.formRef = React.createRef();
    this.state = {
      remark: null,
      initValues: {},
      medicineCategoryList: [],
      packUnitList: [],
      preparationUnitList: [],
    };
  }

  async componentDidMount() {
    this.listenLocation();
    const dictRes = await queryCommonDicts(4);
    let medicineCategoryList = [];

    if (dictRes?.data[0]?.dicts) {
      medicineCategoryList = dictRes?.data[0]?.dicts;
    }

    let packUnitList = [];
    let preparationUnitList = [];

    const preparationUnitRes = await queryUnits(2);
    const packUnitRes = await queryUnits(3);
    if (preparationUnitRes) {
      preparationUnitList = preparationUnitRes?.data;
    }

    if (packUnitRes) {
      packUnitList = packUnitRes?.data;
    }

    this.setState({
      medicineCategoryList,
      preparationUnitList,
      packUnitList,
    });
  }

  listenLocation = async () => {
    const { changeId } = this.props.location.query;
    if (changeId) {
      const res = await getHospitalDrugChange({ changeId });
      if (res) {
        this.formRef?.current?.setFieldsValue(res.data);
        this.setState({
          initValues: res.data,
        });
      }
    }
  };

  onRemarkChange = (e) => {
    this.setState({ remark: e.target.value });
  };

  fail = () => {
    Modal.confirm({
      title: '提示',
      okButtonProps: { danger: true },
      icon: <CloseCircleOutlined style={{ color: 'red' }} />,
      content: '确定不通过？如果审核不通过，该条数据将不被同步。',
      okText: '不通过',
      cancelText: '取消',
      onCancel: () => {
        history.goBack();
      },
      onOk: async () => {
        await this.onApproval(2);
      },
    });
  };

  pass = () => {
    Modal.confirm({
      title: '提示',
      icon: <CheckCircleOutlined style={{ color: 'green' }} />,
      content: '确定不通过？如果审核不通过，该条数据将不被同步。',
      okText: '通过',
      cancelText: '取消',
      onCancel: () => {
        history.goBack();
      },
      onOk: async () => {
        await this.onApproval(1);
      },
    });
  };

  // onReset = () => {
  //   this.formRef.current.resetFields();

  // };

  onApproval = async (status) => {
    const { changeId } = this.props.location.query;
    const { remark } = this.state;
    const res = await reviewHospitalDrugChange({ changeId, remark, status });
    if (res) {
      notification.success({
        description: '保存成功',
        message: '提示',
      });
      history.goBack();
    }
  };

  render() {
    const { medicineCategoryList, preparationUnitList, packUnitList, remark } = this.state;
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
            >
              <Card title="药物信息">
                <Form.Item
                  label="药品名称"
                  name="drugName"
                  rules={[
                    {
                      required: true,
                      message: '请输入药物名称',
                    },
                  ]}
                >
                  <Input placeholder="请输入药物名称" />
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
                  label="英文名"
                  name="enDrugName"
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
                  label="通用名"
                  name="commonName"
                  rules={[
                    {
                      required: true,
                      message: '请输入通用名',
                    },
                  ]}
                >
                  <Input placeholder="请输入通用名" />
                </Form.Item>
                <Form.Item
                  label="商品名称"
                  name="commodityName"
                  rules={[
                    {
                      required: true,
                      message: '请输入商品名称',
                    },
                  ]}
                >
                  <Input placeholder="请输入商品名称" />
                </Form.Item>

                <Form.Item
                  label="药物类别"
                  name="drugType"
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
                  label="进口"
                  name="isImported"
                  rules={[
                    {
                      required: true,
                      message: '请选择是否进口',
                    },
                  ]}
                >
                  <Select placeholder="请选择是否进口">
                    {booleanOptions.map((item) => (
                      <Option key={item.value} value={item.key}>
                        {item.value}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item
                  label="复方"
                  name="isCompound"
                  rules={[
                    {
                      required: true,
                      message: '请选择是否复方',
                    },
                  ]}
                >
                  <Select placeholder="请选择是否复方">
                    {booleanOptions.map((item) => (
                      <Option key={item.value} value={item.key}>
                        {item.value}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item
                  label="活性成分"
                  name="activeIngredient"
                  rules={[
                    {
                      required: true,
                      message: '请输入活性成分',
                    },
                  ]}
                >
                  <Input placeholder="请输入活性成分" />
                </Form.Item>

                <Form.Item
                  label="规格"
                  name="specs"
                  rules={[
                    {
                      required: true,
                      message: '请输入规格',
                    },
                  ]}
                >
                  <Input placeholder="请输入规格" />
                </Form.Item>

                <Form.Item
                  label="剂型"
                  name="dosageForm"
                  rules={[
                    {
                      required: true,
                      message: '请输入剂型',
                    },
                  ]}
                >
                  <Input placeholder="请输入剂型" />
                </Form.Item>

                <Form.Item
                  label="最小制剂单位"
                  name="minPreparationUnit"
                  rules={[
                    {
                      required: true,
                      message: '请输入最小制剂单位',
                    },
                  ]}
                >
                  <Select placeholder="请输入最小制剂单位">
                    {preparationUnitList.map((item) => (
                      <Option key={item} value={item}>
                        {item}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item
                  label="最小包装单位"
                  name="minPackUnit"
                  rules={[
                    {
                      required: true,
                      message: '请输入最小包装单位',
                    },
                  ]}
                >
                  <Select placeholder="请输入最小包装单位">
                    {packUnitList.map((item) => (
                      <Option key={item} value={item}>
                        {item}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item
                  label="贮存条件"
                  name="keepConditions"
                  rules={[
                    {
                      required: true,
                      message: '请输入贮存条件',
                    },
                  ]}
                >
                  <Input placeholder="请输入贮存条件" />
                </Form.Item>

                <Form.Item
                  label="性状"
                  name="shapeProperty"
                  rules={[
                    {
                      required: true,
                      message: '请输入性状',
                    },
                  ]}
                >
                  <Input placeholder="请输入性状" />
                </Form.Item>
                <Form.Item
                  label="OTC"
                  name="isOtc"
                  rules={[
                    {
                      required: true,
                      message: '请选择是否处方',
                    },
                  ]}
                >
                  <Select placeholder="请选择是否处方">
                    {booleanOptions.map((item) => (
                      <Option key={item.value} value={item.key}>
                        {item.value}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item
                  label="药理分类"
                  name="pharmacologyCategory"
                  rules={[
                    {
                      required: true,
                      message: '请输入药理分类',
                    },
                  ]}
                >
                  <Input placeholder="请输入药理分类" />
                </Form.Item>

                <Form.Item
                  label="ATC分类"
                  name="atcCategory"
                  rules={[
                    {
                      required: true,
                      message: '请输入ATC分类',
                    },
                  ]}
                >
                  <Input placeholder="请输入ATC分类" />
                </Form.Item>
              </Card>

              <Card title="商品信息">
                <Form.Item
                  label="上市许可持有人"
                  name="marketAuthHolder"
                  rules={[
                    {
                      required: true,
                      message: '请输入上市许可持有人',
                    },
                  ]}
                >
                  <Input placeholder="请输入上市许可持有人" />
                </Form.Item>

                <Form.Item
                  label="生产厂商"
                  name="manufacturer"
                  rules={[
                    {
                      required: true,
                      message: '请输入生产厂商',
                    },
                  ]}
                >
                  <Input placeholder="请输入生产厂商" />
                </Form.Item>

                <Form.Item
                  label="有效期"
                  name="validPeriod"
                  rules={[
                    {
                      required: true,
                      message: '请输入有效期',
                    },
                  ]}
                >
                  <Input placeholder="请输入有效期" />
                </Form.Item>

                <Form.Item
                  label="批准文号"
                  name="approvalNo"
                  rules={[
                    {
                      required: true,
                      message: '请输入批准文号',
                    },
                  ]}
                >
                  <Input placeholder="请输入批准文号" />
                </Form.Item>

                <Form.Item
                  label="执行标准"
                  name="executiveStandard"
                  rules={[
                    {
                      required: true,
                      message: '请输入执行标准',
                    },
                  ]}
                >
                  <Input placeholder="请输入执行标准" />
                </Form.Item>

                <Form.Item
                  label="商品条码"
                  name="commodityCode"
                  rules={[
                    {
                      required: true,
                      message: '请输入商品条码',
                    },
                  ]}
                >
                  <Input placeholder="请输入商品条码" />
                </Form.Item>

                <Form.Item
                  label="药物编码"
                  name="drugCode"
                  rules={[
                    {
                      required: true,
                      message: '请输入药物编码',
                    },
                  ]}
                >
                  <Input placeholder="请输入药物编码" />
                </Form.Item>
              </Card>
              <Card title="数据审核">
                <Form.Item label="审核意见">
                  <Input.TextArea
                    onChange={this.onRemarkChange}
                    placeholder="请输入审核意见，如不通过原因等"
                    rows={5}
                    value={remark}
                  />
                </Form.Item>
              </Card>

              <Form.Item {...tailLayout} style={{ marginTop: '30px' }}>
                <Button danger onClick={this.fail}>
                  审核不通过
                </Button>
                <Button type="primary" className={styles.resetBtn} onClick={this.pass}>
                  审核通过
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </PageContainer>
    );
  }
}
