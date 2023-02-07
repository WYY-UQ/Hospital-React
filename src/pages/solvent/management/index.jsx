import { Card, Table, Pagination } from 'antd';
import SearchHeader from './components/SearchHeader';
import React, { Component } from 'react';
import { columns } from './config';
import styles from './index.less';
import { PageContainer } from '@ant-design/pro-layout';
import { queryObjects } from '@/services/common';
import { queryDissolutions, deleteDissolution } from '@/services/solvent';
import { history } from 'umi';

export default class SolventManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0,
      dissolution: [],
      productList: [],
      commonNameList: [],
      dissolutionParams: {
        page: 1,
        limit: 10,
        type: null,
        typeId: null,
      },
    };
  }

  async componentDidMount() {
    let { productList, commonNameList } = this.state;
    productList = (await queryObjects({ type: 4 }))?.data ?? [];
    commonNameList = (await queryObjects({ type: 3 }))?.data ?? [];
    await this.getData();
    this.setState({
      commonNameList,
      productList,
    });
  }

  getData = async () => {
    const { dissolutionParams } = this.state;
    const dissolutionRes = await queryDissolutions(dissolutionParams);
    const { total, list } = dissolutionRes.data;
    if (dissolutionRes) {
      this.setState({
        total,
        dissolution: list,
      });
    }
  };

  onShowSizeChange = (current, size) => {
    const { dissolutionParams } = this.state;
    dissolutionParams.page = current;
    dissolutionParams.limit = size;
    this.setState(
      {
        dissolutionParams,
      },
      async () => {
        await this.getData();
      },
    );
  };

  onPageChange = (page) => {
    const { dissolutionParams } = this.state;
    dissolutionParams.page = page;
    this.setState(
      {
        dissolutionParams,
      },
      async () => {
        await this.getData();
      },
    );
  };

  goToEdit = (dissolutionId) => {
    history.push({
      pathname: '/solvent/edit',
      query: {
        dissolutionId,
      },
    });
  };

  disabledConfirm = async (dissolutionId) => {
    const res = await deleteDissolution({
      dissolutionId,
    });
    if (res) {
      await this.getData();
    }
  };

  onQuery = ({ type, typeId }) => {
    const { dissolutionParams } = this.state;
    dissolutionParams.type = type;
    dissolutionParams.typeId = typeId;
    this.setState(dissolutionParams, async () => {
      await this.getData();
    });
  };

  render() {
    const { dissolutionParams, total, dissolution, productList, commonNameList } = this.state;
    return (
      <PageContainer title={false}>
        <div className={styles.goodsManagementContainer}>
          <Card>
            <SearchHeader
              productList={productList}
              commonNameList={commonNameList}
              onAdd={() =>
                history.push({
                  pathname: '/solvent/edit',
                })
              }
              onQuery={this.onQuery}
            ></SearchHeader>
            <div className={styles.goodsManagementTableContainer}>
              <Table
                columns={columns(this)}
                dataSource={dissolution}
                pagination={false}
                rowKey={(record) => record.id}
              ></Table>
            </div>
            <div className={styles.goodsManagementPaginationContainer}>
              <div>
                共 {total} 条记录 第 {total ? dissolutionParams.page : 0} /{' '}
                {Math.ceil(total / dissolutionParams.limit)} 页
              </div>
              <Pagination
                total={total}
                showSizeChanger
                showQuickJumper
                pageSize={dissolutionParams.limit}
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
