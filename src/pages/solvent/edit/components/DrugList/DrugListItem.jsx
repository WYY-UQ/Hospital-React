import React, { Component } from 'react';
import { Select } from 'antd';
import styles from './index.less';
import { DeleteFilled, PlusCircleFilled } from '@ant-design/icons';

const { Option } = Select;

const typeList = [
  {
    key: 3,
    value: '通用名',
  },
  {
    key: 4,
    value: '产品',
  },
];

export default class DrugListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.item?.id || null,
      type: props.item?.type || null,
      typeId: props.item?.typeId || null,
    };
  }

  typeChange = (value) => {
    const { index, onChange } = this.props;
    const item = JSON.parse(JSON.stringify(this.state));
    item.type = value;
    this.setState(item);
    onChange?.(index, item);
  };

  typeIdChange = (value) => {
    const { index, onChange } = this.props;
    const item = JSON.parse(JSON.stringify(this.state));
    item.typeId = value;
    this.setState(item);
    onChange?.(index, item);
  };

  static getDerivedStateFromProps(props, state) {
    if (
      props.item?.type !== state.type ||
      props.item?.typeId !== state.typeId ||
      props.item?.id !== state.id
    ) {
      return {
        id: props.item?.id || null,
        type: props.item?.type || null,
        typeId: props.item?.typeId || null,
      };
    }
    return {};
  }

  render() {
    const { type, typeId } = this.state;
    const { index, onDel, onAdd, commonNameList = [], productList = [] } = this.props;
    return (
      <div className={styles.itemContainer} style={index === 0 ? {} : { marginTop: '10px' }}>
        <Select
          placeholder="请选择类型"
          value={type}
          showSearch
          optionFilterProp="children"
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
          className={styles.itemSelect}
          onChange={this.typeChange}
        >
          {typeList.map((item) => (
            <Option key={item.key} value={item.key}>
              {item.value}
            </Option>
          ))}
        </Select>
        <Select
          placeholder="请选择类型"
          value={typeId}
          showSearch
          optionFilterProp="children"
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
          className={styles.itemInput}
          onChange={this.typeIdChange}
        >
          {type === 3 &&
            commonNameList.map((item) => (
              <Option key={item.key} value={item.key}>
                {item.value}
              </Option>
            ))}
          {type === 4 &&
            productList.map((item) => (
              <Option key={item.key} value={item.key}>
                {item.value}
              </Option>
            ))}
        </Select>
        <DeleteFilled
          style={{ fontSize: '20px', color: 'red', marginRight: '5px' }}
          onClick={() => onDel(index)}
        />
        {index === 0 && (
          <PlusCircleFilled style={{ fontSize: '20px', color: 'blue' }} onClick={onAdd} />
        )}
      </div>
    );
  }
}
