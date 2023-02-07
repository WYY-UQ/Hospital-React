import { Card, Table, Pagination } from 'antd';
import SearchHeader from './components/SearchHeader';
import React, { Component } from 'react';
import { columns } from './config';
import styles from './index.less';
import { PageContainer } from '@ant-design/pro-layout';
import { queryCompanies, deleteCompany } from '@/services/company';
import { queryRegions } from '@/services/common';
import { history } from 'umi';

export default class CompanyManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      regionList: [],
      total: 0,
      companies: [],
      companiesParams: {
        page: 1,
        limit: 10,
        key: '',
        country: null,
        province: null,
        city: null,
        distinct: null,
      },
    };
  }

  async componentDidMount() {
    let { regionList } = this.state;
    const regionsRes = await queryRegions();
    regionList = regionsRes?.data ?? [];
    this.setState({
      regionList,
    });
    await this.getData();
  }

  getData = async () => {
    const { companiesParams } = this.state;
    const companiesRes = await queryCompanies(companiesParams);
    const { total, list } = companiesRes.data;
    if (companiesRes) {
      this.setState({
        total,
        companies: list,
      });
    }
  };

  onShowSizeChange = (current, size) => {
    const { companiesParams } = this.state;
    companiesParams.page = current;
    companiesParams.limit = size;
    this.setState(
      {
        companiesParams,
      },
      async () => {
        await this.getData();
      },
    );
  };

  onPageChange = (page) => {
    const { companiesParams } = this.state;
    companiesParams.page = page;
    this.setState(
      {
        companiesParams,
      },
      async () => {
        await this.getData();
      },
    );
  };

  goToEdit = (companyId) => {
    history.push({
      pathname: '/company/edit',
      query: {
        companyId,
      },
    });
  };

  disabledConfirm = async (companyId) => {
    const res = await deleteCompany({
      companyId,
    });
    if (res) {
      await this.getData();
    }
  };

  onQuery = ({ country, province, city, distinct, key }) => {
    const { companiesParams } = this.state;
    companiesParams.country = country;
    companiesParams.province = province;
    companiesParams.city = city;
    companiesParams.distinct = distinct;
    companiesParams.key = key;
    this.setState(companiesParams, async () => {
      await this.getData();
    });
  };

  render() {
    const { companiesParams, total, companies, regionList } = this.state;
    return (
      <PageContainer title={false}>
        <div className={styles.goodsManagementContainer}>
          <Card>
            <SearchHeader
              regionList={regionList}
              onAdd={() =>
                history.push({
                  pathname: '/company/edit',
                })
              }
              onQuery={this.onQuery}
            ></SearchHeader>
            <div className={styles.goodsManagementTableContainer}>
              <Table
                columns={columns(this)}
                dataSource={companies}
                pagination={false}
                rowKey={(record) => record.id}
              ></Table>
            </div>
            <div className={styles.goodsManagementPaginationContainer}>
              <div>
                共 {total} 条记录 第 {total ? companiesParams.page : 0} /{' '}
                {Math.ceil(total / companiesParams.limit)} 页
              </div>
              <Pagination
                total={total}
                showSizeChanger
                showQuickJumper
                pageSize={companiesParams.limit}
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
