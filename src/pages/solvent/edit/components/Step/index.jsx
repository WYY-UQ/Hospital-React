import { Card, notification } from 'antd';
import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import StepLine from './StepLine';

const StepItem = {
  id: uuidv4(),
  menstruumId: null,
  recommendLevelCode: null,
};

export default class Step extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: props.value?.step || null,
      items: props.value?.items?.length ? props.value.items : [{ ...StepItem }],
    };
  }

  getStepName = (step) => {
    return step === 2 ? '复溶' : '初溶';
  };

  onAdd = () => {
    const { step, items } = this.state;
    const { onChange } = this.props;

    items.push({ ...Object.assign(StepItem, { id: uuidv4() }) });
    this.setState(
      {
        items,
      },
      () => onChange?.({ step, items }),
    );
  };

  onDel = (index) => {
    const { items, step } = this.state;
    const { onChange } = this.props;
    if (items.length === 1) {
      notification.warn({
        description: '最后一个了~不能再删了',
        message: '提示',
      });
      return;
    }
    items.splice(index, 1);
    this.setState(
      {
        items,
      },
      () => onChange?.({ step, items }),
    );
  };

  onChange = (index, item) => {
    const { onChange } = this.props;
    const { items, step } = this.state;
    items.splice(index, 1, item);
    this.setState(
      {
        items,
      },
      () => onChange?.({ step, items }),
    );
  };

  static getDerivedStateFromProps(props, state) {
    if (
      props.value?.step !== state.step ||
      JSON.stringify(props.value?.items) !== JSON.stringify(state.items)
    ) {
      return {
        step: props.value?.step || null,
        items: props.value?.items?.length ? props.value.items : [{ ...StepItem }],
      };
    }

    return {};
  }

  render() {
    const { step = 1, items } = this.state;
    const { productList = [], levelList = [], index } = this.props;
    return (
      <Card style={index === 0 ? {} : { marginTop: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div>步骤：</div>
          <div>{this.getStepName(step)}</div>
        </div>
        {items.map((item, itemIdnex) => (
          <StepLine
            item={item}
            productList={productList}
            levelList={levelList}
            index={itemIdnex}
            key={item.id}
            onAdd={this.onAdd}
            onDel={this.onDel}
            onChange={this.onChange}
          ></StepLine>
        ))}
      </Card>
    );
  }
}
