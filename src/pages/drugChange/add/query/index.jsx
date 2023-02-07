import React, { Component, Fragment } from 'react';
import { Pagination, message, Spin, Tag } from 'antd';
import { history } from 'umi';
import throttle from 'lodash/throttle';
import styles from './index.less';
import magnifier from '@/assets/magnifier.png';
import pharmacology from '@/assets/pharmacology-category.png';
import act from '@/assets/act-category.png';
import clinical from '@/assets/clinical-category.png';
import applicableDisease from '@/assets/applicableDisease-category.png';
import cross from '@/assets/cross.png';
import noCollection from '@/assets/no-collection.png';
import circle from '@/assets/open-center-circle.png';

import {
  apiSearch,
  apiCardSearch,
  apiDrugs,
  apiDrugDetail,
  apiCollect,
} from '@/services/hospital-side';

var unlisten = null;

export default class DrugQuery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCategoryIndex: null,
      categorys: [
        { title: '药物', icon: pharmacology, type: 4 },
        { title: '药理分类', icon: pharmacology, type: 1 },
        { title: 'ATC分类', icon: act, type: 0 },
        { title: '临床2.0', icon: clinical, type: 2 },
        { title: 'Meddra', icon: applicableDisease, type: 3 },
      ],
      upperLevel: null,
      searchLoading: false,
      tags: [],
      searchTableData: [],
      keyword: '',
      pageType: 1,
      dataClassfication: [],
      paper: {
        page: 1,
        limit: 10,
        total: 0,
      },
      currentSection: null,
      drugs: [],
      drugObjectId: null,
      drugObjectType: null,
      drugDetail: {},
    };
  }

  async componentDidMount() {
    unlisten = history.listen((location, action) => {
      // 浏览器后退
      if (action === 'POP' && location.pathname === '/drugChange/add/query') {
        const { pageType } = this.state;
        const urlPageType = location.query.pageType ? parseInt(location.query.pageType) : 1;
        if (pageType !== urlPageType) {
          const data = localStorage.getItem(urlPageType);
          if (!!data) {
            this.setState({ ...JSON.parse(data) });
          }
        }
      }

      // 跳转别的页面
      // if (action === 'PUSH' && location.pathname !== '/drugChange/add/query') {
      //   console.log('触发push退出');
      //   if (unlisten) {
      //     unlisten();
      //   }
      //   localStorage.clear();
      //   return;
      // }

      // 刷新页面初始化;
      if (action === undefined && location.pathname === '/drugChange/add/query') {
        const { pageType } = this.state;
        const urlPageType = location.query.pageType ? parseInt(location.query.pageType) : 1;
        if (pageType !== urlPageType) {
          const data = localStorage.getItem(urlPageType);
          if (!!data) {
            this.setState({ ...JSON.parse(data) });
          }
        }
      }
    });
  }

  componentWillUnmount() {
    if (unlisten) {
      unlisten();
    }
    localStorage.clear();
  }

  toggleCategoryTag = async (index) => {
    this.setState({
      currentCategoryIndex: index === this.state.currentCategoryIndex ? null : index,
      tags: [],
      searchTableData: [],
      upperLevel: null,
      pageType: 1,
      keyword: '',
    });
  };

  deleteTag = (index) => {
    let tags = this.state.tags;
    tags.splice(index, 1);
    const upperLevel = tags.length === 0 ? null : tags[tags.length - 1];
    this.setState(
      {
        pageType: 1,
        tags,
        upperLevel,
      },
      this.updateSearchData,
    );
  };

  inputChange = (value) => {
    const { currentCategoryIndex } = this.state;
    this.setState(
      { keyword: value, pageType: 1 },
      currentCategoryIndex === null ? () => {} : this.updateSearchData,
    );
  };

  inputKeyUp = (e) => {
    if (e.keyCode === 13) {
      this.searchKeyword();
    }
  };

  searchKeyword = () => {
    const { keyword, currentCategoryIndex, upperLevel, tags } = this.state;

    if (tags.length === 0 && !keyword.trim()) {
      message.warning('搜索关键字或者分类不能为空');
      return;
    }

    if (tags.length !== 0) {
      this.setState(
        {
          pageType: 2,
        },
        () => this.updateCardData(upperLevel),
      );
      return;
    }

    if (tags.length === 0 && !!keyword.trim()) {
      this.setState(
        {
          currentCategoryIndex: null,
          pageType: 2,
        },
        this.updateCardData,
      );
      return;
    }
  };

  chooseSearchRow = (index) => {
    const { tags, searchTableData } = this.state;
    const row = searchTableData[index];
    tags.push(row);
    this.setState({
      upperLevel: row,
      tags,
    });

    if (row.isLeaf) {
      this.setState(
        {
          pageType: 2,
        },
        () => this.updateCardData(row),
      );

      return;
    }

    if (!row.isLeaf) {
      this.setState({ keyword: '' }, this.updateSearchData);
    }
  };

  chooseCardSection = (section) => {
    this.setState(
      {
        paper: { page: 1, limit: 10, total: 0 },
        pageType: 3,
        currentSection: section,
      },
      this.updateDrugs,
    );
  };

  changePage = (page, limit) => {
    this.setState({ paper: { ...this.state.paper, page, limit } }, this.updateDrugs);
  };

  chooseClassficationRow = (row) => {
    const types = [0, 1, 2, 3];
    if (types.includes(row.type)) {
      this.updateCardData(row);
      return;
    }
    localStorage.removeItem('3');
    this.chooseDrug(row);
  };

  chooseDrug = (drug) => {
    this.setState(
      {
        pageType: 4,
        drugObjectId: drug.objectId,
        drugObjectType: drug.objectType,
      },
      this.updateDrugDetail,
    );
  };

  updateSearchData = throttle(async () => {
    const { categorys, currentCategoryIndex, upperLevel, keyword } = this.state;

    this.setState({ searchLoading: true });

    const response = await apiSearch({
      type: categorys[currentCategoryIndex].type,
      key: keyword,
      parentType: upperLevel ? upperLevel.type : null,
      parentId: upperLevel ? upperLevel.id : null,
    });

    this.setState({ searchLoading: false });

    if (response && response.success) {
      this.setState(
        {
          searchTableData: response.data,
        },
        this.cachePageState,
      );
    }
  }, 1000);

  updateCardData = async (row) => {
    const { currentCategoryIndex, categorys, keyword } = this.state;
    if (currentCategoryIndex === null) {
      const response = await apiCardSearch({
        key: keyword,
        type: row ? row.type : null,
        parentId: row ? row.objectId : null,
      });
      if (response.success) {
        this.setState(
          {
            dataClassfication: response.data,
          },
          this.cachePageState,
        );
      }
      return;
    }

    if (currentCategoryIndex !== null) {
      const response = await apiCardSearch({
        type: row.type,
        parentId: row.id,
        parentType: categorys[currentCategoryIndex].type === 4 ? row.type : null,
      });
      if (response.success) {
        this.setState(
          {
            dataClassfication: response.data,
          },
          this.cachePageState,
        );
      }
      return;
    }
  };

  updateDrugs = async () => {
    const { currentSection, paper, keyword } = this.state;
    const { page, limit } = paper;
    const response = await apiDrugs({
      page,
      limit,
      type: currentSection.type,
      patentType: currentSection.parentType,
      // parentId: section.objectId,
      key: keyword,
      focusType: currentSection.parentType,
    });
    if (response.success) {
      const { total, list } = response.data;
      this.setState(
        {
          paper: { ...this.state.paper, total },
          drugs: list,
        },
        this.cachePageState,
      );
    }
  };

  updateDrugDetail = async () => {
    const response = await apiDrugDetail({
      objectId: this.state.drugObjectId,
      objectType: this.state.drugObjectType,
    });
    if (response.success) {
      this.setState(
        {
          pageType: 4,
          drugDetail: response.data,
        },
        this.cachePageState,
      );
    }
  };

  collect = async () => {
    const { drugDetail } = this.state;
    const response = await apiCollect(drugDetail.objectId);
    if (response.success) {
      message.success('添加成功');
      this.updateDrugDetail();
    }
  };

  cachePageState = () => {
    const { pageType } = this.state;
    localStorage.setItem(pageType, JSON.stringify(this.state));
    const urlPageType = this.props.location.query.pageType
      ? parseInt(this.props.location.query.pageType)
      : 1;
    if (urlPageType < pageType) {
      history.push({
        pathname: '/drugChange/add/query',
        query: { pageType },
      });
    }
  };

  render() {
    const {
      categorys,
      currentCategoryIndex,
      tags,
      searchTableData,
      searchLoading,
      pageType,
      keyword,
      dataClassfication,
      paper,
      drugs,
      drugDetail,
    } = this.state;
    const { commonName, hasAdded, objectType, sections = [] } = drugDetail;
    const { total, page } = paper;
    const length = tags.length || 0;

    return (
      <div className={styles.drugQuery}>
        <Fragment>
          {/* 标题 */}
          <div className={styles.drugQueryTitle}>药物字典</div>
          {/* 分类 */}
          <div className={styles.drugQueryCategoryTag}>
            {categorys.map((item, index) => (
              <div
                key={index}
                className={`${styles.drugQueryTag} ${
                  index == currentCategoryIndex
                    ? styles.drugQueryTagSelected
                    : styles.drugQueryTagNoSelected
                }`}
                onClick={() => this.toggleCategoryTag(index)}
              >
                <img className={styles.drugQueryCategoryIcon} src={item.icon} />
                <label className={styles.drugQueryCategoryTitle}>{item.title}</label>
                {/* <div className={styles.drugQueryArrow} /> */}
              </div>
            ))}
          </div>
        </Fragment>

        {/* 自适应搜索 */}
        <div className={styles.drugQuerySearch}>
          <img className={styles.drugQueryMagnifier} src={magnifier} />

          <div className={styles.drugQueryInputContainer}>
            {tags.map((tag, index) => (
              <div className={styles.inputTag} key={index}>
                <div className={styles.inputTagBorder}>
                  <span className={styles.tagText}>{tag.selectName}</span>
                  {index === length - 1 ? (
                    <img
                      className={styles.tagIcon}
                      src={cross}
                      onClick={() => this.deleteTag(index)}
                    />
                  ) : null}
                </div>
              </div>
            ))}

            <input
              className={styles.drugQueryInput}
              placeholder="请输入药物名称"
              value={keyword}
              onChange={(e) => this.inputChange(e.target.value)}
              onKeyUp={this.inputKeyUp}
            />
          </div>
          <button className={styles.drugQuerySearchBtn} onClick={this.searchKeyword}>
            搜 索
          </button>
        </div>

        {/* 搜索结果分类列表 */}
        {pageType === 1 && searchTableData.length > 0 && (
          <Spin spinning={searchLoading}>
            <div className={styles.drugQueryTable}>
              {searchTableData.map((row, index) => (
                <div
                  className={styles.drugQueryRow}
                  key={index}
                  onClick={() => this.chooseSearchRow(index)}
                >
                  {row.name}
                </div>
              ))}
            </div>
          </Spin>
        )}

        {/* 搜索结果类目 */}
        {pageType === 2 && (
          <div className={styles.drugQueryDataClassfication}>
            <div className={styles.drugQueryContainer}>
              {dataClassfication.map((section, index) => (
                <div className={styles.drugQueryCardSection} key={index}>
                  <img className={styles.drugQueryCardSectionIcon} src={circle} />
                  {section.showMore && (
                    <div
                      className={styles.drugQueryCardSectionMore}
                      onClick={() => this.chooseCardSection(section)}
                    >
                      更多 >
                    </div>
                  )}
                  <div className={styles.drugQueryCardSectionTitle}>{section.title}</div>
                  {section.results.map((row, rIndex) => (
                    <div
                      className={styles.drugQueryCardRow}
                      key={rIndex}
                      onClick={() => this.chooseClassficationRow(row)}
                    >
                      <div className={styles.drugQueryCardRowTitle}>{row.title}</div>
                      {row.lines.map((line, lineIndex) => (
                        <div className={styles.drugQueryCardLine} key={lineIndex}>
                          {line}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 结果列表页 */}
        {pageType === 3 && (
          <div className={styles.drugQueryDrugs}>
            <div className={styles.drugQueryDrugsContainer}>
              <div className={styles.drugQueryListTips}>
                {`搜索到符合 aspl 该分类下共有药品：${total}条`}
              </div>

              <div className={styles.drugQueryDrugsList}>
                {drugs.map((drug, index) => (
                  <div
                    className={styles.drugQueryRow}
                    key={index}
                    onClick={() => this.chooseDrug(drug)}
                  >
                    <div className={styles.drugQueryRowTitle}>{drug.title}</div>
                    {drug.lines.map((line, lineIndex) => (
                      <div className={styles.drugQueryRowText} key={lineIndex}>
                        {line}
                      </div>
                    ))}
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
          </div>
        )}

        {/* 药品详情页 */}
        {pageType === 4 && (
          <div className={styles.drugQueryDetail}>
            <div className={styles.drugQueryDrugsContainer}>
              <div className={styles.drugQueryDetailHead}>
                <div className={styles.drugQueryDetailName}>{commonName}</div>
                {!hasAdded && objectType === 5 && (
                  <div className={styles.drugQueryCollection} onClick={this.collect}>
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
          </div>
        )}
      </div>
    );
  }
}
