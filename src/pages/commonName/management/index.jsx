import { Card, Table, Pagination } from 'antd';
import SearchHeader from './components/SearchHeader';
import React, { Component } from 'react';
import { columns } from './config';
import styles from './index.less';
import { PageContainer } from '@ant-design/pro-layout';
import { queryCommonNames,disableCommonName } from '@/services/common-name';
import { queryCommonDicts } from '@/services/common';
import { history } from 'umi';

export default class CommomNameManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0,
      materialCategoryList: [],
      codeSchemeList: [],
      commonNames: [],
      commonNamesParams: {
        page: 1,
        limit: 10,
        key: '',
      },
    };
  }

  async componentDidMount() {
    const dictRes = await queryCommonDicts(0);
    let materialCategoryList = [];
    let codeSchemeList = [];

    if (dictRes) {
      const tempMaterialCategorDict = dictRes.data.find((item) => item.dictType === 1);
      if (tempMaterialCategorDict?.dicts) {
        materialCategoryList = tempMaterialCategorDict?.dicts;
      }
      const tempCodeSchemeDict = dictRes.data.find((item) => item.dictType === 2);
      if (tempCodeSchemeDict?.dicts) {
        codeSchemeList = tempCodeSchemeDict?.dicts;
      }
    }
    await this.getData();
    this.setState({
      codeSchemeList,
      materialCategoryList,
    });
  }

  getData = async () => {
    const { commonNamesParams } = this.state;
    const commonNamesRes = await queryCommonNames(commonNamesParams);
    const { total, list } = commonNamesRes.data;
    if (commonNamesRes) {
      this.setState({
        total,
        commonNames: list,
      });
    }
  };

  onShowSizeChange = (current, size) => {
    const { commonNamesParams } = this.state;
    commonNamesParams.page = current;
    commonNamesParams.limit = size;
    this.setState(
      {
        commonNamesParams,
      },
      async () => {
        await this.getData();
      },
    );
  };

  onPageChange = (page) => {
    const { commonNamesParams } = this.state;
    commonNamesParams.page = page;
    this.setState(
      {
        commonNamesParams,
      },
      async () => {
        await this.getData();
      },
    );
  };

  goToEdit = (commonNameId) => {
    history.push({
      pathname: '/commonName/edit',
      query: {
        commonNameId,
      },
    });
  };

  disabledConfirm = async (commonNameId) => {
    const res = await disableCommonName({
      commonNameId,
    });
    if (res) {
      await this.getData();
    }
  };

  onQuery = (key) => {
    const { commonNamesParams } = this.state;
    commonNamesParams.key = key;
    this.setState(commonNamesParams, async () => {
      await this.getData();
    });
  };

  render() {
    const { commonNamesParams, total, commonNames } = this.state;
    return (
      <PageContainer title={false}>
        <div className={styles.goodsManagementContainer}>
          <Card>
            <SearchHeader
              onAdd={() =>
                history.push({
                  pathname: '/commonName/edit',
                })
              }
              onQuery={this.onQuery}
            ></SearchHeader>
            <div className={styles.goodsManagementTableContainer}>
              <Table
                columns={columns(this)}
                dataSource={commonNames}
                pagination={false}
                rowKey={(record) => record.id}
              ></Table>
            </div>
            <div className={styles.goodsManagementPaginationContainer}>
              <div>
                共 {total} 条记录 第 {total ? commonNamesParams.page : 0} /{' '}
                {Math.ceil(total / commonNamesParams.limit)} 页
              </div>
              <Pagination
                total={total}
                showSizeChanger
                showQuickJumper
                pageSize={commonNamesParams.limit}
                onShowSizeChange={this.onShowSizeChange}
                onChange={this.onPageChange}
              />
            </div>
          </Card>
        </div>
      </PageContainer>
    );
  }
}
