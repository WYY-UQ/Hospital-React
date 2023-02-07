import React, { Component } from 'react';
import { Button, DatePicker, Select } from 'antd';
import styles from './index.less';
import { PlusOutlined } from '@ant-design/icons';

const excuteStatusList = [
  {
    key: 1,
    value: '未导入',
  },
  {
    key: 2,
    value: '正在导入',
  },
  {
    key: 3,
    value: '部分成功',
  },
  {
    key: 4,
    value: '导入成功',
  },
];

const { RangePicker } = DatePicker;

export default class SearchHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: null,
      status: null,
      startTime: null,
      endTime: null,
    };
  }

  onStatusChange = (status) => {
    this.setState({
      status,
    });
  };

  onTypeChange = (type) => {
    this.setState({
      type,
    });
  };

  onDataeChange = (dates,dateStrings) => {
    this.setState({
      startTime: dates ? dateStrings[0] : null,
      endTime: dates ? dateStrings[1] : null,
    });
  };

  render() {
    const { type, status, startTime, endTime } = this.state;
    const { onAdd, onQuery, typeList = [] } = this.props;
    return (
      <div className={styles.searchHeaderContainer}>
        <div className={styles.searchItem} style={{ marginRight: '20px' }}>
          <div className={styles.searchTitle}>导入类型:</div>
          <Select
            onChange={this.onTypeChange}
            value={type}
            style={{ width: '120px', marginRight: '10px' }}
            placeholder="导入类型"
            showSearch
            allowClear
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {typeList.map((item) => (
              <Select.Option key={item.key} value={item.key}>
                {item.value}
              </Select.Option>
            ))}
          </Select>
        </div>
        <div className={styles.searchItem} style={{ marginRight: '20px' }}>
          <div className={styles.searchTitle}>执行状态:</div>
          <Select
            onChange={this.onStatusChange}
            value={status}
            style={{ width: '120px', marginRight: '10px' }}
            placeholder="执行状态"
            showSearch
            allowClear
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {excuteStatusList.map((item) => (
              <Select.Option key={item.key} value={item.key}>
                {item.value}
              </Select.Option>
            ))}
          </Select>
        </div>
        <div className={styles.searchItem} style={{ marginRight: '20px' }}>
          <div className={styles.searchTitle}>上传时间:</div>

          <RangePicker
            showTime
            style={{ width: '400px' }}
            onChange={this.onDataeChange}
            allowClear
          />
        </div>
        <div className={styles.searchButtonItem}>
          <Button
            type="primary"
            className={styles.searchButton}
            onClick={() => onQuery({ type, status, startTime, endTime })}
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
