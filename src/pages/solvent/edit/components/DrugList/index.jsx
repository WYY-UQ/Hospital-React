import React, { Component } from 'react';
import GoodsCodeItem from './DrugListItem';

import { notification } from 'antd';
import { v4 as uuidv4 } from 'uuid';

const Drug = {
  id: uuidv4(),
  type: null,
  typeId: null,
};

export default class DrugList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: props.value?.length ? props.value : [{ ...Drug }],
    };
  }

  onAdd = () => {
    const { items } = this.state;
    const { onChange } = this.props;
    Drug.id = uuidv4();
    items.push({ ...Drug });
    this.setState(
      {
        items,
      },
      () => onChange?.(items),
    );
  };

  onDel = (index) => {
    const { items } = this.state;
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
      () => onChange?.(items),
    );
  };

  onChange = (index, item) => {
    const { onChange } = this.props;
    const { items } = this.state;
    items.splice(index, 1, item);
    this.setState(
      {
        items,
      },
      () => onChange?.(items),
    );
  };

  static getDerivedStateFromProps(props) {
    if (props.value?.length) {
      return {
        items: props.value,
      };
    }
    return {};
  }

  render() {
    const { items } = this.state;
    const { productList = [], commonNameList = [] } = this.props;
    return (
      <div>
        {items.map((item, index) => (
          <GoodsCodeItem
            item={item}
            commonNameList={commonNameList}
            productList={productList}
            index={index}
            key={item.id}
            onAdd={this.onAdd}
            onDel={this.onDel}
            onChange={this.onChange}
          ></GoodsCodeItem>
        ))}
      </div>
    );
  }
}
