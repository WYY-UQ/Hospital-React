import React, { Component } from 'react';
import AliasItem from './item';
import { notification } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const aliasItem = {
  alias: '',
  pinyin: '',
  wubi: '',
};

export default class Alias extends Component {
  constructor(props) {
    super(props);
    this.state = {
      aliasList: props.value?.length ? props.value : [],
    };
  }

  onAdd = () => {
    const { aliasList } = this.state;
    const { onChange } = this.props;
    aliasList.push({ ...aliasItem });
    this.setState(
      {
        aliasList,
      },
      () => onChange?.(aliasList),
    );
  };

  onDel = (index) => {
    const { aliasList } = this.state;
    const { onChange } = this.props;
    aliasList.splice(index, 1);
    this.setState(
      {
        aliasList,
      },
      () => onChange?.(aliasList),
    );
  };

  static getDerivedStateFromProps(props) {
    if (props.value?.length) {
      return {
        aliasList: props.value,
      };
    }
    return {};
  }

  onChange = (index, item) => {
    const { onChange } = this.props;
    const { aliasList } = this.state;
    aliasList.splice(index, 1, item);
    this.setState(
      {
        aliasList,
      },
      () => onChange?.(aliasList),
    );
  };

  render() {
    const { aliasList } = this.state;
    return (
      <div>
        {aliasList.map((item, index) => (
          <AliasItem
            key={`alias_${index}`}
            index={index}
            onDel={this.onDel}
            onChange={this.onChange}
            item={item}
          ></AliasItem>
        ))}
        <div
          onClick={this.onAdd}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              cursor: 'pointer',
              border: '1px  gray solid',
              width: '200px',
              height: '30px',
              display: 'flex',
              borderRadius: '5px',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <PlusOutlined /> 添加别名
          </div>
        </div>
      </div>
    );
  }
}
