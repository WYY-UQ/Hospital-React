import { Card, Input } from 'antd';
import React, { Component } from 'react';
import CourseItem from './CourseItem';
import { PlusOutlined } from '@ant-design/icons';
import { v4 as uuidv4 } from 'uuid';

export default class TreatmentCourse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      maxCourse: props.treatmentCourse?.maxCourse || null,
      minCourse: props.treatmentCourse?.minCourse || null,
      items: props.treatmentCourse?.items?.length ? props.treatmentCourse?.items : [],
    };
  }

  onMinCourseChange = (e) => {
    const minCourse = e.target.value;
    const { maxCourse, items } = this.state;
    const { onChange } = this.props;
    this.setState({
      minCourse,
    });
    onChange?.({
      minCourse,
      maxCourse,
      items,
    });
  };

  onMaxCourseChange = (e) => {
    const maxCourse = e.target.value;
    const { minCourse, items } = this.state;
    const { onChange } = this.props;
    this.setState({
      maxCourse,
    });
    onChange?.({
      minCourse,
      maxCourse,
      items,
    });
  };

  onAddGroup = () => {
    const { minCourse, maxCourse, items } = this.state;
    const { onChange } = this.props;
    items.push({
      courseNo: null,
      takeCycle: null,
      takeUnit: null,
      stopCycle: null,
      stopUnit: null,
      id: uuidv4(),
    });
    this.setState({ items });
    onChange?.({
      minCourse,
      maxCourse,
      items,
    });
  };

  onGroupDel = (index) => {
    const { minCourse, maxCourse, items } = this.state;
    const { onChange } = this.props;
    items.splice(index, 1);
    this.setState({ items });
    onChange?.({
      minCourse,
      maxCourse,
      items,
    });
  };

  onItemsChange = (index, value) => {
    const { minCourse, maxCourse, items } = this.state;
    const { onChange } = this.props;
    items.splice(index, 1, value);
    this.setState({ items });
    onChange?.({
      minCourse,
      maxCourse,
      items,
    });
  };

  static getDerivedStateFromProps(props, state) {
    if (
      props.treatmentCourse?.maxCourse !== state.maxCourse ||
      props.treatmentCourse?.minCourse !== state.minCourse ||
      JSON.stringify(props.treatmentCourse?.items) !== JSON.stringify(state.items)
    ) {
      return {
        maxCourse: props.treatmentCourse?.maxCourse || null,
        minCourse: props.treatmentCourse?.minCourse || null,
        items: props.treatmentCourse?.items?.length ? props.treatmentCourse?.items : [],
      };
    }
    return {};
  }

  render() {
    const { minCourse, maxCourse, items } = this.state;
    const { timeUnitList = [] } = this.props;
    return (
      <Card title="用药疗程" style={{ marginBottom: '30px' }}>
        <Card bordered={false}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ width: '70px', textAlign: 'right' }}>疗程范围：</div>
            <Input
              style={{ width: '100px' }}
              placeholder="最小疗程"
              value={minCourse}
              onChange={this.onMinCourseChange}
            />
            <div style={{ marginLeft: '5px', marginRight: '5px' }}>-</div>
            <Input
              style={{ width: '100px' }}
              placeholder="最大疗程"
              value={maxCourse}
              onChange={this.onMaxCourseChange}
            />
          </div>
        </Card>

        {items.map((item, index) => (
          <CourseItem
            onDel={() => this.onGroupDel(index)}
            key={item.id}
            onChange={(value) => this.onItemsChange(index, value)}
            timeUnitList={timeUnitList}
            value={item}
            index={index}
          ></CourseItem>
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
            <PlusOutlined /> 添加疗程
          </div>
        </div>
      </Card>
    );
  }
}
