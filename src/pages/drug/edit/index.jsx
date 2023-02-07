import { Card, Form, Input, Button, Select, notification } from 'antd';
import React, { Component } from 'react';
import styles from './index.less';
import { PageContainer } from '@ant-design/pro-layout';
import { queryCommonDicts, queryUnits, queryIndicationChildren } from '@/services/common';
import { getHospitalDrug, saveHospitalDrug } from '@/services/hospital-side';
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

export default class DrugEdit extends Component {
  constructor(props) {
    super(props);

    this.formRef = React.createRef();
    this.state = {
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
    const { drugId } = this.props.location.query;
    if (drugId) {
      const res = await getHospitalDrug({ drugId });
      if (res) {
        this.formRef?.current?.setFieldsValue(res.data);
        // this.setState({
        //   initValues: res.data,
        // });
      }
    }
  };

  onReset = () => {
    this.formRef.current.resetFields();
    history.goBack();
  };

  onFinish = async (values) => {
    const res = await saveHospitalDrug({ model: { ...values } });
    if (res) {
      notification.success({
        description: '保存成功',
        message: '提示',
      });
      this.onReset();
    }
  };

  render() {
    const { medicineCategoryList, preparationUnitList, packUnitList } = this.state;
    return (
      <PageContainer title={false}>
        <div className={styles.medicineEditContainer}>
          <div>
            <Form ref={this.formRef} onFinish={this.onFinish} {...layout} name="basic">
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

              <Form.Item {...tailLayout} style={{ marginTop: '30px' }}>
                <Button type="primary" htmlType="submit">
                  确认修改
                </Button>
                <Button htmlType="button" className={styles.resetBtn} onClick={this.onReset}>
                  返回
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </PageContainer>
    );
  }
}
