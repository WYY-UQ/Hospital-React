import { notification, Select, Tag } from 'antd';
import React, { Component } from 'react';

const { Option } = Select;

export default class SelectItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: null,
      value: props.value?.length ? props.value : [],
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.value && JSON.stringify(props.value) !== JSON.stringify(state.value)) {
      return {
        value: props.value?.length ? props.value : [],
      };
    }
    return {};
  }

  onClose = (index) => {
    const { value } = this.state;
    const { onChange } = this.props;
    value.splice(index, 1);
    this.setState(
      {
        value,
      },
      () => {
        onChange?.(value);
      },
    );
  };

  onKeyChange = (key) => {
    const { value } = this.state;
    const { onChange, placeholder, optionList } = this.props;
    const keyList = value.map((item) => item.key);
    if (keyList.indexOf(key) > -1) {
      notification.error({
        message: '错误',
        description: `已存在该${placeholder}`,
      });
      return;
    }

    const mactchedValue = optionList.find((item) => item.key === key);
    if (mactchedValue) {
      value.push({
        ...mactchedValue,
      });
      this.setState(
        {
          value,
        },
        () => {
          onChange?.(value);
        },
      );
    }
  };

  render() {
    const { key, value } = this.state;
    const { optionList = [], placeholder = '' } = this.props;
    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Select
          placeholder={`请选择${placeholder}`}
          style={{ width: '200px' }}
          value={key}
          allowClear
          onChange={this.onKeyChange}
        >
          {optionList.map((item) => (
            <Option key={item.key} value={item.key}>
              {item.value}
            </Option>
          ))}
        </Select>
        <div style={{ marginLeft: '20px' }}>
          {value.map((item, index) => (
            <Tag color="blue" closable key={item.key} onClose={() => this.onClose(index)}>
              {item.value}
            </Tag>
          ))}
        </div>
      </div>
    );
  }
}
