import { Card, Table, Pagination } from 'antd';
import SearchHeader from './components/SearchHeader';
import React, { Component } from 'react';
import { columns } from './config';
import styles from './index.less';
import { PageContainer } from '@ant-design/pro-layout';
import { queryHospitals, deleteHospital } from '@/services/hospital';
import { queryRegions, queryCommonDicts } from '@/services/common';
import { history } from 'umi';

export default class HospitalManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      regionList: [],
      gradeList: [],
      levelList: [],
      total: 0,
      hospitals: [],
      hospitalsParams: {
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
    let { regionList, levelList, gradeList } = this.state;
    const regionsRes = await queryRegions();
    regionList = regionsRes?.data ?? [];
    levelList = (await queryCommonDicts(3))?.data[0]?.dicts ?? [];
    gradeList = (await queryCommonDicts(25))?.data[0]?.dicts ?? [];
    this.setState({
      regionList,
      levelList,
      gradeList,
    });
    await this.getData();
  }

  getData = async () => {
    const { hospitalsParams } = this.state;
    const hospitalsRes = await queryHospitals(hospitalsParams);
    const { total, list } = hospitalsRes.data;
    if (hospitalsRes) {
      this.setState({
        total,
        hospitals: list,
      });
    }
  };

  onShowSizeChange = (current, size) => {
    const { hospitalsParams } = this.state;
    hospitalsParams.page = current;
    hospitalsParams.limit = size;
    this.setState(
      {
        hospitalsParams,
      },
      async () => {
        await this.getData();
      },
    );
  };

  onPageChange = (page) => {
    const { hospitalsParams } = this.state;
    hospitalsParams.page = page;
    this.setState(
      {
        hospitalsParams,
      },
      async () => {
        await this.getData();
      },
    );
  };

  goToEdit = (hospitalId) => {
    history.push({
      pathname: '/hospital/edit',
      query: {
        hospitalId,
      },
    });
  };

  disabledConfirm = async (hospitalId) => {
    const res = await deleteHospital({
      hospitalId,
    });
    if (res) {
      await this.getData();
    }
  };

  onQuery = ({ country, province, city, distinct, key }) => {
    const { hospitalsParams } = this.state;
    hospitalsParams.country = country;
    hospitalsParams.province = province;
    hospitalsParams.city = city;
    hospitalsParams.distinct = distinct;
    hospitalsParams.key = key;
    this.setState(hospitalsParams, async () => {
      await this.getData();
    });
  };

  render() {
    const { hospitalsParams, total, hospitals, regionList, gradeList, levelList } = this.state;
    return (
      <PageContainer title={false}>
        <div className={styles.goodsManagementContainer}>
          <Card>
            <SearchHeader
              regionList={regionList}
              levelList={levelList}
              gradeList={gradeList}
              onAdd={() =>
                history.push({
                  pathname: '/hospital/edit',
                })
              }
              onQuery={this.onQuery}
            ></SearchHeader>
            <div className={styles.goodsManagementTableContainer}>
              <Table
                columns={columns(this)}
                dataSource={hospitals}
                pagination={false}
                rowKey={(record) => record.id}
              ></Table>
            </div>
            <div className={styles.goodsManagementPaginationContainer}>
              <div>
                共 {total} 条记录 第 {total ? hospitalsParams.page : 0} /{' '}
                {Math.ceil(total / hospitalsParams.limit)} 页
              </div>
              <Pagination
                total={total}
                showSizeChanger
                showQuickJumper
                pageSize={hospitalsParams.limit}
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
