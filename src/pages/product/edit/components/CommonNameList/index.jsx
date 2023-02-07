import React, { Component } from 'react';
import ListItem from './ListItem';
// import { Select, Input, Button } from 'antd';
// import styles from './index.less';
// import { PlusOutlined } from '@ant-design/icons';
import { notification } from 'antd';

export default class CommonNameList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      commonNames: props.value?.length
        ? props.value
        : [
            {
              commonName: null,
              drugGroups: [],
              commonNameId: null,
              drugGroupId: null,
              specses: [],
            },
          ],
    };
  }

  onAdd = () => {
    const { commonNames } = this.state;
    const { onChange } = this.props;
    commonNames.push({
      commonName: null,
      drugGroups: [],
      commonNameId: null,
      drugGroupId: null,
      specses: [],
    });
    this.setState(
      {
        commonNames,
      },
      () => onChange?.(commonNames),
    );
  };

  onDel = (index) => {
    const { commonNames } = this.state;
    const { onChange } = this.props;
    if (commonNames.length === 1) {
      notification.warn({
        description: '最后一个了~不能再删了',
        message: '提示',
      });
      return;
    }
    commonNames.splice(index, 1);
    this.setState(
      {
        commonNames,
      },
      () => onChange?.(commonNames),
    );
  };

  onChange = (index, item) => {
    const { onChange } = this.props;
    const { commonNames } = this.state;
    commonNames.splice(index, 1, item);
    this.setState(
      {
        commonNames,
      },
      () => onChange?.(commonNames),
    );
  };

  static getDerivedStateFromProps(props) {
    if (props.value?.length) {
      return {
        commonNames: props.value,
      };
    }
    return {};
  }

  render() {
    const { commonNames } = this.state;
    const { commonNameList } = this.props;
    return (
      <div>
        {commonNames.map((item, index) => (
          <ListItem
            item={item}
            index={index}
            commonNameList={commonNameList}
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
