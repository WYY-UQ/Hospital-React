import { Button, Card, Input } from 'antd';
import React, { Component } from 'react';

export default class ContactCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.value?.id || null,
      linkMan: props.value?.linkMan || null,
      email: props.value?.email || null,
      tel: props.value?.tel || null,
    };
  }

  onLinkManChange = (e) => {
    const { email, tel, id } = this.state;
    const { onChange } = this.props;
    const linkMan = e.target.value;
    this.setState({
      linkMan,
    });
    onChange?.({
      id,
      linkMan,
      email,
      tel,
    });
  };

  onEmailChange = (e) => {
    const { linkMan, tel, id } = this.state;
    const { onChange } = this.props;
    const email = e.target.value;
    this.setState({
      email,
    });
    onChange?.({
      id,
      linkMan,
      email,
      tel,
    });
  };

  onTelChange = (e) => {
    const { email, linkMan, id } = this.state;
    const { onChange } = this.props;
    const tel = e.target.value;
    this.setState({
      tel,
    });
    onChange?.({
      id,
      linkMan,
      email,
      tel,
    });
  };

  static getDerivedStateFromProps(props, state) {
    if (
      props.value?.id !== state.id ||
      props.value?.linkMan !== state.linkMan ||
      props.value?.email !== state.email ||
      props.value?.tel !== state.tel
    ) {
      return {
        id: props.value?.id || null,
        linkMan: props.value?.linkMan || null,
        email: props.value?.email || null,
        tel: props.value?.tel || null,
      };
    }
    return {};
  }

  render() {
    const { linkMan, email, tel } = this.state;
    const { index, onDel } = this.props;
    return (
      <Card style={index === 0 ? {} : { marginTop: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ width: '120px', textAlign: 'right' }}>联系人：</div>
            <Input
              value={linkMan}
              style={{ width: '150px' }}
              placeholder="请输入联系人"
              onChange={this.onLinkManChange}
            />
            <div style={{ marginLeft: '20px', textAlign: 'right' }}>联系电话：</div>
            <Input
              value={tel}
              style={{ width: '150px' }}
              placeholder="请输入联系电话"
              onChange={this.onTelChange}
            />
            <div style={{ marginLeft: '20px', textAlign: 'right' }}>联系邮箱：</div>
            <Input
              value={email}
              style={{ width: '150px' }}
              placeholder="请输入联系邮箱"
              onChange={this.onEmailChange}
            />
          </div>
          <Button danger onClick={() => onDel(index)}>
            删除联系人
          </Button>
        </div>
      </Card>
    );
  }
}
