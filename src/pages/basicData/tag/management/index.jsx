import { Card, Table, Pagination } from 'antd';
import SearchHeader from './components/SearchHeader';
import React, { Component } from 'react';
import { columns } from './config';
import styles from './index.less';
import { PageContainer } from '@ant-design/pro-layout';
import { queryTags, disableTag } from '@/services/tag';
import { history } from 'umi';

export default class TagManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0,
      tag: [],
      typeList: [
        {
          key: 0,
          value: '通用标签',
        },
        {
          key: 1,
          value: '物质标签',
        },
        {
          key: 2,
          value: '药物标签',
        },
        {
          key: 3,
          value: '通用名标签',
        },
        {
          key: 4,
          value: '产品标签',
        },
        {
          key: 5,
          value: '商品标签',
        },
      ],
      tagParams: {
        page: 1,
        limit: 10,
        key: '',
        type: null,
      },
    };
  }

  async componentDidMount() {
    await this.getData();
  }

  getData = async () => {
    const { tagParams } = this.state;
    const tagRes = await queryTags(tagParams);
    const { total, list } = tagRes.data;

    if (tagRes) {
      this.setState({
        total,
        tag: list,
      });
    }
  };

  onShowSizeChange = (current, size) => {
    const { tagParams } = this.state;
    tagParams.page = current;
    tagParams.limit = size;
    this.setState(
      {
        tagParams,
      },
      async () => {
        await this.getData();
      },
    );
  };

  onPageChange = (page) => {
    const { tagParams } = this.state;
    tagParams.page = page;
    this.setState(
      {
        tagParams,
      },
      async () => {
        await this.getData();
      },
    );
  };

  goToEdit = (tagId) => {
    history.push({
      pathname: '/basicData/tag/edit',
      query: {
        tagId,
      },
    });
  };

  disabledConfirm = async (tagId) => {
    const res = await disableTag({
      tagId,
    });
    if (res) {
      await this.getData();
    }
  };

  onQuery = ({ key, type }) => {
    const { tagParams } = this.state;
    tagParams.key = key;
    tagParams.type = type;
    this.setState(tagParams, async () => {
      await this.getData();
    });
  };

  render() {
    const { tagParams, total, tag, typeList } = this.state;
    return (
      <PageContainer title={false}>
        <div className={styles.goodsManagementContainer}>
          <Card>
            <SearchHeader
              typeList={typeList}
              onAdd={() =>
                history.push({
                  pathname: '/basicData/tag/edit',
                })
              }
              onQuery={this.onQuery}
            ></SearchHeader>
            <div className={styles.goodsManagementTableContainer}>
              <Table
                columns={columns(this)}
                dataSource={tag}
                pagination={false}
                rowKey={(record) => record.id}
              ></Table>
            </div>
            <div className={styles.goodsManagementPaginationContainer}>
              <div>
                共 {total} 条记录 第 {total ? tagParams.page : 0} /{' '}
                {Math.ceil(total / tagParams.limit)} 页
              </div>
              <Pagination
                total={total}
                showSizeChanger
                showQuickJumper
                pageSize={tagParams.limit}
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
