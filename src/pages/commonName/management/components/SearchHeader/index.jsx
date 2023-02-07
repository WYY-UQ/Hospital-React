import React, { Component } from 'react';
import { Input, Button } from 'antd';
import styles from './index.less';
import { PlusOutlined } from '@ant-design/icons';

export default class SearchHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: null,
    };
  }

  onInputChange = (e) => {
    this.setState({
      key: e.target.value,
    });
  };

  render() {
    const { key } = this.state;
    const { onAdd, onQuery } = this.props;
    return (
      <div className={styles.searchHeaderContainer}>
        <div className={styles.searchItem}>
          <div className={styles.searchTitle}>关键字:</div>
          <Input
            value={key}
            className={styles.searchSelect}
            showsearch="true"
            placeholder="请输入"
            onChange={this.onInputChange}
            onPressEnter={() => onQuery(key)}
          ></Input>
        </div>
        <div className={styles.searchButtonItem}>
          <Button type="primary" className={styles.searchButton} onClick={() => onQuery(key)}>
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
