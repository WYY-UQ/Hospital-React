import { Card, Table, Pagination } from 'antd';
import SearchHeader from './components/SearchHeader';
import React, { Component } from 'react';
import { columns } from './config';
import styles from './index.less';
import { PageContainer } from '@ant-design/pro-layout';
import { queryLiteratures, deleteLiterature } from '@/services/literature';
import { queryCommonDicts } from '@/services/common';
import { history } from 'umi';

export default class LiteratureManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0,
      literature: [],
      typeList: [],
      literatureParams: {
        page: 1,
        limit: 10,
        key: '',
        type: null,
      },
    };
  }

  async componentDidMount() {
    await this.getData();
  }

  getData = async () => {
    const { literatureParams } = this.state;
    const literatureRes = await queryLiteratures(literatureParams);
    const { total, list } = literatureRes.data;
    let { typeList } = this.state;
    const dicRes = await queryCommonDicts(19);
    typeList = dicRes?.data[0]?.dicts ?? [];

    if (literatureRes) {
      this.setState({
        total,
        typeList,
        literature: list,
      });
    }
  };

  onShowSizeChange = (current, size) => {
    const { literatureParams } = this.state;
    literatureParams.page = current;
    literatureParams.limit = size;
    this.setState(
      {
        literatureParams,
      },
      async () => {
        await this.getData();
      },
    );
  };

  onPageChange = (page) => {
    const { literatureParams } = this.state;
    literatureParams.page = page;
    this.setState(
      {
        literatureParams,
      },
      async () => {
        await this.getData();
      },
    );
  };

  goToEdit = (literatureId) => {
    history.push({
      pathname: '/literature/edit',
      query: {
        literatureId,
      },
    });
  };

  goToChapter = (literatureId) => {
    history.push({
      pathname: '/literature/chapter/management',
      query: {
        literatureId,
      },
    });
  };

  goToScan = (literatureId) => {
    history.push({
      pathname: '/literature/management/scan/upload',
      query: {
        literatureId,
      },
    });
  };

  disabledConfirm = async (literatureId) => {
    const res = await deleteLiterature({
      literatureId,
    });
    if (res) {
      await this.getData();
    }
  };

  onQuery = ({ key, type }) => {
    const { literatureParams } = this.state;
    literatureParams.key = key;
    literatureParams.type = type;
    this.setState(literatureParams, async () => {
      await this.getData();
    });
  };

  render() {
    const { literatureParams, total, literature, typeList } = this.state;
    return (
      <PageContainer title={false}>
        <div className={styles.goodsManagementContainer}>
          <Card>
            <SearchHeader
              typeList={typeList}
              onAdd={() =>
                history.push({
                  pathname: '/literature/edit',
                })
              }
              onQuery={this.onQuery}
            ></SearchHeader>
            <div className={styles.goodsManagementTableContainer}>
              <Table
                columns={columns(this)}
                dataSource={literature}
                pagination={false}
                rowKey={(record) => record.id}
              ></Table>
            </div>
            <div className={styles.goodsManagementPaginationContainer}>
              <div>
                共 {total} 条记录 第 {total ? literatureParams.page : 0} /{' '}
                {Math.ceil(total / literatureParams.limit)} 页
              </div>
              <Pagination
                total={total}
                showSizeChanger
                showQuickJumper
                pageSize={literatureParams.limit}
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
