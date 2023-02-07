import { Button, Card, Select, TreeSelect } from 'antd';
import React, { Component } from 'react';
import { getDrugCategoryTree, queryObjects } from '@/services/common';

const { TreeNode } = TreeSelect;

const { Option } = Select;

export default class CompositionCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      typeList: [
        {
          key: 1,
          value: '物质',
        },
        {
          key: 2,
          value: '药物',
        },
        {
          key: 3,
          value: '通用名',
        },
        {
          key: 6,
          value: '物质分类',
        },
        {
          key: 7,
          value: '药物分类',
        },
      ],
      objectList: props.item?.substanceSections?.length ? props.item?.substanceSections : [],
      drugCategoryTree: props.item?.drugCategoryTree?.length ? props.item?.drugCategoryTree : [],
      id: props.item?.id || null,
      typeId: props.item?.typeId || null,
      type: props.item?.type || null,
      categorySysCode: props.item?.categorySysCode || null,
    };
  }

  onTypeChange = (type) => {
    let { typeId, categorySysCode } = this.state;
    const { id } = this.state;
    typeId = null;
    categorySysCode = null;
    const { onChange } = this.props;
    this.queryObjects(type);
    this.setState({
      type,
      typeId,
      categorySysCode,
    });
    onChange?.({
      id,
      type,
      typeId,
      categorySysCode,
    });
  };

  queryObjects = async (type) => {
    const res = await queryObjects({ type });
    this.setState({
      objectList: res?.data ?? [],
    });
  };

  onCategorySysCodeChange = (categorySysCode) => {
    const { type, typeId, id } = this.state;
    const { onChange } = this.props;
    this.getDrugCategoryTree(categorySysCode);
    this.setState({
      categorySysCode,
    });
    onChange?.({
      id,
      type,
      typeId,
      categorySysCode,
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

  onTypeIdChange = (typeId) => {
    const { type, categorySysCode, id } = this.state;
    const { onChange } = this.props;
    this.setState({ typeId });
    onChange?.({
      id,
      type,
      typeId,
      categorySysCode,
    });
  };

  static getDerivedStateFromProps(props, state) {
    if (
      props.item?.categorySysCode !== state.categorySysCode ||
      props.item?.id !== state.id ||
      props.item?.typeId !== state.typeId ||
      props.item?.type !== state.type
    ) {
      const obj = {
        id: props.item?.id || null,
        typeId: props.item?.typeId || null,
        type: props.item?.type || null,
        categorySysCode: props.item?.categorySysCode || null,
      };
      if (!state.drugCategoryTree.length) {
        obj.drugCategoryTree = props.item?.drugCategoryTree ?? [];
      }
      return obj;
    }
    return {};
  }

  render() {
    const { typeList, type, categorySysCode, drugCategoryTree, typeId, objectList } = this.state;
    const { onDel, categoryList, style = {} } = this.props;
    return (
      <Card style={style}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div>关联类型：</div>
            <Select
              style={{ width: '460px' }}
              placeholder="请选择关联类型"
              value={type}
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              onChange={this.onTypeChange}
            >
              {typeList.map((item) => (
                <Option key={item.key} value={item.key}>
                  {item.value}
                </Option>
              ))}
            </Select>
          </div>
          <Button danger onClick={onDel}>
            删除
          </Button>
        </div>
        {(+type === 6 || +type === 7) && (
          <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
            <div>选择分类：</div>
            <Select
              placeholder="请选择分类体系"
              style={{ width: '150px' }}
              showSearch
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
            <TreeSelect
              placeholder="请选择分类"
              showSearch
              value={typeId}
              onChange={this.onTypeIdChange}
              treeNodeFilterProp="title"
              style={{ marginLeft: '10px', width: '300px' }}
            >
              {this.renderTreeNode(drugCategoryTree ?? [])}
            </TreeSelect>
          </div>
        )}
        {(+type === 1 || +type === 2 || +type === 3) && (
          <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
            <div>选择对象：</div>
            <Select
              placeholder="请选择对象"
              style={{ width: '460px' }}
              value={typeId}
              showSearch
              optionFilterProp="children"
              onChange={this.onTypeIdChange}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {objectList.map((item) => (
                <Option key={item.key} value={item.key}>
                  {item.value}
                </Option>
              ))}
            </Select>
          </div>
        )}
      </Card>
    );
  }
}
