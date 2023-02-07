import React, { Component } from 'react';
import { Modal, Select, notification } from 'antd';

export default class HospitalGradeModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalVisible: props.visible || false,
      hospitalLevel: {
        levelCode: null,
        levelName: null,
      },
    };
  }

  handleOk = () => {
    const { onClose } = this.props;
    if (!this.state.hospitalLevel.levelName) {
      notification.error({
        message: '错误',
        description: '请选择等级',
      });
      return;
    }
    onClose?.(this.state.hospitalLevel);
    this.setState({
      hospitalLevel: {
        levelCode: null,
        levelName: null,
      },
    });
  };

  handleCancel = () => {
    const { onClose } = this.props;
    onClose?.();
    this.setState({
      hospitalLevel: {
        levelCode: null,
        levelName: null,
      },
    });
  };

  static getDerivedStateFromProps(props) {
    return {
      isModalVisible: props.visible,
    };
  }

  onHospitalLevelChange = (value) => {
    const { hospitalGradeList = [] } = this.props;
    const hospitalGrade = hospitalGradeList.find((item) => item.key === value);
    if (hospitalGrade) {
      this.setState({
        hospitalLevel: {
          levelCode: hospitalGrade.key,
          levelName: hospitalGrade.value,
        },
      });
    }
  };

  render() {
    const { isModalVisible, hospitalLevel } = this.state;
    const { hospitalGradeList = [] } = this.props;
    return (
      <Modal
        destroyOnClose={true}
        title="添加医院等级"
        visible={isModalVisible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
      >
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div>选择等级：</div>
          <Select
            placeholder="请选择等级"
            style={{ width: '200px' }}
            onChange={this.onHospitalLevelChange}
            value={hospitalLevel.levelCode}
          >
            {hospitalGradeList.map((item) => (
              <Select.Option key={item.value} value={item.key}>
                {item.value}
              </Select.Option>
            ))}
          </Select>
        </div>
      </Modal>
    );
  }
}
