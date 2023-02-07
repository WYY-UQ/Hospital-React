import { Button, Collapse, Tabs, Select, Tag, notification } from 'antd';
import React, { Component } from 'react';
import DrugGroupClassification from './DrugGroupClassification';
import { PlusOutlined } from '@ant-design/icons';
import { v4 as uuidv4 } from 'uuid';

const { TabPane } = Tabs;
const { Panel } = Collapse;
const { Option } = Select;

export default class DrugGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      substance: null,
      drug: null,
      substances: props.value?.substances?.length ? props.value?.substances : [],
      drugs: props.value?.drugs?.length ? props.value?.drugs : [],
      id: props.value?.id || uuidv4(),
      categories: props.value?.categories?.length
        ? props.value?.categories
        : [
            {
              excludeDrugs: [],
              excludeSubstances: [],
              itemId: null,
              id: uuidv4(),
              itemType: 6,
              sysCode: null,
            },
          ],
    };
  }

  onSubstanceChange = (itemId) => {
    const { substances, id, drugs, categories } = this.state;
    const { substanceList, onChange } = this.props;
    const exit = substances.find((item) => item.itemId === itemId);
    if (exit) {
      notification.warn({
        message: '提示',
        description: '已存在改物质',
      });
      return;
    }
    const substance = substanceList.find((item) => item.key === itemId);
    substances.push({
      itemId,
      itemName: substance?.value,
      itemType: 1,
    });
    this.setState({
      substances,
    });
    onChange?.({
      substances,
      id,
      drugs,
      categories,
    });
  };

  delSubstance = (itemId) => {
    const { id, drugs, categories } = this.state;
    const { onChange } = this.props;
    let { substances } = this.state;
    substances = substances.filter((item) => item.itemId !== itemId);
    this.setState({
      substances,
    });
    onChange?.({
      substances,
      id,
      drugs,
      categories,
    });
  };

  onDrugChange = (itemId) => {
    const { substances, id, drugs, categories } = this.state;
    const { drugList, onChange } = this.props;
    const exit = drugs.find((item) => item.itemId === itemId);
    if (exit) {
      notification.warn({
        message: '提示',
        description: '已存在改物质',
      });
      return;
    }
    const drug = drugList.find((item) => item.key === itemId);
    drugs.push({
      itemId,
      itemName: drug?.value,
      itemType: 2,
    });
    this.setState({
      drugs,
    });
    onChange?.({
      substances,
      id,
      drugs,
      categories,
    });
  };

  delDrug = (itemId) => {
    const { id, substances, categories } = this.state;
    const { onChange } = this.props;
    let { drugs } = this.state;
    drugs = drugs.filter((item) => item.itemId !== itemId);
    this.setState({
      drugs,
    });
    onChange?.({
      substances,
      id,
      drugs,
      categories,
    });
  };

  onAddCategory = () => {
    const { categories } = this.state;
    categories.push({
      excludeDrugs: [],
      excludeSubstances: [],
      itemId: null,
      id: uuidv4(),
      itemName: null,
      itemType: 6,
    });
    this.setState({
      categories,
    });
  };

  onCategoryChange = (index, value) => {
    const { substances, id, drugs, categories } = this.state;
    const { onChange } = this.props;
    categories.splice(index, 1, value);
    this.setState({
      categories,
    });
    onChange?.({
      substances,
      id,
      drugs,
      categories,
    });
  };

  static getDerivedStateFromProps(props, state) {
    if (
      props.value?.id !== state.id ||
      JSON.stringify(props.value?.substances) !== JSON.stringify(state.substances) ||
      JSON.stringify(props.value?.drugs) !== JSON.stringify(state.drugs) ||
      JSON.stringify(props.value?.categories) !== JSON.stringify(state.categories)
    ) {
      return {
        substances: props.value?.substances?.length ? props.value?.substances : [],
        drugs: props.value?.drugs?.length ? props.value?.drugs : [],
        id: props.value?.id || uuidv4(),
        categories: props.value?.categories?.length
          ? props.value?.categories
          : [
              {
                excludeDrugs: [],
                excludeSubstances: [],
                itemId: null,
                id: uuidv4(),
                itemType: 6,
                sysCode: null,
              },
            ],
      };
    }
    return {};
  }

  render() {
    const { substance, substances, drugs, drug, categories } = this.state;
    const { substanceList = [], drugList = [], sysCodeList = [], onDel } = this.props;
    return (
      <Collapse defaultActiveKey={['1']} style={{ marginBottom: '30px' }}>
        <Panel
          header="药物组"
          key="1"
          extra={
            <Button danger size="small" onClick={onDel}>
              删除
            </Button>
          }
        >
          <Tabs type="card">
            <TabPane tab="物质" key="substance">
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div>选择物质：</div>
                <Select
                  placeholder="请选择物质"
                  style={{ width: '200px' }}
                  value={substance}
                  onChange={this.onSubstanceChange}
                >
                  {substanceList.map((item) => (
                    <Option key={item.key} value={item.key}>
                      {item.value}
                    </Option>
                  ))}
                </Select>
              </div>

              <div style={{ display: 'flex', marginTop: '10px' }}>
                {substances.map((item) => (
                  <Tag
                    key={item.itemId}
                    closable
                    onClose={() => {
                      this.delSubstance(item.itemId);
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
                    {item.itemName}
                  </Tag>
                ))}
              </div>
            </TabPane>
            <TabPane tab="药物" key="drug">
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div>选择药物：</div>
                <Select
                  placeholder="请选择药物"
                  style={{ width: '200px' }}
                  value={drug}
                  onChange={this.onDrugChange}
                >
                  {drugList.map((item) => (
                    <Option key={item.key} value={item.key}>
                      {item.value}
                    </Option>
                  ))}
                </Select>
              </div>

              <div style={{ display: 'flex', marginTop: '10px' }}>
                {drugs.map((item) => (
                  <Tag
                    key={item.itemId}
                    closable
                    onClose={() => {
                      this.delDrug(item.itemId);
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
                    {item.itemName}
                  </Tag>
                ))}
              </div>
            </TabPane>
            <TabPane tab="分类" key="classification">
              {categories.map((item, index) => (
                <DrugGroupClassification
                  key={item.id}
                  value={item}
                  sysCodeList={sysCodeList}
                  onChange={(value) => this.onCategoryChange(index, value)}
                />
              ))}

              <div
                onClick={this.onAddCategory}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <div
                  style={{
                    background:'#FFF',
                    cursor: 'pointer',
                    border: '1px  gray dashed',
                    width: '200px',
                    height: '30px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <PlusOutlined /> 添加分类
                </div>
              </div>
            </TabPane>
          </Tabs>
        </Panel>
      </Collapse>
    );
  }
}
