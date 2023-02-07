import { Card, Table, Pagination } from 'antd';
import SearchHeader from './components/SearchHeader';
import React, { Component } from 'react';
import { columns } from './config';
import styles from './index.less';
import { PageContainer } from '@ant-design/pro-layout';
import { queryAdverseReactionTpls, deleteAdverseReactionTpl } from '@/services/adverse-reaction';
import { queryCommonDicts } from '@/services/common';
import { history } from 'umi';

export default class Template extends Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0,
      materialCategoryList: [],
      codeSchemeList: [],
      tpls: [],
      tplsParams: {
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
    const { tplsParams } = this.state;
    const tplsRes = await queryAdverseReactionTpls(tplsParams);
    const { total, list } = tplsRes.data;
    if (tplsRes) {
      this.setState({
        total,
        tpls: list,
      });
    }
  };

  onShowSizeChange = (current, size) => {
    const { tplsParams } = this.state;
    tplsParams.page = current;
    tplsParams.limit = size;
    this.setState(
      {
        tplsParams,
      },
      async () => {
        await this.getData();
      },
    );
  };

  onPageChange = (page) => {
    const { tplsParams } = this.state;
    tplsParams.page = page;
    this.setState(
      {
        tplsParams,
      },
      async () => {
        await this.getData();
      },
    );
  };

  goToEdit = (tplId) => {
    history.push({
      pathname: '/basicData/adverseReaction/templateEdit',
      query: {
        tplId,
      },
    });
  };

  disabledConfirm = async (tplId) => {
    const res = await deleteAdverseReactionTpl({
      tplId,
    });
    if (res) {
      await this.getData();
    }
  };

  onQuery = (key) => {
    const { tplsParams } = this.state;
    tplsParams.key = key;
    this.setState(tplsParams, async () => {
      await this.getData();
    });
  };

  render() {
    const { tplsParams, total, tpls } = this.state;
    return (
      <PageContainer title={false}>
        <div className={styles.goodsManagementContainer}>
          <Card>
            <SearchHeader
              onAdd={() =>
                history.push({
                  pathname: '/basicData/adverseReaction/templateEdit',
                })
              }
              onQuery={this.onQuery}
            ></SearchHeader>
            <div className={styles.goodsManagementTableContainer}>
              <Table
                columns={columns(this)}
                dataSource={tpls}
                pagination={false}
                rowKey={(record) => record.id}
              ></Table>
            </div>
            <div className={styles.goodsManagementPaginationContainer}>
              <div>
                共 {total} 条记录 第 {total ? tplsParams.page : 0} /{' '}
                {Math.ceil(total / tplsParams.limit)} 页
              </div>
              <Pagination
                total={total}
                showSizeChanger
                showQuickJumper
                pageSize={tplsParams.limit}
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
