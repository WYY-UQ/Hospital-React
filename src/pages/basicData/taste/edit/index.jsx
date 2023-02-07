import { PageContainer } from '@ant-design/pro-layout';
import { Card, Form, Button, Input, notification } from 'antd';

import React, { Component } from 'react';
import styles from './index.less';
import { saveDict, getDict } from '@/services/dict';
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

export default class TasteEdit extends Component {
  constructor(props) {
    super(props);
    this.formRef = React.createRef();
    this.state = {
      initValues: {
        dictType:11
      },
    };
  }

  async componentDidMount() {
    this.listenLocation();
  }

  listenLocation = async () => {
    const { dictId } = this.props.location.query;
    if (dictId) {
      const res = await getDict(dictId);
      if (res) {
        this.formRef?.current?.setFieldsValue(res.data);
        this.setState({
          initValues: res.data,
        });
      }
    }
  };

  onFinish = async (values) => {
    const { initValues } = this.state;
    const postdData = {
      ...values,
    };
    const res = await saveDict({ dict: { ...Object.assign(initValues, postdData) } });
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
            <Card title="基础信息">
              <Form.Item label="味道代码" name="code">
                <Input placeholder="请输入味道代码" />
              </Form.Item>

              <Form.Item
                label="味道名称"
                name="name"
                rules={[
                  {
                    required: true,
                    message: '请输入味道名称',
                  },
                ]}
              >
                <Input placeholder="请输入味道名称" />
              </Form.Item>

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
