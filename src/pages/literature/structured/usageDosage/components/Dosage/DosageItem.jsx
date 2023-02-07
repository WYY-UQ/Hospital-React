import { Button, Card, Input, Select } from 'antd';
import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';

const { Option } = Select;

const dosageTypeList = [
  {
    key: 1,
    value: '常规用量',
  },
  {
    key: 2,
    value: '单位体重(kg)用量',
  },
  {
    key: 3,
    value: '单位体表面积(平方厘米)用量',
  },
  {
    key: 4,
    value: '体重&身高组合用量',
  },
];

const calcTypeList = [
  {
    key: 1,
    value: '次用量',
  },
  {
    key: 2,
    value: '日用量',
  },
];

export default class DosageItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.value?.id || uuidv4(),
      calcType: props.value?.calcType || null,
      commonDosage: props.value?.commonDosage || null,
      dosageType: props.value?.dosageType || null,
      dosageUnit: props.value?.dosageUnit || null,
      extreme: props.value?.extreme || null,
      maxDosage: props.value?.maxDosage || null,
      maxHeight: props.value?.maxHeight || null,
      maxWeight: props.value?.maxWeight || null,
      minDosage: props.value?.minDosage || null,
      minHeight: props.value?.minHeight || null,
      minWeight: props.value?.minWeight || null,
    };
  }

  onDosageTypeChange = (dosageType) => {
    const {
      id,
      calcType,
      commonDosage,
      dosageUnit,
      maxDosage,
      maxHeight,
      maxWeight,
      minDosage,
      minHeight,
      minWeight,
      extreme,
    } = this.state;
    const { onChange } = this.props;
    this.setState({
      dosageType,
    });
    onChange?.({
      id,
      calcType,
      dosageType,
      commonDosage,
      dosageUnit,
      maxDosage,
      maxHeight,
      maxWeight,
      minDosage,
      minHeight,
      minWeight,
      extreme,
    });
  };

  onMaxHeightChange = (e) => {
    const {
      id,
      calcType,
      commonDosage,
      dosageUnit,
      maxDosage,
      dosageType,
      maxWeight,
      minDosage,
      minHeight,
      minWeight,
      extreme,
    } = this.state;
    const { onChange } = this.props;
    const maxHeight = e.target.value;
    this.setState({
      maxHeight,
    });
    onChange?.({
      id,
      calcType,
      dosageType,
      commonDosage,
      dosageUnit,
      maxDosage,
      maxHeight,
      maxWeight,
      minDosage,
      minHeight,
      minWeight,
      extreme,
    });
  };

  onMinHeightChange = (e) => {
    const {
      id,
      calcType,
      dosageType,
      commonDosage,
      dosageUnit,
      maxDosage,
      maxHeight,
      maxWeight,
      minDosage,
      minWeight,
      extreme,
    } = this.state;
    const { onChange } = this.props;
    const minHeight = e.target.value;
    this.setState({
      minHeight,
    });
    onChange?.({
      id,
      calcType,
      dosageType,
      commonDosage,
      dosageUnit,
      maxDosage,
      maxHeight,
      maxWeight,
      minDosage,
      minHeight,
      minWeight,
      extreme,
    });
  };

  onMaxWeightChange = (e) => {
    const {
      id,
      calcType,
      dosageType,
      commonDosage,
      dosageUnit,
      maxDosage,
      maxHeight,
      minDosage,
      minHeight,
      minWeight,
      extreme,
    } = this.state;
    const { onChange } = this.props;
    const maxWeight = e.target.value;
    this.setState({
      maxWeight,
    });
    onChange?.({
      id,
      calcType,
      dosageType,
      commonDosage,
      dosageUnit,
      maxDosage,
      maxHeight,
      maxWeight,
      minDosage,
      minHeight,
      minWeight,
      extreme,
    });
  };

  onMinWeightChange = (e) => {
    const {
      id,
      calcType,
      dosageType,
      commonDosage,
      dosageUnit,
      maxDosage,
      maxHeight,
      maxWeight,
      minDosage,
      minHeight,
      extreme,
    } = this.state;
    const { onChange } = this.props;
    const minWeight = e.target.value;
    this.setState({
      minWeight,
    });
    onChange?.({
      id,
      calcType,
      dosageType,
      commonDosage,
      dosageUnit,
      maxDosage,
      maxHeight,
      maxWeight,
      minDosage,
      minHeight,
      minWeight,
      extreme,
    });
  };

  onMaxDosageChange = (e) => {
    const {
      id,
      calcType,
      dosageType,
      commonDosage,
      dosageUnit,
      maxHeight,
      maxWeight,
      minDosage,
      minHeight,
      minWeight,
      extreme,
    } = this.state;
    const { onChange } = this.props;
    const maxDosage = e.target.value;
    this.setState({
      maxDosage,
    });
    onChange?.({
      id,
      calcType,
      dosageType,
      commonDosage,
      dosageUnit,
      maxDosage,
      maxHeight,
      maxWeight,
      minDosage,
      minHeight,
      minWeight,
      extreme,
    });
  };

  onMinDosageChange = (e) => {
    const {
      id,
      calcType,
      dosageType,
      commonDosage,
      dosageUnit,
      maxDosage,
      maxHeight,
      maxWeight,
      minHeight,
      minWeight,
      extreme,
    } = this.state;
    const { onChange } = this.props;
    const minDosage = e.target.value;
    this.setState({
      minDosage,
    });
    onChange?.({
      id,
      calcType,
      dosageType,
      commonDosage,
      dosageUnit,
      maxDosage,
      maxHeight,
      maxWeight,
      minDosage,
      minHeight,
      minWeight,
      extreme,
    });
  };

  onCommonDosageChange = (e) => {
    const {
      id,
      calcType,
      dosageType,
      dosageUnit,
      maxDosage,
      maxHeight,
      maxWeight,
      minDosage,
      minHeight,
      minWeight,
      extreme,
    } = this.state;
    const { onChange } = this.props;
    const commonDosage = e.target.value;
    this.setState({
      commonDosage,
    });
    onChange?.({
      id,
      calcType,
      dosageType,
      commonDosage,
      dosageUnit,
      maxDosage,
      maxHeight,
      maxWeight,
      minDosage,
      minHeight,
      minWeight,
      extreme,
    });
  };

  onCalcTypeChange = (calcType) => {
    const {
      id,
      dosageType,
      commonDosage,
      dosageUnit,
      maxDosage,
      maxHeight,
      maxWeight,
      minDosage,
      minHeight,
      minWeight,
      extreme,
    } = this.state;
    const { onChange } = this.props;
    this.setState({
      calcType,
    });
    onChange?.({
      id,
      calcType,
      dosageType,
      commonDosage,
      dosageUnit,
      maxDosage,
      maxHeight,
      maxWeight,
      minDosage,
      minHeight,
      minWeight,
      extreme,
    });
  };

  onDosageUnitChange = (dosageUnit) => {
    const {
      id,
      calcType,
      dosageType,
      commonDosage,
      maxDosage,
      maxHeight,
      maxWeight,
      minDosage,
      minHeight,
      minWeight,
      extreme,
    } = this.state;
    const { onChange } = this.props;
    this.setState({
      dosageUnit,
    });
    onChange?.({
      id,
      calcType,
      dosageType,
      commonDosage,
      dosageUnit,
      maxDosage,
      maxHeight,
      maxWeight,
      minDosage,
      minHeight,
      minWeight,
      extreme,
    });
  };

  onExtremeChange = (e) => {
    const {
      id,
      calcType,
      dosageType,
      commonDosage,
      maxDosage,
      maxHeight,
      maxWeight,
      minDosage,
      minHeight,
      minWeight,
      dosageUnit,
    } = this.state;
    const { onChange } = this.props;
    const extreme = e.target.value;
    this.setState({
      extreme,
    });
    onChange?.({
      id,
      calcType,
      dosageType,
      commonDosage,
      dosageUnit,
      maxDosage,
      maxHeight,
      maxWeight,
      minDosage,
      minHeight,
      minWeight,
      extreme,
    });
  };

  static getDerivedStateFromProps(props, state) {
    if (
      props.value?.id !== state.id ||
      props.value?.calcType !== state.calcType ||
      props.value?.commonDosage !== state.commonDosage ||
      props.value?.dosageType !== state.dosageType ||
      props.value?.dosageUnit !== state.dosageUnit ||
      props.value?.maxDosage !== state.maxDosage ||
      props.value?.maxHeight !== state.maxHeight ||
      props.value?.maxWeight !== state.maxWeight ||
      props.value?.minDosage !== state.minDosage ||
      props.value?.minHeight !== state.minHeight ||
      props.value?.minWeight !== state.minWeight ||
      props.value?.extreme !== state.extreme
    ) {
      return {
        id: props.value?.id || uuidv4(),
        calcType: props.value?.calcType || null,
        commonDosage: props.value?.commonDosage || null,
        dosageType: props.value?.dosageType || null,
        dosageUnit: props.value?.dosageUnit || null,
        maxDosage: props.value?.maxDosage || null,
        maxHeight: props.value?.maxHeight || null,
        maxWeight: props.value?.maxWeight || null,
        minDosage: props.value?.minDosage || null,
        minHeight: props.value?.minHeight || null,
        minWeight: props.value?.minWeight || null,
        extreme: props.value?.extreme || null,
      };
    }
    return {};
  }

  render() {
    const {
      calcType,
      commonDosage,
      dosageType,
      dosageUnit,
      maxDosage,
      maxHeight,
      maxWeight,
      minDosage,
      minHeight,
      minWeight,
      extreme,
    } = this.state;
    const { unitList = [], onDel } = this.props;
    return (
      <Card style={{ marginBottom: '30px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ width: '70px', textAlign: 'right' }}>用量类型：</div>
            <Select
              style={{ width: '400px' }}
              placeholder="请选择用量类型"
              value={dosageType}
              onChange={this.onDosageTypeChange}
            >
              {dosageTypeList.map((item) => (
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
        {dosageType === 4 && (
          <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
            <div style={{ width: '70px', textAlign: 'right' }}>身高范围：</div>
            <Input
              style={{ width: '150px' }}
              placeholder="请输入"
              value={minHeight}
              onChange={this.onMinHeightChange}
            />
            <div style={{ marginLeft: '5px', marginRight: '5px' }}>-</div>
            <Input
              style={{ width: '150px' }}
              placeholder="请输入"
              value={maxHeight}
              onChange={this.onMaxHeightChange}
            />
            <div style={{ marginLeft: '10px' }}>厘米</div>
          </div>
        )}
        {dosageType === 4 && (
          <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
            <div style={{ width: '70px', textAlign: 'right' }}>体重范围：</div>
            <Input
              style={{ width: '150px' }}
              placeholder="请输入"
              value={minWeight}
              onChange={this.onMinWeightChange}
            />
            <div style={{ marginLeft: '5px', marginRight: '5px' }}>-</div>
            <Input
              style={{ width: '150px' }}
              placeholder="请输入"
              value={maxWeight}
              onChange={this.onMaxWeightChange}
            />
            <div style={{ marginLeft: '10px' }}>千克</div>
          </div>
        )}
        <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
          <div style={{ width: '70px', textAlign: 'right' }}>计算类型：</div>
          <Select
            style={{ width: '400px' }}
            placeholder="请选择用量类型"
            value={calcType}
            onChange={this.onCalcTypeChange}
          >
            {calcTypeList.map((item) => (
              <Option key={item.key} value={item.key}>
                {item.value}
              </Option>
            ))}
          </Select>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
          <div style={{ width: '70px', textAlign: 'right' }}>用量范围：</div>
          <Input
            style={{ width: '110px' }}
            placeholder="请输入"
            value={minDosage}
            onChange={this.onMinDosageChange}
          />
          <div style={{ marginLeft: '5px', marginRight: '5px' }}>-</div>
          <Input
            style={{ width: '110px' }}
            placeholder="请输入"
            value={maxDosage}
            onChange={this.onMaxDosageChange}
          />
          <Select
            style={{ width: '100px', marginLeft: '15px' }}
            placeholder="选择单位"
            value={dosageUnit}
            onChange={this.onDosageUnitChange}
          >
            {unitList.map((item) => (
              <Option key={item}>{item}</Option>
            ))}
          </Select>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
          <div style={{ width: '70px', textAlign: 'right' }}>常规用量：</div>
          <Input
            style={{ width: '110px' }}
            placeholder="请输入"
            value={commonDosage}
            onChange={this.onCommonDosageChange}
          />
          <Select
            style={{ width: '100px', marginLeft: '15px' }}
            placeholder="选择单位"
            value={dosageUnit}
            onChange={this.onDosageUnitChange}
          >
            {unitList.map((item) => (
              <Option key={item}>{item}</Option>
            ))}
          </Select>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
          <div style={{ width: '70px', textAlign: 'right' }}>极量：</div>
          <Input
            style={{ width: '110px' }}
            placeholder="请输入"
            value={extreme}
            onChange={this.onExtremeChange}
          />
          <Select
            style={{ width: '100px', marginLeft: '15px' }}
            placeholder="选择单位"
            value={dosageUnit}
            onChange={this.onDosageUnitChange}
          >
            {unitList.map((item) => (
              <Option key={item}>{item}</Option>
            ))}
          </Select>
        </div>
      </Card>
    );
  }
}
