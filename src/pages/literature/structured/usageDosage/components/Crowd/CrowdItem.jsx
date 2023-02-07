import { queryCrowds } from '@/services/common';
import { Card, Select, Button, Input, Checkbox } from 'antd';
import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';

const { Option } = Select;

export default class CrowdItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      typeCrowds: [],
      useDefaultValue:
        props.value?.useDefaultValue !== null && props.value?.useDefaultValue !== undefined
          ? props.value?.useDefaultValue
          : true,
      maxValue: props.value?.maxValue || null,
      paraName: props.value?.paraName || null,
      paraUnit: props.value?.paraUnit || null,
      minValue: props.value?.minValue || null,
      crowdId: props.value?.crowdId || null,
      id: props.value?.id || uuidv4(),
      typeCode: props.value?.typeCode || null,
    };
  }

  onTypeCodeChange = async (typeCode) => {
    const { id } = this.state;
    let { crowdId, paraName, paraUnit, maxValue, minValue, useDefaultValue } = this.state;
    const { onChange } = this.props;
    const typeCrowds =
      (
        await queryCrowds({
          typeCode,
        })
      )?.data ?? [];
    crowdId = null;
    paraName = null;
    paraUnit = null;
    maxValue = null;
    minValue = null;
    useDefaultValue = true;
    this.setState({
      typeCrowds,
      typeCode,
      crowdId,
      paraName,
      paraUnit,
      maxValue,
      minValue,
      useDefaultValue,
    });
    onChange?.({
      id,
      crowdId,
      paraName,
      paraUnit,
      maxValue,
      minValue,
      typeCode,
      useDefaultValue,
      typeCrowds,
    });
  };

  onCrowdIdChange = (crowdId) => {
    const { id, typeCrowds, typeCode, useDefaultValue } = this.state;
    let { paraName, paraUnit, maxValue, minValue } = this.state;
    const { onChange } = this.props;
    const crowd = typeCrowds.find((item) => item.crowdId === crowdId);
    paraName = crowd?.paraName;
    paraUnit = crowd?.paraUnit;
    maxValue = crowd?.maxValue;
    minValue = crowd?.minValue;
    this.setState({
      crowdId,
      minValue,
      maxValue,
      paraUnit,
      paraName,
    });
    onChange?.({
      id,
      crowdId,
      paraName,
      paraUnit,
      maxValue,
      minValue,
      typeCode,
      useDefaultValue,
      typeCrowds,
    });
  };

  onUseDefaultValueChange = (e) => {
    const {
      id,
      crowdId,
      typeCode,
      paraName,
      paraUnit,
      maxValue,
      minValue,
      typeCrowds,
    } = this.state;
    const useDefaultValue = e.target.checked;
    const { onChange } = this.props;
    this.setState({
      useDefaultValue,
    });
    onChange?.({
      id,
      crowdId,
      paraName,
      paraUnit,
      maxValue,
      minValue,
      typeCode,
      useDefaultValue,
      typeCrowds,
    });
  };

  onMaxValueChange = (e) => {
    const {
      id,
      crowdId,
      typeCode,
      paraName,
      paraUnit,
      minValue,
      useDefaultValue,
      typeCrowds,
    } = this.state;
    const { onChange } = this.props;
    const maxValue = e.target.value;
    this.setState({
      maxValue,
    });
    onChange?.({
      id,
      crowdId,
      paraName,
      paraUnit,
      maxValue,
      minValue,
      typeCode,
      useDefaultValue,
      typeCrowds,
    });
  };

  onMinValueChange = (e) => {
    const {
      id,
      crowdId,
      typeCode,
      paraName,
      paraUnit,
      maxValue,
      useDefaultValue,
      typeCrowds,
    } = this.state;
    const { onChange } = this.props;
    const minValue = e.target.value;
    this.setState({
      minValue,
    });
    onChange?.({
      id,
      crowdId,
      paraName,
      paraUnit,
      maxValue,
      minValue,
      typeCode,
      useDefaultValue,
      typeCrowds,
    });
  };

  static getDerivedStateFromProps(props, state) {
    if (
      props.value?.id !== state.id ||
      props.value?.useDefaultValue !== state.useDefaultValue ||
      props.value?.maxValue !== state.maxValue ||
      props.value?.paraName !== state.paraName ||
      props.value?.paraUnit !== state.paraUnit ||
      props.value?.minValue !== state.minValue ||
      props.value?.crowdId !== state.crowdId ||
      props.value?.typeCode !== state.typeCode ||
      JSON.stringify(props.value?.typeCrowds) !== JSON.stringify(state.typeCode)
    ) {
      return {
        useDefaultValue:
          props.value?.useDefaultValue !== null && props.value?.useDefaultValue !== undefined
            ? props.value?.useDefaultValue
            : true,
        typeCrowds: props.value?.typeCrowds?.length ? props.value?.typeCrowds : [],
        maxValue: props.value?.maxValue || null,
        paraName: props.value?.paraName || null,
        paraUnit: props.value?.paraUnit || null,
        minValue: props.value?.minValue || null,
        crowdId: props.value?.crowdId || null,
        id: props.value?.id || uuidv4(),
        typeCode: props.value?.typeCode || null,
      };
    }
    return {};
  }

  render() {
    const {
      typeCode,
      crowdId,
      typeCrowds,
      useDefaultValue,
      minValue,
      maxValue,
      paraUnit,
      paraName,
    } = this.state;
    const { crowdTypeList = [], onDel } = this.props;
    return (
      <Card style={{ marginBottom: '30px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            人群类型：
            <Select
              style={{ width: '400px', marginRight: '10px' }}
              placeholder="请选择人群类型"
              value={typeCode}
              onChange={this.onTypeCodeChange}
            >
              {crowdTypeList.map((item) => (
                <Option key={item.key} value={item.key}>
                  {item.value}
                </Option>
              ))}
            </Select>
          </div>
          <Button danger size="small" onClick={onDel}>
            删除
          </Button>
        </div>
        <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center' }}>
          选择人群：
          <Select
            style={{ width: '400px', marginRight: '10px' }}
            placeholder="请选择人群"
            value={crowdId}
            onChange={this.onCrowdIdChange}
          >
            {typeCrowds?.map((item) => (
              <Option key={item.crowdId} value={item.crowdId}>
                {item.crowdName}
              </Option>
            ))}
          </Select>
        </div>
        {paraName && (
          <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center' }}>
            人群参数：<div> {paraName}：</div>
            <Input
              style={{ width: '100px' }}
              disabled={useDefaultValue}
              value={minValue}
              onChange={this.onMinValueChange}
            />
            <div style={{ marginRight: '5px', marginLeft: '5px' }}>-</div>
            <Input
              style={{ width: '100px' }}
              disabled={useDefaultValue}
              value={maxValue}
              onChange={this.onMaxValueChange}
            />
            <div style={{ marginLeft: '5px' }}> {paraUnit}</div>
            <Checkbox
              checked={useDefaultValue}
              style={{ marginLeft: '5px' }}
              onChange={this.onUseDefaultValueChange}
            >
              使用默认值
            </Checkbox>
          </div>
        )}
      </Card>
    );
  }
}
