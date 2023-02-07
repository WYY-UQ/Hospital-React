import { DatePicker, Input, Select, Checkbox, Button } from 'antd';
import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';

const { Option } = Select;

export default class CodeItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.item?.id || uuidv4(),
      code: props.item?.code || null,
      reimbursementRatio: props.item?.reimbursementRatio || null,
      type: props.item?.type || null,
      startDate: props.item?.startDate || null,
      endDate: props.item?.endDate || null,
      endDateDisable: false,
      forever: null,
    };
  }

  onCodeChange = (e) => {
    const { reimbursementRatio, type, startDate, endDate, id } = this.state;
    const { onChange } = this.props;
    const code = e.target.value;
    this.setState({
      code,
    });
    onChange?.({
      id,
      code,
      reimbursementRatio,
      type,
      startDate,
      endDate,
    });
  };

  onReimbursementRatioChange = (e) => {
    const { code, type, startDate, endDate, id } = this.state;
    const reimbursementRatio = e.target.value;
    const { onChange } = this.props;
    this.setState({
      reimbursementRatio,
    });
    onChange?.({
      code,
      reimbursementRatio,
      type,
      startDate,
      endDate,
      id,
    });
  };

  onTypeChange = (type) => {
    const { code, reimbursementRatio, startDate, endDate, id } = this.state;
    const { onChange } = this.props;
    this.setState({
      type,
    });
    onChange?.({
      id,
      code,
      reimbursementRatio,
      type,
      startDate,
      endDate,
    });
  };

  onEndDateChange = (endDate) => {
    const { code, reimbursementRatio, startDate, type, id } = this.state;
    const { onChange } = this.props;
    this.setState({
      endDate,
    });
    onChange?.({
      id,
      code,
      reimbursementRatio,
      type,
      startDate,
      endDate,
    });
  };

  onStartDateChange = (startDate) => {
    const { code, reimbursementRatio, type, endDate, id } = this.state;
    const { onChange } = this.props;
    this.setState({
      startDate,
    });
    onChange?.({
      id,
      code,
      reimbursementRatio,
      type,
      startDate,
      endDate,
    });
  };

  onCheckBoxChange = (e) => {
    this.setState({
      endDate: null,
      forever: e.target.checked,
      endDateDisable: e.target.checked,
    });
  };

  static getDerivedStateFromProps(props, state) {
    if (
      props.item?.code !== state.code ||
      props.item?.id !== state.id ||
      props.item?.reimbursementRatio !== state.reimbursementRatio ||
      props.item?.type !== state.type ||
      props.item?.startDate !== state.startDate ||
      props.item?.endDate !== state.endDate
    ) {
      const obj = {
        id: props.item?.id || uuidv4(),
        code: props.item?.code || null,
        reimbursementRatio: props.item?.reimbursementRatio || null,
        type: props.item?.type || null,
        startDate: props.item?.startDate || null,
        endDate: props.item?.endDate || null,
      };
      if (state.forever == null && props.item?.forever != null) {
        obj.forever = props.item?.forever;
        obj.endDateDisable = props.item?.forever;
      }


      return obj;
    }
    return {};
  }

  render() {
    const {
      code,
      type,
      startDate,
      reimbursementRatio,
      endDate,
      endDateDisable,
      forever,
    } = this.state;
    const { typeList, onDel } = this.props;
    return (
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div>医保代码：</div>
              <Input
                placeholder="请输入医保代码"
                style={{ width: '150px' }}
                value={code}
                onChange={this.onCodeChange}
              ></Input>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginLeft: '30px' }}>
              <div>医保类型：</div>
              <Select
                placeholder="请选择医保类型"
                value={type}
                style={{ width: '150px' }}
                onChange={this.onTypeChange}
              >
                {typeList.map((item) => (
                  <Option key={item.key} value={item.key}>
                    {item.value}
                  </Option>
                ))}
              </Select>
            </div>
          </div>

          {onDel && (
            <Button danger size="small" onClick={onDel}>
              删除
            </Button>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div>报销比例：</div>
            <Input
              value={reimbursementRatio}
              placeholder="请输入报销比例"
              style={{ width: '128px' }}
              onChange={this.onReimbursementRatioChange}
            ></Input>
            <div style={{ marginLeft: '10px' }}>%</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', marginLeft: '30px' }}>
            <div>生效期限：</div>
            <DatePicker
              style={{ width: '150px' }}
              value={startDate}
              onChange={this.onStartDateChange}
            ></DatePicker>
            <div style={{ marginLeft: '10px', marginRight: '10px' }}>至</div>
            <DatePicker
              style={{ width: '150px' }}
              value={endDate}
              disabled={endDateDisable}
              onChange={this.onEndDateChange}
            ></DatePicker>
            <Checkbox
              checked={forever}
              style={{ marginLeft: '10px' }}
              onChange={this.onCheckBoxChange}
            >
              长期
            </Checkbox>
          </div>
        </div>
      </div>
    );
  }
}
