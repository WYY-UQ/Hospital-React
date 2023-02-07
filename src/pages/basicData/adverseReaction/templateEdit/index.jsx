import AdverseReaction from '@/components/AdverseReaction';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Form, Input, Button, notification } from 'antd';
import React, { Component } from 'react';
import { queryAdverseReactions, queryCommonDicts } from '@/services/common';
import { v4 as uuidv4 } from 'uuid';
import { saveAdverseReaction, getAdverseReactionTpl } from '@/services/adverse-reaction';
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

export default class TemplateEdit extends Component {
  constructor(props) {
    super(props);
    this.formRef = React.createRef();
    this.state = {
      reactionList: [],
      levelList: [],
      probabilityList: [],
      initValues: {},
      form: {
        reactions: [
          {
            id: uuidv4(),
            afterOperation: null,
            cnRreactionLevel: null,
            cnRreactionProbability: null,
            reactionId: null,
            reactionLevel: null,
            reactionName: null,
            reactionProbability: null,
            remark: null,
          },
        ],
      },
    };
  }

  async componentDidMount() {
    let reactionList = [];
    let levelList = [];
    let probabilityList = [];

    const reactRes = await queryAdverseReactions();

    if (reactRes) {
      reactionList = reactRes.data;
    }

    const dictRes = await queryCommonDicts(0);
    if (dictRes) {
      const tempLevelDict = dictRes.data.find((item) => item.dictType === 13);
      if (tempLevelDict?.dicts) {
        levelList = tempLevelDict?.dicts ?? [];
      }
      const tempProbabilityDict = dictRes.data.find((item) => item.dictType === 14);
      if (tempProbabilityDict?.dicts) {
        probabilityList = tempProbabilityDict?.dicts;
      }
    }
    this.listenLocation();

    this.setState({
      reactionList,
      levelList,
      probabilityList,
    });
  }

  listenLocation = async () => {
    const { tplId } = this.props.location.query;
    if (tplId) {
      const res = await getAdverseReactionTpl(tplId);
      if (res) {
        const { reactions } = res.data;
        const form = {
          reactions,
        };
        this.formRef?.current?.setFieldsValue(res.data);
        this.setState({
          initValues: res.data,
          form,
        });
      }
    }
  };

  onAddReaction = () => {
    const { form } = this.state;
    form.reactions.push({
      id: uuidv4(),
      afterOperation: null,
      cnRreactionLevel: null,
      cnRreactionProbability: null,
      reactionId: null,
      reactionLevel: null,
      reactionName: null,
      reactionProbability: null,
      remark: null,
    });
    this.setState({
      form,
    });
  };

  onDelReaction = (index) => {
    const { form } = this.state;
    form.reactions.splice(index, 1);
    this.setState({
      form,
    });
  };

  onChange = (value, index) => {
    const { form } = this.state;
    form.reactions.splice(index, 1, value);
    this.setState({
      form,
    });
  };

  onFinish = async (values) => {
    const { initValues, form } = this.state;
    const postdData = {
      ...values,
      ...form,
    };

    const res = await saveAdverseReaction({
      reactionTpl: { ...Object.assign(initValues, postdData) },
    });
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
      reactions: [
        {
          id: uuidv4(),
          afterOperation: null,
          cnRreactionLevel: null,
          cnRreactionProbability: null,
          reactionId: null,
          reactionLevel: null,
          reactionName: null,
          reactionProbability: null,
          remark: null,
        },
      ],
    };
    this.setState({ form });
    history.goBack();
  };

  render() {
    const { reactionList, levelList, probabilityList, form } = this.state;
    return (
      <PageContainer title={false}>
        <Card title="基础信息">
          <Form ref={this.formRef} onFinish={this.onFinish} {...layout}>
            <Form.Item
              label="模板名称"
              name="name"
              rules={[
                {
                  required: true,
                  message: '请输入模板名称',
                },
              ]}
            >
              <Input placeholder="请输入模板名称"></Input>
            </Form.Item>

            <Card
              title="不良反应"
              style={{ marginTop: '20px' }}
              extra={
                <Button type="primary" onClick={this.onAddReaction}>
                  新增不良反应
                </Button>
              }
            >
              {form.reactions.map((item, index) => (
                <AdverseReaction
                  key={item.id}
                  index={index}
                  item={item}
                  onChange={this.onChange}
                  onDel={this.onDelReaction}
                  reactionList={reactionList}
                  levelList={levelList}
                  probabilityList={probabilityList}
                ></AdverseReaction>
              ))}
            </Card>

            <Form.Item {...tailLayout} style={{ marginTop: '30px' }}>
              <Button type="primary" htmlType="submit">
                提交
              </Button>
              <Button htmlType="button" style={{ marginLeft: '8px' }} onClick={this.onReset}>
                取消
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </PageContainer>
    );
  }
}
