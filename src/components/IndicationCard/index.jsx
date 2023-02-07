import { Button, Card, Tabs, Tag, Modal, Tree, TreeSelect } from 'antd';
import React, { Component } from 'react';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { v4 as uuidv4 } from 'uuid';

const { TabPane } = Tabs;
const { TreeNode } = TreeSelect;

export default class IndicationCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: '1',
      indications: [],
      checkNodesChange: false,
      isModalVisible: false,
      checkNodes: [],
      isContainIndications: true,
    };
  }

  onTabChange = (activeKey) => {
    this.setState(
      {
        activeKey,
      },
      () => {
        this.props.onTabChange?.(activeKey);
      },
    );
  };

  static getDerivedStateFromProps(props, state) {
    if (!state.activeKey) {
      return {
        activeKey: props.activeKey,
      };
    }
    if (
      props.indications &&
      JSON.stringify(props.indications) !== JSON.stringify(state.indications)
    ) {
      return {
        indications: props.indications,
      };
    }
    return {};
  }

  onModalClick = (isContainIndications) => {
    this.setState({
      isContainIndications,
      isModalVisible: true,
    });
  };

  onModalCancel = () => {
    this.setState({
      checkNodesChange: false,
      checkNodes: [],
      isModalVisible: false,
    });
  };

  onTreeChecked = (checkedKeys, e) => {
    const checkNodes = e.checkedNodes;
    const allCheckNodes = checkNodes.filter((item) => item.title === '全部');
    if (allCheckNodes.length) {
      this.setState({
        checkNodesChange: true,
        checkNodes: allCheckNodes[0]?.children ?? [],
      });
    } else {
      const lastNodes = checkNodes.filter((item) => !item.children.length);
      let lastNodeParentIds = lastNodes.map((item) => item.parentId);
      lastNodeParentIds = [...new Set(lastNodeParentIds)];
      const ids = checkNodes.map((item) => item.key);
      lastNodeParentIds = lastNodeParentIds.filter((item) => ids.indexOf(item) > -1);
      const nodes = checkNodes.filter((item) => lastNodeParentIds.indexOf(item.parentId) <= -1);
      this.setState({
        checkNodesChange: true,
        checkNodes: nodes,
      });
    }
  };

  onModalOk = () => {
    const {
      activeKey,
      indications,
      isContainIndications,
      checkNodes = [],
      checkNodesChange,
    } = this.state;
    if (checkNodesChange) {
      const { onChange } = this.props;
      const mactchedIndication = indications.find(
        (indication) => indication.sysCode === `${activeKey}`,
      );
      if (isContainIndications) {
        mactchedIndication.containIndications = checkNodes
          .filter((item) => item.key)
          .map((item) => {
            return {
              id: item.key,
              code: item.code,
              name: item.title,
            };
          });
      } else {
        mactchedIndication.unContainIndications = checkNodes
          .filter((item) => item.key)
          .map((item) => {
            return {
              id: item.key,
              code: item.code,
              name: item.title,
            };
          });
      }
      this.setState(
        {
          indications,
        },
        () => {
          onChange?.(indications);
        },
      );
    }
    this.onModalCancel();
  };

  onDel = (index, isContainIndications) => {
    const { onChange } = this.props;
    const { indications, activeKey } = this.state;
    const mactchedIndication = indications.find(
      (indication) => indication.sysCode === `${activeKey}`,
    );
    mactchedIndication[isContainIndications ? 'containIndications' : 'unContainIndications'].splice(
      index,
      1,
    );
    this.setState(
      {
        indications,
      },
      () => {
        onChange?.(indications);
      },
    );
  };

  renderTreeNode = (tree) => {
    return tree.map((item) => (
      <TreeNode key={item.id} value={`${item.id}_${item.name}`} title={item.name}>
        {this.renderTreeNode(item?.children ?? [])}
      </TreeNode>
    ));
  };

  onDiseaseChange = (value, indicationIndex) => {
    const { indications } = this.state;
    const { onChange } = this.props;
    const mactchedIndication = indications.find(
      (indication) => indication.sysName === '中成药体系',
    );
    if (mactchedIndication) {
      const res = value.split('_');
      mactchedIndication?.diseaseSymptomGroups[indicationIndex]?.diseases?.push({
        key: res[0],
        value: res[1],
      });
    }
    this.setState(
      {
        indications,
      },
      () => {
        onChange?.(indications);
      },
    );
  };

  onSymptomsChange = (value, indicationIndex) => {
    const { indications } = this.state;
    const { onChange } = this.props;
    const mactchedIndication = indications.find(
      (indication) => indication.sysName === '中成药体系',
    );
    if (mactchedIndication) {
      const res = value.split('_');
      mactchedIndication?.diseaseSymptomGroups[indicationIndex]?.symptoms?.push({
        key: res[0],
        value: res[1],
      });
    }
    this.setState(
      {
        indications,
      },
      () => {
        onChange?.(indications);
      },
    );
  };

  onAddGroup = () => {
    const { indications } = this.state;
    const { onChange } = this.props;
    const mactchedIndication = indications.find(
      (indication) => indication.sysName === '中成药体系',
    );
    if (mactchedIndication) {
      mactchedIndication?.diseaseSymptomGroups?.push({
        diseases: [],
        id: uuidv4(),
        symptoms: [],
      });
      this.setState(
        {
          indications,
        },
        () => {
          onChange?.(indications);
        },
      );
    }
  };

  onDiseaseDel = (indicationIndex, index) => {
    const { indications } = this.state;
    const { onChange } = this.props;
    const mactchedIndication = indications.find(
      (indication) => indication.sysName === '中成药体系',
    );
    if (mactchedIndication) {
      mactchedIndication?.diseaseSymptomGroups[indicationIndex]?.diseases?.splice(index, 1);
    }
    this.setState(
      {
        indications,
      },
      () => {
        onChange?.(indications);
      },
    );
  };

  onSymptomsDel = (indicationIndex, index) => {
    const { indications } = this.state;
    const { onChange } = this.props;
    const mactchedIndication = indications.find(
      (indication) => indication.sysName === '中成药体系',
    );
    if (mactchedIndication) {
      mactchedIndication?.diseaseSymptomGroups[indicationIndex]?.diseases?.splice(index, 1);
    }
    this.setState(
      {
        indications,
      },
      () => {
        onChange?.(indications);
      },
    );
  };

  render() {
    const { activeKey, indications, isModalVisible } = this.state;
    const {
      sysList = [],
      showUnContainIndications,
      onloadData,
      indicationTree = [],
      diseaseList = [],
      title = '适应症',
      symptomList = [],
    } = this.props;
    return (
      <Card title={title}>
        <Tabs type="card" activeKey={activeKey} onChange={this.onTabChange}>
          {sysList.map((item) => (
            <TabPane key={item.key} tab={item.value}>
              {item?.value === '中成药体系' ? (
                <div>
                  {indications
                    .find((indication) => indication.sysName === '中成药体系')
                    ?.diseaseSymptomGroups?.map((indication, indicationIndex) => (
                      <Card style={{ marginBottom: '30px' }} key={indication.id}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <div>选择疾病：</div>
                          <TreeSelect
                            showSearch
                            placeholder="请选择疾病"
                            style={{ width: '300px' }}
                            value={null}
                            onChange={(value) => this.onDiseaseChange(value, indicationIndex)}
                          >
                            {this.renderTreeNode(diseaseList)}
                          </TreeSelect>
                        </div>
                        <div>
                          {indication?.diseases?.map((disease, index) => (
                            <Tag
                              key={disease.key}
                              closable
                              color="blue"
                              onClose={() => this.onDiseaseDel(indicationIndex, index)}
                              style={{
                                marginTop: '10px',
                                marginRight: '10px',
                                padding: '5px',
                                borderRadius: '3px',
                              }}
                            >
                              {disease.value}
                            </Tag>
                          ))}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
                          <div>选择症候：</div>
                          <TreeSelect
                            showSearch
                            placeholder="请选择症候"
                            style={{ width: '300px' }}
                            value={null}
                            onChange={(value) => this.onSymptomsChange(value, indicationIndex)}
                          >
                            {this.renderTreeNode(symptomList)}
                          </TreeSelect>
                        </div>
                        <div>
                          {indication?.symptoms?.map((symptom, index) => (
                            <Tag
                              key={symptom.key}
                              closable
                              color="blue"
                              onClose={() => this.onSymptomsDel(indicationIndex, index)}
                              style={{
                                marginTop: '10px',
                                marginRight: '10px',
                                padding: '5px',
                                borderRadius: '3px',
                              }}
                            >
                              {symptom.value}
                            </Tag>
                          ))}
                        </div>
                      </Card>
                    ))}

                  <div
                    onClick={this.onAddGroup}
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <div
                      style={{
                        background: '#FFF',
                        cursor: 'pointer',
                        border: '1px  gray dashed',
                        width: '200px',
                        height: '30px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <PlusOutlined /> 添加病症组
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <div>
                    <Button
                      type="primary"
                      icon={<PlusOutlined />}
                      onClick={() => this.onModalClick(true)}
                    >
                      新增{title}
                    </Button>
                    <div>
                      {indications
                        .find((indication) => indication.sysCode === `${activeKey}`)
                        ?.containIndications?.map((indication, index) => (
                          <Tag
                            key={indication.id}
                            closable
                            onClose={() => this.onDel(index, true)}
                            style={{
                              marginTop: '10px',
                              marginRight: '10px',
                              background: '#F5F5F5',
                              padding: '5px',
                              border: '1px solid #D9D9D9',
                              borderRadius: '3px',
                            }}
                          >
                            {indication.name}
                          </Tag>
                        ))}
                    </div>
                  </div>
                  {showUnContainIndications && (
                    <div style={{ marginTop: '10px' }}>
                      <Button
                        danger
                        icon={<MinusOutlined />}
                        onClick={() => this.onModalClick(false)}
                      >
                        新增排除
                      </Button>
                      <div>
                        {indications
                          .find((indication) => indication.sysCode === `${activeKey}`)
                          ?.unContainIndications?.map((indication, index) => (
                            <Tag
                              key={indication.id}
                              closable
                              onClose={() => this.onDel(index, false)}
                              style={{
                                marginTop: '10px',
                                marginRight: '10px',
                                background: '#F5F5F5',
                                padding: '5px',
                                border: '1px solid #D9D9D9',
                                borderRadius: '3px',
                              }}
                            >
                              {indication.name}
                            </Tag>
                          ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </TabPane>
          ))}
        </Tabs>
        <Modal
          title={`选择${title}`}
          destroyOnClose={true}
          visible={isModalVisible}
          onCancel={this.onModalCancel}
          onOk={this.onModalOk}
        >
          {isModalVisible && indicationTree.length ? (
            <Tree
              checkable
              onCheck={this.onTreeChecked}
              treeData={indicationTree}
              selectable={false}
              loadData={onloadData}
            ></Tree>
          ) : (
            <div></div>
          )}
        </Modal>
      </Card>
    );
  }
}
