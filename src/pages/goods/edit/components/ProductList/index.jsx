import React, { Component } from 'react';
import ProductListItem from './ProductListItem';
// import { Select, Input, Button } from 'antd';
// import styles from './index.less';
// import { PlusOutlined } from '@ant-design/icons';
import { notification } from 'antd';

const materialCode = {
  codeSys: null,
  code: null,
};

export default class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: props.value?.length ? props.value : [{ ...materialCode }],
    };
  }

  onAdd = () => {
    const { products } = this.state;
    const { onChange } = this.props;
    products.push({ ...materialCode });
    this.setState(
      {
        products,
      },
      () => onChange?.(products),
    );
  };

  onDel = (index) => {
    const { products } = this.state;
    const { onChange } = this.props;
    if (products.length === 1) {
      notification.warn({
        description: '最后一个了~不能再删了',
        message: '提示',
      });
      return;
    }
    products.splice(index, 1);
    this.setState(
      {
        products,
      },
      () => onChange?.(products),
    );
  };

  onChange = (index, item) => {
    const { onChange } = this.props;
    const { products } = this.state;
    products.splice(index, 1, item);
    this.setState(
      {
        products,
      },
      () => onChange?.(products),
    );
  };

  static getDerivedStateFromProps(props) {
    if (props.value?.length) {
      return {
        products: props.value,
      };
    }
    return {};
  }

  render() {
    const { products } = this.state;
    const { productList = [], unitList = [], ratioType = 0 } = this.props;
    return (
      <div>
        {products.map((item, index) => (
          <ProductListItem
            item={item}
            productList={productList}
            unitList={unitList}
            index={index}
            ratioType={ratioType}
            key={`productListItem_${index}`}
            onAdd={this.onAdd}
            onDel={this.onDel}
            onChange={this.onChange}
          ></ProductListItem>
        ))}
      </div>
    );
  }
}
