import { Card, Table, Pagination } from 'antd';
import SearchHeader from './components/SearchHeader';
import React, { Component } from 'react';
import { columns } from './config';
import styles from './index.less';
import { PageContainer } from '@ant-design/pro-layout';
import { history } from 'umi';
import { queryHospitalDrugs } from '@/services/hospital-side';

export default class MedicineManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0,
      durgs: [],
      durgsParams: {
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
    const { durgsParams } = this.state;
    const durgsRes = await queryHospitalDrugs(durgsParams);
    const { total, list } = durgsRes.data;
    if (durgsRes) {
      this.setState({
        total,
        durgs: list,
      });
    }
  };

  onShowSizeChange = (current, size) => {
    const { durgsParams } = this.state;
    durgsParams.page = current;
    durgsParams.limit = size;
    this.setState(
      {
        durgsParams,
      },
      async () => {
        await this.getData();
      },
    );
  };

  onPageChange = (page) => {
    const { durgsParams } = this.state;
    durgsParams.page = page;
    this.setState(
      {
        durgsParams,
      },
      async () => {
        await this.getData();
      },
    );
  };

  goToEdit = (drugId) => {
    history.push({
      pathname: '/drug/edit',
      query: {
        drugId,
      },
    });
  };

  // disabledConfirm = async (drugId) => {
  //   const res = await disableDrug({
  //     drugId,
  //   });
  //   if (res) {
  //     await this.getData();
  //   }
  // };

  onQuery = (key) => {
    const { durgsParams } = this.state;
    durgsParams.key = key;
    this.setState(durgsParams, async () => {
      await this.getData();
    });
  };

  render() {
    const { durgsParams, total, durgs } = this.state;
    return (
      <PageContainer title={false}>
        <div className={styles.goodsManagementContainer}>
          <Card>
            <SearchHeader
              onAdd={() =>
                history.push({
                  pathname: '/drug/edit',
                })
              }
              onQuery={this.onQuery}
            ></SearchHeader>
            <div className={styles.goodsManagementTableContainer}>
              <Table
                columns={columns(this)}
                dataSource={durgs}
                pagination={false}
                rowKey={(record) => record.id}
              ></Table>
            </div>
            <div className={styles.goodsManagementPaginationContainer}>
              <div>
                共 {total} 条记录 第 {total ? durgsParams.page : 0} /
                {Math.ceil(total / durgsParams.limit)} 页
              </div>
              <Pagination
                total={total}
                showSizeChanger
                showQuickJumper
                pageSize={durgsParams.limit}
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
