import AdverseReaction from '@/components/AdverseReaction';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Form, Button, notification, Select } from 'antd';
import React, { Component } from 'react';
import {
  queryAdverseReactions,
  queryCommonDicts,
  queryAdverseReactionTplSections,
} from '@/services/common';
import { v4 as uuidv4 } from 'uuid';
import { saveDirectionAdverseReaction, getDirectionAdverseReaction } from '@/services/direction';
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

export default class AdverseReactionEdit extends Component {
  constructor(props) {
    super(props);
    this.formRef = React.createRef();
    this.state = {
      reactionList: [],
      levelList: [],
      probabilityList: [],
      tplList: [],
      tplId: null,
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
    let tplList = [];

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

    const tplRes = await queryAdverseReactionTplSections();
    if (tplRes) {
      tplList = tplRes.data ?? [];
    }

    this.getData();

    this.setState({
      reactionList,
      levelList,
      probabilityList,
      tplList,
    });
  }

  getData = async () => {
    const { directionId } = this.props.location.query;
    const res = await getDirectionAdverseReaction(directionId);
    const { form } = this.state;
    if (res) {
      form.reactions = res.data ?? [];
    }
    this.setState({
      form,
    });
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

  submit = async () => {
    const { form } = this.state;
    const { directionId } = this.props.location.query;
    const postdData = {
      directionId,
      ...form,
    };

    const res = await saveDirectionAdverseReaction(postdData);
    if (res) {
      notification.success({
        description: '保存成功',
        message: '提示',
      });
      this.onReset();
    }
  };

  onReset = () => {
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

  onTplChange = async (tplId) => {
    await this.getTPL(tplId);
  };

  getTPL = (tplId) => {
    const { form, tplList } = this.state;

    const res = tplList.find((item) => item.id === tplId);

    if (res) {
      if (form.reactions[0]?.reactionId == null) {
        form.reactions = res?.reactions;
      } else {
        form.reactions = form.reactions.concat(res?.reactions);
      }
      this.setState({
        form,
      });
    }
  };

  render() {
    const { reactionList, levelList, probabilityList, form, tplList, tplId } = this.state;
    return (
      <PageContainer title={false}>
        <Card title="基础信息">
          <Form ref={this.formRef} {...layout}>
            <Form.Item label="选择模板">
              <Select
                placeholder="请选择模板"
                showSearch
                value={tplId}
                onChange={this.onTplChange}
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                {tplList.map((item) => (
                  <Option key={item.id} value={item.id}>
                    {item.name}
                  </Option>
                ))}
              </Select>
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
              <Button type="primary" onClick={this.submit}>
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
