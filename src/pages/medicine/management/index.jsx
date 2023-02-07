import { Card, Table, Pagination } from 'antd';
import SearchHeader from './components/SearchHeader';
import React, { Component } from 'react';
import { columns } from './config';
import styles from './index.less';
import { PageContainer } from '@ant-design/pro-layout';
import { queryDrugs,disableDrug } from '@/services/medicine';
import { queryCommonDicts } from '@/services/common';
import { history } from 'umi';

export default class MedicineManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0,
      medicineCategoryList: [],
      codeSchemeList: [],
      durgs: [],
      durgsParams: {
        page: 1,
        limit: 10,
        key: '',
        type: '',
      },
    };
  }

  async componentDidMount() {
    const dictRes = await queryCommonDicts(0);
    let medicineCategoryList = [];
    let codeSchemeList = [];

    if (dictRes) {
      const tempMedicineCategorDict = dictRes.data.find((item) => item.dictType === 4);
      if (tempMedicineCategorDict?.dicts) {
        medicineCategoryList = tempMedicineCategorDict?.dicts;
      }
      const tempCodeSchemeDict = dictRes.data.find((item) => item.dictType === 2);
      if (tempCodeSchemeDict?.dicts) {
        codeSchemeList = tempCodeSchemeDict?.dicts;
      }
    }
    await this.getData();
    this.setState({
      codeSchemeList,
      medicineCategoryList,
    });
  }

  getData = async () => {
    const { durgsParams } = this.state;
    const durgsRes = await queryDrugs(durgsParams);
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
      pathname: '/medicine/edit',
      query: {
        drugId,
      },
    });
  };

  disabledConfirm = async (drugId) => {
    const res = await disableDrug({
      drugId,
    });
    if (res) {
      await this.getData();
    }
  };

  onQuery = (type, key) => {
    const { durgsParams } = this.state;
    durgsParams.key = key;
    durgsParams.type = type;
    this.setState(durgsParams, async () => {
      await this.getData();
    });
  };

  render() {
    const { durgsParams, total, durgs, medicineCategoryList } = this.state;
    return (
      <PageContainer title={false}>
        <div className={styles.goodsManagementContainer}>
          <Card>
            <SearchHeader
              medicineCategoryList={medicineCategoryList}
              onAdd={() =>
                history.push({
                  pathname: '/medicine/edit',
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
                共 {total} 条记录 第 {total ? durgsParams.page : 0} /{' '}
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
