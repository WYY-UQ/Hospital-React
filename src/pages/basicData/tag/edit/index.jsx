import { PageContainer } from '@ant-design/pro-layout';
import { Card, Form, Button, Input, Select, notification, Radio } from 'antd';

import React, { Component } from 'react';
import styles from './index.less';
import { saveTag, getTag } from '@/services/tag';
import TagsInput from './TagsInput';
import { history } from 'umi';

const { Option } = Select;

const { Group } = Radio;

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
          key: 0,
          value: '通用标签',
        },
        {
          key: 1,
          value: '物质标签',
        },
        {
          key: 2,
          value: '药物标签',
        },
        {
          key: 3,
          value: '通用名标签',
        },
        {
          key: 4,
          value: '产品标签',
        },
        {
          key: 5,
          value: '商品标签',
        },
      ],
      initValues: {},
    };
  }

  async componentDidMount() {
    this.listenLocation();
  }

  listenLocation = async () => {
    const { tagId } = this.props.location.query;
    if (tagId) {
      const res = await getTag(tagId);
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
    const res = await saveTag({ tag: { ...Object.assign(initValues, postdData) } });
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
    history.goBack()
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
                style={{ marginTop: '20px' }}
                label="标签分类"
                name="type"
                rules={[
                  {
                    required: true,
                    message: '请选择标签分类',
                  },
                ]}
              >
                <Select
                  placeholder="请选择标签分类"
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
                label="标签名称"
                name="tagName"
                rules={[
                  {
                    required: true,
                    message: '请输入标签名称',
                  },
                ]}
              >
                <Input placeholder="请输入标签名称" />
              </Form.Item>

              <Form.Item
                label="省份自定义"
                name="allowProvinceCustom"
                rules={[
                  {
                    required: true,
                    message: '是否省份自定义',
                  },
                ]}
              >
                <Group>
                  <Radio value={true}>允许</Radio>
                  <Radio value={false}>不允许 </Radio>
                </Group>
              </Form.Item>

              <Form.Item
                label="医院自定义"
                name="allowHospitalCustom"
                rules={[
                  {
                    required: true,
                    message: '是否医院自定义',
                  },
                ]}
              >
                <Group>
                  <Radio value={true}>允许</Radio>
                  <Radio value={false}>不允许 </Radio>
                </Group>
              </Form.Item>

              <Form.Item
                label="标签值"
                name="tagValues"
                rules={[
                  {
                    required: true,
                    message: '请输入标签值',
                  },
                ]}
              >
                <TagsInput></TagsInput>
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
