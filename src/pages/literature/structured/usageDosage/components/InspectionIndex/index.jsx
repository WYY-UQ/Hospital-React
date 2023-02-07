import { Button, Card } from 'antd';
import React, { Component } from 'react';
import InspectionIndexItem from './InspectionIndexItem';
import { PlusOutlined } from '@ant-design/icons';
import { v4 as uuidv4 } from 'uuid';

export default class InspectionIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inspectionIndexes: props.inspectionIndexes?.length ? props.inspectionIndexes : [],
    };
  }

  onAddGroup = () => {
    const { inspectionIndexes } = this.state;
    const { onChange } = this.props;
    inspectionIndexes.push({
      type: null,
      inspectionValue: null,
      inspectionUnit: null,
      incrementType: null,
      incrementValue: null,
      incrementUnit: null,
      multiple: null,
      trendType: null,
      trendTimeValue: null,
      trendTimeUnit: null,
      id: uuidv4(),
    });
    this.setState({
      inspectionIndexes,
    });
    onChange?.(inspectionIndexes);
  };

  onGroupChange = (index, value) => {
    const { inspectionIndexes } = this.state;
    const { onChange } = this.props;
    inspectionIndexes.splice(index, 1, value);
    this.setState({
      inspectionIndexes,
    });
    onChange?.(inspectionIndexes);
  };

  onGroupDel = (id) => {
    let { inspectionIndexes } = this.state;
    const { onChange } = this.props;
    inspectionIndexes = inspectionIndexes.filter((item) => item.id !== id);
    this.setState({
      inspectionIndexes,
    });
    onChange?.(inspectionIndexes);
  };

  static getDerivedStateFromProps(props, state) {
    if (JSON.stringify(props.inspectionIndexes) !== JSON.stringify(state.inspectionIndexes)) {
      return {
        crowdGroups: props.inspectionIndexes?.length ? props.inspectionIndexes : [],
      };
    }
    return {};
  }

  render() {
    const { inspectionIndexes } = this.state;
    const { onDel, unitList = [], timeUnitList = [] } = this.props;
    return (
      <Card
        title="检验指标"
        style={{ marginBottom: '30px' }}
        extra={
          <Button danger onClick={onDel}>
            删除
          </Button>
        }
      >
        {inspectionIndexes.map((item, index) => (
          <InspectionIndexItem
            onDel={() => this.onGroupDel(item.id)}
            value={item}
            onChange={(value) => this.onGroupChange(index, value)}
            key={item.id}
            unitList={unitList}
            timeUnitList={timeUnitList}
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
            <PlusOutlined /> 添加指标
          </div>
        </div>
      </Card>
    );
  }
}
