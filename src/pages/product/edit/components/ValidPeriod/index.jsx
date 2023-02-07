import React, { Component } from 'react';
import { Input, Select } from 'antd';

const { Option } = Select;

export default class ValidPeriod extends Component {
  constructor(props) {
    super(props);

    this.state = {
      validPeriodUnit: props?.value?.validPeriodUnit || null,
      validPeriodValue: props?.value?.validPeriodValue || null,
    };
  }

  onVlidPeriodValueChange = (e) => {
    const { validPeriodUnit } = this.state;
    const { onChange } = this.props;
    const validPeriodValue = e.target.value;
    this.setState(
      {
        validPeriodValue,
      },
      () =>
        onChange?.({
          validPeriodValue,
          validPeriodUnit,
        }),
    );
  };

  onValidPeriodUnitChange = (validPeriodUnit) => {
    const { validPeriodValue } = this.state;
    const { onChange } = this.props;
    this.setState({
      validPeriodUnit,
    });
    onChange?.({
      validPeriodValue,
      validPeriodUnit,
    });
  };

  static getDerivedStateFromProps(props, state) {
    if (
      props?.value?.validPeriodValue !== state.validPeriodValue ||
      props?.value?.validPeriodUnit !== state.validPeriodUnit
    ) {
      return {
        validPeriodUnit: props?.value?.validPeriodUnit || null,
        validPeriodValue: props?.value?.validPeriodValue || null,
      };
    }
    return {};
  }

  render() {
    const { validPeriodUnit, validPeriodValue } = this.state;
    const { unitList = [] } = this.props;
    return (
      <div style={{ display: 'flex' }}>
        <Input
          placeholder="保质期系数"
          value={validPeriodValue}
          onChange={this.onVlidPeriodValueChange}
        />
        <Select
          showSearch
          style={{ marginLeft: '10px', width: '200px' }}
          value={validPeriodUnit}
          onChange={this.onValidPeriodUnitChange}
          optionFilterProp="children"
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
          placeholder="请选择单位"
        >
          {unitList.map((item) => (
            <Option key={item} value={item}>
              {item}
            </Option>
          ))}
        </Select>
      </div>
    );
  }
}
