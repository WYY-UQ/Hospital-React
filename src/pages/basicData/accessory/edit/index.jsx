import { PageContainer } from '@ant-design/pro-layout';
import { Card, Form, Button, Input, Select, notification } from 'antd';

import React, { Component } from 'react';
import styles from './index.less';
import { saveAccessory, getAccessory } from '@/services/accessory';
import { history } from 'umi';
import { queryObjects } from '@/services/common';

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

export default class TagEdit extends Component {
  constructor(props) {
    super(props);
    this.formRef = React.createRef();
    this.state = {
      typeList: [
        {
          key: 1,
          value: '物质',
        },
        {
          key: 2,
          value: '药物',
        },
        {
          key: 0,
          value: '其他',
        },
      ],
      substanceList: [],
      drugList: [],
      formData: {
        name: null,
        type: null,
        typeId: null,
      },
    };
  }

  async componentDidMount() {
    let { substanceList, drugList } = this.state;
    substanceList = (await queryObjects({ type: 1 }))?.data ?? [];
    drugList = (await queryObjects({ type: 2 }))?.data ?? [];
    this.setState({
      substanceList,
      drugList,
    });
    this.listenLocation();
  }

  listenLocation = async () => {
    const { accessoryId } = this.props.location.query;
    if (accessoryId) {
      const res = await getAccessory(accessoryId);
      if (res) {
        this.setState({
          formData: res.data,
        });
      }
    }
  };

  onSubmit = async () => {
    const { formData } = this.state;
    const res = await saveAccessory({ accessory: formData });
    if (res) {
      notification.success({
        description: '保存成功',
        message: '提示',
      });
      this.onReset();
    }
  };

  onReset = () => {
    this.setState({
      formData: {
        name: null,
        type: null,
        typeId: null,
      },
    });
    history.goBack();
  };

  onNameChange = (e) => {
    const { formData } = this.state;
    formData.name = e.target.value;
    this.setState({
      formData,
    });
  };

  onTypeChange = (type) => {
    const { formData } = this.state;
    formData.type = type;
    this.setState({
      formData,
    });
  };

  onTypeIdChange = (typeId) => {
    const { formData } = this.state;
    formData.typeId = typeId;
    this.setState({
      formData,
    });
  };

  render() {
    const { formData, typeList, substanceList, drugList } = this.state;
    return (
      <PageContainer title={false}>
        <div className={styles.scanEditContainer}>
          <Form ref={this.formRef} {...layout} name="basic">
            <Card title="基础信息">
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ width: '80px', textAlign: 'right', marginRight: '10px' }}>
                  辅料名称：
                </div>
                <Input
                  onChange={this.onNameChange}
                  style={{ width: '450px' }}
                  placeholder="请输入辅料名称"
                  value={formData.name}
                ></Input>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
                <div style={{ width: '80px', textAlign: 'right', marginRight: '10px' }}>
                  选择关联：
                </div>
                <Select
                  style={{ width: '450px' }}
                  placeholder="请选择关联"
                  onChange={this.onTypeChange}
                  value={formData.type}
                >
                  {typeList.map((item) => (
                    <Option key={item.key} value={item.key}>
                      {item.value}
                    </Option>
                  ))}
                </Select>
              </div>

              {formData.type !== 0 && (
                <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
                  <div style={{ width: '80px', textAlign: 'right', marginRight: '10px' }}></div>
                  <Select
                    style={{ width: '450px' }}
                    placeholder={`请选择`}
                    onChange={this.onTypeIdChange}
                    value={formData.typeId}
                  >
                    {formData.type === 1 &&
                      substanceList.map((item) => (
                        <Option key={item.key} value={item.key}>
                          {item.value}
                        </Option>
                      ))}
                    {formData.type === 2 &&
                      drugList.map((item) => (
                        <Option key={item.key} value={item.key}>
                          {item.value}
                        </Option>
                      ))}
                  </Select>
                </div>
              )}

              <Form.Item {...tailLayout} style={{ marginTop: '30px' }}>
                <Button type="primary" onClick={this.onSubmit}>
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
