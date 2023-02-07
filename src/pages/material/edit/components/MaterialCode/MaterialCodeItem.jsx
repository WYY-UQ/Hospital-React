import React, { Component } from 'react';
import { Input, Select } from 'antd';
import styles from './index.less';
import { DeleteFilled, PlusCircleFilled } from '@ant-design/icons';

const { Option } = Select;

export default class MaterialCodeItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sysCode: props.item?.sysCode || null,
      code: props.item?.code || null,
    };
  }

  schemeChange = (value) => {
    const { index, onChange } = this.props;
    const item = JSON.parse(JSON.stringify(this.state));
    item.sysCode = value;
    this.setState(item);
    onChange?.(index, item);
  };

  codeChange = (e) => {
    const { index, onChange } = this.props;
    const item = JSON.parse(JSON.stringify(this.state));
    item.code = e.target.value;
    this.setState(item);
    onChange?.(index, item);
  };

  static getDerivedStateFromProps(props, state) {
    if (props.item?.sysCode !== state.sysCode || props.item?.code !== state.code) {
      return {
        sysCode: props.item?.sysCode || null,
        code: props.item?.code || null,
      };
    }
    return {};
  }

  render() {
    const { sysCode, code } = this.state;
    const { index, onDel, onAdd, codeSchemeList = [] } = this.props;
    return (
      <div
        className={styles.materialCodeItemContainer}
        style={index === 0 ? {} : { marginTop: '10px' }}
      >
        <Select
          placeholder="编码体系"
          value={sysCode}
          className={styles.materialCodeItemSelect}
          onChange={this.schemeChange}
        >
          {codeSchemeList.map((item) => (
            <Option key={item.value} value={item.key}>
              {item.value}
            </Option>
          ))}
        </Select>
        <Input
          value={code}
          className={styles.materialCodeItemInput}
          placeholder="请输入编码"
          onChange={this.codeChange}
        ></Input>
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
