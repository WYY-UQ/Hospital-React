import React, { Component } from 'react';
import { Button, Card, Select } from 'antd';
import { queryObjects } from '@/services/common';

import { v4 as uuidv4 } from 'uuid';

const { Option } = Select;

export default class CommonNameCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: props?.item?.id || uuidv4(),
      key: props?.item?.key || null,
      commonNameList: [],
    };
  }

  handleSearch = async (key) => {
    const res = await queryObjects({
      type: 3,
      key,
    });
    this.setState({
      commonNameList: res?.data ?? [],
    });
  };

  keyChange = (key) => {
    const { id } = this.state;
    const { onChange } = this.props;

    this.setState({
      key,
    });
    onChange?.({
      id,
      key,
    });
  };

  static getDerivedStateFromProps(props, state) {
    if (!state.commonNameList.length &&  props?.item?.key &&  props?.item?.value) {
      return {
        commonNameList: [
          {
            key:  props?.item?.key,
            value:  props?.item?.value,
          },
        ],
      };
    }
    if (props?.item?.id !== state.id || props?.item?.key !== state.key) {
      return {
        id: props?.item?.id || uuidv4(),
        key: props?.item?.key || null,
      };
    }
    return {};
  }

  render() {
    const { key, commonNameList } = this.state;
    const { onDel } = this.props;
    return (
      <Card style={{ marginBottom: '30px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ width: '100px', textAlign: 'right' }}>通用名：</div>
            <Select
              style={{ width: '300px' }}
              placeholder="请选择"
              showSearch
              value={key}
              defaultActiveFirstOption={false}
              showArrow={false}
              filterOption={false}
              onChange={this.keyChange}
              onSearch={this.handleSearch}
              notFoundContent={null}
            >
              {commonNameList.map((item) => (
                <Option key={item.key} value={item.key}>
                  {item.value}
                </Option>
              ))}
            </Select>
          </div>
          <Button danger onClick={onDel}>
            删除
          </Button>
        </div>
      </Card>
    );
  }
}
