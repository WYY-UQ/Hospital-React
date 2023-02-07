import React, { Component } from 'react';
import GoodsCodeItem from './GoodsCodeItem';
// import { Select, Input, Button } from 'antd';
// import styles from './index.less';
// import { PlusOutlined } from '@ant-design/icons';
import { notification } from 'antd';

const GoodsCodeData = {
  codeSys: null,
  code: null,
};

export default class GoodsCode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      codes: props.value?.length ? props.value : [{ ...GoodsCodeData }],
    };
  }

  onAdd = () => {
    const { codes } = this.state;
    const { onChange } = this.props;
    codes.push({ ...GoodsCodeData });
    this.setState(
      {
        codes,
      },
      () => onChange?.(codes),
    );
  };

  onDel = (index) => {
    const { codes } = this.state;
    const { onChange } = this.props;
    if (codes.length === 1) {
      notification.warn({
        description: '最后一个了~不能再删了',
        message: '提示',
      });
      return;
    }
    codes.splice(index, 1);
    this.setState(
      {
        codes,
      },
      () => onChange?.(codes),
    );
  };

  onChange = (index, item) => {
    const { onChange } = this.props;
    const { codes } = this.state;
    codes.splice(index, 1, item);
    this.setState(
      {
        codes,
      },
      () => onChange?.(codes),
    );
  };

  static getDerivedStateFromProps(props) {
    if (props.value?.length) {
      return {
        codes: props.value,
      };
    }
    return {};
  }

  render() {
    const { codes } = this.state;
    const { codeSchemeList = [],codeList=[] } = this.props;
    return (
      <div>
        {codes.map((item, index) => (
          <GoodsCodeItem
            item={item}
            codeList={codeList}
            codeSchemeList={codeSchemeList}
            index={index}
            key={`goodsCodes_${index}`}
            onAdd={this.onAdd}
            onDel={this.onDel}
            onChange={this.onChange}
          ></GoodsCodeItem>
        ))}
      </div>
    );
  }
}
