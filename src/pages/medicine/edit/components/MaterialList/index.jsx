import React, { Component } from 'react';
import ListItem from './ListItem';
// import { Select, Input, Button } from 'antd';
// import styles from './index.less';
// import { PlusOutlined } from '@ant-design/icons';
import { notification } from 'antd';

export default class MaterialList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      materialList: props.value?.length ? props.value : [''],
    };
  }

  onAdd = () => {
    const { materialList } = this.state;
    const { onChange } = this.props;
    materialList.push('');
    this.setState(
      {
        materialList,
      },
      () => onChange?.(materialList),
    );
  };

  onDel = (index) => {
    const { materialList } = this.state;
    const { onChange } = this.props;
    if (materialList.length === 1) {
      notification.warn({
        description: '最后一个了~不能再删了',
        message: '提示',
      });
      return;
    }
    materialList.splice(index, 1);
    this.setState(
      {
        materialList,
      },
      () => onChange?.(materialList),
    );
  };

  onChange = (index, item) => {
    const { onChange } = this.props;
    const { materialList } = this.state;
    materialList.splice(index, 1, item);
    this.setState(
      {
        materialList,
      },
      () => onChange?.(materialList),
    );
  };

  static getDerivedStateFromProps(props) {
    if (props.value?.length) {
      return {
        materialList: props.value,
      };
    }
    return {};
  }

  render() {
    const { materialList } = this.state;
    const { substancesList } = this.props;
    return (
      <div>
        {materialList.map((item, index) => (
          <ListItem
            item={item}
            index={index}
            substancesList={substancesList}
            key={`material_${index}`}
            onAdd={this.onAdd}
            onDel={this.onDel}
            onChange={this.onChange}
          ></ListItem>
        ))}
      </div>
    );
  }
}
