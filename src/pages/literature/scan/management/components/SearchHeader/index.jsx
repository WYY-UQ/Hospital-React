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
      companyId: null,
      commonNameId: null,
    };
  }

  onInputChange = (e) => {
    this.setState({
      key: e.target.value,
    });
  };

  onCommonNameIdChange = (commonNameId) => {
    this.setState({
      commonNameId,
    });
  };

  onCompanyIdChange = (companyId) => {
    this.setState({
      companyId,
    });
  };

  render() {
    const { key, companyId, commonNameId } = this.state;
    const { onAdd, onQuery, companyList, commonNameList } = this.props;
    return (
      <div className={styles.searchHeaderContainer}>
        <div className={styles.searchItem}>
          <div className={styles.searchTitle}>通用名:</div>
          <Select
            className={styles.searchSelect}
            showSearch
            value={commonNameId}
            allowClear
            placeholder="请选择"
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            onChange={this.onCommonNameIdChange}
          >
            {commonNameList.map((item) => (
              <Option key={item.id} value={item.id}>
                {item.name}
              </Option>
            ))}
          </Select>
        </div>
        <div className={styles.searchItem}>
          <div className={styles.searchTitle}>厂商:</div>
          <Select
            className={styles.searchSelect}
            showSearch
            allowClear
            value={companyId}
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
          <div className={styles.searchTitle}>说明书名称:</div>
          <Input
            value={key}
            className={styles.searchSelect}
            showsearch="true"
            placeholder="请输入"
            onPressEnter={() =>
              onQuery({
                key,
                commonNameId,
                companyId,
              })
            }
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
                commonNameId,
                companyId,
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
