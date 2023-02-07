import React, { Component } from 'react';
// import { Select, Input, Button } from 'antd';
// import styles from './index.less';
// import { PlusOutlined } from '@ant-design/icons';
import { Input, Select } from 'antd';

const { Option } = Select;

export default class DDD extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dddUnit: props.value?.dddUnit || null,
      dddValue: props.value?.dddUnit || '',
    };
  }

  onValueChange = (e) => {
    const { onChange } = this.props;
    const item = JSON.parse(JSON.stringify(this.state));
    item.dddValue = e.target.value;
    this.setState(item);
    onChange?.(item);
  };

  onUnitChange = (value) => {
    const { onChange } = this.props;
    const item = JSON.parse(JSON.stringify(this.state));
    item.dddUnit = value;
    this.setState(item);
    onChange?.(item);
  };

  static getDerivedStateFromProps(props, state) {
    if (props.value?.dddUnit !== state.dddUnit || props.value?.dddValue !== state.dddValue) {
      return {
        dddUnit: props.value?.dddUnit,
        dddValue: props.value?.dddValue,
      };
    }
    return {};
  }

  render() {
    const { dddUnit, dddValue } = this.state;
    const { unitList } = this.props;
    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Input
          placeholder="请输入数值"
          style={{ width: '240px', marginRight: '10px' }}
          value={dddValue}
          onInput={this.onValueChange}
        />
        <Select
          placeholder="请选择单位"
          style={{ width: '240px' }}
          onChange={this.onUnitChange}
          value={dddUnit}
        >
          {unitList.map((item) => (
            <Option key={item} value={item}>
              {item}{' '}
            </Option>
          ))}
        </Select>
      </div>
    );
  }
}
