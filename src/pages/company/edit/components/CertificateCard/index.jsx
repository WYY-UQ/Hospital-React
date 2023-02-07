import { Button, Card, Input, Select, DatePicker, Checkbox } from 'antd';
import React, { Component } from 'react';

const { Option } = Select;

export default class CertificateCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.value?.id || null,
      type: props.value?.type || null,
      credentialNo: props.value?.credentialNo || null,
      startDate: props.value?.startDate || null,
      endDate: props.value?.endDate || null,
      foreverValid: props.value?.foreverValid || false,
    };
  }

  onTypeChange = (type) => {
    const { startDate, credentialNo, endDate, foreverValid, id } = this.state;
    const { onChange } = this.props;
    this.setState({
      type,
    });
    onChange?.({
      id,
      type,
      credentialNo,
      startDate,
      endDate,
      foreverValid,
    });
  };

  onStartDateChange = (startDate) => {
    const { type, credentialNo, endDate, foreverValid, id } = this.state;
    const { onChange } = this.props;
    this.setState({
      startDate,
    });
    onChange?.({
      id,
      type,
      credentialNo,
      startDate,
      endDate,
      foreverValid,
    });
  };

  onEndDateChange = (endDate) => {
    const { type, credentialNo, startDate, foreverValid, id } = this.state;
    const { onChange } = this.props;
    this.setState({
      endDate,
    });
    onChange?.({
      id,
      type,
      credentialNo,
      startDate,
      endDate,
      foreverValid,
    });
  };

  onCheckBoxChange = (e) => {
    const { type, credentialNo, startDate, endDate, id } = this.state;
    const { onChange } = this.props;
    const foreverValid = e.target.checked;
    this.setState({
      endDate: null,
      foreverValid,
    });
    onChange?.({
      id,
      type,
      credentialNo,
      startDate,
      endDate,
      foreverValid,
    });
  };

  onCredentialNoChange = (e) => {
    const { type, startDate, endDate, foreverValid, id } = this.state;
    const { onChange } = this.props;
    const credentialNo = e.target.value;
    this.setState({
      credentialNo,
    });
    onChange?.({
      id,
      type,
      credentialNo,
      startDate,
      endDate,
      foreverValid,
    });
  };

  static getDerivedStateFromProps(props, state) {
    if (
      props.value?.id !== state.id ||
      props.value?.type !== state.type ||
      props.value?.startDate !== state.startDate ||
      props.value?.credentialNo !== state.credentialNo ||
      props.value?.endDate !== state.endDate ||
      props.value?.foreverValid !== state.foreverValid
    ) {
      return {
        id: props.value?.id || null,
        type: props.value?.type || null,
        credentialNo: props.value?.credentialNo || null,
        startDate: props.value?.startDate || null,
        endDate: props.value?.endDate || null,
        foreverValid: props.value?.foreverValid || false,
      };
    }
    return {};
  }

  render() {
    const { startDate, endDate, foreverValid, credentialNo, type } = this.state;
    const { certTypeList = [], index, onDel } = this.props;
    return (
      <Card style={index === 0 ? {} : { marginTop: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ width: '120px', textAlign: 'right' }}>证件类型：</div>
            <Select
              style={{ width: '200px', marginRight: '20px' }}
              placeholder="选择类型"
              value={type !== null ? `${type}` : null}
              onChange={this.onTypeChange}
            >
              {certTypeList.map((item) => (
                <Option key={item.key} value={item.key}>
                  {item.value}
                </Option>
              ))}
            </Select>
            <Input
              value={credentialNo}
              style={{ width: '300px' }}
              placeholder="请输入证件号码"
              onChange={this.onCredentialNoChange}
            />
          </div>
          <Button danger onClick={() => onDel(index)}>
            删除证件
          </Button>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
          <div style={{ width: '120px', textAlign: 'right' }}>有效期：</div>
          <DatePicker
            style={{ width: '150px' }}
            value={startDate}
            onChange={this.onStartDateChange}
          ></DatePicker>
          <div style={{ marginLeft: '10px', marginRight: '10px' }}>至</div>
          <DatePicker
            style={{ width: '150px' }}
            value={endDate}
            disabled={foreverValid}
            onChange={this.onEndDateChange}
          ></DatePicker>
          <Checkbox
            checked={foreverValid}
            style={{ marginLeft: '10px' }}
            onChange={this.onCheckBoxChange}
          >
            长期
          </Checkbox>
        </div>
      </Card>
    );
  }
}
