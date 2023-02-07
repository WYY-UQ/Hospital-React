import { PageContainer } from '@ant-design/pro-layout';
import { Card, Form, Button, Select, notification } from 'antd';

import React, { Component } from 'react';
import styles from './index.less';
import { queryCommonDicts } from '@/services/common';

import Dragger from './Dragger';
import { saveTask } from '@/services/import-task';

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

export default class ImportEdit extends Component {
  constructor(props) {
    super(props);
    this.formRef = React.createRef();
    this.state = {
      typeList: [],
    };
  }

  async componentDidMount() {
    let { typeList } = this.state;
    typeList = (await queryCommonDicts(31))?.data[0]?.dicts ?? [];
    this.setState({
      typeList,
    });
  }

  onFinish = async (values) => {
    const postdData = {
      type: values?.type,
      fileUrl: values?.files[0]?.fileUrl,
      fileName: values?.files[1]?.fileName,
    };
    const res = await saveTask({ task: postdData });
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
  };

  render() {
    const { typeList } = this.state;
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
                label="导入类型"
                style={{ marginTop: '20px' }}
                name="type"
                rules={[
                  {
                    required: true,
                    message: '请选择导入类型',
                  },
                ]}
              >
                <Select
                  placeholder="请选择导入类型"
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
                label="上传文件"
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
