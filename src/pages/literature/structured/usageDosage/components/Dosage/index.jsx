import { Card } from 'antd';
import React, { Component } from 'react';
import DosageItem from './DosageItem';
import { PlusOutlined } from '@ant-design/icons';
import { v4 as uuidv4 } from 'uuid';

export default class Dosage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dosages: props.dosages?.length
        ? props.dosages
        : [
            {
              id: uuidv4(),
              calcType: null,
              commonDosage: null,
              dosageType: null,
              dosageUnit: null,
              maxDosage: null,
              maxHeight: null,
              maxWeight: null,
              minDosage: null,
              minHeight: null,
              minWeight: null,
              extreme: null,
            },
          ],
    };
  }

  onAddGroup = () => {
    const { dosages } = this.state;
    const { onChange } = this.props;
    dosages.push({
      id: uuidv4(),
      calcType: null,
      commonDosage: null,
      dosageType: null,
      dosageUnit: null,
      maxDosage: null,
      maxHeight: null,
      maxWeight: null,
      minDosage: null,
      minHeight: null,
      minWeight: null,
      extreme: null,
    });
    this.setState({ dosages });
    onChange?.(dosages);
  };

  onGroupDel = (index) => {
    const { dosages } = this.state;
    const { onChange } = this.props;
    dosages.splice(index, 1);
    this.setState({ dosages });
    onChange?.(dosages);
  };

  onItemsChange = (index, value) => {
    const { dosages } = this.state;
    const { onChange } = this.props;
    dosages.splice(index, 1, value);
    this.setState({ dosages });
    onChange?.(dosages);
  };

  static getDerivedStateFromProps(props, state) {
    if (JSON.stringify(props.dosages) !== JSON.stringify(state.dosages)) {
      return {
        dosages: props.dosages?.length
          ? props.dosages
          : [
              {
                id: uuidv4(),
                calcType: null,
                commonDosage: null,
                dosageType: null,
                dosageUnit: null,
                maxDosage: null,
                maxHeight: null,
                maxWeight: null,
                minDosage: null,
                minHeight: null,
                minWeight: null,
                extreme: null,
              },
            ],
      };
    }
    return {};
  }

  render() {
    const { dosages } = this.state;
    const { unitList = [] } = this.props;
    return (
      <Card title="用量" style={{ marginBottom: '30px' }}>
        {dosages.map((item, index) => (
          <DosageItem
            onDel={() => this.onGroupDel(index)}
            key={item.id}
            onChange={(value) => this.onItemsChange(index, value)}
            unitList={unitList}
            value={item}
            index={index}
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
            <PlusOutlined /> 添加用量
          </div>
        </div>
      </Card>
    );
  }
}
