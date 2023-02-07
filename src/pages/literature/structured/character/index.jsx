import { Card, Form, Button, notification, Select } from 'antd';
import React, { Component } from 'react';
import styles from './index.less';
import { PageContainer } from '@ant-design/pro-layout';
import { queryCommonDicts } from '@/services/common';
import Taste from './components/Taste';
import { saveDirectionShapeProperty, getDirectionShapeProperty } from '@/services/direction';
import { history } from 'umi';

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

const { Option } = Select;

export default class Character extends Component {
  constructor(props) {
    super(props);

    this.formRef = React.createRef();
    this.state = {
      colorList: [],
      tasteList: [],
    };
  }

  async componentDidMount() {
    const { directionId } = this.props.location.query;
    const res = await getDirectionShapeProperty(directionId);
    if (res) {
      this.formRef?.current?.setFieldsValue(res.data);
    }

    const dicRes = await queryCommonDicts(0);
    let colorList = [];
    let tasteList = [];
    if (dicRes) {
      const tempColorDict = dicRes.data.find((item) => item.dictType === 10);
      if (tempColorDict?.dicts) {
        colorList = tempColorDict?.dicts;
      }
      const tempTasteDict = dicRes.data.find((item) => item.dictType === 11);
      if (tempTasteDict?.dicts) {
        tasteList = tempTasteDict?.dicts;
      }
    }

    this.setState({
      colorList,
      tasteList,
    });
  }

  onFinish = async (values) => {
    const { directionId } = this.props.location.query;
    const postdData = {
      directionId,
      shapeProperty: {
        ...values,
      },
    };
    const res = await saveDirectionShapeProperty(postdData);
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
    history.goBack();
  };

  render() {
    const { colorList, tasteList } = this.state;
    return (
      <PageContainer title={false}>
        <div className={styles.medicineEditContainer}>
          <div>
            <Form ref={this.formRef} onFinish={this.onFinish} {...layout} name="basic">
              <Card title="性状">
                <Form.Item
                  label="表皮颜色"
                  name="epidermisColor"
                  rules={[
                    {
                      required: true,
                      message: '请选择表皮颜色',
                    },
                  ]}
                >
                  <Select placeholder="请选择表皮颜色">
                    {colorList.map((item) => (
                      <Option key={item.key} value={item.key}>
                        {item.value}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item
                  label="内容颜色"
                  name="innerColor"
                  rules={[
                    {
                      required: true,
                      message: '请选择内容颜色',
                    },
                  ]}
                >
                  <Select placeholder="请选择内容颜色">
                    {colorList.map((item) => (
                      <Option key={item.key} value={item.key}>
                        {item.value}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item
                  label="味道"
                  name="tastes"
                  rules={[
                    {
                      required: true,
                      message: '请选择味道',
                    },
                  ]}
                >
                  <Taste tasteList={tasteList} />
                </Form.Item>
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
