import React, { Component } from 'react';
import { Button, Input, Select } from 'antd';
import styles from './index.less';
import { PlusOutlined } from '@ant-design/icons';

export default class SearchHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: null,
      country: null,
      province: null,
      city: null,
      distinct: null,
    };
  }

  onProvinceChange = (province) => {
    this.setState({
      province,
    });
  };

  onCountryChange = (country) => {
    this.setState({
      country,
    });
  };

  onCityChange = (city) => {
    this.setState({
      city,
    });
  };

  onDistinctChange = (distinct) => {
    this.setState({
      distinct,
    });
  };

  onKeyChange = (e) => {
    this.setState({
      key: e.target.value,
    });
  };

  render() {
    const { country, province, city, distinct, key } = this.state;
    const { onAdd, onQuery, regionList = [] } = this.props;
    return (
      <div className={styles.searchHeaderContainer}>
        <div className={styles.searchItem} style={{ marginRight: '20px' }}>
          <div className={styles.searchTitle}>所在地:</div>
          <Select
            onChange={this.onCountryChange}
            value={country}
            style={{ width: '120px', marginRight: '10px' }}
            placeholder="选择国别"
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {regionList
              .filter((item) => item.level === 0)
              .map((item) => (
                <Select.Option key={item.regionName} value={item.regionName}>
                  {item.regionName}
                </Select.Option>
              ))}
          </Select>
          <Select
            onChange={this.onProvinceChange}
            value={province}
            style={{ width: '120px', marginRight: '10px' }}
            placeholder="选择省"
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {regionList
              .filter((item) => item.level === 1)
              .map((item) => (
                <Select.Option key={item.regionName} value={item.regionName}>
                  {item.regionName}
                </Select.Option>
              ))}
          </Select>
          <Select
            onChange={this.onCityChange}
            value={city}
            style={{ width: '120px', marginRight: '10px' }}
            placeholder="选择市"
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {regionList
              .filter((item) => item.level === 2)
              .map((item) => (
                <Select.Option key={item.regionName} value={item.regionName}>
                  {item.regionName}
                </Select.Option>
              ))}
          </Select>
          <Select
            onChange={this.onDistinctChange}
            value={distinct}
            style={{ width: '120px' }}
            placeholder="选择区"
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {regionList
              .filter((item) => item.level === 3)
              .map((item) => (
                <Select.Option key={item.regionName} value={item.regionName}>
                  {item.regionName}
                </Select.Option>
              ))}
          </Select>
        </div>
        <div className={styles.searchItem} style={{ marginRight: '20px' }}>
          <div className={styles.searchTitle}>关键字:</div>
          <Input
            placeholder="请输入关键字"
            style={{ width: '200px' }}
            value={key}
            onChange={this.onKeyChange}
            onPressEnter={() => onQuery({ country, province, city, distinct, key })}
          ></Input>
        </div>
        <div className={styles.searchButtonItem}>
          <Button
            type="primary"
            className={styles.searchButton}
            onClick={() => onQuery({ country, province, city, distinct, key })}
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
