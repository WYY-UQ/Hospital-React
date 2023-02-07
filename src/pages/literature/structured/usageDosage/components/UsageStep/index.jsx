import { Card, Select } from 'antd';
import React, { Component } from 'react';
import StepItem from './StepItem';
import { PlusOutlined } from '@ant-design/icons';
import { v4 as uuidv4 } from 'uuid';

const { Option } = Select;

const stepList = [
  {
    key: 1,
    value: '次阶梯',
  },
  {
    key: 2,
    value: '日阶梯',
  },
];

export default class UsageStep extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stepType: props.usageStep?.stepType || null,
      items: props.usageStep?.items?.length ? props.usageStep?.items : [],
    };
  }

  onStepTypeChange = (stepType) => {
    const { items } = this.state;
    const { onChange } = this.props;
    this.setState({
      stepType,
    });
    onChange?.({
      stepType,
      items,
    });
  };

  onAddGroup = () => {
    const { stepType, items } = this.state;
    const { onChange } = this.props;
    items.push({
      stepNo: null,
      startQuantity: null,
      startUnit: null,
      increaseMinQuantity: null,
      increaseMinUnit: null,
      increaseMaxQuantity: null,
      increaseMaxUnit: null,
      increaseNormalQuantity: null,
      increaseNormalUnit: null,
      stopMinQuantity: null,
      stopMinUnit: null,
      stopMaxQuantity: null,
      stopMaxUnit: null,
      lastMinTime: null,
      lastMinTimeUnit: null,
      lastMaxTime: null,
      lastMaxTimeUnit: null,
      id: uuidv4(),
    });
    this.setState({ items });
    onChange?.({
      stepType,
      items,
    });
  };

  onGroupDel = (index) => {
    const { stepType, items } = this.state;
    const { onChange } = this.props;
    items.splice(index, 1);
    this.setState({ items });
    onChange?.({
      stepType,
      items,
    });
  };

  onItemsChange = (index, value) => {
    const { stepType, items } = this.state;
    const { onChange } = this.props;
    items.splice(index, 1, value);
    this.setState({ items });
    onChange?.({
      stepType,
      items,
    });
  };

  static getDerivedStateFromProps(props, state) {
    if (
      props.usageStep?.stepType !== state.stepType ||
      JSON.stringify(props.usageStep?.items) !== JSON.stringify(state.items)
    ) {
      return {
        stepType: props.usageStep?.stepType || null,
        items: props.usageStep?.items?.length ? props.usageStep?.items : [],
      };
    }
    return {};
  }

  render() {
    const { stepType, items } = this.state;
    const { timeUnitList = [], unitList = [] } = this.props;
    return (
      <Card title="阶梯用药" style={{ marginBottom: '30px' }}>
        <Card bordered={false}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ width: '70px', textAlign: 'right' }}>用药阶梯：</div>
            <Select
              style={{ width: '200px' }}
              value={stepType}
              placeholder="请选择阶梯用药"
              onChange={this.onStepTypeChange}
            >
              {stepList.map((item) => (
                <Option key={item.key} value={item.key}>
                  {item.value}
                </Option>
              ))}
            </Select>
          </div>
        </Card>

        {items.map((item, index) => (
          <StepItem
            onDel={() => this.onGroupDel(index)}
            key={item.id}
            onChange={(value) => this.onItemsChange(index, value)}
            timeUnitList={timeUnitList}
            value={item}
            unitList={unitList}
            index={index}
          ></StepItem>
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
            <PlusOutlined /> 添加疗程
          </div>
        </div>
      </Card>
    );
  }
}
