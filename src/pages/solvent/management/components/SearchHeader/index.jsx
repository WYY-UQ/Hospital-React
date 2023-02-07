import React, { Component } from 'react';
import { Button, Select } from 'antd';
import styles from './index.less';
import { PlusOutlined } from '@ant-design/icons';

const { Option } = Select;

const typeList = [
  {
    key: 3,
    value: '通用名',
  },
  {
    key: 4,
    value: '产品',
  },
];

export default class SearchHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: null,
      typeId: null,
    };
  }

  onTypeChange = (type) => {
    this.setState({
      type,
    });
  };

  onTypeIdChange = (typeId) => {
    this.setState({
      typeId,
    });
  };

  render() {
    const { type, typeId } = this.state;
    const { onAdd, onQuery, commonNameList = [], productList = [] } = this.props;
    return (
      <div className={styles.searchHeaderContainer}>
        <div className={styles.searchItem}>
          <div className={styles.searchTitle}>请选择:</div>
          <Select
            placeholder="请选择类型"
            value={type}
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            style={{ width: '150px', marginRight: '10px' }}
            onChange={this.onTypeChange}
          >
            {typeList.map((item) => (
              <Option key={item.key} value={item.key}>
                {item.value}
              </Option>
            ))}
          </Select>
          <Select
            placeholder="请选择类型"
            value={typeId}
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            style={{ width: '300px' }}
            onChange={this.onTypeIdChange}
          >
            {type === 3 &&
              commonNameList.map((item) => (
                <Option key={item.key} value={item.key}>
                  {item.value}
                </Option>
              ))}
            {type === 4 &&
              productList.map((item) => (
                <Option key={item.key} value={item.key}>
                  {item.value}
                </Option>
              ))}
          </Select>
        </div>

        <div className={styles.searchButtonItem}>
          <Button
            type="primary"
            className={styles.searchButton}
            onClick={() => onQuery({ type, typeId })}
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
