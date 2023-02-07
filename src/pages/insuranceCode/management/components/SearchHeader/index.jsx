import React, { Component } from 'react';
import { Button, Select } from 'antd';
import styles from './index.less';
import { PlusOutlined } from '@ant-design/icons';

export default class SearchHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      commodityId: null,
      province: null,
    };
  }

  onCommodityIdChange = (commodityId) => {
    this.setState({
      commodityId,
    });
  };

  onProvinceChange = (province) => {
    this.setState({
      province,
    });
  };

  render() {
    const { province, commodityId } = this.state;
    const { onAdd, onQuery, regionList = [], commodityList = [] } = this.props;
    return (
      <div className={styles.searchHeaderContainer}>
        <div className={styles.searchItem}>
          <div className={styles.searchTitle}>商品:</div>
          <Select
            onChange={this.onCommodityIdChange}
            value={commodityId}
            style={{ width: '200px' }}
            placeholder="请选择商品"
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {commodityList.map((item) => (
              <Select.Option key={item.key} value={item.key}>
                {item.value}
              </Select.Option>
            ))}
          </Select>
        </div>
        <div className={styles.searchItem}>
          <div className={styles.searchTitle}>省份:</div>
          <Select
            onChange={this.onProvinceChange}
            value={province}
            style={{ width: '200px' }}
            placeholder="请选择省份"
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {regionList.map((item) => (
              <Select.Option key={item.provinceId} value={item.province}>
                {item.province}
              </Select.Option>
            ))}
          </Select>
        </div>
        <div className={styles.searchButtonItem}>
          <Button
            type="primary"
            className={styles.searchButton}
            onClick={() => onQuery({ commodityId, province })}
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
