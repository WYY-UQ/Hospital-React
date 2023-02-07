import { Button, Card, Input, Select } from 'antd';
import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';

const { Option } = Select;

export default class StepItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stepNo: props.index != null ? props.index + 1 : null,
      startQuantity: props.value?.startQuantity || null,
      startUnit: props.value?.startUnit || null,
      increaseMinQuantity: props.value?.increaseMinQuantity || null,
      increaseMinUnit: props.value?.increaseMinUnit || null,
      increaseMaxQuantity: props.value?.increaseMaxQuantity || null,
      increaseMaxUnit: props.value?.increaseMaxUnit || null,
      increaseNormalQuantity: props.value?.increaseNormalQuantity || null,
      increaseNormalUnit: props.value?.increaseNormalUnit || null,
      stopMinQuantity: props.value?.stopMinQuantity || null,
      stopMinUnit: props.value?.stopMinUnit || null,
      stopMaxQuantity: props.value?.stopMaxQuantity || null,
      stopMaxUnit: props.value?.stopMaxUnit || null,
      lastMinTime: props.value?.lastMinTime || null,
      lastMinTimeUnit: props.value?.lastMinTimeUnit || null,
      lastMaxTime: props.value?.lastMaxTime || null,
      lastMaxTimeUnit: props.value?.lastMaxTimeUnit || null,
      id: props.value?.id || uuidv4(),
    };
  }

  onStartQuantityChange = (e) => {
    const {
      stepNo,
      startUnit,
      increaseMinQuantity,
      increaseMinUnit,
      increaseMaxQuantity,
      increaseMaxUnit,
      increaseNormalQuantity,
      increaseNormalUnit,
      stopMinQuantity,
      stopMinUnit,
      stopMaxQuantity,
      stopMaxUnit,
      lastMinTime,
      lastMinTimeUnit,
      lastMaxTime,
      lastMaxTimeUnit,
      id,
    } = this.state;
    const { onChange } = this.props;
    const startQuantity = e.target.value;
    this.setState({
      startQuantity,
    });
    onChange?.({
      stepNo,
      startQuantity,
      startUnit,
      increaseMinQuantity,
      increaseMinUnit,
      increaseMaxQuantity,
      increaseMaxUnit,
      increaseNormalQuantity,
      increaseNormalUnit,
      stopMinQuantity,
      stopMinUnit,
      stopMaxQuantity,
      stopMaxUnit,
      lastMinTime,
      lastMinTimeUnit,
      lastMaxTime,
      lastMaxTimeUnit,
      id,
    });
  };

  onStartUnitChange = (startUnit) => {
    const {
      stepNo,
      startQuantity,
      increaseMinQuantity,
      increaseMinUnit,
      increaseMaxQuantity,
      increaseMaxUnit,
      increaseNormalQuantity,
      increaseNormalUnit,
      stopMinQuantity,
      stopMinUnit,
      stopMaxQuantity,
      stopMaxUnit,
      lastMinTime,
      lastMinTimeUnit,
      lastMaxTime,
      lastMaxTimeUnit,
      id,
    } = this.state;
    const { onChange } = this.props;
    this.setState({
      startUnit,
    });
    onChange?.({
      stepNo,
      startQuantity,
      startUnit,
      increaseMinQuantity,
      increaseMinUnit,
      increaseMaxQuantity,
      increaseMaxUnit,
      increaseNormalQuantity,
      increaseNormalUnit,
      stopMinQuantity,
      stopMinUnit,
      stopMaxQuantity,
      stopMaxUnit,
      lastMinTime,
      lastMinTimeUnit,
      lastMaxTime,
      lastMaxTimeUnit,
      id,
    });
  };

  onIncreaseMinQuantityhange = (e) => {
    const {
      stepNo,
      startQuantity,
      startUnit,
      increaseMinUnit,
      increaseMaxQuantity,
      increaseMaxUnit,
      increaseNormalQuantity,
      increaseNormalUnit,
      stopMinQuantity,
      stopMinUnit,
      stopMaxQuantity,
      stopMaxUnit,
      lastMinTime,
      lastMinTimeUnit,
      lastMaxTime,
      lastMaxTimeUnit,
      id,
    } = this.state;
    const { onChange } = this.props;
    const increaseMinQuantity = e.target.value;
    this.setState({
      increaseMinQuantity,
    });
    onChange?.({
      stepNo,
      startQuantity,
      startUnit,
      increaseMinQuantity,
      increaseMinUnit,
      increaseMaxQuantity,
      increaseMaxUnit,
      increaseNormalQuantity,
      increaseNormalUnit,
      stopMinQuantity,
      stopMinUnit,
      stopMaxQuantity,
      stopMaxUnit,
      lastMinTime,
      lastMinTimeUnit,
      lastMaxTime,
      lastMaxTimeUnit,
      id,
    });
  };

  onIncreaseMinUnitChange = (increaseMinUnit) => {
    const {
      stepNo,
      startQuantity,
      startUnit,
      increaseMinQuantity,
      increaseMaxQuantity,
      increaseMaxUnit,
      increaseNormalQuantity,
      increaseNormalUnit,
      stopMinQuantity,
      stopMinUnit,
      stopMaxQuantity,
      stopMaxUnit,
      lastMinTime,
      lastMinTimeUnit,
      lastMaxTime,
      lastMaxTimeUnit,
      id,
    } = this.state;
    const { onChange } = this.props;
    this.setState({
      increaseMinUnit,
    });
    onChange?.({
      stepNo,
      startQuantity,
      startUnit,
      increaseMinQuantity,
      increaseMinUnit,
      increaseMaxQuantity,
      increaseMaxUnit,
      increaseNormalQuantity,
      increaseNormalUnit,
      stopMinQuantity,
      stopMinUnit,
      stopMaxQuantity,
      stopMaxUnit,
      lastMinTime,
      lastMinTimeUnit,
      lastMaxTime,
      lastMaxTimeUnit,
      id,
    });
  };

  onIncreaseMaxQuantityhange = (e) => {
    const {
      stepNo,
      startQuantity,
      startUnit,
      increaseMinQuantity,
      increaseMinUnit,
      increaseMaxUnit,
      increaseNormalQuantity,
      increaseNormalUnit,
      stopMinQuantity,
      stopMinUnit,
      stopMaxQuantity,
      stopMaxUnit,
      lastMinTime,
      lastMinTimeUnit,
      lastMaxTime,
      lastMaxTimeUnit,
      id,
    } = this.state;
    const { onChange } = this.props;
    const increaseMaxQuantity = e.target.value;
    this.setState({
      increaseMaxQuantity,
    });
    onChange?.({
      stepNo,
      startQuantity,
      startUnit,
      increaseMinQuantity,
      increaseMinUnit,
      increaseMaxQuantity,
      increaseMaxUnit,
      increaseNormalQuantity,
      increaseNormalUnit,
      stopMinQuantity,
      stopMinUnit,
      stopMaxQuantity,
      stopMaxUnit,
      lastMinTime,
      lastMinTimeUnit,
      lastMaxTime,
      lastMaxTimeUnit,
      id,
    });
  };

  onIncreaseMaxUnitChange = (increaseMaxUnit) => {
    const {
      stepNo,
      startQuantity,
      startUnit,
      increaseMinQuantity,
      increaseMinUnit,
      increaseMaxQuantity,
      increaseNormalQuantity,
      increaseNormalUnit,
      stopMinQuantity,
      stopMinUnit,
      stopMaxQuantity,
      stopMaxUnit,
      lastMinTime,
      lastMinTimeUnit,
      lastMaxTime,
      lastMaxTimeUnit,
      id,
    } = this.state;
    const { onChange } = this.props;
    this.setState({
      increaseMaxUnit,
    });
    onChange?.({
      stepNo,
      startQuantity,
      startUnit,
      increaseMinQuantity,
      increaseMinUnit,
      increaseMaxQuantity,
      increaseMaxUnit,
      increaseNormalQuantity,
      increaseNormalUnit,
      stopMinQuantity,
      stopMinUnit,
      stopMaxQuantity,
      stopMaxUnit,
      lastMinTime,
      lastMinTimeUnit,
      lastMaxTime,
      lastMaxTimeUnit,
      id,
    });
  };

  onIncreaseNormalQuantityhange = (e) => {
    const {
      stepNo,
      startQuantity,
      startUnit,
      increaseMinQuantity,
      increaseMinUnit,
      increaseMaxQuantity,
      increaseMaxUnit,
      increaseNormalUnit,
      stopMinQuantity,
      stopMinUnit,
      stopMaxQuantity,
      stopMaxUnit,
      lastMinTime,
      lastMinTimeUnit,
      lastMaxTime,
      lastMaxTimeUnit,
      id,
    } = this.state;
    const { onChange } = this.props;
    const increaseNormalQuantity = e.target.value;
    this.setState({
      increaseNormalQuantity,
    });
    onChange?.({
      stepNo,
      startQuantity,
      startUnit,
      increaseMinQuantity,
      increaseMinUnit,
      increaseMaxQuantity,
      increaseMaxUnit,
      increaseNormalQuantity,
      increaseNormalUnit,
      stopMinQuantity,
      stopMinUnit,
      stopMaxQuantity,
      stopMaxUnit,
      lastMinTime,
      lastMinTimeUnit,
      lastMaxTime,
      lastMaxTimeUnit,
      id,
    });
  };

  onIncreaseNormalUnitChange = (increaseNormalUnit) => {
    const {
      stepNo,
      startQuantity,
      startUnit,
      increaseMinQuantity,
      increaseMinUnit,
      increaseMaxQuantity,
      increaseMaxUnit,
      increaseNormalQuantity,
      stopMinQuantity,
      stopMinUnit,
      stopMaxQuantity,
      stopMaxUnit,
      lastMinTime,
      lastMinTimeUnit,
      lastMaxTime,
      lastMaxTimeUnit,
      id,
    } = this.state;
    const { onChange } = this.props;
    this.setState({
      increaseNormalUnit,
    });
    onChange?.({
      stepNo,
      startQuantity,
      startUnit,
      increaseMinQuantity,
      increaseMinUnit,
      increaseMaxQuantity,
      increaseMaxUnit,
      increaseNormalQuantity,
      increaseNormalUnit,
      stopMinQuantity,
      stopMinUnit,
      stopMaxQuantity,
      stopMaxUnit,
      lastMinTime,
      lastMinTimeUnit,
      lastMaxTime,
      lastMaxTimeUnit,
      id,
    });
  };

  onStopMinQuantityChange = (e) => {
    const {
      stepNo,
      startQuantity,
      startUnit,
      increaseMinQuantity,
      increaseMinUnit,
      increaseMaxQuantity,
      increaseMaxUnit,
      increaseNormalQuantity,
      increaseNormalUnit,
      stopMinUnit,
      stopMaxQuantity,
      stopMaxUnit,
      lastMinTime,
      lastMinTimeUnit,
      lastMaxTime,
      lastMaxTimeUnit,
      id,
    } = this.state;
    const { onChange } = this.props;
    const stopMinQuantity = e.target.value;
    this.setState({
      stopMinQuantity,
    });
    onChange?.({
      stepNo,
      startQuantity,
      startUnit,
      increaseMinQuantity,
      increaseMinUnit,
      increaseMaxQuantity,
      increaseMaxUnit,
      increaseNormalQuantity,
      increaseNormalUnit,
      stopMinQuantity,
      stopMinUnit,
      stopMaxQuantity,
      stopMaxUnit,
      lastMinTime,
      lastMinTimeUnit,
      lastMaxTime,
      lastMaxTimeUnit,
      id,
    });
  };

  onStopMinUnitChange = (stopMinUnit) => {
    const {
      stepNo,
      startQuantity,
      startUnit,
      increaseMinQuantity,
      increaseMinUnit,
      increaseMaxQuantity,
      increaseMaxUnit,
      increaseNormalQuantity,
      increaseNormalUnit,
      stopMinQuantity,
      stopMaxQuantity,
      stopMaxUnit,
      lastMinTime,
      lastMinTimeUnit,
      lastMaxTime,
      lastMaxTimeUnit,
      id,
    } = this.state;
    const { onChange } = this.props;
    this.setState({
      stopMinUnit,
    });
    onChange?.({
      stepNo,
      startQuantity,
      startUnit,
      increaseMinQuantity,
      increaseMinUnit,
      increaseMaxQuantity,
      increaseMaxUnit,
      increaseNormalQuantity,
      increaseNormalUnit,
      stopMinQuantity,
      stopMinUnit,
      stopMaxQuantity,
      stopMaxUnit,
      lastMinTime,
      lastMinTimeUnit,
      lastMaxTime,
      lastMaxTimeUnit,
      id,
    });
  };

  onStopMaxQuantityhange = (e) => {
    const {
      stepNo,
      startQuantity,
      startUnit,
      increaseMinQuantity,
      increaseMinUnit,
      increaseMaxQuantity,
      increaseMaxUnit,
      increaseNormalQuantity,
      increaseNormalUnit,
      stopMinQuantity,
      stopMinUnit,
      stopMaxUnit,
      lastMinTime,
      lastMinTimeUnit,
      lastMaxTime,
      lastMaxTimeUnit,
      id,
    } = this.state;
    const { onChange } = this.props;
    const stopMaxQuantity = e.target.value;
    this.setState({
      stopMaxQuantity,
    });
    onChange?.({
      stepNo,
      startQuantity,
      startUnit,
      increaseMinQuantity,
      increaseMinUnit,
      increaseMaxQuantity,
      increaseMaxUnit,
      increaseNormalQuantity,
      increaseNormalUnit,
      stopMinQuantity,
      stopMinUnit,
      stopMaxQuantity,
      stopMaxUnit,
      lastMinTime,
      lastMinTimeUnit,
      lastMaxTime,
      lastMaxTimeUnit,
      id,
    });
  };

  onStopMaxUnitChange = (stopMaxUnit) => {
    const {
      stepNo,
      startQuantity,
      startUnit,
      increaseMinQuantity,
      increaseMinUnit,
      increaseMaxQuantity,
      increaseMaxUnit,
      increaseNormalQuantity,
      increaseNormalUnit,
      stopMinQuantity,
      stopMinUnit,
      stopMaxQuantity,
      lastMinTime,
      lastMinTimeUnit,
      lastMaxTime,
      lastMaxTimeUnit,
      id,
    } = this.state;
    const { onChange } = this.props;
    this.setState({
      stopMaxUnit,
    });
    onChange?.({
      stepNo,
      startQuantity,
      startUnit,
      increaseMinQuantity,
      increaseMinUnit,
      increaseMaxQuantity,
      increaseMaxUnit,
      increaseNormalQuantity,
      increaseNormalUnit,
      stopMinQuantity,
      stopMinUnit,
      stopMaxQuantity,
      stopMaxUnit,
      lastMinTime,
      lastMinTimeUnit,
      lastMaxTime,
      lastMaxTimeUnit,
      id,
    });
  };

  onLastMinTimeChange = (e) => {
    const {
      stepNo,
      startQuantity,
      startUnit,
      increaseMinQuantity,
      increaseMinUnit,
      increaseMaxQuantity,
      increaseMaxUnit,
      increaseNormalQuantity,
      increaseNormalUnit,
      stopMinQuantity,
      stopMinUnit,
      stopMaxQuantity,
      stopMaxUnit,
      lastMinTimeUnit,
      lastMaxTime,
      lastMaxTimeUnit,
      id,
    } = this.state;
    const { onChange } = this.props;
    const lastMinTime = e.target.value;
    this.setState({
      lastMinTime,
    });
    onChange?.({
      stepNo,
      startQuantity,
      startUnit,
      increaseMinQuantity,
      increaseMinUnit,
      increaseMaxQuantity,
      increaseMaxUnit,
      increaseNormalQuantity,
      increaseNormalUnit,
      stopMinQuantity,
      stopMinUnit,
      stopMaxQuantity,
      stopMaxUnit,
      lastMinTime,
      lastMinTimeUnit,
      lastMaxTime,
      lastMaxTimeUnit,
      id,
    });
  };

  onLastMinTimeUnitChange = (lastMinTimeUnit) => {
    const {
      stepNo,
      startQuantity,
      startUnit,
      increaseMinQuantity,
      increaseMinUnit,
      increaseMaxQuantity,
      increaseMaxUnit,
      increaseNormalQuantity,
      increaseNormalUnit,
      stopMinQuantity,
      stopMinUnit,
      stopMaxQuantity,
      stopMaxUnit,
      lastMinTime,
      lastMaxTime,
      lastMaxTimeUnit,
      id,
    } = this.state;
    const { onChange } = this.props;
    this.setState({
      lastMinTimeUnit,
    });
    onChange?.({
      stepNo,
      startQuantity,
      startUnit,
      increaseMinQuantity,
      increaseMinUnit,
      increaseMaxQuantity,
      increaseMaxUnit,
      increaseNormalQuantity,
      increaseNormalUnit,
      stopMinQuantity,
      stopMinUnit,
      stopMaxQuantity,
      stopMaxUnit,
      lastMinTime,
      lastMinTimeUnit,
      lastMaxTime,
      lastMaxTimeUnit,
      id,
    });
  };

  onLastMaxTimeChange = (e) => {
    const {
      stepNo,
      startQuantity,
      startUnit,
      increaseMinQuantity,
      increaseMinUnit,
      increaseMaxQuantity,
      increaseMaxUnit,
      increaseNormalQuantity,
      increaseNormalUnit,
      stopMinQuantity,
      stopMinUnit,
      stopMaxQuantity,
      stopMaxUnit,
      lastMinTime,
      lastMinTimeUnit,
      lastMaxTimeUnit,
      id,
    } = this.state;
    const { onChange } = this.props;
    const lastMaxTime = e.target.value;
    this.setState({
      lastMaxTime,
    });
    onChange?.({
      stepNo,
      startQuantity,
      startUnit,
      increaseMinQuantity,
      increaseMinUnit,
      increaseMaxQuantity,
      increaseMaxUnit,
      increaseNormalQuantity,
      increaseNormalUnit,
      stopMinQuantity,
      stopMinUnit,
      stopMaxQuantity,
      stopMaxUnit,
      lastMinTime,
      lastMinTimeUnit,
      lastMaxTime,
      lastMaxTimeUnit,
      id,
    });
  };

  onLastMaxTimeUnitChange = (lastMaxTimeUnit) => {
    const {
      stepNo,
      startQuantity,
      startUnit,
      increaseMinQuantity,
      increaseMinUnit,
      increaseMaxQuantity,
      increaseMaxUnit,
      increaseNormalQuantity,
      increaseNormalUnit,
      stopMinQuantity,
      stopMinUnit,
      stopMaxQuantity,
      stopMaxUnit,
      lastMinTime,
      lastMinTimeUnit,
      lastMaxTime,
      id,
    } = this.state;
    const { onChange } = this.props;
    this.setState({
      lastMaxTimeUnit,
    });
    onChange?.({
      stepNo,
      startQuantity,
      startUnit,
      increaseMinQuantity,
      increaseMinUnit,
      increaseMaxQuantity,
      increaseMaxUnit,
      increaseNormalQuantity,
      increaseNormalUnit,
      stopMinQuantity,
      stopMinUnit,
      stopMaxQuantity,
      stopMaxUnit,
      lastMinTime,
      lastMinTimeUnit,
      lastMaxTime,
      lastMaxTimeUnit,
      id,
    });
  };

  static getDerivedStateFromProps(props, state) {
    if (
      props.value?.id !== state.id ||
      props.value?.startQuantity !== state.startQuantity ||
      props.value?.startUnit !== state.startUnit ||
      props.value?.increaseMinQuantity !== state.increaseMinQuantity ||
      props.value?.increaseMinUnit !== state.increaseMinUnit ||
      props.value?.increaseMaxQuantity !== state.increaseMaxQuantity ||
      props.value?.increaseMaxUnit !== state.increaseMaxUnit ||
      props.value?.increaseNormalQuantity !== state.increaseNormalQuantity ||
      props.value?.increaseNormalUnit !== state.increaseNormalUnit ||
      props.value?.stopMinQuantity !== state.stopMinQuantity ||
      props.value?.stopMinUnit !== state.stopMinUnit ||
      props.value?.stopMaxQuantity !== state.stopMaxQuantity ||
      props.value?.stopMaxUnit !== state.stopMaxUnit ||
      props.value?.lastMinTime !== state.lastMinTime ||
      props.value?.lastMinTimeUnit !== state.lastMinTimeUnit ||
      props.value?.lastMaxTime !== state.lastMaxTime ||
      props.value?.lastMaxTimeUnit !== state.lastMaxTimeUnit ||
      props.index + 1 !== state.stepNo
    ) {
      return {
        stepNo: props.index != null ? props.index + 1 : null,
        startQuantity: props.value?.startQuantity || null,
        startUnit: props.value?.startUnit || null,
        increaseMinQuantity: props.value?.increaseMinQuantity || null,
        increaseMinUnit: props.value?.increaseMinUnit || null,
        increaseMaxQuantity: props.value?.increaseMaxQuantity || null,
        increaseMaxUnit: props.value?.increaseMaxUnit || null,
        increaseNormalQuantity: props.value?.increaseNormalQuantity || null,
        increaseNormalUnit: props.value?.increaseNormalUnit || null,
        stopMinQuantity: props.value?.stopMinQuantity || null,
        stopMinUnit: props.value?.stopMinUnit || null,
        stopMaxQuantity: props.value?.stopMaxQuantity || null,
        stopMaxUnit: props.value?.stopMaxUnit || null,
        lastMinTime: props.value?.lastMinTime || null,
        lastMinTimeUnit: props.value?.lastMinTimeUnit || null,
        lastMaxTime: props.value?.lastMaxTime || null,
        lastMaxTimeUnit: props.value?.lastMaxTimeUnit || null,
        id: props.value?.id || uuidv4(),
      };
    }
    return {};
  }

  render() {
    const {
      stepNo,
      increaseMinQuantity,
      increaseMinUnit,
      startQuantity,
      startUnit,
      increaseMaxQuantity,
      increaseMaxUnit,
      increaseNormalQuantity,
      increaseNormalUnit,
      stopMinQuantity,
      stopMinUnit,
      stopMaxQuantity,
      stopMaxUnit,
      lastMinTime,
      lastMinTimeUnit,
      lastMaxTime,
      lastMaxTimeUnit,
    } = this.state;
    const { timeUnitList = [], unitList = [], onDel } = this.props;
    return (
      <Card style={{ marginBottom: '30px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ width: '100px', textAlign: 'right' }}>阶梯：</div>
            <div>第{stepNo}阶梯</div>
          </div>
          <Button danger size="small" onClick={onDel}>
            删除
          </Button>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
          <div style={{ width: '100px', textAlign: 'right' }}>起始用量：</div>
          <Input
            style={{ width: '130px', marginRight: '10px' }}
            placeholder="请输入起始用量"
            value={startQuantity}
            onChange={this.onStartQuantityChange}
          />
          <Select
            style={{ width: '100px' }}
            placeholder="选择单位"
            value={startUnit}
            onChange={this.onStartUnitChange}
          >
            {unitList.map((item) => (
              <Option key={item}>{item}</Option>
            ))}
          </Select>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
          <div style={{ width: '100px', textAlign: 'right' }}>递增下线：</div>
          <Input
            style={{ width: '130px', marginRight: '10px' }}
            placeholder="请输入用量"
            value={increaseMinQuantity}
            onChange={this.onIncreaseMinQuantityhange}
          />
          <Select
            style={{ width: '100px' }}
            placeholder="选择单位"
            value={increaseMinUnit}
            onChange={this.onIncreaseMinUnitChange}
          >
            {unitList.map((item) => (
              <Option key={item}>{item}</Option>
            ))}
          </Select>
          <div style={{ width: '100px', textAlign: 'right', marginLeft: '15px' }}>递增上线：</div>
          <Input
            style={{ width: '130px', marginRight: '10px' }}
            placeholder="请输入用量"
            value={increaseMaxQuantity}
            onChange={this.onIncreaseMaxQuantityhange}
          />
          <Select
            style={{ width: '130px' }}
            placeholder="选择单位"
            value={increaseMaxUnit}
            onChange={this.onIncreaseMaxUnitChange}
          >
            {unitList.map((item) => (
              <Option key={item}>{item}</Option>
            ))}
          </Select>
          <div style={{ width: '100px', textAlign: 'right', marginLeft: '15px' }}>常规递增：</div>
          <Input
            style={{ width: '130px', marginRight: '10px' }}
            placeholder="请输入用量"
            value={increaseNormalQuantity}
            onChange={this.onIncreaseNormalQuantityhange}
          />
          <Select
            style={{ width: '100px' }}
            placeholder="选择单位"
            value={increaseNormalUnit}
            onChange={this.onIncreaseNormalUnitChange}
          >
            {unitList.map((item) => (
              <Option key={item}>{item}</Option>
            ))}
          </Select>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
          <div style={{ width: '100px', textAlign: 'right' }}>最小终点用量：</div>
          <Input
            style={{ width: '130px', marginRight: '10px' }}
            placeholder="请输入用量"
            value={stopMinQuantity}
            onChange={this.onStopMinQuantityChange}
          />
          <Select
            style={{ width: '100px' }}
            placeholder="选择单位"
            value={stopMinUnit}
            onChange={this.onStopMinUnitChange}
          >
            {unitList.map((item) => (
              <Option key={item}>{item}</Option>
            ))}
          </Select>
          <div style={{ width: '100px', textAlign: 'right', marginLeft: '15px' }}>
            最大终点用量：
          </div>
          <Input
            style={{ width: '130px', marginRight: '10px' }}
            placeholder="请输入用量"
            value={stopMaxQuantity}
            onChange={this.onStopMaxQuantityhange}
          />
          <Select
            style={{ width: '130px' }}
            placeholder="选择单位"
            value={stopMaxUnit}
            onChange={this.onStopMaxUnitChange}
          >
            {unitList.map((item) => (
              <Option key={item}>{item}</Option>
            ))}
          </Select>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
          <div style={{ width: '100px', textAlign: 'right' }}>最小维持时间：</div>
          <Input
            style={{ width: '130px', marginRight: '10px' }}
            placeholder="输入时间"
            value={lastMinTime}
            onChange={this.onLastMinTimeChange}
          />
          <Select
            style={{ width: '100px' }}
            placeholder="选择单位"
            value={lastMinTimeUnit}
            onChange={this.onLastMinTimeUnitChange}
          >
            {timeUnitList.map((item) => (
              <Option key={item}>{item}</Option>
            ))}
          </Select>
          <div style={{ width: '100px', textAlign: 'right', marginLeft: '15px' }}>
            最大维持时间：
          </div>
          <Input
            style={{ width: '130px', marginRight: '10px' }}
            placeholder="输入时间"
            value={lastMaxTime}
            onChange={this.onLastMaxTimeChange}
          />
          <Select
            style={{ width: '130px' }}
            placeholder="选择单位"
            value={lastMaxTimeUnit}
            onChange={this.onLastMaxTimeUnitChange}
          >
            {timeUnitList.map((item) => (
              <Option key={item}>{item}</Option>
            ))}
          </Select>
        </div>
      </Card>
    );
  }
}
