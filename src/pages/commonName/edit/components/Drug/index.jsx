import React, { Component } from 'react';

import { Card, Input, Select, notification, Button, Radio } from 'antd';
import { DeleteFilled, PlusCircleFilled } from '@ant-design/icons';

const { Group } = Radio;

const drugItem = {
  drugId: null,
  ratioUnit: null,
  ratioValue: null,
};

const { Option } = Select;

export default class Drug extends Component {
  constructor(props) {
    super(props);

    this.state = {
      drugs: props.value?.drugs?.length
        ? props.value?.drugs
        : [
            {
              drugId: null,
              ratioUnit: null,
              ratioValue: null,
            },
          ],
      ratioType:
        props.value?.ratioType !== null &&
        props.value?.ratioType !== undefined &&
        props.value?.ratioType !== ''
          ? props.value?.ratioType
          : 1,
    };
  }

  onGrugAdd = () => {
    const { drugs, ratioType } = this.state;
    const { onChange } = this.props;
    drugs.push({ ...drugItem });
    this.setState({
      drugs,
    });
    onChange?.({
      drugs,
      ratioType,
    });
  };

  onDrugDel = (index) => {
    const { drugs, ratioType } = this.state;
    const { onChange } = this.props;
    if (drugs.length === 1) {
      notification.warn({
        description: '最后一个了~不能再删了',
        message: '提示',
      });
      return;
    }
    drugs.splice(index, 1);
    this.setState({
      drugs,
    });
    onChange?.({
      drugs,
      ratioType,
    });
  };

  onRatioUnitChange = (value, index) => {
    const { ratioType, drugs } = this.state;
    const { onChange } = this.props;
    drugs[index].ratioUnit = value;
    this.setState({
      drugs,
    });
    onChange?.({
      drugs,
      ratioType,
    });
  };

  onRatioValueChange = (e, index) => {
    const { ratioType, drugs } = this.state;
    const { onChange } = this.props;
    drugs[index].ratioValue = e.target.value;
    this.setState({
      drugs,
    });
    onChange?.({
      drugs,
      ratioType,
    });
  };

  onDrugIdChange = (value, index) => {
    const { ratioType, drugs } = this.state;
    const { onChange } = this.props;
    drugs[index].drugId = value;
    this.setState({
      drugs,
    });
    onChange?.({
      drugs,
      ratioType,
    });
  };

  onRatioTypeChange = (e) => {
    const { drugs } = this.state;
    const { onChange } = this.props;
    const ratioType = e.target.value;
    this.setState({
      ratioType,
    });
    onChange?.({
      drugs,
      ratioType,
    });
  };

  static getDerivedStateFromProps(props, state) {
    if (
      (JSON.stringify(props.value?.drugs) !== JSON.stringify(state.drugs) && props.value?.drugs) ||
      (props.value?.ratioType !== state.ratioType && props.value?.ratioType)
    ) {
      return {
        drugs: props.value?.drugs?.length ? props.value?.drugs : [{ ...drugItem }],
        ratioType: props.value?.ratioType,
      };
    }
    return {};
  }

  render() {
    const { ratioType, drugs } = this.state;
    const { unitList, onDel, drugsList = [] } = this.props;
    return (
      <Card title={false} style={{ marginBottom: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ marginRight: '5px', width: '80px', textAlign: 'right' }}>药物配比：</div>
            <Group value={ratioType} onChange={this.onRatioTypeChange}>
              <Radio value={0}>无配比</Radio>
              <Radio value={1}>百分比配比</Radio>
              <Radio value={2}>单位配比</Radio>
            </Group>
          </div>
          <Button
            style={{
              marginLeft: '10px',
            }}
            onClick={onDel}
            danger
          >
            删除药物组
          </Button>
        </div>

        <div style={{ display: 'flex', verticalAlign: 'top', marginTop: '20px' }}>
          <div
            style={{
              marginRight: '5px',
              width: '80px',
              justifyContent: 'flex-end',
              display: 'inline-flex',
              paddingTop: '5px',
            }}
          >
            药物清单：
          </div>
          <div>
            {drugs.map((item, index) => (
              <div
                key={`groupConverts_${index}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  verticalAlign: 'top',
                  marginTop: index === 0 ? '' : '10px',
                }}
              >
                <Select
                  onChange={(value) => this.onDrugIdChange(value, index)}
                  placeholder="物质"
                  showSearch
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                  style={{ width: '150px', marginRight: '10px' }}
                  value={item.drugId}
                >
                  {drugsList.map((sub) => (
                    <Option key={sub.key} value={sub.key}>
                      {sub.value}
                    </Option>
                  ))}
                </Select>
                {ratioType !== 0 ? (
                  <>
                    <div style={{ marginRight: '5px' }}>配比：</div>
                    <Input
                      style={{ width: '200px', marginRight: '10px' }}
                      placeholder="规格数值"
                      value={item.ratioValue}
                      onChange={(e) => this.onRatioValueChange(e, index)}
                    ></Input>
                    {ratioType === 2 && (
                      <Select
                        onChange={(value) => this.onRatioUnitChange(value, index)}
                        placeholder="单位"
                        style={{ width: '150px', marginRight: '10px' }}
                        value={item.ratioUnit}
                      >
                        {unitList.map((unit) => (
                          <Option key={unit} value={unit}>
                            {unit}
                          </Option>
                        ))}
                      </Select>
                    )}
                  </>
                ) : (
                  <></>
                )}
                <DeleteFilled
                  style={{ fontSize: '20px', color: 'red', marginRight: '5px' }}
                  onClick={() => this.onDrugDel(index)}
                />
                {index === 0 && (
                  <PlusCircleFilled
                    style={{ fontSize: '20px', color: 'blue' }}
                    onClick={this.onGrugAdd}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </Card>
    );
  }
}
