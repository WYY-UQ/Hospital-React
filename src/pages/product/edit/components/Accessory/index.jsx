import React, { Component } from 'react';
// import { Select, Input, Button } from 'antd';
// import styles from './index.less';
// import { PlusOutlined } from '@ant-design/icons';
import { Button, Tag, Select } from 'antd';

const { Option } = Select;

export default class Accessory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accessory: null,
      accessories: props.value?.length ? props.value : [],
    };
  }

  onAdd = () => {
    const { accessories, accessory } = this.state;
    if (accessory) {
      const { secMaterialDrugList, onChange } = this.props;
      const secMaterialDrug = secMaterialDrugList.find((item) => item.id === accessory);
      accessories.push({
        key: secMaterialDrug.id,
        value: secMaterialDrug.name,
      });
      this.setState(
        {
          accessory: null,
          accessories,
        },
        () => {
          onChange?.(accessories);
        },
      );
    }
  };

  onDel = (index) => {
    const { accessories } = this.state;
    const { onChange } = this.props;
    accessories.splice(index, 1);
    this.setState(
      {
        accessories,
      },
      () => {
        onChange?.(accessories);
      },
    );
  };

  onAccessoryChange = (accessory) => {
    this.setState({
      accessory,
    });
  };

  static getDerivedStateFromProps(props, state) {
    if (
      props.value &&
      JSON.parse(JSON.stringify(props.value)) !== JSON.parse(JSON.stringify(state.accessories))
    ) {
      return {
        accessories: props.value?.length ? props.value : [],
      };
    }
    return {};
  }

  render() {
    const { accessories, accessory } = this.state;
    const { secMaterialDrugList } = this.props;
    return (
      <div>
        <div style={{ display: 'flex' }}>
          <Select
            onChange={this.onAccessoryChange}
            placeholder="请选择辅料"
            style={{ width: '300px', marginRight: '20px' }}
            value={accessory}
          >
            {secMaterialDrugList.map((item) => (
              <Option key={item.id} value={item.id}>
                {item.name}
              </Option>
            ))}
          </Select>
          <Button type="primary" onClick={this.onAdd}>
            新增辅料
          </Button>
        </div>
        {accessories?.length ? (
          <div style={{ display: 'flex', marginTop: '20px' }}>
            {accessories.map((item, index) => (
              <Tag
                key={item.key}
                closable
                style={{
                  marginRight: '10px',
                  background: '#F5F5F5',
                  padding: '5px',
                  border: '1px solid #D9D9D9',
                  borderRadius: '3px',
                }}
                onClose={() => this.onDel(index)}
              >
                {item.value}
              </Tag>
            ))}
          </div>
        ) : (
          <div></div>
        )}
      </div>
    );
  }
}
