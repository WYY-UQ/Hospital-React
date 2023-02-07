import { getDrugCategoryTree, queryCategoryObjects } from '@/services/common';
import { Card, Select, Tabs, TreeSelect, Tag, notification } from 'antd';
import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';

const { Option } = Select;
const { TabPane } = Tabs;
const { TreeNode } = TreeSelect;

export default class DrugGroupClassification extends Component {
  constructor(props) {
    super(props);

    this.state = {
      drugCategoryTree: [],
      sysCode: props.value?.sysCode || null,
      itemId: props.value?.itemId || null,
      excludeSubstanceSelections: [],
      substance: null,
      excludeSubstances: props.value?.excludeSubstances?.length
        ? props.value?.excludeSubstances
        : [],
      excludeDrugSelections: [],
      drug: null,
      id: props.value?.id || uuidv4(),
      excludeDrugs: props.value?.excludeDrugs?.length ? props.value?.excludeDrugs : [],
      itemType: props.value?.itemType || 6,
    };
  }

  onSysCodeChange = async (sysCode) => {
    const {
      itemType,
      excludeDrugs,
      excludeSubstances,
      itemId,
      id,
      excludeDrugSelections,
      excludeSubstanceSelections,
    } = this.state;
    const { onChange } = this.props;
    const drugCategoryTree = await this.getDrugCategoryTree(sysCode);
    this.setState({
      sysCode,
      itemId: null,
    });
    onChange?.({
      id,
      itemType,
      excludeDrugs,
      excludeSubstances,
      sysCode,
      itemId,
      drugCategoryTree,
      excludeDrugSelections,
      excludeSubstanceSelections,
    });
  };

  onItemIdChange = async (itemId) => {
    const { itemType, excludeDrugs, excludeSubstances, sysCode, id, drugCategoryTree } = this.state;
    const { onChange } = this.props;
    let { excludeSubstanceSelections, excludeDrugSelections } = this.state;
    excludeSubstanceSelections =
      (
        await queryCategoryObjects({
          sysCode,
          categoryId: itemId,
          objectType: 1,
        })
      )?.data ?? [];

    excludeDrugSelections =
      (
        await queryCategoryObjects({
          sysCode,
          categoryId: itemId,
          objectType: 2,
        })
      )?.data ?? [];
    this.setState({ itemId, excludeSubstanceSelections, excludeDrugSelections });
    onChange?.({
      id,
      itemType,
      excludeDrugs,
      excludeSubstances,
      sysCode,
      itemId,
      excludeDrugSelections,
      excludeSubstanceSelections,
      drugCategoryTree,
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
    return drugCategoryTree;
  };

  renderTreeNode = (drugCategoryTree) => {
    return drugCategoryTree.map((item) => (
      <TreeNode key={item.value} value={item.value} title={item.title}>
        {this.renderTreeNode(item?.children ?? [])}
      </TreeNode>
    ));
  };

  onSubstanceChange = (excludeItemId) => {
    const {
      excludeSubstances,
      itemType,
      excludeDrugs,
      sysCode,
      itemId,
      id,
      excludeDrugSelections,
      excludeSubstanceSelections,
      drugCategoryTree,
    } = this.state;
    const { onChange } = this.props;
    const exit = excludeSubstances.find((item) => item.excludeItemId === excludeItemId);
    if (exit) {
      notification.warn({
        message: '提示',
        description: '已存在改物质',
      });
      return;
    }
    const substance = excludeSubstanceSelections.find((item) => item.key === excludeItemId);
    excludeSubstances.push({
      excludeItemId,
      excludeItemName: substance?.value,
      excludeItemType: 1,
    });
    this.setState({
      excludeSubstances,
    });
    onChange?.({
      id,
      itemType,
      excludeDrugs,
      excludeSubstances,
      sysCode,
      itemId,
      excludeDrugSelections,
      excludeSubstanceSelections,
      drugCategoryTree,
    });
  };

  delSubstance = (excludeItemId) => {
    const {
      itemType,
      excludeDrugs,
      sysCode,
      itemId,
      id,
      excludeDrugSelections,
      excludeSubstanceSelections,
      drugCategoryTree,
    } = this.state;
    const { onChange } = this.props;
    let { excludeSubstances } = this.state;
    excludeSubstances = excludeSubstances.filter((item) => item.excludeItemId !== excludeItemId);
    this.setState({
      excludeSubstances,
    });
    onChange?.({
      id,
      itemType,
      excludeDrugs,
      excludeSubstances,
      sysCode,
      itemId,
      excludeDrugSelections,
      excludeSubstanceSelections,
      drugCategoryTree,
    });
  };

  onDrugChange = (excludeItemId) => {
    const {
      excludeSubstances,
      excludeDrugs,
      itemType,
      sysCode,
      itemId,
      id,
      excludeDrugSelections,
      excludeSubstanceSelections,
      drugCategoryTree,
    } = this.state;
    const exit = excludeDrugs.find((item) => item.excludeItemId === excludeItemId);
    const { onChange } = this.props;
    if (exit) {
      notification.warn({
        message: '提示',
        description: '已存在改物质',
      });
      return;
    }
    const drug = excludeDrugSelections.find((item) => item.key === excludeItemId);
    excludeDrugs.push({
      excludeItemId,
      excludeItemName: drug?.value,
      excludeItemType: 2,
    });
    this.setState({
      excludeDrugs,
    });
    onChange?.({
      id,
      itemType,
      excludeDrugs,
      excludeSubstances,
      sysCode,
      itemId,
      excludeDrugSelections,
      excludeSubstanceSelections,
      drugCategoryTree,
    });
  };

  delDrug = (excludeItemId) => {
    let { excludeDrugs } = this.state;
    const {
      excludeSubstances,
      itemType,
      sysCode,
      itemId,
      id,
      excludeDrugSelections,
      excludeSubstanceSelections,
      drugCategoryTree,
    } = this.state;
    const { onChange } = this.props;
    excludeDrugs = excludeDrugs.filter((item) => item.excludeItemId !== excludeItemId);
    this.setState({
      excludeDrugs,
    });
    onChange?.({
      id,
      itemType,
      excludeDrugs,
      excludeSubstances,
      sysCode,
      itemId,
      excludeDrugSelections,
      excludeSubstanceSelections,
      drugCategoryTree,
    });
  };

  static getDerivedStateFromProps(props, state) {
    if (
      props.value?.id !== state.id ||
      props.value?.sysCode !== state.sysCode ||
      props.value?.itemId !== state.itemId ||
      props.value?.itemType !== state.itemType ||
      JSON.stringify(props.value?.excludeSubstances) !== JSON.stringify(state.excludeSubstances) ||
      JSON.stringify(props.value?.excludeDrugs) !== JSON.stringify(state.excludeDrugs) ||
      JSON.stringify(props.value?.excludeSubstanceSelections) !==
        JSON.stringify(state.excludeSubstanceSelections) ||
      JSON.stringify(props.value?.excludeDrugSelections) !==
        JSON.stringify(state.excludeDrugSelections) ||
      JSON.stringify(props.value?.drugCategoryTree) !== JSON.stringify(state.drugCategoryTree)
    ) {
      return {
        drugCategoryTree: props.value?.drugCategoryTree || [],
        excludeSubstanceSelections: props.value?.excludeSubstanceSelections || [],
        excludeDrugSelections: props.value?.excludeDrugSelections || [],
        sysCode: props.value?.sysCode || null,
        itemId: props.value?.itemId || null,
        excludeSubstances: props.value?.excludeSubstances?.length
          ? props.value?.excludeSubstances
          : [],
        id: props.value?.id || uuidv4(),
        excludeDrugs: props.value?.excludeDrugs?.length ? props.value?.excludeDrugs : [],
        itemType: props.value?.itemType || 6,
      };
    }
    return {};
  }

  render() {
    const {
      sysCode,
      itemId,
      drugCategoryTree,
      objectType,
      substance,
      excludeSubstanceSelections,
      excludeSubstances,
      excludeDrugSelections,
      drug,
      excludeDrugs,
    } = this.state;
    const { sysCodeList = [] } = this.props;
    return (
      <Card style={{ marginBottom: '30px' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          选择分类：
          <Select
            style={{ width: '200px', marginRight: '10px' }}
            placeholder="请选择分类体系"
            value={sysCode}
            onChange={this.onSysCodeChange}
          >
            {sysCodeList?.map((item) => (
              <Option key={item.key} value={item.key}>
                {item.value}
              </Option>
            ))}
          </Select>
          <TreeSelect
            placeholder="请选择分类"
            showSearch
            value={itemId}
            onChange={this.onItemIdChange}
            treeNodeFilterProp="title"
            style={{ width: '200px' }}
          >
            {this.renderTreeNode(drugCategoryTree ?? [])}
          </TreeSelect>
        </div>
        <div style={{ marginTop: '20px' }}>
          <Tabs type="card" activeKey={objectType}>
            <TabPane tab="排除物质" key="1">
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div>选择物质：</div>
                <Select
                  placeholder="请选择物质"
                  style={{ width: '200px' }}
                  value={substance}
                  onChange={this.onSubstanceChange}
                >
                  {excludeSubstanceSelections?.map((item) => (
                    <Option key={item.key} value={item.key}>
                      {item.value}
                    </Option>
                  ))}
                </Select>
              </div>

              <div style={{ display: 'flex', marginTop: '10px' }}>
                {excludeSubstances?.map((item) => (
                  <Tag
                    key={item.excludeItemId}
                    closable
                    onClose={() => {
                      this.delSubstance(item.excludeItemId);
                    }}
                    style={{
                      marginTop: '10px',
                      marginRight: '10px',
                      background: '#F5F5F5',
                      padding: '5px',
                      border: '1px solid #D9D9D9',
                      borderRadius: '3px',
                    }}
                  >
                    {item.excludeItemName}
                  </Tag>
                ))}
              </div>
            </TabPane>
            <TabPane tab="排除药物" key="2">
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div>选择药物：</div>
                <Select
                  placeholder="请选择药物"
                  style={{ width: '200px' }}
                  value={drug}
                  onChange={this.onDrugChange}
                >
                  {excludeDrugSelections?.map((item) => (
                    <Option key={item.key} value={item.key}>
                      {item.value}
                    </Option>
                  ))}
                </Select>
              </div>

              <div style={{ display: 'flex', marginTop: '10px' }}>
                {excludeDrugs?.map((item) => (
                  <Tag
                    key={item.excludeItemId}
                    closable
                    onClose={() => {
                      this.delDrug(item.excludeItemId);
                    }}
                    style={{
                      marginTop: '10px',
                      marginRight: '10px',
                      background: '#F5F5F5',
                      padding: '5px',
                      border: '1px solid #D9D9D9',
                      borderRadius: '3px',
                    }}
                  >
                    {item.excludeItemName}
                  </Tag>
                ))}
              </div>
            </TabPane>
          </Tabs>
        </div>
      </Card>
    );
  }
}
