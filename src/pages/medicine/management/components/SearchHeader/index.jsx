import React, { Component } from 'react';
import { Input, Button, Select } from 'antd';
import styles from './index.less';
import { PlusOutlined } from '@ant-design/icons';

export default class SearchHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: null,
      key: null,
    };
  }

  onInputChange = (e) => {
    this.setState({
      key: e.target.value,
    });
  };

  onSelectChange = (value) => {
    this.setState({
      type: value,
    });
  };

  render() {
    const { key, type } = this.state;
    const { onAdd, onQuery, medicineCategoryList } = this.props;
    return (
      <div className={styles.searchHeaderContainer}>
        <div className={styles.searchItem}>
          <div className={styles.searchTitle}>药物类型:</div>
          <Select
            allowClear
            value={type}
            className={styles.searchSelect}
            showsearch="true"
            placeholder="请输入"
            onChange={this.onSelectChange}
          >
            {medicineCategoryList.map((item) => (
              <Select.Option key={item.value} value={item.key}>
                {item.value}
              </Select.Option>
            ))}
          </Select>
        </div>
        <div className={styles.searchItem}>
          <div className={styles.searchTitle}>关键字:</div>
          <Input
            value={key}
            className={styles.searchSelect}
            onPressEnter={() => onQuery(key)}
            showsearch="true"
            placeholder="请输入"
            onChange={this.onInputChange}
          ></Input>
        </div>
        <div className={styles.searchButtonItem}>
          <Button type="primary" className={styles.searchButton} onClick={() => onQuery(type, key)}>
            查询
          </Button>
          <Button type="primary" icon={<PlusOutlined />} onClick={onAdd}>
            新建
          </Button>
        </div>
      </div>
    );
  }
}
