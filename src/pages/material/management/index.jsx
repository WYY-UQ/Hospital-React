import { Card, Table, Pagination } from 'antd';
import SearchHeader from './components/SearchHeader';
import React, { Component } from 'react';
import { columns } from './config';
import styles from './index.less';
import { PageContainer } from '@ant-design/pro-layout';
import { querySubstances, disableSubstance } from '@/services/material';
import { queryCommonDicts } from '@/services/common';
import { history } from 'umi';

export default class MaterialManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0,
      materialCategoryList: [],
      codeSchemeList: [],
      substances: [],
      substancesParams: {
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
    const { substancesParams } = this.state;
    const substancesRes = await querySubstances(substancesParams);
    const { total, list } = substancesRes.data;
    if (substancesRes) {
      this.setState({
        total,
        substances: list,
      });
    }
  };

  onShowSizeChange = (current, size) => {
    const { substancesParams } = this.state;
    substancesParams.page = current;
    substancesParams.limit = size;
    this.setState(
      {
        substancesParams,
      },
      async () => {
        await this.getData();
      },
    );
  };

  onPageChange = (page) => {
    const { substancesParams } = this.state;
    substancesParams.page = page;
    this.setState(
      {
        substancesParams,
      },
      async () => {
        await this.getData();
      },
    );
  };

  goToEdit = (substanceId) => {
    history.push({
      pathname: '/material/edit',
      query: {
        substanceId,
      },
    });
  };

  disabledConfirm = async (substanceId) => {
    const res = await disableSubstance({
      substanceId,
    });
    if (res) {
      await this.getData();
    }
  };

  onQuery = (key) => {
    const { substancesParams } = this.state;
    substancesParams.key = key;
    this.setState(substancesParams, async () => {
      await this.getData();
    });
  };

  render() {
    const { substancesParams, total, substances } = this.state;
    return (
      <PageContainer title={false}>
        <div className={styles.goodsManagementContainer}>
          <Card>
            <SearchHeader
              onAdd={() =>
                history.push({
                  pathname: '/material/edit',
                })
              }
              onQuery={this.onQuery}
            ></SearchHeader>
            <div className={styles.goodsManagementTableContainer}>
              <Table
                columns={columns(this)}
                dataSource={substances}
                pagination={false}
                rowKey={(record) => record.id}
              ></Table>
            </div>
            <div className={styles.goodsManagementPaginationContainer}>
              <div>
                共 {total} 条记录 第 {total ? substancesParams.page : 0} /{' '}
                {Math.ceil(total / substancesParams.limit)} 页
              </div>
              <Pagination
                total={total}
                showSizeChanger
                showQuickJumper
                pageSize={substancesParams.limit}
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
