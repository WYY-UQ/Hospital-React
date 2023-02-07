import React, { Component } from 'react';
import { Input, Button, Select } from 'antd';
import styles from './index.less';
import { PlusOutlined } from '@ant-design/icons';

export default class SearchHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      manufactureId: null,
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
      manufactureId: value,
    });
  };

  render() {
    const { key, manufactureId } = this.state;
    const { onAdd, onQuery, medicineCategoryList } = this.props;
    return (
      <div className={styles.searchHeaderContainer}>
        <div className={styles.searchItem}>
          <div className={styles.searchTitle}>生产厂家:</div>
          <Select
            placeholder="请选择生产厂家"
            showSearch
            allowClear
            value={manufactureId}
            onChange={this.onSelectChange}
            className={styles.searchSelect}
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {medicineCategoryList.map((item) => (
              <Select.Option key={item.companyName} value={item.id}>
                {item.companyName}
              </Select.Option>
            ))}
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
            onPressEnter={() => onQuery(manufactureId, key)}
          ></Input>
        </div>
        <div className={styles.searchButtonItem}>
          <Button
            type="primary"
            className={styles.searchButton}
            onClick={() => onQuery(manufactureId, key)}
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
