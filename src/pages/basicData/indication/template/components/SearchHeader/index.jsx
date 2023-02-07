import React, { Component } from 'react';
import { Input, Button, Select } from 'antd';
import styles from './index.less';
import { PlusOutlined } from '@ant-design/icons';

const { Option } = Select;

export default class SearchHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: null,
      isSuit: null,
    };
  }

  onInputChange = (e) => {
    this.setState({
      key: e.target.value,
    });
  };

  onSelectChange = (isSuit) => {
    this.setState({
      isSuit,
    });
  };

  render() {
    const { key, isSuit } = this.state;
    const { onAdd, onQuery } = this.props;
    return (
      <div className={styles.searchHeaderContainer}>
        <div className={styles.searchItem}>
          <div className={styles.searchTitle}>模板类型:</div>
          <Select
            placeholder="请选择模板类型"
            allowClear
            value={isSuit}
            onChange={this.onSelectChange}
            className={styles.searchSelect}
          >
            <Option value={true}>适应症模板</Option>
            <Option value={false}>不适应症模板</Option>
          </Select>
        </div>
        <div className={styles.searchItem}>
          <div className={styles.searchTitle}>关键字:</div>
          <Input
            value={key}
            className={styles.searchSelect}
            showsearch="true"
            placeholder="请输入"
            onChange={this.onInputChange}
            onPressEnter={() => onQuery({ key, isSuit })}
          ></Input>
        </div>
        <div className={styles.searchButtonItem}>
          <Button
            type="primary"
            className={styles.searchButton}
            onClick={() => onQuery({ key, isSuit })}
          >
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
