import React, { Component } from 'react';
import { Modal, Select, notification } from 'antd';

export default class SpecificationModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalVisible: props.visible || false,
      specsList: [],
      specs: {
        specsUnit: null,
        specsValue: null,
      },
    };
  }

  handleOk = () => {
    const { onClose } = this.props;
    if (!this.state.specs.specsValue) {
      notification.error({
        message: '错误',
        description: '请选择规格',
      });
      return;
    }
    onClose?.(this.state.specs);
    this.setState({
      specs: {
        specsUnit: null,
        specsValue: null,
      },
    });
  };

  handleCancel = () => {
    const { onClose } = this.props;
    onClose?.();
    this.setState({
      specs: {
        specsUnit: null,
        specsValue: null,
      },
    });
  };

  static getDerivedStateFromProps(props) {
    const { specsGroups } = props;
    let specsList = [];

    specsGroups?.forEach((item) => {
      specsList = specsList.concat(item.groupSpecs);
    });

    return {
      specsList: Array.from(new Set(specsList)),
      isModalVisible: props.visible,
    };
  }

  onSpecsChange = (value) => {
    this.setState({
      specs: {
        specsValue : value.replace(/[^0-9]/gi, ''),
        specsUnit : value.replace(/\d+/g,''),
      },
    });
  };

  render() {
    const { isModalVisible, specs, specsList } = this.state;
    return (
      <Modal
        destroyOnClose={true}
        title="添加规格配置"
        visible={isModalVisible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
      >
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div>选择规格：</div>
          <Select
            placeholder="请选择等级"
            style={{ width: '200px' }}
            onChange={this.onSpecsChange}
            value={specs.specsValue}
          >
            {specsList.map((item) => (
              <Select.Option
                key={`${item.specsValue}${item.specsUnit}`}
                value={item.specsValue + item.specsUnit}
              >
                {item.specsValue + item.specsUnit}
              </Select.Option>
            ))}
          </Select>
        </div>
      </Modal>
    );
  }
}
