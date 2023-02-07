import { Card, Table, Pagination } from 'antd';
import SearchHeader from './components/SearchHeader';
import React, { Component } from 'react';
import { columns } from './config';
import styles from './index.less';
import { PageContainer } from '@ant-design/pro-layout';
import { queryLiteratureChapters, deleteLiteratureChapter } from '@/services/literature';
import { queryCommonDicts } from '@/services/common';
import { history } from 'umi';

export default class ChapterManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0,
      chapter: [],
      typeList: [],
      chapterParams: {
        literatureId: null,
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
    const { chapterParams } = this.state;
    const { literatureId } = this.props.location.query;
    chapterParams.literatureId = literatureId;
    const chapterRes = await queryLiteratureChapters(chapterParams);
    const { total, list } = chapterRes.data;
    let { typeList } = this.state;
    const dicRes = await queryCommonDicts(19);
    typeList = dicRes?.data[0]?.dicts ?? [];

    if (chapterRes) {
      this.setState({
        total,
        typeList,
        chapter: list,
      });
    }
  };

  onShowSizeChange = (current, size) => {
    const { chapterParams } = this.state;
    chapterParams.page = current;
    chapterParams.limit = size;
    this.setState(
      {
        chapterParams,
      },
      async () => {
        await this.getData();
      },
    );
  };

  onPageChange = (page) => {
    const { chapterParams } = this.state;
    chapterParams.page = page;
    this.setState(
      {
        chapterParams,
      },
      async () => {
        await this.getData();
      },
    );
  };

  goToEdit = (chapterId) => {
    history.push({
      pathname: '/literature/chapter/edit',
      query: {
        chapterId,
      },
    });
  };

  disabledConfirm = async (chapterId) => {
    const res = await deleteLiteratureChapter({
      chapterId,
    });
    if (res) {
      await this.getData();
    }
  };

  onQuery = ({ key }) => {
    const { chapterParams } = this.state;
    chapterParams.key = key;
    this.setState(chapterParams, async () => {
      await this.getData();
    });
  };

  render() {
    const { chapterParams, total, chapter, typeList } = this.state;
    const { literatureId } = this.props.location.query;
    return (
      <PageContainer title={false}>
        <div className={styles.goodsManagementContainer}>
          <Card>
            <SearchHeader
              typeList={typeList}
              onAdd={() =>
                history.push({
                  pathname: '/literature/chapter/edit',
                  query: {
                    literatureId,
                  },
                })
              }
              onQuery={this.onQuery}
            ></SearchHeader>
            <div className={styles.goodsManagementTableContainer}>
              <Table
                columns={columns(this)}
                dataSource={chapter}
                pagination={false}
                rowKey={(record) => record.id}
              ></Table>
            </div>
            <div className={styles.goodsManagementPaginationContainer}>
              <div>
                共 {total} 条记录 第 {total ? chapterParams.page : 0} /{' '}
                {Math.ceil(total / chapterParams.limit)} 页
              </div>
              <Pagination
                total={total}
                showSizeChanger
                showQuickJumper
                pageSize={chapterParams.limit}
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
