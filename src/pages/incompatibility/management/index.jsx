import { Card, Table, Pagination } from 'antd';
import SearchHeader from './components/SearchHeader';
import React, { Component } from 'react';
import { columns } from './config';
import styles from './index.less';
import { PageContainer } from '@ant-design/pro-layout';
import { queryIncompatibilities, deleteIncompatibility } from '@/services/incompatibility';
import { queryCommonDicts, queryObjects } from '@/services/common';
import { history } from 'umi';

export default class IncompatibilityManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0,
      incompatibility: [],
      substanceList: [],
      categoryList: [],
      incompatibilityParams: {
        page: 1,
        limit: 10,
        typeId: null,
        type: null,
      },
    };
  }

  async componentDidMount() {
    await this.getData();
  }

  getData = async () => {
    const { incompatibilityParams } = this.state;
    const incompatibilityRes = await queryIncompatibilities(incompatibilityParams);
    const { total, list } = incompatibilityRes.data;
    let { categoryList, substanceList } = this.state;
    const dicRes = await queryCommonDicts(5);
    categoryList = dicRes?.data[0]?.dicts ?? [];
    substanceList =
      (
        await queryObjects({
          type: 1,
        })
      )?.data ?? [];

    if (incompatibilityRes) {
      this.setState({
        total,
        categoryList,
        substanceList,
        incompatibility: list,
      });
    }
  };

  onShowSizeChange = (current, size) => {
    const { incompatibilityParams } = this.state;
    incompatibilityParams.page = current;
    incompatibilityParams.limit = size;
    this.setState(
      {
        incompatibilityParams,
      },
      async () => {
        await this.getData();
      },
    );
  };

  onPageChange = (page) => {
    const { incompatibilityParams } = this.state;
    incompatibilityParams.page = page;
    this.setState(
      {
        incompatibilityParams,
      },
      async () => {
        await this.getData();
      },
    );
  };

  goToEdit = (incompatibilityId) => {
    history.push({
      pathname: '/incompatibility/edit',
      query: {
        incompatibilityId,
      },
    });
  };

  disabledConfirm = async (incompatibilityId) => {
    const res = await deleteIncompatibility({
      incompatibilityId,
    });
    if (res) {
      await this.getData();
    }
  };

  onQuery = ({ type, typeId }) => {
    const { incompatibilityParams } = this.state;
    incompatibilityParams.typeId = typeId;
    incompatibilityParams.type = type;
    this.setState(incompatibilityParams, async () => {
      await this.getData();
    });
  };

  render() {
    const {
      incompatibilityParams,
      total,
      incompatibility,
      categoryList,
      substanceList,
    } = this.state;
    return (
      <PageContainer title={false}>
        <div className={styles.goodsManagementContainer}>
          <Card>
            <SearchHeader
              categoryList={categoryList}
              substanceList={substanceList}
              onAdd={() =>
                history.push({
                  pathname: '/incompatibility/edit',
                })
              }
              onQuery={this.onQuery}
            ></SearchHeader>
            <div className={styles.goodsManagementTableContainer}>
              <Table
                columns={columns(this)}
                dataSource={incompatibility}
                pagination={false}
                rowKey={(record) => record.id}
              ></Table>
            </div>
            <div className={styles.goodsManagementPaginationContainer}>
              <div>
                共 {total} 条记录 第 {total ? incompatibilityParams.page : 0} /{' '}
                {Math.ceil(total / incompatibilityParams.limit)} 页
              </div>
              <Pagination
                total={total}
                showSizeChanger
                showQuickJumper
                pageSize={incompatibilityParams.limit}
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
