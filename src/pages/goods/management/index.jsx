import { Card, Table, Pagination } from 'antd';
import SearchHeader from './components/SearchHeader';
import React, { Component } from 'react';
import { columns } from './config';
import styles from './index.less';
import { PageContainer } from '@ant-design/pro-layout';
import { queryCommodities, disableCommodity } from '@/services/good';
import { history } from 'umi';
import { queryCompanies } from '@/services/common';

export default class GoodsManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0,
      commodities: [],
      medicineCategoryList: [],
      commoditiesParams: {
        page: 1,
        limit: 10,
        key: '',
        manufactureId: null,
      },
    };
  }

  async componentDidMount() {
    let medicineCategoryList = [];
    const companyRes = await queryCompanies();
    if (companyRes) {
      medicineCategoryList = companyRes.data;
    }
    this.setState({
      medicineCategoryList,
    });
    await this.getData();
  }

  getData = async () => {
    const { commoditiesParams } = this.state;
    const commoditiesRes = await queryCommodities(commoditiesParams);
    const { total, list } = commoditiesRes.data;
    if (commoditiesRes) {
      this.setState({
        total,
        commodities: list,
      });
    }
  };

  onShowSizeChange = (current, size) => {
    const { commoditiesParams } = this.state;
    commoditiesParams.page = current;
    commoditiesParams.limit = size;
    this.setState(
      {
        commoditiesParams,
      },
      async () => {
        await this.getData();
      },
    );
  };

  onPageChange = (page) => {
    const { commoditiesParams } = this.state;
    commoditiesParams.page = page;
    this.setState(
      {
        commoditiesParams,
      },
      async () => {
        await this.getData();
      },
    );
  };

  goToEdit = (commodityId) => {
    history.push({
      pathname: '/goods/edit',
      query: {
        commodityId,
      },
    });
  };

  disabledConfirm = async (commodityId) => {
    const res = await disableCommodity({
      commodityId,
    });
    if (res) {
      await this.getData();
    }
  };

  onQuery = (manufactureId, key) => {
    const { commoditiesParams } = this.state;
    commoditiesParams.key = key;
    commoditiesParams.manufactureId = manufactureId;
    this.setState(commoditiesParams, async () => {
      await this.getData();
    });
  };

  render() {
    const { commoditiesParams, total, commodities, medicineCategoryList } = this.state;
    return (
      <PageContainer title={false}>
        <div className={styles.goodsManagementContainer}>
          <Card>
            <SearchHeader
              medicineCategoryList={medicineCategoryList}
              onAdd={() =>
                history.push({
                  pathname: '/goods/edit',
                })
              }
              onQuery={this.onQuery}
            ></SearchHeader>
            <div className={styles.goodsManagementTableContainer}>
              <Table
                columns={columns(this)}
                dataSource={commodities}
                pagination={false}
                rowKey={(record) => record.id}
              ></Table>
            </div>
            <div className={styles.goodsManagementPaginationContainer}>
              <div>
                共 {total} 条记录 第 {total ? commoditiesParams.page : 0} /
                {Math.ceil(total / commoditiesParams.limit)} 页
              </div>
              <Pagination
                total={total}
                showSizeChanger
                showQuickJumper
                pageSize={commoditiesParams.limit}
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
