import { Select } from 'antd';
import React, { Component } from 'react';

const { Option } = Select;

export default class Level extends Component {
  constructor(props) {
    super(props);
    this.state = {
      level: props.value?.level || null,
      grade: props.value?.grade || null,
    };
  }

  onLevelChange = (level) => {
    const { grade } = this.state;
    const { onChange } = this.props;
    this.setState({
      level,
    });
    onChange?.({
      level,
      grade,
    });
  };

  onGradeChange = (grade) => {
    const { level } = this.state;
    const { onChange } = this.props;
    this.setState({
      grade,
    });
    onChange?.({
      level,
      grade,
    });
  };

  static getDerivedStateFromProps(props, state) {
    if (props.value?.level !== state.level || props.value?.grade !== state.grade) {
      return {
        level: props.value?.level || null,
        grade: props.value?.grade || null,
      };
    }
    return {};
  }

  render() {
    const { level, grade } = this.state;
    const { gradeList = [], levelList = [] } = this.props;
    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Select
          style={{ width: '300px', marginRight: '20px' }}
          placeholder="请选择级别"
          value={level}
          onChange={this.onLevelChange}
        >
          {levelList.map((item) => (
            <Option key={item.key} value={item.key}>
              {item.value}
            </Option>
          ))}
        </Select>
        <Select
          style={{ width: '300px' }}
          placeholder="请选择等次"
          value={grade}
          onChange={this.onGradeChange}
        >
          {gradeList.map((item) => (
            <Option key={item.key} value={item.key}>
              {item.value}
            </Option>
          ))}
        </Select>
      </div>
    );
  }
}
