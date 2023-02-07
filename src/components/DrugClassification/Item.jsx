import React, { Component } from 'react';
import { Select, TreeSelect } from 'antd';
import { DeleteFilled } from '@ant-design/icons';
import { v4 as uuidv4 } from 'uuid';
import { getDrugCategoryTree } from '@/services/common';

const { Option } = Select;
const { TreeNode } = TreeSelect;

export default class DrugClassificationItem extends Component {
  constructor(props) {
    super(props);

    getDrugCategoryTree({ sysCode: props.item?.sysCode }).then((res) => {
      const drugCategoryTree = res?.data ?? [];

      this.setState({
        drugCategoryTree,
      });
    });

    this.state = {
      drugCategoryTree: [],
      categoryId: props.item?.categoryId || null,
      sysCode: props.item?.sysCode || null,
      id: props.item?.id || uuidv4(),
    };
  }

  renderTreeNode = (drugCategoryTree) => {
    return drugCategoryTree.map((item) => (
      <TreeNode key={item.value} value={item.value} title={item.title}>
        {this.renderTreeNode(item?.children ?? [])}
      </TreeNode>
    ));
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

  oncCategoryIdChange = (categoryId) => {
    const { sysCode, id } = this.state;
    const { onChange, index } = this.props;
    this.setState({
      categoryId,
    });
    onChange?.(index, {
      id,
      categoryId,
      sysCode,
    });
  };

  onSysCodeChange = (sysCode) => {
    const { categoryId, id } = this.state;
    const { onChange, index } = this.props;
    this.getDrugCategoryTree(sysCode);
    this.setState({
      sysCode,
    });
    onChange?.(index, {
      id,
      categoryId,
      sysCode,
    });
  };

  static async getDerivedStateFromProps(props, state) {
    if (
      props.item?.categoryId !== state.categoryId ||
      props.item?.sysCode !== state.sysCode ||
      props.item?.id !== state.id
    ) {
      return {
        categoryId: props.item?.categoryId || null,
        sysCode: props.item?.sysCode || null,
        id: props.item?.id || uuidv4(),
      };
    }
    return {};
  }

  render() {
    const { categoryId, sysCode, drugCategoryTree } = this.state;
    const { sysList = [], onDel, index } = this.props;
    return (
      <div style={{ display: 'flex', marginBottom: '10px', alignItems: 'center' }}>
        <Select
          placeholder="分类体系"
          value={sysCode}
          onChange={this.onSysCodeChange}
          style={{ width: '130px', marginRight: '10px' }}
        >
          {sysList.map((item) => (
            <Option key={item.key} value={item.key}>
              {item.value}
            </Option>
          ))}
        </Select>
        <TreeSelect
          placeholder="请选择药理分类"
          showSearch
          value={categoryId}
          onChange={this.oncCategoryIdChange}
          treeNodeFilterProp="title"
          style={{ width: '270px', marginRight: '10px' }}
        >
          {this.renderTreeNode(drugCategoryTree ?? [])}
        </TreeSelect>
        <DeleteFilled
          style={{ fontSize: '20px', color: 'red', marginRight: '5px' }}
          onClick={() => onDel(index)}
        />
      </div>
    );
  }
}
