import { getAdverseReactionTree as getAdverseReactionTreeApi } from '@/services/common';
import { Button, Card, Select, Tag, notification, Input } from 'antd';
import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';

const { Option } = Select;

export default class InspectionIndexItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      typeList: [
        {
          key: 1,
          value: '具体值',
        },
        {
          key: 2,
          value: '较基线差值',
        },
        {
          key: 3,
          value: '较正常值差值',
        },
        {
          key: 4,
          value: '正常值倍数',
        },
        {
          key: 5,
          value: '趋势',
        },
      ],
      incrementTypeList: [
        {
          key: 1,
          value: '增加',
        },
        {
          key: 2,
          value: '减少',
        },
        {
          key: 3,
          value: '相差',
        },
      ],
      trendTypeList: [
        {
          key: 1,
          value: '持续下降',
        },
        {
          key: 2,
          value: '持续上升',
        },
      ],
      type: props.value?.type || null,
      inspectionValue: props.value?.inspectionValue || null,
      inspectionUnit: props.value?.inspectionUnit || null,
      incrementType: props.value?.incrementType || null,
      incrementValue: props.value?.incrementValue || null,
      incrementUnit: props.value?.incrementUnit || null,
      multiple: props.value?.multiple || null,
      trendType: props.value?.trendType || null,
      trendTimeValue: props.value?.trendTimeValue || null,
      trendTimeUnit: props.value?.trendTimeUnit || null,
      id: props.value?.id || uuidv4(),
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (
      props.value?.id !== state.id ||
      props.value?.type !== state.type ||
      props.value?.inspectionValue !== state.inspectionValue ||
      props.value?.inspectionUnit !== state.inspectionUnit ||
      props.value?.incrementType !== state.incrementType ||
      props.value?.incrementValue !== state.incrementValue ||
      props.value?.incrementUnit !== state.incrementUnit ||
      props.value?.multiple !== state.multiple ||
      props.value?.trendType !== state.trendType ||
      props.value?.trendTimeValue !== state.trendTimeValue ||
      props.value?.trendTimeUnit !== state.trendTimeUnit
    ) {
      return {
        type: props.value?.type || null,
        inspectionValue: props.value?.inspectionValue || null,
        inspectionUnit: props.value?.inspectionUnit || null,
        incrementType: props.value?.incrementType || null,
        incrementValue: props.value?.incrementValue || null,
        incrementUnit: props.value?.incrementUnit || null,
        multiple: props.value?.multiple || null,
        trendType: props.value?.trendType || null,
        trendTimeValue: props.value?.trendTimeValue || null,
        trendTimeUnit: props.value?.trendTimeUnit || null,
        id: props.value?.id || uuidv4(),
      };
    }
    return {};
  }

  onTypeChange = (type) => {
    const { id } = this.state;
    const {
      inspectionValue,
      inspectionUnit,
      incrementType,
      incrementValue,
      incrementUnit,
      multiple,
      trendType,
      trendTimeValue,
      trendTimeUnit,
    } = this.state;
    const { onChange } = this.props;
    this.setState({
      type,
      inspectionValue: null,
      inspectionUnit: null,
      incrementType: null,
      incrementValue: null,
      incrementUnit: null,
      multiple: null,
      trendType: null,
      trendTimeValue: null,
      trendTimeUnit: null,
    });
    onChange?.({
      id,
      type,
      inspectionValue,
      inspectionUnit,
      incrementType,
      incrementValue,
      incrementUnit,
      multiple,
      trendType,
      trendTimeValue,
      trendTimeUnit,
    });
  };

  onInspectionValueChange = (e) => {
    const {
      id,
      type,
      inspectionUnit,
      incrementType,
      incrementValue,
      incrementUnit,
      multiple,
      trendType,
      trendTimeValue,
      trendTimeUnit,
    } = this.state;
    const { onChange } = this.props;
    const inspectionValue = e.target.value;
    this.setState({
      inspectionValue,
    });
    onChange?.({
      id,
      type,
      inspectionValue,
      inspectionUnit,
      incrementType,
      incrementValue,
      incrementUnit,
      multiple,
      trendType,
      trendTimeValue,
      trendTimeUnit,
    });
  };

  onInspectionUnitChange = (inspectionUnit) => {
    const {
      id,
      type,
      inspectionValue,
      incrementType,
      incrementValue,
      incrementUnit,
      multiple,
      trendType,
      trendTimeValue,
      trendTimeUnit,
    } = this.state;
    const { onChange } = this.props;
    this.setState({
      inspectionUnit,
    });
    onChange?.({
      id,
      type,
      inspectionValue,
      inspectionUnit,
      incrementType,
      incrementValue,
      incrementUnit,
      multiple,
      trendType,
      trendTimeValue,
      trendTimeUnit,
    });
  };

  onIncrementTypeChange = (incrementType) => {
    const {
      id,
      type,
      inspectionValue,
      inspectionUnit,
      incrementValue,
      incrementUnit,
      multiple,
      trendType,
      trendTimeValue,
      trendTimeUnit,
    } = this.state;
    const { onChange } = this.props;
    this.setState({
      incrementType,
    });
    onChange?.({
      id,
      type,
      inspectionValue,
      inspectionUnit,
      incrementType,
      incrementValue,
      incrementUnit,
      multiple,
      trendType,
      trendTimeValue,
      trendTimeUnit,
    });
  };

  onIncrementValueChange = (e) => {
    const {
      id,
      type,
      inspectionValue,
      inspectionUnit,
      incrementType,
      incrementUnit,
      multiple,
      trendType,
      trendTimeValue,
      trendTimeUnit,
    } = this.state;
    const { onChange } = this.props;
    const incrementValue = e.target.value;
    this.setState({
      incrementValue,
    });
    onChange?.({
      id,
      type,
      inspectionValue,
      inspectionUnit,
      incrementType,
      incrementValue,
      incrementUnit,
      multiple,
      trendType,
      trendTimeValue,
      trendTimeUnit,
    });
  };

  onIncrementUnitChange = (incrementUnit) => {
    const {
      id,
      type,
      inspectionValue,
      inspectionUnit,
      incrementType,
      incrementValue,
      multiple,
      trendType,
      trendTimeValue,
      trendTimeUnit,
    } = this.state;
    const { onChange } = this.props;
    this.setState({
      incrementUnit,
    });
    onChange?.({
      id,
      type,
      inspectionValue,
      inspectionUnit,
      incrementType,
      incrementValue,
      incrementUnit,
      multiple,
      trendType,
      trendTimeValue,
      trendTimeUnit,
    });
  };

  onMultipleValueChange = (e) => {
    const {
      id,
      type,
      inspectionValue,
      inspectionUnit,
      incrementType,
      incrementValue,
      incrementUnit,
      trendType,
      trendTimeValue,
      trendTimeUnit,
    } = this.state;
    const { onChange } = this.props;
    const multiple = e.target.value;
    this.setState({
      multiple,
    });
    onChange?.({
      id,
      type,
      inspectionValue,
      inspectionUnit,
      incrementType,
      incrementValue,
      incrementUnit,
      multiple,
      trendType,
      trendTimeValue,
      trendTimeUnit,
    });
  };

  onTrendTypeChange = (trendType) => {
    const {
      id,
      type,
      inspectionValue,
      inspectionUnit,
      incrementType,
      incrementValue,
      incrementUnit,
      multiple,
      trendTimeValue,
      trendTimeUnit,
    } = this.state;
    const { onChange } = this.props;
    this.setState({
      trendType,
    });
    onChange?.({
      id,
      type,
      inspectionValue,
      inspectionUnit,
      incrementType,
      incrementValue,
      incrementUnit,
      multiple,
      trendType,
      trendTimeValue,
      trendTimeUnit,
    });
  };

  onTrendTimeValueChange = (e) => {
    const {
      id,
      type,
      inspectionValue,
      inspectionUnit,
      incrementType,
      incrementValue,
      incrementUnit,
      multiple,
      trendType,
      trendTimeUnit,
    } = this.state;
    const { onChange } = this.props;
    const trendTimeValue = e.target.value;
    this.setState({
      trendTimeValue,
    });
    onChange?.({
      id,
      type,
      inspectionValue,
      inspectionUnit,
      incrementType,
      incrementValue,
      incrementUnit,
      multiple,
      trendType,
      trendTimeValue,
      trendTimeUnit,
    });
  };

  onTrendTimeUnitChange = (trendTimeUnit) => {
    const {
      id,
      type,
      inspectionValue,
      inspectionUnit,
      incrementType,
      incrementValue,
      incrementUnit,
      multiple,
      trendType,
      trendTimeValue,
    } = this.state;
    const { onChange } = this.props;
    this.setState({
      trendTimeUnit,
    });
    onChange?.({
      id,
      type,
      inspectionValue,
      inspectionUnit,
      incrementType,
      incrementValue,
      incrementUnit,
      multiple,
      trendType,
      trendTimeValue,
      trendTimeUnit,
    });
  };

  render() {
    const {
      typeList,
      type,
      inspectionValue,
      inspectionUnit,
      incrementTypeList,
      incrementType,
      incrementValue,
      incrementUnit,
      multiple,
      trendType,
      trendTypeList,
      trendTimeValue,
      trendTimeUnit,
    } = this.state;
    const { onDel, unitList = [], timeUnitList = [] } = this.props;
    return (
      <Card style={{ marginBottom: '30px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ width: '70px', textAlign: 'right' }}> 选择指标：</div>
            <Select
              style={{ width: '300px' }}
              placeholder="请选择指标"
              value={type}
              onChange={this.onTypeChange}
            >
              {typeList.map((item) => (
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

        {type === 1 && (
          <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
            <div style={{ width: '70px', textAlign: 'right' }}>指标值：</div>
            <Input
              style={{ width: '185px' }}
              placeholder="请输入指标值"
              value={inspectionValue}
              onChange={this.onInspectionValueChange}
            />
            <Select
              style={{ width: '100px', marginLeft: '15px' }}
              placeholder="选择单位"
              value={inspectionUnit}
              onChange={this.onInspectionUnitChange}
            >
              {unitList.map((item) => (
                <Option key={item}>{item}</Option>
              ))}
            </Select>
          </div>
        )}

        {(type === 2 || type === 3) && (
          <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
            <div style={{ width: '70px', textAlign: 'right' }}> 差值类型：</div>
            <Select
              style={{ width: '300px' }}
              placeholder="请选择差值类型"
              value={incrementType}
              onChange={this.onIncrementTypeChange}
            >
              {incrementTypeList.map((item) => (
                <Option key={item.key} value={item.key}>
                  {item.value}
                </Option>
              ))}
            </Select>
          </div>
        )}

        {(type === 2 || type === 3) && (
          <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
            <div style={{ width: '70px', textAlign: 'right' }}>差值：</div>
            <Input
              style={{ width: '185px' }}
              placeholder="请输入差值"
              value={incrementValue}
              onChange={this.onIncrementValueChange}
            />
            <Select
              style={{ width: '100px', marginLeft: '15px' }}
              placeholder="选择单位"
              value={incrementUnit}
              onChange={this.onIncrementUnitChange}
            >
              {unitList.map((item) => (
                <Option key={item}>{item}</Option>
              ))}
            </Select>
          </div>
        )}

        {type === 4 && (
          <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
            <div style={{ width: '70px', textAlign: 'right' }}> 倍数：</div>
            <Input
              style={{ width: '300px' }}
              placeholder="请选择倍数"
              value={multiple}
              onChange={this.onMultipleValueChange}
            />
          </div>
        )}

        {type === 5 && (
          <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
            <div style={{ width: '70px', textAlign: 'right' }}> 趋势类型：</div>
            <Select
              style={{ width: '300px' }}
              placeholder="请选择趋势类型"
              value={trendType}
              onChange={this.onTrendTypeChange}
            >
              {trendTypeList.map((item) => (
                <Option key={item.key} value={item.key}>
                  {item.value}
                </Option>
              ))}
            </Select>
          </div>
        )}

        {type === 5 && (
          <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
            <div style={{ width: '70px', textAlign: 'right' }}>连续周期：</div>
            <Input
              style={{ width: '185px' }}
              placeholder="请输入指标值"
              value={trendTimeValue}
              onChange={this.onTrendTimeValueChange}
            />
            <Select
              style={{ width: '100px', marginLeft: '15px' }}
              placeholder="选择单位"
              value={trendTimeUnit}
              onChange={this.onTrendTimeUnitChange}
            >
              {timeUnitList.map((item) => (
                <Option key={item}>{item}</Option>
              ))}
            </Select>
          </div>
        )}
      </Card>
    );
  }
}
