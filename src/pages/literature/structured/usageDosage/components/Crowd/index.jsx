import { Button, Card } from 'antd';
import React, { Component } from 'react';
import CrowdGroup from './CrowdGroup';
import { PlusOutlined } from '@ant-design/icons';
import { v4 as uuidv4 } from 'uuid';

export default class Crowd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      crowdGroups: props.crowdGroups?.length ? props.crowdGroups : [],
    };
  }

  onAddGroup = () => {
    const { crowdGroups } = this.state;
    const { onChange } = this.props;
    crowdGroups.push({
      crowds: [
        {
          useDefaultValue: true,
          maxValue: null,
          paraName: null,
          paraUnit: null,
          minValue: null,
          crowdId: null,
          id: uuidv4(),
          typeCode: null,
        },
      ],
      id: uuidv4(),
    });
    this.setState({
      crowdGroups,
    });
    onChange?.(crowdGroups);
  };

  onGroupChange = (index, value) => {
    const { crowdGroups } = this.state;
    const { onChange } = this.props;
    crowdGroups.splice(index, 1, value);
    this.setState({
      crowdGroups,
    });
    onChange?.(crowdGroups);
  };

  onGroupDel = (id) => {
    let { crowdGroups } = this.state;
    const { onChange } = this.props;
    crowdGroups = crowdGroups.filter((item) => item.id !== id);
    this.setState({
      crowdGroups,
    });
    onChange?.(crowdGroups);
  };

  static getDerivedStateFromProps(props, state) {
    if (JSON.stringify(props.crowdGroups) !== JSON.stringify(state.crowdGroups)) {
      return {
        crowdGroups: props.crowdGroups?.length ? props.crowdGroups : [],
      };
    }
    return {};
  }

  render() {
    const { crowdGroups } = this.state;
    const { onDel, crowdTypeList = [] } = this.props;
    return (
      <Card
        title="人群"
        style={{ marginBottom: '30px' }}
        extra={
          <Button danger onClick={onDel}>
            删除
          </Button>
        }
      >
        {crowdGroups.map((item, index) => (
          <CrowdGroup
            onDel={() => this.onGroupDel(item.id)}
            value={item}
            onChange={(value) => this.onGroupChange(index, value)}
            key={item.id}
            crowdTypeList={crowdTypeList}
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
            <PlusOutlined /> 添加人群组
          </div>
        </div>
      </Card>
    );
  }
}
