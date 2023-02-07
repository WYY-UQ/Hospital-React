import React, { Component } from 'react';

import { Card, Input, Select, notification, Button } from 'antd';
import { DeleteFilled, PlusCircleFilled, PlusOutlined } from '@ant-design/icons';

const specsItem = {
  specsUnit: null,
  specsValue: '',
  specsType: null,
};

const convertItem = {
  convertRate: '',
  fromUnit: null,
  targetUnit: null,
};

const { Option } = Select;

export default class Specification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groupConverts: props.value?.groupConverts?.length
        ? props.value?.groupConverts
        : [
            {
              convertRate: '',
              fromUnit: null,
              targetUnit: null,
            },
          ],
      groupSpecs: props.value?.groupConverts?.length
        ? props.value?.groupSpecs
        : [
            {
              specsType: null,
              specsUnit: null,
              specsValue: '',
            },
          ],
      specs: props.value?.specs || null,
      concentration: props.value?.concentration || null,
    };
  }

  onSpecsAdd = () => {
    const { groupSpecs, groupConverts, concentration, specs } = this.state;
    groupSpecs.push({ ...specsItem });
    const { onChange } = this.props;
    this.setState({
      groupSpecs,
    });
    onChange?.({
      groupSpecs,
      groupConverts,
      concentration,
      specs,
    });
  };

  onConvertsAdd = () => {
    const { groupConverts, groupSpecs, concentration, specs } = this.state;
    groupConverts.push({ ...convertItem });
    const { onChange } = this.props;
    this.setState({
      groupConverts,
    });

    onChange?.({
      groupSpecs,
      groupConverts,
      concentration,
      specs,
    });
  };

  onSpecsDel = (index) => {
    const { groupSpecs, groupConverts, concentration, specs } = this.state;
    const { onChange } = this.props;
    if (groupSpecs.length === 0) {
      return;
    }
    groupSpecs.splice(index, 1);
    this.setState({
      groupSpecs,
    });
    onChange?.({
      groupSpecs,
      groupConverts,
      concentration,
      specs,
    });
  };

  onConvertsDel = (index) => {
    const { groupConverts, groupSpecs, concentration, specs } = this.state;
    const { onChange } = this.props;
    if (groupConverts.length === 1) {
      notification.warn({
        description: '最后一个了~不能再删了',
        message: '提示',
      });
      return;
    }
    groupConverts.splice(index, 1);
    this.setState({
      groupConverts,
    });
    onChange?.({
      groupSpecs,
      groupConverts,
      concentration,
      specs,
    });
  };

  onSpecsValueChange = (e, index) => {
    const { groupSpecs, groupConverts, concentration, specs } = this.state;
    const { onChange } = this.props;
    groupSpecs[index].specsValue = e.target.value;
    this.setState({
      groupSpecs,
    });
    onChange?.({
      groupSpecs,
      groupConverts,
      concentration,
      specs,
    });
  };

  onSpecsUnitChange = (value, index) => {
    const { groupSpecs, groupConverts, concentration, specs } = this.state;
    const { onChange } = this.props;
    groupSpecs[index].specsUnit = value;
    this.setState({
      groupSpecs,
    });
    onChange?.({
      groupSpecs,
      groupConverts,
      concentration,
      specs,
    });
  };

  onSpecsTypeChange = (value, index) => {
    const { groupSpecs, groupConverts, concentration, specs } = this.state;
    const { onChange } = this.props;
    groupSpecs[index].specsType = value;
    this.setState({
      groupSpecs,
    });
    onChange?.({
      groupSpecs,
      groupConverts,
      concentration,
      specs,
    });
  };

  onFromUnitChange = (value, index) => {
    const { groupSpecs, groupConverts, concentration, specs } = this.state;
    const { onChange } = this.props;
    groupConverts[index].fromUnit = value;
    this.setState({
      groupConverts,
    });
    onChange?.({
      groupSpecs,
      groupConverts,
      concentration,
      specs,
    });
  };

  onTargetUnitChange = (value, index) => {
    const { groupSpecs, groupConverts, concentration, specs } = this.state;
    const { onChange } = this.props;
    groupConverts[index].targetUnit = value;
    this.setState({
      groupConverts,
    });
    onChange?.({
      groupSpecs,
      groupConverts,
      concentration,
      specs,
    });
  };

  onConvertRateChange = (e, index) => {
    const { groupSpecs, groupConverts, concentration, specs } = this.state;
    const { onChange } = this.props;
    groupConverts[index].convertRate = e.target.value;
    this.setState({
      groupConverts,
    });
    onChange?.({
      groupSpecs,
      groupConverts,
      concentration,
      specs,
    });
  };

  onConcentrationChange = (e) => {
    const { groupSpecs, groupConverts, specs } = this.state;
    const { onChange } = this.props;
    const concentration = e.target.value;
    this.setState({
      concentration,
    });
    onChange?.({
      groupSpecs,
      groupConverts,
      concentration,
      specs,
    });
  };

  onSpecsChange = (e) => {
    const { groupSpecs, groupConverts, concentration } = this.state;
    const { onChange } = this.props;
    const specs = e.target.value;
    this.setState({
      specs,
    });
    onChange?.({
      groupSpecs,
      groupConverts,
      concentration,
      specs,
    });
  };

  static getDerivedStateFromProps(props, state) {
    if (
      (JSON.stringify(props.value?.groupConverts) !== JSON.stringify(state.groupConverts) &&
        props.value?.groupConverts) ||
      (JSON.stringify(props.value?.groupSpecs) !== JSON.stringify(state.groupSpecs) &&
        props.value?.groupSpecs) ||
      (props.value?.concentration !== state.concentration && props.value?.concentration) ||
      props.value?.specs !== state.specs
    ) {
      return {
        groupConverts: props.value?.groupConverts?.length
          ? props.value?.groupConverts
          : [{ ...convertItem }],
        groupSpecs: props.value?.groupSpecs?.length ? props.value?.groupSpecs : [{ ...specsItem }],
        concentration: props.value?.concentration,
        specs: props.value?.specs || null,
      };
    }
    return {};
  }

  render() {
    const { groupSpecs, groupConverts, concentration, specs } = this.state;
    const { unitList = [], onDel, hasConcentration, typeList = [] } = this.props;
    return (
      <Card title={false} style={{ marginBottom: '10px' }}>
        {hasConcentration && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ marginRight: '5px', width: '80px', textAlign: 'right' }}>浓度：</div>
              <Input
                value={concentration}
                onChange={this.onConcentrationChange}
                style={{ width: '200px', marginRight: '10px' }}
                placeholder="请输入液体浓度"
              ></Input>
              <div>%</div>
            </div>
            <Button
              style={{
                marginLeft: '10px',
              }}
              onClick={onDel}
              danger
            >
              删除规格组
            </Button>
          </div>
        )}

        <div style={{ display: 'flex', marginTop: '20px', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', verticalAlign: 'top' }}>
            <div
              style={{
                marginRight: '5px',
                width: '80px',
                justifyContent: 'flex-end',
                display: 'inline-flex',
                paddingTop: '5px',
              }}
            >
              规格：
            </div>

            <Input
              style={{ width: '470px', marginRight: '10px' }}
              placeholder="请输入规格描述"
              value={specs}
              onChange={this.onSpecsChange}
            />
          </div>
          {!hasConcentration && (
            <Button
              style={{
                marginLeft: '10px',
              }}
              onClick={onDel}
              danger
            >
              删除规格组
            </Button>
          )}
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
            规格明细：
          </div>
          <div style={{ width: '520px' }}>
            {groupSpecs.map((item, index) => (
              <div
                key={`groupConverts_${index}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  verticalAlign: 'top',
                  marginBottom: '10px',
                }}
              >
                <Select
                  style={{ width: '150px', marginRight: '10px' }}
                  placeholder="请选择明细类型"
                  value={item.specsType}
                  onChange={(value) => this.onSpecsTypeChange(value, index)}
                >
                  {typeList.map((type) => (
                    <Option key={type.key} value={type.key}>
                      {type.value}
                    </Option>
                  ))}
                </Select>
                <Input
                  placeholder="规格数值"
                  style={{ width: '150px', marginRight: '10px' }}
                  value={item.specsValue}
                  onChange={(e) => this.onSpecsValueChange(e, index)}
                />
                <Select
                  onChange={(value) => this.onSpecsUnitChange(value, index)}
                  placeholder="单位"
                  style={{ width: '150px', marginRight: '10px' }}
                  value={item.specsUnit}
                >
                  {unitList.map((unit) => (
                    <Option key={unit} value={unit}>
                      {unit}
                    </Option>
                  ))}
                </Select>
                <DeleteFilled
                  style={{ fontSize: '20px', color: 'red', marginRight: '5px' }}
                  onClick={() => this.onSpecsDel(index)}
                />
              </div>
            ))}

            <div
              onClick={this.onSpecsAdd}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <div
                style={{
                  cursor: 'pointer',
                  border: '1px  gray solid',
                  width: '200px',
                  height: '30px',
                  display: 'flex',
                  borderRadius: '5px',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <PlusOutlined /> 添加规格明细
              </div>
            </div>
          </div>
        </div>
        {hasConcentration && groupSpecs.length > 1 && (
          <div style={{ display: 'flex', marginTop: '20px' }}>
            <div
              style={{
                marginRight: '5px',
                width: '80px',
                justifyContent: 'flex-end',
                display: 'inline-flex',
                paddingTop: '5px',
              }}
            >
              单位换算：
            </div>
            <div>
              {groupConverts.map((item, index) => (
                <div
                  key={`groupConverts_${index}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    verticalAlign: 'top',
                    marginTop: index === 0 ? '' : '10px',
                  }}
                >
                  <div>单位：</div>
                  <Select
                    onChange={(value) => this.onFromUnitChange(value, index)}
                    placeholder="单位"
                    style={{ width: '150px', marginRight: '10px' }}
                    value={item.fromUnit}
                  >
                    {unitList.map((unit) => (
                      <Option key={unit} value={unit}>
                        {unit}
                      </Option>
                    ))}
                  </Select>
                  <div>目标单位：</div>
                  <Select
                    onChange={(value) => this.onTargetUnitChange(value, index)}
                    placeholder="单位"
                    style={{ width: '150px', marginRight: '10px' }}
                    value={item.targetUnit}
                  >
                    {unitList.map((unit) => (
                      <Option key={unit} value={unit}>
                        {unit}
                      </Option>
                    ))}
                  </Select>
                  <div>换算率：</div>
                  <Input
                    value={item.convertRate}
                    style={{ width: '100px', marginRight: '10px' }}
                    placeholder="换算率"
                    onChange={(e) => this.onConvertRateChange(e, index)}
                  ></Input>
                  <DeleteFilled
                    style={{ fontSize: '20px', color: 'red', marginRight: '5px' }}
                    onClick={() => this.onConvertsDel(index)}
                  />
                  {index === 0 && (
                    <PlusCircleFilled
                      style={{ fontSize: '20px', color: 'blue' }}
                      onClick={this.onConvertsAdd}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </Card>
    );
  }
}
