import { Card, Table, Pagination } from 'antd';
import SearchHeader from './components/SearchHeader';
import React, { Component } from 'react';
import { columns } from './config';
import styles from './index.less';
import { PageContainer } from '@ant-design/pro-layout';
import { queryCommonDicts } from '@/services/common';
import { queryTasks } from '@/services/import-task';
import { history } from 'umi';

export default class ImportManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      typeList: [],
      total: 0,
      tasks: [],
      tasksParams: {
        page: 1,
        limit: 10,
        type: null,
        status: null,
        startTime: null,
        endTime: null,
      },
    };
  }

  async componentDidMount() {
    let { typeList } = this.state;
    typeList = (await queryCommonDicts(31))?.data[0]?.dicts ?? [];
    this.setState({
      typeList,
    });
    await this.getData();
  }

  getData = async () => {
    const { tasksParams } = this.state;
    Object.keys(tasksParams).forEach((key) => {
      if (tasksParams[key] === null || tasksParams[key] === undefined) {
        delete tasksParams[key];
      }
    });
    const tasksRes = await queryTasks(tasksParams);
    const { total, list } = tasksRes?.data ?? {};
    if (tasksRes) {
      this.setState({
        total,
        tasks: list,
      });
    }
  };

  onShowSizeChange = (current, size) => {
    const { tasksParams } = this.state;
    tasksParams.page = current;
    tasksParams.limit = size;
    this.setState(
      {
        tasksParams,
      },
      async () => {
        await this.getData();
      },
    );
  };

  onPageChange = (page) => {
    const { tasksParams } = this.state;
    tasksParams.page = page;
    this.setState(
      {
        tasksParams,
      },
      async () => {
        await this.getData();
      },
    );
  };

  onQuery = ({ type, status, startTime, endTime }) => {
    const { tasksParams } = this.state;
    tasksParams.type = type;
    tasksParams.status = status;
    tasksParams.startTime = startTime;
    tasksParams.endTime = endTime;
    this.setState(tasksParams, async () => {
      await this.getData();
    });
  };

  download = (fileUrl) => {
    window.open(fileUrl);
  };

  render() {
    const { tasksParams, total, tasks, typeList } = this.state;
    return (
      <PageContainer title={false}>
        <div className={styles.goodsManagementContainer}>
          <Card>
            <SearchHeader
              typeList={typeList}
              onAdd={() =>
                history.push({
                  pathname: '/import/edit',
                })
              }
              onQuery={this.onQuery}
            ></SearchHeader>
            <div className={styles.goodsManagementTableContainer}>
              <Table
                columns={columns(this)}
                dataSource={tasks}
                pagination={false}
                rowKey={(record) => record.id}
              ></Table>
            </div>
            <div className={styles.goodsManagementPaginationContainer}>
              <div>
                共 {total} 条记录 第 {total ? tasksParams.page : 0} /{' '}
                {Math.ceil(total / tasksParams.limit)} 页
              </div>
              <Pagination
                total={total}
                showSizeChanger
                showQuickJumper
                pageSize={tasksParams.limit}
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
