import React, { Component, Fragment } from 'react';
import { Pagination, message, Spin } from 'antd';
import styles from './index.less';
import magnifier from '@/assets/magnifier.png';
import pharmacology from '@/assets/pharmacology-category.png';
import act from '@/assets/act-category.png';
import clinical from '@/assets/clinical-category.png';
import applicableDisease from '@/assets/applicableDisease-category.png';
import noCollection from '@/assets/no-collection.png';
import circle from '@/assets/open-center-circle.png';

import { apiCategory, apiSearch, apiDrugDetail } from '@/services/hospital-side';

export default class DrugQuery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categorys: [
        { title: '药理分类', icon: pharmacology, type: 1 },
        { title: 'ATC分类', icon: act, type: 0 },
        { title: '临床2.0', icon: clinical, type: 2 },
        { title: 'Meddra', icon: applicableDisease, type: 3 },
      ],
      categoryLoading: false,
      categoryColumns: [],
      drugs: [],
      currentCategoryIndex: 0,
      upperLevel: null,
      pageType: 1,
      keyword: '',
      paper: {
        page: 1,
        limit: 10,
        total: 0,
      },
      drugDetail: {
        commonName: '',
        hasAdded: false,
        sections: [],
      },
    };
  }

  async componentDidMount() {
    await this.updateCategory();
  }

  updateCategory = async (columnIndex = -1) => {
    const { categorys, currentCategoryIndex, upperLevel, categoryColumns } = this.state;

    this.setState({ categoryLoading: true });

    const response = await apiCategory({
      type: categorys[currentCategoryIndex].type,
      parentId: upperLevel ? upperLevel.key : null,
    });

    this.setState({ categoryLoading: false });

    if (response && response.success) {
      if (categoryColumns.length - 1 === columnIndex) {
        const columns = categoryColumns;
        columns.push(response.data);
        this.setState({
          categoryColumns: columns,
        });
        return;
      }

      if (categoryColumns.length - 1 !== columnIndex) {
        const columns = categoryColumns;
        columns.length = columnIndex + 1;
        columns.push(response.data);
        this.setState({
          categoryColumns: columns,
        });
      }
    }
  };

  chooseCategory = async (category, columnIndex) => {
    if (!category.isLeaf) {
      this.setState(
        {
          upperLevel: category,
        },
        () => this.updateCategory(columnIndex),
      );
    }

    if (category.isLeaf) {
      this.setState(
        {
          paper: { page: 1, limit: 10, total: 0 },
          keyword: '',
        },
        () =>
          this.updateList(this.state.categorys[this.state.currentCategoryIndex].type, category.key),
      );
    }
  };

  chooseCategoryTag = async (index) => {
    this.setState(
      {
        currentCategoryIndex: index,
        upperLevel: null,
      },
      () => this.updateCategory(),
    );
  };

  inputChange = (value) => {
    this.setState({ keyword: value });
  };

  inputKeyUp = (e) => {
    if (e.keyCode === 13) {
      this.searchKeyword();
    }
  };

  searchKeyword = async () => {
    const { keyword } = this.state;

    if (!keyword.trim()) {
      message.warning('搜索关键字不能为空');
      return;
    }

    this.setState(
      {
        paper: { page: 1, limit: 10, total: 0 },
      },
      () => this.updateList(),
    );
  };

  changePage = (page, limit) => {
    this.setState({ paper: { ...this.state.paper, page, limit } }, () => this.updateList());
  };

  updateList = async (searchType = null, key) => {
    const { keyword } = this.state;
    const { page, limit } = this.state.paper;
    const response = await apiSearch({
      searchType,
      key: searchType === null ? keyword : key,
      page,
      limit,
    });
    if (response.success) {
      const { total, list } = response.data;
      this.setState({
        pageType: 2,
        paper: { ...this.state.paper, total },
        drugs: list,
      });
    }
  };

  chooseDrug = async (commodityId) => {
    if (commodityId) {
      const response = await apiDrugDetail(commodityId);
      if (response.success) {
        this.setState({
          pageType: 3,
          drugDetail: response.data,
        });
      }
    }
  };

  render() {
    const { total, page } = this.state.paper;
    const { commonName, hasAdded, sections } = this.state.drugDetail;
    return (
      <div className={styles.drugQuery}>
        <div className={styles.drugQueryTitle}>XXXXX</div>

        <div className={styles.drugQueryCategoryTag}>
          {this.state.categorys.map((item, index) => (
            <div
              key={index}
              className={styles.drugQueryTag}
              onClick={() => this.chooseCategoryTag(index)}
            >
              <img className={styles.drugQueryCategoryIcon} src={item.icon} />
              <label className={styles.drugQueryCategoryTitle}>{item.title}</label>
              <div className={styles.drugQueryArrow} />
            </div>
          ))}
        </div>

        <div className={styles.drugQuerySearch}>
          <img className={styles.drugQueryMagnifier} src={magnifier} />
          <input
            className={styles.drugQueryInput}
            placeholder="请输入药物名称"
            onChange={(e) => this.inputChange(e.target.value)}
            onKeyUp={this.inputKeyUp}
          />
          <button className={styles.drugQuerySearchBtn} onClick={this.searchKeyword}>
            搜 索
          </button>
        </div>

        {this.state.pageType === 1 ? (
          <Fragment>
            {/* <div className={styles.drugQueryCategoryTag}>
              {this.state.categorys.map((item, index) => (
                <div
                  key={index}
                  className={styles.drugQueryTag}
                  onClick={() => this.chooseCategoryTag(index)}
                >
                  <img className={styles.drugQueryCategoryIcon} src={item.icon} />
                  <label className={styles.drugQueryCategoryTitle}>{item.title}</label>
                  <div className={styles.drugQueryArrow} />
                </div>
              ))}
            </div> */}

            <Spin spinning={this.state.categoryLoading}>
              <div className={styles.drugQueryCategory}>
                {this.state.categoryColumns.map((item, index) => (
                  <div className={styles.drugQueryCategoryColumn} key={index}>
                    {this.state.categoryColumns[index].map((category, cIndex) => (
                      <div
                        className={styles.drugQueryCategoryRow}
                        key={cIndex}
                        onClick={() => this.chooseCategory(category, index)}
                      >
                        {category.title}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </Spin>
          </Fragment>
        ) : null}

        {this.state.pageType === 2 ? (
          <div className={styles.drugQueryList}>
            <div className={styles.drugQueryListTips}>
              {`搜索到符合 aspl 该分类下共有药品：${total}条`}
            </div>
            <div className={styles.drugQueryListContainer}>
              {this.state.drugs.map((drug, index) => (
                <div
                  className={styles.drugQueryRow}
                  key={index}
                  onClick={() => this.chooseDrug(drug.commodityId)}
                >
                  <div className={styles.drugQueryRowTitle}>
                    {`${drug.commonName} - ${drug.manufacture}`}
                  </div>
                  <div className={styles.drugQueryRowText}>{`商品名：${drug.commodityName}`}</div>
                  <div className={styles.drugQueryRowText}>{`适应症：${drug.indication}`}</div>
                </div>
              ))}
            </div>
            <div className={styles.drugQueryPagination}>
              <Pagination
                simple
                current={page}
                total={total}
                onChange={(_page, pageSize) => this.changePage(_page, pageSize)}
              />
            </div>
          </div>
        ) : null}

        {this.state.pageType === 3 && this.state.drugDetail ? (
          <div className={styles.drugQueryDetail}>
            <div className={styles.drugQueryDetailHead}>
              <div className={styles.drugQueryDetailName}>{commonName}</div>
              {!hasAdded ? null : (
                <div className={styles.drugQueryCollection}>
                  <div className={styles.drugQueryCollectionTips}>添加至本院药品清单</div>
                  <img className={styles.drugQueryCollectionIcon} src={noCollection} />
                </div>
              )}
            </div>
            <div className={styles.drugQueryDetailTips}>
              {'请仔细阅读说明书并在医生的指导下使用'}
            </div>

            {sections.map((section, index) => (
              <div className={styles.drugQueryDetailRow} key={index}>
                <img className={styles.drugQueryDetailRowCircle} src={circle} />
                <div className={styles.drugQueryDetailRowTitle}>{section.title}</div>
                {section.lines.map((line, lIndex) => (
                  <div className={styles.drugQueryDetailRowText} key={lIndex}>
                    {line}
                  </div>
                ))}
              </div>
            ))}
          </div>
        ) : null}
      </div>
    );
  }
}
