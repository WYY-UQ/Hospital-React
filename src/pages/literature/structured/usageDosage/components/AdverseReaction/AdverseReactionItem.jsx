import { getAdverseReactionTree as getAdverseReactionTreeApi } from '@/services/common';
import { Button, Card, Select, Tag, notification } from 'antd';
import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';

const { Option } = Select;

export default class AdverseReactionItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      levelList: [
        {
          key: 1,
          value: 1,
        },
        {
          key: 2,
          value: 2,
        },
        {
          key: 3,
          value: 3,
        },
        {
          key: 4,
          value: 4,
        },
        {
          key: 5,
          value: 5,
        },
      ],
      level: null,
      getAdverseReactionTree: [],
      idc: null,
      adr: null,
      adrList: [],
      adverseReactions: props.value?.adverseReactions?.length ? props.value?.adverseReactions : [],
      id: props.value?.id || uuidv4(),
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (
      props.value?.id !== state.id ||
      props.value?.level !== state.level ||
      JSON.stringify(props.value?.adverseReactions) !== JSON.stringify(state.adverseReactions) ||
      JSON.stringify(props.value?.getAdverseReactionTree) !==
        JSON.stringify(state.getAdverseReactionTree)
    ) {
      return {
        id: props.value?.id || uuidv4(),
        level: props.value?.level || null,
        adverseReactions: props.value?.adverseReactions?.length
          ? props.value?.adverseReactions
          : [],
        getAdverseReactionTree: props.value?.getAdverseReactionTree?.length
          ? props.value?.getAdverseReactionTree
          : [],
      };
    }
    return {};
  }

  onLevelChange = async (level) => {
    const { id } = this.state;
    let { getAdverseReactionTree, idc, adrList, adverseReactions } = this.state;
    const res = await getAdverseReactionTreeApi({ level });
    const { onChange } = this.props;
    getAdverseReactionTree = res?.data ?? [];
    idc = getAdverseReactionTree[0]?.key ?? null;
    adrList = getAdverseReactionTree[0]?.value ?? [];
    adverseReactions = [];
    this.setState({
      level,
      idc,
      getAdverseReactionTree,
      adrList,
      adverseReactions,
    });
    onChange?.({
      id,
      level,
      adverseReactions,
      getAdverseReactionTree,
    });
  };

  onIDCChange = (idc) => {
    const { getAdverseReactionTree } = this.state;
    const tmp = getAdverseReactionTree?.find((item) => item.key === idc);
    const adrList = tmp?.value ?? [];
    this.setState({
      idc,
      adrList,
    });
  };

  onADRChange = (adrId) => {
    const { adrList, adverseReactions, id, level, getAdverseReactionTree } = this.state;
    const exit = adverseReactions.find((item) => item.id === adrId);
    const { onChange } = this.props;
    if (exit) {
      notification.warn({
        message: '提示',
        description: '已存在不良反应',
      });
      return;
    }
    const adr = adrList.find((item) => item.id === adrId);
    adverseReactions.push({
      id: adrId,
      name: adr.name,
    });
    this.setState({
      adverseReactions,
    });
    onChange?.({
      id,
      level,
      adverseReactions,
      getAdverseReactionTree,
    });
  };

  delAdverseReaction = (adrId) => {
    const { id, level, getAdverseReactionTree } = this.state;
    let { adverseReactions } = this.state;
    const { onChange } = this.props;
    adverseReactions = adverseReactions.filter((item) => item.id !== adrId);
    this.setState({
      adverseReactions,
    });
    onChange?.({
      id,
      level,
      adverseReactions,
      getAdverseReactionTree,
    });
  };

  render() {
    const {
      levelList,
      level,
      idc,
      getAdverseReactionTree,
      adr,
      adrList,
      adverseReactions,
    } = this.state;
    const { onDel } = this.props;
    return (
      <Card style={{ marginBottom: '30px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            反应级别：
            <Select
              style={{ width: '300px' }}
              placeholder="请选择反应级别"
              value={level}
              onChange={this.onLevelChange}
            >
              {levelList.map((item) => (
                <Option key={item.key} value={item.key}>
                  {item.value}
                </Option>
              ))}
            </Select>
          </div>
          <Button danger size="small" onClick={onDel}>
            删除
          </Button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
          疾病分类：
          <Select
            style={{ width: '300px' }}
            placeholder="请选择疾病分类"
            value={idc}
            onChange={this.onIDCChange}
          >
            {getAdverseReactionTree.map((item) => (
              <Option key={item.key} value={item.key}>
                {item.key}
              </Option>
            ))}
          </Select>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
          不良反应：
          <Select
            style={{ width: '300px' }}
            placeholder="请选择不良反应"
            value={adr}
            onChange={this.onADRChange}
          >
            {adrList.map((item) => (
              <Option key={item.id} value={item.id}>
                {item.name}
              </Option>
            ))}
          </Select>
        </div>

        <div style={{ display: 'flex', marginTop: '10px' }}>
          {adverseReactions.map((item) => (
            <Tag
              key={item.id}
              closable
              onClose={() => {
                this.delAdverseReaction(item.id);
              }}
              style={{
                marginTop: '10px',
                marginRight: '10px',
                background: '#F5F5F5',
                padding: '5px',
                border: '1px solid #D9D9D9',
                borderRadius: '3px',
              }}
            >
              {item.name}
            </Tag>
          ))}
        </div>
      </Card>
    );
  }
}
