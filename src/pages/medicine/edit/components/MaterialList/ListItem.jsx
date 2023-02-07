import React, { Component } from 'react';
import { Select } from 'antd';
import styles from './index.less';
import { DeleteFilled, PlusCircleFilled } from '@ant-design/icons';

const { Option } = Select;

export default class ListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: props.item?.key || null,
    };
  }

  codeChange = (value) => {
    const { index, onChange } = this.props;
    const item = JSON.parse(JSON.stringify(this.state));
    item.key = value;
    this.setState(item);
    onChange?.(index, item);
  };

  static getDerivedStateFromProps(props, state) {
    if (props.item?.key !== state.key) {
      return {
        key: props.item?.key || null,
      };
    }
    return {};
  }

  render() {
    const { key } = this.state;
    const { index, onDel, onAdd, substancesList } = this.props;
    return (
      <div className={styles.codeItemContainer} style={index === 0 ? {} : { marginTop: '10px' }}>
        <Select
          value={key}
          className={styles.codeItemInput}
          placeholder="请选择物质"
          onChange={this.codeChange}
        >
          {substancesList.map((item) => (
            <Option key={item.id} value={item.id}>
              {item.name}
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
