import { Button, Card, Input, Select } from 'antd';
import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';

const { Option } = Select;

export default class CourseItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courseNo: props.index != null ? props.index + 1 :  null,
      takeCycle: props.value?.takeCycle || null,
      takeUnit: props.value?.takeUnit || null,
      stopCycle: props.value?.stopCycle || null,
      stopUnit: props.value?.stopUnit || null,
      id: props.value?.id || uuidv4(),
    };
  }

  onTakeCycleChange = (e) => {
    const { courseNo, stopCycle, takeUnit, stopUnit, id } = this.state;
    const { onChange } = this.props;
    const takeCycle = e.target.value;
    this.setState({
      takeCycle,
    });
    onChange?.({
      id,
      courseNo,
      takeCycle,
      takeUnit,
      stopCycle,
      stopUnit,
    });
  };

  onTakeUnitChange = (takeUnit) => {
    const { courseNo, stopCycle, takeCycle, stopUnit, id } = this.state;
    const { onChange } = this.props;
    this.setState({
      takeUnit,
    });
    onChange?.({
      id,
      courseNo,
      takeCycle,
      takeUnit,
      stopCycle,
      stopUnit,
    });
  };

  onStopCyclehange = (e) => {
    const { courseNo, takeUnit, takeCycle, stopUnit, id } = this.state;
    const { onChange } = this.props;
    const stopCycle = e.target.value;
    this.setState({
      stopCycle,
    });
    onChange?.({
      id,
      courseNo,
      takeCycle,
      takeUnit,
      stopCycle,
      stopUnit,
    });
  };

  onStopUnitChange = (stopUnit) => {
    const { courseNo, takeUnit, takeCycle, stopCycle, id } = this.state;
    const { onChange } = this.props;
    this.setState({
      stopUnit,
    });
    onChange?.({
      id,
      courseNo,
      takeCycle,
      takeUnit,
      stopCycle,
      stopUnit,
    });
  };

  static getDerivedStateFromProps(props, state) {
    if (
      props.value?.id !== state.id ||
      props.value?.courseNo !== state.courseNo ||
      props.value?.takeCycle !== state.takeCycle ||
      props.value?.takeUnit !== state.takeUnit ||
      props.value?.stopCycle !== state.stopCycle ||
      props.value?.stopUnit !== state.stopUnit ||
      props.index + 1 !== state.courseNo
    ) {
      return {
        courseNo: props.index != null ? props.index + 1 : null,
        takeCycle: props.value?.takeCycle || null,
        takeUnit: props.value?.takeUnit || null,
        stopCycle: props.value?.stopCycle || null,
        stopUnit: props.value?.stopUnit || null,
        id: props.value?.id || uuidv4(),
      };
    }
    return {};
  }

  render() {
    const { courseNo, stopCycle, stopUnit, takeCycle, takeUnit } = this.state;
    const { timeUnitList, onDel } = this.props;
    return (
      <Card style={{ marginBottom: '30px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ width: '70px', textAlign: 'right' }}>疗程：</div>
            <div>第{courseNo}疗程</div>
          </div>
          <Button danger size="small" onClick={onDel}>
            删除
          </Button>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
          <div style={{ width: '70px', textAlign: 'right' }}>服药周期：</div>
          <Input
            style={{ width: '150px', marginRight: '10px' }}
            placeholder="请输入服药周期"
            value={takeCycle}
            onChange={this.onTakeCycleChange}
          />
          <Select
            style={{ width: '100px' }}
            placeholder="选择单位"
            value={takeUnit}
            onChange={this.onTakeUnitChange}
          >
            {timeUnitList.map((item) => (
              <Option key={item}>{item}</Option>
            ))}
          </Select>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
          <div style={{ width: '70px', textAlign: 'right' }}>停药周期：</div>
          <Input
            style={{ width: '150px', marginRight: '10px' }}
            placeholder="请输入停药周期"
            value={stopCycle}
            onChange={this.onStopCyclehange}
          />
          <Select
            style={{ width: '100px' }}
            placeholder="选择单位"
            value={stopUnit}
            onChange={this.onStopUnitChange}
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
