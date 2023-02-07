import { notification, Select, Tag } from 'antd';
import React, { Component } from 'react';

const { Option } = Select;

export default class Taste extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taste: null,
      tastes: props.value?.length ? props.value : [],
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.value && JSON.stringify(props.value) !== JSON.stringify(state.tastes)) {
      return {
        tastes: props.value?.length ? props.value : [],
      };
    }
    return {};
  }

  onClose = (index) => {
    const { tastes } = this.state;
    const { onChange } = this.props;
    tastes.splice(index, 1);
    this.setState(
      {
        tastes,
      },
      () => {
        onChange?.(tastes);
      },
    );
  };

  onTasteChange = (value) => {
    const { tastes } = this.state;
    const { onChange } = this.props;
    if (tastes.indexOf(value) > -1) {
      notification.error({
        message: '错误',
        description: '已存在该味道',
      });
      return;
    }
    tastes.push(value);
    this.setState(
      {
        tastes
      },
      () => {
        onChange?.(tastes);
      },
    );
  };

  render() {
    const { taste, tastes } = this.state;
    const { tasteList = [] } = this.props;
    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Select
          placeholder="请选择味道"
          style={{ width: '200px' }}
          value={taste}
          onChange={this.onTasteChange}
        >
          {tasteList.map((item) => (
            <Option key={item.key} value={item.key}>
              {item.value}
            </Option>
          ))}
        </Select>
        <div style={{ marginLeft: '20px' }}>
          {tastes.map((item, index) => (
            <Tag color="blue" closable key={item} onClose={() => this.onClose(index)}>
              {item}
            </Tag>
          ))}
        </div>
      </div>
    );
  }
}
