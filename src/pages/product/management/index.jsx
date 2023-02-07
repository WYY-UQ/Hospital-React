import { Card, Table, Pagination } from 'antd';
import SearchHeader from './components/SearchHeader';
import React, { Component } from 'react';
import { columns } from './config';
import styles from './index.less';
import { PageContainer } from '@ant-design/pro-layout';
import { queryProducts, disableProduct } from '@/services/product';
import { queryCommonDicts, queryCompanies } from '@/services/common';
import { history } from 'umi';

export default class ProductManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0,
      medicineCategoryList: [],
      codeSchemeList: [],
      product: [],
      productParams: {
        page: 1,
        limit: 10,
        key: '',
        manufactureId: '',
      },
    };
  }

  async componentDidMount() {
    const dictRes = await queryCommonDicts(0);
    let medicineCategoryList = [];
    let codeSchemeList = [];

    if (dictRes) {
      const tempCodeSchemeDict = dictRes.data.find((item) => item.dictType === 2);
      if (tempCodeSchemeDict?.dicts) {
        codeSchemeList = tempCodeSchemeDict?.dicts;
      }
    }

    const companyRes = await queryCompanies();
    if (companyRes) {
      medicineCategoryList = companyRes.data;
    }
    await this.getData();
    this.setState({
      codeSchemeList,
      medicineCategoryList,
    });
  }

  getData = async () => {
    const { productParams } = this.state;
    const productRes = await queryProducts(productParams);
    const { total, list } = productRes.data;
    if (productRes) {
      this.setState({
        total,
        product: list,
      });
    }
  };

  onShowSizeChange = (current, size) => {
    const { productParams } = this.state;
    productParams.page = current;
    productParams.limit = size;
    this.setState(
      {
        productParams,
      },
      async () => {
        await this.getData();
      },
    );
  };

  onPageChange = (page) => {
    const { productParams } = this.state;
    productParams.page = page;
    this.setState(
      {
        productParams,
      },
      async () => {
        await this.getData();
      },
    );
  };

  goToEdit = (productId) => {
    history.push({
      pathname: '/product/edit',
      query: {
        productId,
      },
    });
  };

  disabledConfirm = async (productId) => {
    const res = await disableProduct({
      productId,
    });
    if (res) {
      await this.getData();
    }
  };

  onQuery = (manufactureId, key) => {
    const { productParams } = this.state;
    productParams.key = key;
    productParams.manufactureId = manufactureId;
    this.setState(productParams, async () => {
      await this.getData();
    });
  };

  render() {
    const { productParams, total, product, medicineCategoryList } = this.state;
    return (
      <PageContainer title={false}>
        <div className={styles.goodsManagementContainer}>
          <Card>
            <SearchHeader
              medicineCategoryList={medicineCategoryList}
              onAdd={() =>
                history.push({
                  pathname: '/product/edit',
                })
              }
              onQuery={this.onQuery}
            ></SearchHeader>
            <div className={styles.goodsManagementTableContainer}>
              <Table
                columns={columns(this)}
                dataSource={product}
                pagination={false}
                rowKey={(record) => record.id}
              ></Table>
            </div>
            <div className={styles.goodsManagementPaginationContainer}>
              <div>
                共 {total} 条记录 第 {total ? productParams.page : 0} /{' '}
                {Math.ceil(total / productParams.limit)} 页
              </div>
              <Pagination
                total={total}
                showSizeChanger
                showQuickJumper
                pageSize={productParams.limit}
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
