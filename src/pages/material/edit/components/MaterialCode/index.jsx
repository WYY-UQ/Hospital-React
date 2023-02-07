import React, { Component } from 'react';
import MaterialCodeItem from './MaterialCodeItem';
// import { Select, Input, Button } from 'antd';
// import styles from './index.less';
// import { PlusOutlined } from '@ant-design/icons';
import { notification } from 'antd';

const materialCode = {
  sysCode: null,
  code: null,
};

export default class MaterialCode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      materialCodeList: props.value?.length ? props.value : [{ ...materialCode }],
    };
  }

  onAdd = () => {
    const { materialCodeList } = this.state;
    const { onChange } = this.props;
    materialCodeList.push({ ...materialCode });
    this.setState(
      {
        materialCodeList,
      },
      () => onChange?.(materialCodeList),
    );
  };

  onDel = (index) => {
    const { materialCodeList } = this.state;
    const { onChange } = this.props;
    if (materialCodeList.length === 1) {
      notification.warn({
        description: '最后一个了~不能再删了',
        message: '提示',
      });
      return;
    }
    materialCodeList.splice(index, 1);
    this.setState(
      {
        materialCodeList,
      },
      () => onChange?.(materialCodeList),
    );
  };

  onChange = (index, item) => {
    const { onChange } = this.props;
    const { materialCodeList } = this.state;
    materialCodeList.splice(index, 1, item);
    this.setState(
      {
        materialCodeList,
      },
      () => onChange?.(materialCodeList),
    );
  };

  static getDerivedStateFromProps(props) {
    if (props.value?.length) {
      return {
        materialCodeList: props.value,
      };
    }
    return {};
  }

  render() {
    const { materialCodeList } = this.state;
    const { codeSchemeList = [] } = this.props;
    return (
      <div>
        {materialCodeList.map((item, index) => (
          <MaterialCodeItem
            item={item}
            codeSchemeList={codeSchemeList}
            index={index}
            key={`materialCode_${index}`}
            onAdd={this.onAdd}
            onDel={this.onDel}
            onChange={this.onChange}
          ></MaterialCodeItem>
        ))}
      </div>
    );
  }
}
