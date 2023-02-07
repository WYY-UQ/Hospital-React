import { Select } from 'antd';
import React, { Component } from 'react';
import { DeleteFilled, PlusCircleFilled } from '@ant-design/icons';

const { Option } = Select;

export default class StepLine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.item?.id || null,
      menstruumId: props.item?.menstruumId || null,
      recommendLevelCode: props.item?.recommendLevelCode || null,
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (
      props.item?.type !== state.type ||
      props.item?.menstruumId !== state.menstruumId ||
      props.item?.id !== state.id
    ) {
      return {
        id: props.item?.id || null,
        recommendLevelCode: props.item?.recommendLevelCode || null,
        menstruumId: props.item?.menstruumId || null,
      };
    }
    return {};
  }

  recommendLevelCodeChange = (value) => {
    const { index, onChange } = this.props;
    const item = JSON.parse(JSON.stringify(this.state));
    item.recommendLevelCode = value;
    this.setState(item);
    onChange?.(index, item);
  };

  menstruumIdChange = (value) => {
    const { index, onChange } = this.props;
    const item = JSON.parse(JSON.stringify(this.state));
    item.menstruumId = value;
    this.setState(item);
    onChange?.(index, item);
  };

  render() {
    const { menstruumId, recommendLevelCode } = this.state;
    const { index, onDel, onAdd, productList = [], levelList = [] } = this.props;
    return (
      <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
        <div>溶媒：</div>
        <Select
          style={{ width: '300px' }}
          placeholder="请选择溶媒"
          value={menstruumId}
          onChange={this.menstruumIdChange}
          showSearch
          optionFilterProp="children"
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {productList.map((item) => (
            <Option key={item.key} value={item.key}>
              {item.value}
            </Option>
          ))}
        </Select>
        <div style={{ marginLeft: '20px' }}>推荐级别：</div>
        <Select
          style={{ width: '150px' }}
          placeholder="请选择推荐级别"
          value={recommendLevelCode}
          onChange={this.recommendLevelCodeChange}
        >
          {levelList.map((item) => (
            <Option key={item.key} value={item.key}>
              {item.value}
            </Option>
          ))}
        </Select>
        <DeleteFilled
          style={{ fontSize: '20px', color: 'red', marginRight: '5px', marginLeft: '10px' }}
          onClick={() => onDel(index)}
        />
        {index === 0 && (
          <PlusCircleFilled style={{ fontSize: '20px', color: 'blue' }} onClick={onAdd} />
        )}
      </div>
    );
  }
}
