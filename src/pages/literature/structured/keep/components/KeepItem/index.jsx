import { notification, Select, Tag, Modal, Input } from 'antd';
import { min } from 'lodash';
import React, { Component } from 'react';

const { Option } = Select;

export default class KeepItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      condit: null,
      keeps: props.value?.length ? props.value : [],
      temperatureModalVisible: false,
      minValue: null,
      maxValue: null,
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.value && JSON.stringify(props.value) !== JSON.stringify(state.keeps)) {
      return {
        keeps: props.value?.length ? props.value : [],
      };
    }
    return {};
  }

  onClose = (index) => {
    const { keeps } = this.state;
    const { onChange } = this.props;
    keeps.splice(index, 1);
    this.setState(
      {
        keeps,
      },
      () => {
        onChange?.(keeps);
      },
    );
  };

  onTasteChange = (condit) => {
    const { keeps } = this.state;
    const { onChange } = this.props;
    const conditList = keeps.map((item) => item.condit);
    if (conditList.indexOf(condit) > -1) {
      notification.error({
        message: '错误',
        description: '已存在贮存条件',
      });
      return;
    }
    if (condit === '温度') {
      this.setState({
        condit,
        temperatureModalVisible: true,
      });
    } else {
      keeps.push({
        condit,
      });
      this.setState(
        {
          keeps,
        },
        () => {
          onChange?.(keeps);
        },
      );
    }
  };

  handleOk = () => {
    const { maxValue, minValue, keeps, condit } = this.state;
    const { onChange } = this.props;
    if (!minValue && !maxValue) {
      notification.error({
        message: '错误',
        description: '最大值和最小值至少填一个',
      });
      return;
    }
    if (minValue && maxValue && minValue > maxValue) {
      notification.error({
        message: '错误',
        description: '温度最大值必须大于最小值',
      });
      return;
    }
    keeps.push({
      condit,
      minValue,
      maxValue,
    });
    this.setState(
      {
        keeps,
        condit: null,
        minValue: null,
        maxValue: null,
        temperatureModalVisible: false,
      },
      () => {
        onChange?.(keeps);
      },
    );
  };

  handleCancel = () => {
    this.setState({
      condit: null,
      temperatureModalVisible: false,
    });
  };

  onMinValueChange = (e) => {
    this.setState({
      minValue: e.target.value,
    });
  };

  onMaxValueChange = (e) => {
    this.setState({
      maxValue: e.target.value,
    });
  };

  getTextRender = (keep) => {
    if (keep.condit === '温度') {
      if (
        (keep?.minValue == null || keep?.minValue === undefined) &&
        keep?.maxValue != null &&
        keep?.maxValue !== undefined
      ) {
        return `${keep.condit}：${keep?.maxValue}℃以下`;
      }
      if (
        (keep?.maxValue == null || keep?.maxValue === undefined) &&
        keep?.minValue != null &&
        keep?.minValue !== undefined
      ) {
        return `${keep.condit}：${keep?.minValue}℃以上`;
      }
      if (keep?.minValue && keep?.maxValue) {
        return `${keep.condit}：${keep?.minValue}-${keep?.maxValue}℃`;
      }
    }
    return keep?.condit ?? '';
  };

  render() {
    const { condit, keeps, temperatureModalVisible, minValue, maxValue } = this.state;
    const { keepOptionList = [] } = this.props;
    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Select
          placeholder="请选择贮存条件"
          style={{ width: '200px' }}
          value={condit}
          allowClear
          onChange={this.onTasteChange}
        >
          {keepOptionList.map((item) => (
            <Option key={item.key} value={item.key}>
              {item.value}
            </Option>
          ))}
        </Select>
        <div style={{ marginLeft: '20px' }}>
          {keeps.map((item, index) => (
            <Tag color="blue" closable key={item?.condit} onClose={() => this.onClose(index)}>
              {this.getTextRender(item)}
            </Tag>
          ))}
        </div>
        <Modal
          title="选择温度范围"
          visible={temperatureModalVisible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div>温度范围：</div>
            <Input style={{ width: '150px' }} value={minValue} onChange={this.onMinValueChange} />
            <div style={{ marginLeft: '10px', marginRight: '10px' }}>至</div>
            <Input style={{ width: '150px' }} value={maxValue} onChange={this.onMaxValueChange} />
          </div>
        </Modal>
      </div>
    );
  }
}
