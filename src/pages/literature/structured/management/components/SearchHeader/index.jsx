import React, { Component } from 'react';
import { Input, Button, Select } from 'antd';
import styles from './index.less';

const { Option } = Select;

export default class SearchHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: null,
      companyId: null,
      literatureType: null,
    };
  }

  onInputChange = (e) => {
    this.setState({
      key: e.target.value,
    });
  };

  onLiteratureTypeChange = (literatureType) => {
    this.setState({
      literatureType,
    });
  };

  onCompanyIdChange = (companyId) => {
    this.setState({
      companyId,
    });
  };

  render() {
    const { key, companyId, literatureType } = this.state;
    const { onQuery, companyList = [], typeList = [] } = this.props;
    return (
      <div className={styles.searchHeaderContainer}>
        <div className={styles.searchItem}>
          <div className={styles.searchTitle}>文献类型:</div>
          <Select
            className={styles.searchSelect}
            showSearch
            value={literatureType}
            allowClear
            placeholder="请选择"
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            onChange={this.onLiteratureTypeChange}
          >
            {typeList.map((item) => (
              <Option key={item.key} value={item.key}>
                {item.value}
              </Option>
            ))}
          </Select>
        </div>
        <div className={styles.searchItem}>
          <div className={styles.searchTitle}>厂商:</div>
          <Select
            className={styles.searchSelect}
            showSearch
            value={companyId}
            allowClear
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            placeholder="请选择"
            onChange={this.onCompanyIdChange}
          >
            {companyList.map((item) => (
              <Option key={item.id} value={item.id}>
                {item.companyName}
              </Option>
            ))}
          </Select>
        </div>
        <div className={styles.searchItem}>
          <div className={styles.searchTitle}>名称:</div>
          <Input
            value={key}
            className={styles.searchSelect}
            showsearch="true"
            placeholder="请输入"
            onChange={this.onInputChange}
            onPressEnter={() =>
              onQuery({
                key,
                literatureType,
                companyId,
              })
            }
          ></Input>
        </div>
        <div className={styles.searchButtonItem}>
          <Button
            type="primary"
            className={styles.searchButton}
            onClick={() =>
              onQuery({
                key,
                literatureType,
                companyId,
              })
            }
          >
            查询
          </Button>
          {/* <Button type="primary" icon={<PlusOutlined />} onClick={onAdd}>
            新建
          </Button> */}
        </div>
      </div>
    );
  }
}
