import React, { Component } from 'react';
import { TreeSelect, Button, Select } from 'antd';
import styles from './index.less';
import { getDrugCategoryTree } from '@/services/common';
import { PlusOutlined } from '@ant-design/icons';

const { TreeNode } = TreeSelect;
const { Option } = Select;

export default class SearchHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      typeList: [
        {
          key: 1,
          value: '物质',
        },
        {
          key: 6,
          value: '物质分类',
        },
      ],
      categorySysCode: null,
      drugCategoryTree: [],
      typeId: null,
      type: null,
    };
  }

  onCategorySysCodeChange = (categorySysCode) => {
    this.getDrugCategoryTree(categorySysCode);
    this.setState({
      categorySysCode,
      typeId: null,
    });
  };

  getDrugCategoryTree = async (sysCode) => {
    const res = await getDrugCategoryTree({
      sysCode,
    });
    const drugCategoryTree = res?.data ?? [];
    this.setState({
      drugCategoryTree,
    });
  };

  renderTreeNode = (drugCategoryTree) => {
    return drugCategoryTree.map((item) => (
      <TreeNode key={item.value} value={item.value} title={item.title}>
        {this.renderTreeNode(item?.children ?? [])}
      </TreeNode>
    ));
  };

  onTypeChange = (type) => {
    this.setState({
      type,
    });
  };

  onTypeIdChange = (typeId) => {
    this.setState({ typeId });
  };

  render() {
    const { typeId, type, categorySysCode, drugCategoryTree, typeList } = this.state;
    const { onAdd, onQuery, categoryList = [], substanceList = [] } = this.props;
    return (
      <div className={styles.searchHeaderContainer}>
        <div className={styles.searchItem}>
          <div className={styles.searchTitle}>关联类型:</div>
          <Select
            placeholder="请选择关联类型"
            showSearch
            allowClear
            style={{ width: '100px' }}
            value={type}
            onChange={this.onTypeChange}
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {typeList.map((item) => (
              <Option key={item.key} value={item.key}>
                {item.value}
              </Option>
            ))}
          </Select>
        </div>
        <div className={styles.searchItem} style={{ marginLeft: '10px' }}>
          <div className={styles.searchTitle}>分类体系:</div>
          <Select
            placeholder="请选择分类体系"
            style={{ width: '150px' }}
            showSearch
            allowClear
            value={categorySysCode}
            optionFilterProp="children"
            onChange={this.onCategorySysCodeChange}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {categoryList.map((item) => (
              <Option key={item.key} value={item.key}>
                {item.value}
              </Option>
            ))}
          </Select>
        </div>

        <div className={styles.searchItem} style={{ marginLeft: '10px' }}>
          <div className={styles.searchTitle}>{categorySysCode ? '药物类型' : '物质'}:</div>
          {!categorySysCode && (
            <Select
              placeholder="请选择物质"
              style={{ width: '150px' }}
              value={typeId}
              showSearch
              allowClear
              optionFilterProp="children"
              onChange={this.onTypeIdChange}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {substanceList.map((item) => (
                <Option key={item.key} value={item.key}>
                  {item.value}
                </Option>
              ))}
            </Select>
          )}

          {categorySysCode && (
            <TreeSelect
              allowClear
              placeholder="请选择分类"
              showSearch
              value={typeId}
              onChange={this.onTypeIdChange}
              treeNodeFilterProp="title"
              style={{ marginLeft: '10px', width: '150px' }}
            >
              {this.renderTreeNode(drugCategoryTree ?? [])}
            </TreeSelect>
          )}
        </div>

        <div className={styles.searchButtonItem}>
          <Button
            type="primary"
            className={styles.searchButton}
            onClick={() =>
              onQuery({
                type,
                typeId,
              })
            }
          >
            查询
          </Button>
          <Button type="primary" icon={<PlusOutlined />} onClick={onAdd}>
            新建
          </Button>
        </div>
      </div>
    );
  }
}
