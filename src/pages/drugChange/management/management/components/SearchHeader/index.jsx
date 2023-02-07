import React, { Component } from 'react';
import { Input, Button, Select } from 'antd';
import styles from './index.less';
import { PlusOutlined } from '@ant-design/icons';

const { Option } = Select;

const optList = [
  {
    value: '新增',
    key: 0,
  },
  {
    value: '修改',
    key: 1,
  },
];

export default class SearchHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: null,
      key: null,
    };
  }

  onKeyChange = (e) => {
    this.setState({
      key: e.target.value,
    });
  };

  onTypeChange = (type) => {
    this.setState({
      type,
    });
  };

  render() {
    const { type, key } = this.state;
    const { onQuery } = this.props;
    return (
      <div className={styles.searchHeaderContainer}>
        <div className={styles.searchItem}>
          <div className={styles.searchTitle}>变更类型:</div>
          <Select
            value={type}
            placeholder="全部"
            className={styles.searchSelect}
            allowClear
            onChange={this.onTypeChange}
          >
            {optList.map((item) => (
              <Option key={item.key} value={item.key}>
                {item.value}
              </Option>
            ))}
          </Select>
        </div>
        <div className={styles.searchItem}>
          <div className={styles.searchTitle}>药品名称:</div>
          <Input
            value={key}
            className={styles.searchSelect}
            showsearch="true"
            placeholder="请输入药品名称"
            onChange={this.onKeyChange}
            onPressEnter={() => onQuery({ type, key })}
          ></Input>
        </div>
        <div className={styles.searchButtonItem}>
          <Button
            type="primary"
            className={styles.searchButton}
            onClick={() => onQuery({ type, key })}
          >
            查询
          </Button>
        </div>
      </div>
    );
  }
}
