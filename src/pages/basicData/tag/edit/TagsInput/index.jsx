import React, { Component } from 'react';
import styles from './index.less';
import { Input, Tag, message } from 'antd';


export default class TagsInput extends Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
    this.state = {
      value: props.value && props.value.length ? props.value : [],
      valueInput: '',
    };
  }

  keyDown = (e) => {
    const { valueInput, value } = this.state;
    if (e.keyCode === 8 && !valueInput) {
      this.setState({
        value: value.filter((v, i, ar) => i !== ar.length - 1),
      });
    }
  };

  handleChange = (e) => {
    const elm = e.target;
    this.setState({ valueInput: elm.value });
  };

  focus = () => {
    this?.inputRef?.current?.focus();
  };

  pressEnter = (e) => {
    const { value } = this.state;
    const { onChange } = this.props;
    e.preventDefault();
    if (e.target.value) {
      const res = [
        ...value,
        {
          value: e.target.value,
        },
      ];
      this.setState({
        value: res,
      });
      this.setState({ valueInput: '' });
      onChange?.(res);
    } else {
      message.error('无数据');
    }
  };

  static getDerivedStateFromProps(props, state) {
    if (props.value && JSON.stringify(props.value) !== JSON.stringify(state.value)) {
      return {
        value: props.value.length ? props.value : [],
      };
    }
    return {};
  }

  preventDefault = (str, e) => {
    const { value } = this.state;
    const { onChange } = this.props;
    e.preventDefault();
    const res = value.filter((item) => item.value !== str);
    console.log(res);
    this.setState({ value: res });
    onChange?.(res);
  };

  render() {
    const { valueInput, value } = this.state;
    return (
      <div onClick={this.focus} className={styles.wrap}>
        {value &&
          value.map((item) => (
            <Tag
              key={item.value}
              style={{
                display: 'flex',
                alignItems: 'center',
                marginTop: '3px',
                marginBottom: '3px',
              }}
              closable
              onClose={(e) => this.preventDefault(item.value, e)}
            >
              {item.value}
            </Tag>
          ))}
        <Input
          onKeyDown={this.keyDown}
          ref={this.inputRef}
          value={valueInput}
          className={styles.inputClass}
          onPressEnter={this.pressEnter}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}
