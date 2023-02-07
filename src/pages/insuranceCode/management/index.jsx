import { Card, Table, Pagination } from 'antd';
import SearchHeader from './components/SearchHeader';
import React, { Component } from 'react';
import { columns } from './config';
import styles from './index.less';
import { PageContainer } from '@ant-design/pro-layout';
import {
  queryMedicalInsurances,
  deleteCommodityMedicalInsurances,
} from '@/services/insurance-code';
import { queryObjects, queryRegions } from '@/services/common';
import { history } from 'umi';

export default class InsuranceCodeManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      commodityList: [],
      regionList: [],
      total: 0,
      commodities: [],
      commoditiesParams: {
        page: 1,
        limit: 10,
        commodityId: null,
        province: null,
      },
    };
  }

  async componentDidMount() {
    let { commodityList, regionList } = this.state;
    const comodityRes = await queryObjects({ type: 5 });
    commodityList = comodityRes?.data ?? [];
    const regionsRes = await queryRegions();
    regionList = regionsRes?.data ?? [];
    regionList = regionList.filter((item) => item.level === 1);
    this.setState({
      commodityList,
      regionList,
    });
    await this.getData();
  }

  getData = async () => {
    const { commoditiesParams } = this.state;
    const commoditiesRes = await queryMedicalInsurances(commoditiesParams);
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
      pathname: '/insuranceCode/edit',
      query: {
        commodityId,
      },
    });
  };

  disabledConfirm = async (commodityId) => {
    const res = await deleteCommodityMedicalInsurances({
      commodityId,
    });
    if (res) {
      await this.getData();
    }
  };

  onQuery = ({ commodityId, province }) => {
    const { commoditiesParams } = this.state;
    commoditiesParams.commodityId = commodityId;
    commoditiesParams.province = province;
    this.setState(commoditiesParams, async () => {
      await this.getData();
    });
  };

  render() {
    const { commoditiesParams, total, commodities, regionList, commodityList } = this.state;
    return (
      <PageContainer title={false}>
        <div className={styles.goodsManagementContainer}>
          <Card>
            <SearchHeader
              regionList={regionList}
              commodityList={commodityList}
              onAdd={() =>
                history.push({
                  pathname: '/insuranceCode/edit',
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
                共 {total} 条记录 第 {total ? commoditiesParams.page : 0} /{' '}
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
