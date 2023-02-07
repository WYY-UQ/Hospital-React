import { Card, Table, Pagination } from 'antd';
import SearchHeader from './components/SearchHeader';
import React, { Component } from 'react';
import { columns } from './config';
import styles from './index.less';
import { PageContainer } from '@ant-design/pro-layout';
import { queryDicts, deleteDict } from '@/services/dict';
import { history } from 'umi';

export default class TasteManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0,
      dict: [],
      dictParams: {
        page: 1,
        limit: 10,
        key: '',
        type: 11,
      },
    };
  }

  async componentDidMount() {
    await this.getData();
  }

  getData = async () => {
    const { dictParams } = this.state;
    const dictRes = await queryDicts(dictParams);
    const { total, list } = dictRes.data;

    if (dictRes) {
      this.setState({
        total,
        dict: list,
      });
    }
  };

  onShowSizeChange = (current, size) => {
    const { dictParams } = this.state;
    dictParams.page = current;
    dictParams.limit = size;
    this.setState(
      {
        dictParams,
      },
      async () => {
        await this.getData();
      },
    );
  };

  onPageChange = (page) => {
    const { dictParams } = this.state;
    dictParams.page = page;
    this.setState(
      {
        dictParams,
      },
      async () => {
        await this.getData();
      },
    );
  };

  goToEdit = (dictId) => {
    history.push({
      pathname: '/basicData/taste/edit',
      query: {
        dictId,
      },
    });
  };

  disabledConfirm = async (dictId) => {
    const res = await deleteDict({
      dictId,
    });
    if (res) {
      await this.getData();
    }
  };

  onQuery = (key) => {
    const { dictParams } = this.state;
    dictParams.key = key;
    this.setState(dictParams, async () => {
      await this.getData();
    });
  };

  render() {
    const { dictParams, total, dict, typeList } = this.state;
    return (
      <PageContainer title={false}>
        <div className={styles.goodsManagementContainer}>
          <Card>
            <SearchHeader
              typeList={typeList}
              onAdd={() =>
                history.push({
                  pathname: '/basicData/taste/edit',
                })
              }
              onQuery={this.onQuery}
            ></SearchHeader>
            <div className={styles.goodsManagementTableContainer}>
              <Table
                columns={columns(this)}
                dataSource={dict}
                pagination={false}
                rowKey={(record) => record.id}
              ></Table>
            </div>
            <div className={styles.goodsManagementPaginationContainer}>
              <div>
                共 {total} 条记录 第 {total ? dictParams.page : 0} /{' '}
                {Math.ceil(total / dictParams.limit)} 页
              </div>
              <Pagination
                total={total}
                showSizeChanger
                showQuickJumper
                pageSize={dictParams.limit}
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
