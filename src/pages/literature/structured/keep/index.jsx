import { Card, Form, Button, notification } from 'antd';
import React, { Component } from 'react';
import styles from './index.less';
import { PageContainer } from '@ant-design/pro-layout';
import { queryCommonDicts } from '@/services/common';
import KeepItem from './components/KeepItem';
import { saveDirectionKeep, getDirectionKeep } from '@/services/direction';
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

export default class Keep extends Component {
  constructor(props) {
    super(props);

    this.formRef = React.createRef();
    this.state = {
      keepOptionList: [],
    };
  }

  async componentDidMount() {
    const { directionId } = this.props.location.query;
    const res = await getDirectionKeep(directionId);
    if (res) {
      this.formRef?.current?.setFieldsValue({ keeps: res.data });
    }
    let keepOptionList = [];
    const dicRes = await queryCommonDicts(12);
    if (dicRes) {
      keepOptionList = dicRes.data[0]?.dicts;
    }

    this.setState({
      keepOptionList,
    });
  }

  onFinish = async (values) => {
    const { directionId } = this.props.location.query;
    const postdData = {
      directionId,
      ...values,
    };
    const res = await saveDirectionKeep(postdData);
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
    const { keepOptionList } = this.state;
    return (
      <PageContainer title={false}>
        <div className={styles.medicineEditContainer}>
          <div>
            <Form ref={this.formRef} onFinish={this.onFinish} {...layout} name="basic">
              <Card title="贮存">
                <Form.Item
                  label="贮存条件"
                  name="keeps"
                  rules={[
                    {
                      required: true,
                      message: '请选择贮存条件',
                    },
                  ]}
                >
                  <KeepItem keepOptionList={keepOptionList} />
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
