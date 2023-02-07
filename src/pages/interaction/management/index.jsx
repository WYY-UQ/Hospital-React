import { Card, Table, Pagination } from 'antd';
import SearchHeader from './components/SearchHeader';
import React, { Component } from 'react';
import { columns } from './config';
import styles from './index.less';
import { PageContainer } from '@ant-design/pro-layout';
import { queryInteractions, deleteInteraction } from '@/services/interaction';
import { queryCommonDicts, queryObjects } from '@/services/common';
import { history } from 'umi';

export default class InteractionManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0,
      interaction: [],
      substanceList: [],
      categoryList: [],
      interactionParams: {
        page: 1,
        limit: 10,
        typeId: null,
        type: null,
      },
    };
  }

  async componentDidMount() {
    await this.getData();
  }

  getData = async () => {
    const { interactionParams } = this.state;
    const interactionRes = await queryInteractions(interactionParams);
    const { total, list } = interactionRes.data;
    let { categoryList, substanceList } = this.state;
    const dicRes = await queryCommonDicts(5);
    categoryList = dicRes?.data[0]?.dicts ?? [];
    substanceList =
      (
        await queryObjects({
          type: 1,
        })
      )?.data ?? [];

    if (interactionRes) {
      this.setState({
        total,
        categoryList,
        substanceList,
        interaction: list,
      });
    }
  };

  onShowSizeChange = (current, size) => {
    const { interactionParams } = this.state;
    interactionParams.page = current;
    interactionParams.limit = size;
    this.setState(
      {
        interactionParams,
      },
      async () => {
        await this.getData();
      },
    );
  };

  onPageChange = (page) => {
    const { interactionParams } = this.state;
    interactionParams.page = page;
    this.setState(
      {
        interactionParams,
      },
      async () => {
        await this.getData();
      },
    );
  };

  goToEdit = (interactionId) => {
    history.push({
      pathname: '/interaction/edit',
      query: {
        interactionId,
      },
    });
  };

  disabledConfirm = async (interactionId) => {
    const res = await deleteInteraction({
      interactionId,
    });
    if (res) {
      await this.getData();
    }
  };

  onQuery = ({ type, typeId }) => {
    const { interactionParams } = this.state;
    interactionParams.typeId = typeId;
    interactionParams.type = type;
    this.setState(interactionParams, async () => {
      await this.getData();
    });
  };

  render() {
    const { interactionParams, total, interaction, categoryList } = this.state;
    return (
      <PageContainer title={false}>
        <div className={styles.goodsManagementContainer}>
          <Card>
            <SearchHeader
              categoryList={categoryList}
              onAdd={() =>
                history.push({
                  pathname: '/interaction/edit',
                })
              }
              onQuery={this.onQuery}
            ></SearchHeader>
            <div className={styles.goodsManagementTableContainer}>
              <Table
                columns={columns(this)}
                dataSource={interaction}
                pagination={false}
                rowKey={(record) => record.id}
              ></Table>
            </div>
            <div className={styles.goodsManagementPaginationContainer}>
              <div>
                共 {total} 条记录 第 {total ? interactionParams.page : 0} /{' '}
                {Math.ceil(total / interactionParams.limit)} 页
              </div>
              <Pagination
                total={total}
                showSizeChanger
                showQuickJumper
                pageSize={interactionParams.limit}
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
