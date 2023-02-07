import React, { Component } from 'react';
import { Modal, Select, notification } from 'antd';

export default class ProvinceModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalVisible: props.visible || false,
      province: null,
    };
  }

  handleOk = () => {
    const { onClose } = this.props;
    if (!this.state.province) {
      notification.error({
        message: '错误',
        description: '请选择省份',
      });
      return;
    }
    onClose?.(this.state.province);
    this.setState({
      province: null,
    });
  };

  handleCancel = () => {
    const { onClose } = this.props;
    onClose?.();
    this.setState({
      province: null,
    });
  };

  static getDerivedStateFromProps(props) {
    return {
      isModalVisible: props.visible,
    };
  }

  onProvinceChange = (value) => {
    const { regionList = [] } = this.props;
    const province = regionList.find((item) => item.regionName === value);
    if (province) {
      this.setState({
        province:province.regionName,
      });
    }
  };

  render() {
    const { isModalVisible, province } = this.state;
    const { regionList = [] } = this.props;
    return (
      <Modal
        destroyOnClose={true}
        title="添加省份"
        visible={isModalVisible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
      >
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div>选择省份：</div>
          <Select
            placeholder="请选择省份"
            style={{ width: '200px' }}
            onChange={this.onProvinceChange}
            value={province}
          >
            {regionList.map((item) => (
              <Select.Option key={item.regionName} value={item.regionName}>
                {item.regionName}
              </Select.Option>
            ))}
          </Select>
        </div>
      </Modal>
    );
  }
}
