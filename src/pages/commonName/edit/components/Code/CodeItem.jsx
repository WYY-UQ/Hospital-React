import React, { Component } from 'react';
import { Input } from 'antd';
import styles from './index.less';
import { DeleteFilled, PlusCircleFilled } from '@ant-design/icons';

export default class CodeItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: '',
    };
  }

  codeChange = (e) => {
    const { index, onChange } = this.props;
    const item = JSON.parse(JSON.stringify(this.state));
    item.code = e.target.value;
    this.setState(item);
    onChange?.(index, item.code);
  };

  static getDerivedStateFromProps(props, state) {
    if (props.code !== state.code) {
      return {
        code: props.code || null,
      };
    }
    return {};
  }

  render() {
    const { code } = this.state;
    const { index, onDel, onAdd } = this.props;
    return (
      <div className={styles.codeItemContainer} style={index === 0 ? {} : { marginTop: '10px' }}>
        <Input
          value={code}
          className={styles.codeItemInput}
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
