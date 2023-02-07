import { Button, Card } from 'antd';
import React, { Component } from 'react';
import AdverseReactionItem from './AdverseReactionItem';
import { PlusOutlined } from '@ant-design/icons';
import { v4 as uuidv4 } from 'uuid';

export default class AdverseReaction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      adverseReactions: props.adverseReactions?.length ? props.adverseReactions : [],
    };
  }

  onAddGroup = () => {
    const { adverseReactions } = this.state;
    const { onChange } = this.props;
    adverseReactions.push({
      adverseReactions: [],
      level: null,
      id: uuidv4(),
    });
    this.setState({
      adverseReactions,
    });
    onChange?.(adverseReactions);
  };

  onGroupChange = (index, value) => {
    const { adverseReactions } = this.state;
    const { onChange } = this.props;
    adverseReactions.splice(index, 1, value);
    this.setState({
      adverseReactions,
    });
    onChange?.(adverseReactions);
  };

  onGroupDel = (id) => {
    let { adverseReactions } = this.state;
    const { onChange } = this.props;
    adverseReactions = adverseReactions.filter((item) => item.id !== id);
    this.setState({
      adverseReactions,
    });
    onChange?.(adverseReactions);
  };

  static getDerivedStateFromProps(props, state) {
    if (JSON.stringify(props.adverseReactions) !== JSON.stringify(state.adverseReactions)) {
      return {
        crowdGroups: props.adverseReactions?.length ? props.adverseReactions : [],
      };
    }
    return {};
  }

  render() {
    const { adverseReactions } = this.state;
    const { onDel } = this.props;
    return (
      <Card
        title="不良反应"
        style={{ marginBottom: '30px' }}
        extra={
          <Button danger onClick={onDel}>
            删除
          </Button>
        }
      >
        {adverseReactions.map((item, index) => (
          <AdverseReactionItem
            onDel={() => this.onGroupDel(item.id)}
            value={item}
            onChange={(value) => this.onGroupChange(index, value)}
            key={item.id}
          />
        ))}

        <div
          onClick={this.onAddGroup}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              background: '#FFF',
              cursor: 'pointer',
              border: '1px  gray dashed',
              width: '200px',
              height: '30px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <PlusOutlined /> 添加不良反应级别
          </div>
        </div>
      </Card>
    );
  }
}
