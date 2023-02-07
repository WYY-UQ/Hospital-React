import React, { Component } from 'react';
import { AutoComplete, Select } from 'antd';
import styles from './index.less';
import { DeleteFilled, PlusCircleFilled } from '@ant-design/icons';

const { Option } = Select;

export default class GoodsCodeItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      codeSys: props.item?.codeSys || null,
      code: props.item?.code || '',
    };
  }

  schemeChange = (value) => {
    const { index, onChange } = this.props;
    const item = JSON.parse(JSON.stringify(this.state));
    item.codeSys = value;
    this.setState(item);
    onChange?.(index, item);
  };

  codeChange = (value) => {
    const { index, onChange } = this.props;
    const item = JSON.parse(JSON.stringify(this.state));
    item.code = value;
    this.setState(item);
    onChange?.(index, item);
  };

  static getDerivedStateFromProps(props, state) {
    if (props.item?.codeSys !== state.codeSys || props.item?.code !== state.code) {
      return {
        codeSys: props.item?.codeSys || null,
        code: props.item?.code || '',
      };
    }
    return {};
  }

  render() {
    const { codeSys, code } = this.state;
    const { index, onDel, onAdd, codeSchemeList = [], codeList = [] } = this.props;
    const options = codeList.map((item) => {
      return {
        value: item,
      };
    });
    return (
      <div
        className={styles.materialCodeItemContainer}
        style={index === 0 ? {} : { marginTop: '10px' }}
      >
        <Select
          placeholder="请选择条码体系"
          value={codeSys}
          showSearch
          optionFilterProp="children"
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
          className={styles.materialCodeItemSelect}
          onChange={this.schemeChange}
        >
          {codeSchemeList.map((item) => (
            <Option key={item.key} value={item.key}>
              {item.value}
            </Option>
          ))}
        </Select>
        <AutoComplete
          value={code}
          options={options}
          className={styles.materialCodeItemInput}
          placeholder="请输入条码"
          filterOption={(inputValue, option) =>
            option?.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
          }
          onChange={this.codeChange}
        />
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
