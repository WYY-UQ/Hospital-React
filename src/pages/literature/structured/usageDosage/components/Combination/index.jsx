import { Button, Card } from 'antd';
import React, { Component } from 'react';
import DrugGroup from './DrugGroup';
import { PlusOutlined } from '@ant-design/icons';
import { v4 as uuidv4 } from 'uuid';

export default class Combination extends Component {
  constructor(props) {
    super(props);
    this.state = {
      combinationMedicationGroups: props.combinationMedicationGroups?.length
        ? props.combinationMedicationGroups
        : [],
    };
  }

  onAddGroup = () => {
    const { combinationMedicationGroups } = this.state;
    const { onChange } = this.props;
    combinationMedicationGroups.push({
      categories: [
        {
          excludeDrugs: [],
          excludeSubstances: [],
          itemId: null,
          itemName: null,
          id: uuidv4(),
          itemType: 6,
        },
      ],
      drugs: [],
      id: uuidv4(),
      substances: [],
    });
    this.setState({
      combinationMedicationGroups,
    });
    onChange?.(combinationMedicationGroups);
  };

  onGroupChange = (index, value) => {
    const { combinationMedicationGroups } = this.state;
    const { onChange } = this.props;
    combinationMedicationGroups.splice(index, 1, value);
    this.setState({
      combinationMedicationGroups,
    });
    onChange?.(combinationMedicationGroups);
  };

  onGroupDel = (id) => {
    let { combinationMedicationGroups } = this.state;
    const { onChange } = this.props;
    combinationMedicationGroups = combinationMedicationGroups.filter((item) => item.id !== id);
    this.setState({
      combinationMedicationGroups,
    });
    onChange?.(combinationMedicationGroups);
  };

  static getDerivedStateFromProps(props, state) {
    if (
      JSON.stringify(props.combinationMedicationGroups) !==
      JSON.stringify(state.combinationMedicationGroups)
    ) {
      return {
        combinationMedicationGroups: props.combinationMedicationGroups?.length
          ? props.combinationMedicationGroups
          : [],
      };
    }
    return {};
  }

  render() {
    const { combinationMedicationGroups } = this.state;
    const { onDel, substanceList = [], drugList = [], sysCodeList = [] } = this.props;
    return (
      <Card
        title="联合用药"
        style={{ marginBottom: '30px' }}
        extra={
          <Button danger onClick={onDel}>
            删除
          </Button>
        }
      >
        {combinationMedicationGroups.map((item, index) => (
          <DrugGroup
            onDel={() => this.onGroupDel(item.id)}
            value={item}
            onChange={(value) => this.onGroupChange(index, value)}
            key={item.id}
            substanceList={substanceList}
            drugList={drugList}
            sysCodeList={sysCodeList}
          />
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
            <PlusOutlined /> 添加联合用药
          </div>
        </div>
      </Card>
    );
  }
}
