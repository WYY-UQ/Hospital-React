import { Form, Select, notification } from 'antd';
import React, { Component } from 'react';
import PackageMethodItem from './PackageMethodItem';

const { Option } = Select;

const levelItem = {
  childUnit: null,
  childValue: null,
  levelNo: null,
  parentUnit: null,
  parentValue: null,
};

export default class PackageMethod extends Component {
  constructor(props) {
    super(props);
    this.state = {
      packType: props.value?.packType || null,
      levels: props.value?.levels.length ? props.value?.levels : [{ ...levelItem }],
    };
  }

  onAdd = () => {
    const { levels, packType } = this.state;
    const { onChange } = this.props;
    levels.push({ ...levelItem });
    this.setState(
      {
        levels,
      },
      () =>
        onChange?.({
          packType,
          levels,
        }),
    );
  };

  onPackTypeChange = (packType) => {
    const { onChange } = this.props;
    const { levels } = this.state;
    this.setState(
      {
        packType,
      },
      () =>
        onChange?.({
          packType,
          levels,
        }),
    );
  };

  onDel = (index) => {
    const { levels, packType } = this.state;
    const { onChange } = this.props;
    if (levels.length === 1) {
      notification.warn({
        description: '最后一个了~不能再删了',
        message: '提示',
      });
      return;
    }
    levels.splice(index, 1);
    this.setState(
      {
        levels,
      },
      () =>
        onChange?.({
          packType,
          levels,
        }),
    );
  };

  onItemChange = (index, item) => {
    const { onChange } = this.props;
    const { levels, packType } = this.state;
    levels.splice(index, 1, item);
    this.setState(
      {
        levels,
      },
      () =>
        onChange?.({
          packType,
          levels,
        }),
    );
  };

  static getDerivedStateFromProps(props) {
    if (props.value?.packType || props.value?.levels.length) {
      return {
        packType: props.value?.packType || null,
        levels: props.value?.levels.length ? props.value?.levels : [{ ...levelItem }],
      };
    }
    return {};
  }

  render() {
    const { levels, packType } = this.state;
    const { packageMethodList = [], unitList = [] } = this.props;
    return (
      <div style={{ marginTop: '60px' }}>
        <Form.Item label="包装方式">
          <Select
            placeholder="请选择包装方式"
            showSearch
            value={packType}
            onChange={this.onPackTypeChange}
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {packageMethodList.map((item) => (
              <Option key={item.key} value={item.key}>
                {item.value}
              </Option>
            ))}
          </Select>
        </Form.Item>
        {levels.map((level, index) => (
          <PackageMethodItem
            onChange={this.onItemChange}
            index={index}
            item={level}
            unitList={unitList}
            key={level.levelNo}
            onDel={this.onDel}
            onAdd={this.onAdd}
          />
        ))}
      </div>
    );
  }
}
