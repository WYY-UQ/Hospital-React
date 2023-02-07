import { Card, Table, Pagination } from 'antd';
import SearchHeader from './components/SearchHeader';
import React, { Component } from 'react';
import { columns } from './config';
import styles from './index.less';
import { PageContainer } from '@ant-design/pro-layout';
import { queryDirections, deleteDirection } from '@/services/direction';
import { queryCommonNameSelections, queryCompanies } from '@/services/common';
import { history } from 'umi';

export default class ScanManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0,
      direction: [],
      commonNameList: [],
      companyList: [],
      directionParams: {
        page: 1,
        limit: 10,
        key: '',
        companyId: null,
        commonNameId: null,
      },
    };
  }

  async componentDidMount() {
    await this.getData();
  }

  getData = async () => {
    const { directionParams } = this.state;
    const directionRes = await queryDirections(directionParams);
    const { total, list } = directionRes.data;
    const commonNameRes = await queryCommonNameSelections();
    let commonNameList = [];
    let companyList = [];
    if (commonNameRes) {
      commonNameList = commonNameRes.data;
    }
    const companyRes = await queryCompanies();
    if (companyRes) {
      companyList = companyRes.data;
    }

    if (directionRes) {
      this.setState({
        total,
        commonNameList,
        companyList,
        direction: list,
      });
    }
  };

  onShowSizeChange = (current, size) => {
    const { directionParams } = this.state;
    directionParams.page = current;
    directionParams.limit = size;
    this.setState(
      {
        directionParams,
      },
      async () => {
        await this.getData();
      },
    );
  };

  onPageChange = (page) => {
    const { directionParams } = this.state;
    directionParams.page = page;
    this.setState(
      {
        directionParams,
      },
      async () => {
        await this.getData();
      },
    );
  };

  goToEdit = (directionId) => {
    history.push({
      pathname: '/literature/scan/upload',
      query: {
        directionId,
      },
    });
  };

  disabledConfirm = async (directionId) => {
    const res = await deleteDirection({
      directionId,
    });
    if (res) {
      await this.getData();
    }
  };

  onQuery = ({ key, commonNameId, companyId }) => {
    const { directionParams } = this.state;
    directionParams.key = key;
    directionParams.commonNameId = commonNameId;
    directionParams.companyId = companyId;
    this.setState(directionParams, async () => {
      await this.getData();
    });
  };

  render() {
    const { directionParams, total, direction, companyList, commonNameList } = this.state;
    return (
      <PageContainer title={false}>
        <div className={styles.goodsManagementContainer}>
          <Card>
            <SearchHeader
              companyList={companyList}
              commonNameList={commonNameList}
              onAdd={() =>
                history.push({
                  pathname: '/literature/scan/upload',
                })
              }
              onQuery={this.onQuery}
            ></SearchHeader>
            <div className={styles.goodsManagementTableContainer}>
              <Table
                columns={columns(this)}
                dataSource={direction}
                pagination={false}
                rowKey={(record) => record.id}
              ></Table>
            </div>
            <div className={styles.goodsManagementPaginationContainer}>
              <div>
                共 {total} 条记录 第 {total ? directionParams.page : 0} /{' '}
                {Math.ceil(total / directionParams.limit)} 页
              </div>
              <Pagination
                total={total}
                showSizeChanger
                showQuickJumper
                pageSize={directionParams.limit}
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
