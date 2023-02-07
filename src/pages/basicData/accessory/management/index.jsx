import { Card, Table, Pagination } from 'antd';
import SearchHeader from './components/SearchHeader';
import React, { Component } from 'react';
import { columns } from './config';
import styles from './index.less';
import { PageContainer } from '@ant-design/pro-layout';
import { queryAccessorys, deleteAccessory } from '@/services/accessory';
import { history } from 'umi';

export default class ScanManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0,
      accessory: [],
      accessoryParams: {
        page: 1,
        limit: 10,
        key: '',
      },
    };
  }

  async componentDidMount() {
    await this.getData();
  }

  getData = async () => {
    const { accessoryParams } = this.state;
    const accessoryRes = await queryAccessorys(accessoryParams);
    const { total, list } = accessoryRes.data;

    if (accessoryRes) {
      this.setState({
        total,
        accessory: list,
      });
    }
  };

  onShowSizeChange = (current, size) => {
    const { accessoryParams } = this.state;
    accessoryParams.page = current;
    accessoryParams.limit = size;
    this.setState(
      {
        accessoryParams,
      },
      async () => {
        await this.getData();
      },
    );
  };

  onPageChange = (page) => {
    const { accessoryParams } = this.state;
    accessoryParams.page = page;
    this.setState(
      {
        accessoryParams,
      },
      async () => {
        await this.getData();
      },
    );
  };

  goToEdit = (accessoryId) => {
    history.push({
      pathname: '/basicData/accessory/edit',
      query: {
        accessoryId,
      },
    });
  };

  disabledConfirm = async (accessoryId) => {
    const res = await deleteAccessory({
      accessoryId,
    });
    if (res) {
      await this.getData();
    }
  };

  onQuery = (key) => {
    const { accessoryParams } = this.state;
    accessoryParams.key = key;
    this.setState(accessoryParams, async () => {
      await this.getData();
    });
  };

  render() {
    const { accessoryParams, total, accessory, typeList } = this.state;
    return (
      <PageContainer title={false}>
        <div className={styles.goodsManagementContainer}>
          <Card>
            <SearchHeader
              typeList={typeList}
              onAdd={() =>
                history.push({
                  pathname: '/basicData/accessory/edit',
                })
              }
              onQuery={this.onQuery}
            ></SearchHeader>
            <div className={styles.goodsManagementTableContainer}>
              <Table
                columns={columns(this)}
                dataSource={accessory}
                pagination={false}
                rowKey={(record) => record.id}
              ></Table>
            </div>
            <div className={styles.goodsManagementPaginationContainer}>
              <div>
                共 {total} 条记录 第 {total ? accessoryParams.page : 0} /{' '}
                {Math.ceil(total / accessoryParams.limit)} 页
              </div>
              <Pagination
                total={total}
                showSizeChanger
                showQuickJumper
                pageSize={accessoryParams.limit}
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
