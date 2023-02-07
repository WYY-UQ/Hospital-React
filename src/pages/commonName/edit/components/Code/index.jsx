import React, { Component } from 'react';
import CodeItem from './CodeItem';
// import { Select, Input, Button } from 'antd';
// import styles from './index.less';
// import { PlusOutlined } from '@ant-design/icons';
import { notification } from 'antd';

export default class Code extends Component {
  constructor(props) {
    super(props);
    this.state = {
      codeList: props.value?.length ? props.value : [''],
    };
  }

  onAdd = () => {
    const { codeList } = this.state;
    const { onChange } = this.props;
    codeList.push('');
    this.setState(
      {
        codeList,
      },
      () => onChange?.(codeList),
    );
  };

  onDel = (index) => {
    const { codeList } = this.state;
    const { onChange } = this.props;
    if (codeList.length === 1) {
      notification.warn({
        description: '最后一个了~不能再删了',
        message: '提示',
      });
      return;
    }
    codeList.splice(index, 1);
    this.setState(
      {
        codeList,
      },
      () => onChange?.(codeList),
    );
  };

  onChange = (index, item) => {
    const { onChange } = this.props;
    const { codeList } = this.state;
    codeList.splice(index, 1, item);
    this.setState(
      {
        codeList,
      },
      () => onChange?.(codeList),
    );
  };

  static getDerivedStateFromProps(props) {
    if (props.value?.length) {
      return {
        codeList: props.value,
      };
    }
    return {};
  }

  render() {
    const { codeList } = this.state;
    return (
      <div>
        {codeList.map((item, index) => (
          <CodeItem
            code={item}
            index={index}
            key={`code_${index}`}
            onAdd={this.onAdd}
            onDel={this.onDel}
            onChange={this.onChange}
          ></CodeItem>
        ))}
      </div>
    );
  }
}
