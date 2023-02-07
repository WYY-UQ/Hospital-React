import { Select, Form, Input } from 'antd';
import React, { Component } from 'react';
import { DeleteFilled, PlusCircleFilled } from '@ant-design/icons';
import { v4 as uuidv4 } from 'uuid';

const { Option } = Select;

export default class PackageMethodItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.item?.id || uuidv4(),
      childUnit: props.item?.childUnit || null,
      childValue: props.item?.childValue || null,
      levelNo: props.item?.levelNo || null,
      parentUnit: props.item?.parentUnit || null,
      parentValue: props.item?.parentValue || null,
    };
  }

  onParentValueChange = (e) => {
    const { index, onChange } = this.props;
    const item = JSON.parse(JSON.stringify(this.state));
    item.parentValue = e.target.value;
    item.levelNo = index + 1;
    this.setState(item);
    onChange?.(index, item);
  };

  onParentUnitChange = (value) => {
    const { index, onChange } = this.props;
    const item = JSON.parse(JSON.stringify(this.state));
    item.parentUnit = value;
    item.levelNo = index + 1;
    this.setState(item);
    onChange?.(index, item);
  };

  onChildValueChange = (e) => {
    const { index, onChange } = this.props;
    const item = JSON.parse(JSON.stringify(this.state));
    item.childValue = e.target.value;
    item.levelNo = index + 1;
    this.setState(item);
    onChange?.(index, item);
  };

  onChildUnitChange = (value) => {
    const { index, onChange } = this.props;
    const item = JSON.parse(JSON.stringify(this.state));
    item.childUnit = value;
    item.levelNo = index + 1;
    this.setState(item);
    onChange?.(index, item);
  };

  static getDerivedStateFromProps(props, state) {
    if (
      props.item?.id !== state.id ||
      props.item?.childUnit !== state.childUnit ||
      props.item?.childValue !== state.childValue ||
      props.item?.levelNo !== state.levelNo ||
      props.item?.parentUnit !== state.parentUnit ||
      props.item?.parentValue !== state.parentValue
    ) {
      return {
        id: props.item?.id || uuidv4(),
        childUnit: props.item?.childUnit || null,
        childValue: props.item?.childValue || null,
        levelNo: props.item?.levelNo || null,
        parentUnit: props.item?.parentUnit || null,
        parentValue: props.item?.parentValue || null,
      };
    }
    return {};
  }

  render() {
    const { parentValue, parentUnit, childValue, childUnit } = this.state;
    const { index, onDel, onAdd, unitList = [] } = this.props;
    return (
      <Form.Item label={`${index + 1}级包装`}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div>级别数量：</div>
          <Input
            style={{ width: '50px' }}
            value={parentValue}
            onChange={this.onParentValueChange}
          ></Input>
          <div style={{ marginLeft: '15px' }}>级别单位：</div>
          <Select style={{ width: '60px' }} value={parentUnit} onChange={this.onParentUnitChange}>
            {unitList.map((item) => (
              <Option key={item} value={item}>
                {item}
              </Option>
            ))}
          </Select>
          <div style={{ marginLeft: '15px' }}>子数量：</div>
          <Input
            style={{ width: '50px' }}
            value={childValue}
            onChange={this.onChildValueChange}
          ></Input>
          <div style={{ marginLeft: '15px' }}>子单位：</div>
          <Select style={{ width: '60px' }} value={childUnit} onChange={this.onChildUnitChange}>
            {unitList.map((item) => (
              <Option key={item} value={item}>
                {item}
              </Option>
            ))}
          </Select>
          <DeleteFilled
            style={{ fontSize: '20px', color: 'red', marginRight: '5px', marginLeft: '10px' }}
            onClick={() => onDel(index)}
          />
          {index === 0 && (
            <PlusCircleFilled style={{ fontSize: '20px', color: 'blue' }} onClick={onAdd} />
          )}
        </div>
      </Form.Item>
    );
  }
}
