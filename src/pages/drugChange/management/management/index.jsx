import { Card, Table, Pagination } from 'antd';
import SearchHeader from './components/SearchHeader';
import React, { Component } from 'react';
import { columns } from './config';
import styles from './index.less';
import { PageContainer } from '@ant-design/pro-layout';
import { history } from 'umi';
import { queryHospitalDrugChanges } from '@/services/hospital-side';

export default class DrugChangeManagementManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0,
      durgs: [],
      durgsParams: {
        page: 1,
        limit: 10,
        type: null,
        key: null,
      },
    };
  }

  async componentDidMount() {
    await this.getData();
  }

  getData = async () => {
    const { durgsParams } = this.state;
    const durgsRes = await queryHospitalDrugChanges(durgsParams);
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

  goToEdit = (changeId) => {
    history.push({
      pathname: '/drugChange/management/edit',
      query: {
        changeId,
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

  onQuery = ({ type, key }) => {
    const { durgsParams } = this.state;
    durgsParams.type = type;
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
            <SearchHeader onQuery={this.onQuery}></SearchHeader>
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
