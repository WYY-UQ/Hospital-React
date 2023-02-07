import { Card, Table, Pagination } from 'antd';
import SearchHeader from './components/SearchHeader';
import React, { Component } from 'react';
import { columns } from './config';
import styles from './index.less';
import { PageContainer } from '@ant-design/pro-layout';
import { deleteDirection } from '@/services/direction';
import { queryLiteratureStructs, reviewLiteratureStruct } from '@/services/literature';
import { queryCommonDicts, queryCompanies } from '@/services/common';
import { history } from 'umi';

export default class StructuredManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0,
      direction: [],
      typeList: [],
      companyList: [],
      directionParams: {
        page: 1,
        limit: 10,
        key: '',
        companyId: null,
        literatureType: null,
      },
    };
  }

  async componentDidMount() {
    await this.getData();
  }

  getData = async () => {
    const { directionParams } = this.state;
    const directionRes = await queryLiteratureStructs(directionParams);
    const { total, list } = directionRes.data || {};
    let companyList = [];
    let typeList = [];
    const dictRes = await queryCommonDicts(19);
    if (dictRes?.data[0]?.dicts) {
      typeList = dictRes?.data[0]?.dicts;
    }
    const companyRes = await queryCompanies();
    if (companyRes) {
      companyList = companyRes.data;
    }

    if (directionRes) {
      this.setState({
        total,
        companyList,
        typeList,
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
      pathname: '/literature/structured/edit',
      query: {
        directionId,
      },
    });
  };

  reviewLiteratureStruct = async (structId, reviewStatus) => {
    const res = await reviewLiteratureStruct({
      reviewStatus,
      structId,
    });
    if (res) {
      await this.getData();
    }
  };

  onQuery = ({ key, literatureType, companyId }) => {
    const { directionParams } = this.state;
    directionParams.key = key;
    directionParams.literatureType = literatureType;
    directionParams.companyId = companyId;
    this.setState(directionParams, async () => {
      await this.getData();
    });
  };

  render() {
    const { directionParams, total, direction, companyList, typeList } = this.state;
    return (
      <PageContainer title={false}>
        <div className={styles.goodsManagementContainer}>
          <Card>
            <SearchHeader
              companyList={companyList}
              typeList={typeList}
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
