import { Select, notification, Card, Button } from 'antd';
import React, { Component } from 'react';
import PackageMethodItem from './PackageMethodItem';
import { v4 as uuidv4 } from 'uuid';

const { Option } = Select;

export default class PackageMethod extends Component {
  constructor(props) {
    super(props);
    this.state = {
      packType: props.value?.packType || null,
      levels: props.value?.levels.length
        ? props.value?.levels
        : [
            {
              id: uuidv4(),
              childUnit: null,
              childValue: null,
              levelNo: null,
              parentUnit: null,
              parentValue: null,
            },
          ],
    };
  }

  onAdd = () => {
    const { levels, packType } = this.state;
    const { onChange } = this.props;
    levels.push({
      id: uuidv4(),
      childUnit: null,
      childValue: null,
      levelNo: null,
      parentUnit: null,
      parentValue: null,
    });
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
        levels: props.value?.levels.length
          ? props.value?.levels
          : [
              {
                id: uuidv4(),
                childUnit: null,
                childValue: null,
                levelNo: null,
                parentUnit: null,
                parentValue: null,
              },
            ],
      };
    }
    return {};
  }

  render() {
    const { levels, packType } = this.state;
    const { packageMethodList = [], unitList = [], onDel } = this.props;
    return (
      <Card style={{ marginTop: '30px' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '30px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ width: '135px', textAlign: 'right' }}>包装方式：</div>
            <Select
              placeholder="请选择包装方式"
              showSearch
              style={{ width: '580px' }}
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
          </div>
          <Button danger size="small" onClick={onDel}>
            删除
          </Button>
        </div>

        {levels.map((level, index) => (
          <PackageMethodItem
            onChange={this.onItemChange}
            index={index}
            item={level}
            unitList={unitList}
            key={level.id}
            onDel={this.onDel}
            onAdd={this.onAdd}
          />
        ))}
      </Card>
    );
  }
}
