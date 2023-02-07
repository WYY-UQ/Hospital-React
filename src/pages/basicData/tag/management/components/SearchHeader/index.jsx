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
      type: null,
    };
  }

  onInputChange = (e) => {
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
    const { key, type } = this.state;
    const { onAdd, onQuery, typeList = [] } = this.props;
    return (
      <div className={styles.searchHeaderContainer}>
        <div className={styles.searchItem}>
          <div className={styles.searchTitle}>类型:</div>
          <Select
            placeholder="请选择类型"
            showSearch
            allowClear
            className={styles.searchSelect}
            value={type}
            onChange={this.onTypeChange}
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {typeList.map((item) => (
              <Option key={item.key} value={item.key}>
                {item.value}
              </Option>
            ))}
          </Select>
        </div>
        <div className={styles.searchItem} style={{ marginLeft: '10px' }}>
          <div className={styles.searchTitle}>关键词:</div>
          <Input
            value={key}
            className={styles.searchSelect}
            showsearch="true"
            onPressEnter={() =>
              onQuery({
                key,
                type,
              })
            }
            placeholder="请输入"
            onChange={this.onInputChange}
          ></Input>
        </div>
        <div className={styles.searchButtonItem}>
          <Button
            type="primary"
            className={styles.searchButton}
            onClick={() =>
              onQuery({
                key,
                type,
              })
            }
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
