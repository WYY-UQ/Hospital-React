import { PageContainer } from '@ant-design/pro-layout';
import { Tabs, Form, Card, Select, notification, Button } from 'antd';

import React, { Component } from 'react';
import styles from './index.less';

import Dragger from './Dragger';
import { v4 as uuidv4 } from 'uuid';
import { queryScansToBind, saveLiteratureScan, getLiteratureScan } from '@/services/literature';
import { PaperClipOutlined } from '@ant-design/icons';
import { history } from 'umi';

const { TabPane } = Tabs;

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
      bindList: [],
      bindFileList: [],
      initValues: {},
    };
  }

  async componentDidMount() {
    const { literatureId } = this.props.location.query;
    let { bindList } = this.state;
    const bindRes = await queryScansToBind(literatureId);
    bindList = bindRes?.data ?? [];

    this.listenLocation();
    this.setState({
      bindList,
    });
  }

  listenLocation = async () => {
    const { literatureId } = this.props.location.query;
    const res = await getLiteratureScan(literatureId);
    if (res) {
      this.formRef?.current?.setFieldsValue(res.data);
      this.setState({
        initValues: res.data,
      });
    }
  };

  onFinish = async (values) => {
    const { initValues } = this.state;
    const { literatureId } = this.props.location.query;
    const postdData = {
      ...values,
      literatureId,
    };
    const res = await saveLiteratureScan({ model: { ...Object.assign(initValues, postdData) } });
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

  onValuesChange = (changedValues) => {
    if (changedValues.bindId) {
      const { bindList } = this.state;
      const bindFileList = bindList.find((item) => item.id === changedValues.bindId)?.files ?? [];
      this.setState({
        bindFileList,
      });
    }
  };

  render() {
    const { bindList, bindFileList } = this.state;
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
              <Tabs type="card">
                <TabPane tab="上传" key="upload">
                  <Form.Item label="扫描件" name="files">
                    <Dragger></Dragger>
                  </Form.Item>
                </TabPane>
                <TabPane tab="绑定现有扫描件" key="bind">
                  <Form.Item label="说明书" name="bindId">
                    <Select
                      showSearch
                      placeholder="请选择"
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      {bindList.map((item) => (
                        <Option key={item.id} value={item.id}>
                          {item.title}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                  {bindFileList.map((item) => (
                    <div key={item.id} style={{ marginLeft: '140px', marginBottom: '10px' }}>
                      <PaperClipOutlined />
                      <Button type="link" href={item.fileUrl} target="_blank">
                        {item.fileName}
                      </Button>
                    </div>
                  ))}
                </TabPane>
              </Tabs>

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
