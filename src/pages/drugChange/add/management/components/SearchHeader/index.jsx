import React, { Component } from 'react';
import { Input, Button, Select } from 'antd';
import styles from './index.less';
import { PlusOutlined } from '@ant-design/icons';

export default class SearchHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drugName: null,
      approvalNo: null,
    };
  }

  onDrugNameChange = (e) => {
    this.setState({
      drugName: e.target.value,
    });
  };

  onApprovalNoChange = (e) => {
    this.setState({
      approvalNo: e.target.value,
    });
  };

  render() {
    const { drugName, approvalNo } = this.state;
    const {  onQuery } = this.props;
    return (
      <div className={styles.searchHeaderContainer}>
        <div className={styles.searchItem}>
          <div className={styles.searchTitle}>药品名称:</div>
          <Input
            value={drugName}
            className={styles.searchSelect}
            showsearch="true"
            placeholder="请输入药品名称"
            onChange={this.onDrugNameChange}
            onPressEnter={() => onQuery({ drugName, approvalNo })}
          ></Input>
        </div>
        <div className={styles.searchItem}>
          <div className={styles.searchTitle}>批准文号:</div>
          <Input
            value={approvalNo}
            className={styles.searchSelect}
            showsearch="true"
            placeholder="请输入批准文号"
            onChange={this.onApprovalNoChange}
            onPressEnter={() => onQuery({ drugName, approvalNo })}
          ></Input>
        </div>
        <div className={styles.searchButtonItem}>
          <Button
            type="primary"
            className={styles.searchButton}
            onClick={() => onQuery({ drugName, approvalNo })}
          >
            查询
          </Button>
        </div>
      </div>
    );
  }
}
