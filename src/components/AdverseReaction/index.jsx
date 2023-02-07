import { Card, Select, Input, Button } from 'antd';
import React, { Component } from 'react';

const { Option } = Select;

const { TextArea } = Input;

export default class AdverseReaction extends Component {
  constructor(props) {
    super(props);

    this.state = {
      reactionId: props.item?.reactionId || null,
      reactionLevel: props.item?.reactionLevel || null,
      afterOperation: props.item?.afterOperation || null,
      reactionProbability: props.item?.reactionProbability || null,
      remark: props.item?.remark || null,
      id: props.item?.id || null,
    };
  }

  onReactionIdChange = (reactionId) => {
    const { reactionLevel, afterOperation, reactionProbability, remark, id } = this.state;
    const { onChange, index } = this.props;
    this.setState({
      reactionId,
    });
    onChange?.(
      {
        reactionId,
        reactionLevel,
        afterOperation,
        reactionProbability,
        remark,
        id,
      },
      index,
    );
  };

  onReactionLevelChange = (reactionLevel) => {
    const { reactionId, afterOperation, reactionProbability, remark, id } = this.state;
    const { onChange, index } = this.props;
    this.setState({
      reactionLevel,
    });
    onChange?.(
      {
        reactionId,
        reactionLevel,
        afterOperation,
        reactionProbability,
        remark,
        id,
      },
      index,
    );
  };

  onReactionProbabilityChange = (reactionProbability) => {
    const { reactionId, afterOperation, reactionLevel, remark, id } = this.state;
    const { onChange, index } = this.props;
    this.setState({
      reactionProbability,
    });
    onChange?.(
      {
        reactionId,
        reactionLevel,
        afterOperation,
        reactionProbability,
        remark,
        id,
      },
      index,
    );
  };

  onAfterOperationChange = (e) => {
    const { reactionId, reactionProbability, reactionLevel, remark, id } = this.state;
    const { onChange, index } = this.props;
    const afterOperation = e.target.value;
    this.setState({
      afterOperation,
    });
    onChange?.(
      {
        reactionId,
        reactionLevel,
        afterOperation,
        reactionProbability,
        remark,
        id,
      },
      index,
    );
  };

  onRemarkChange = (e) => {
    const { reactionId, reactionProbability, reactionLevel, afterOperation, id } = this.state;
    const { onChange, index } = this.props;
    const remark = e.target.value;
    this.setState({
      remark,
    });
    onChange?.(
      {
        reactionId,
        reactionLevel,
        afterOperation,
        reactionProbability,
        remark,
        id,
      },
      index,
    );
  };

  static getDerivedStateFromProps(props, state) {
    if (
      props.item?.reactionId !== state.reactionId ||
      props.item?.reactionLevel !== state.reactionLevel ||
      props.item?.afterOperation !== state.afterOperation ||
      props.item?.reactionProbability !== state.reactionProbability ||
      props.item?.remark !== state.remark
    ) {
      return {
        reactionId: props.item?.reactionId || null,
        reactionLevel: props.item?.reactionLevel || null,
        afterOperation: props.item?.afterOperation || null,
        reactionProbability: props.item?.reactionProbability || null,
        remark: props.item?.remark || null,
        id: props.item?.id || null,
      };
    }
    return {};
  }

  render() {
    const { afterOperation, reactionId, reactionProbability, reactionLevel, remark } = this.state;
    const { reactionList = [], levelList = [], probabilityList = [], onDel, index } = this.props;
    return (
      <Card style={index === 0 ? {} : { marginTop: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ width: '100px', textAlign: 'right' }}>术语：</div>
            <Select
              style={{ width: '150px' }}
              placeholder="请选择术语"
              showSearch
              value={reactionId}
              onChange={this.onReactionIdChange}
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {reactionList.map((item) => (
                <Option key={item.key} value={item.key}>
                  {item.value}
                </Option>
              ))}
            </Select>

            <div style={{ marginLeft: '30px' }}>级别：</div>
            <Select
              style={{ width: '150px' }}
              placeholder="请选择级别"
              value={reactionLevel}
              showSearch
              onChange={this.onReactionLevelChange}
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {levelList.map((item) => (
                <Option key={item.key} value={item.key}>
                  {item.value}
                </Option>
              ))}
            </Select>

            <div style={{ marginLeft: '30px' }}>概率：</div>
            <Select
              style={{ width: '150px' }}
              placeholder="请选择概率"
              showSearch
              onChange={this.onReactionProbabilityChange}
              value={reactionProbability}
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {probabilityList.map((item) => (
                <Option key={item.key} value={item.key}>
                  {item.value}
                </Option>
              ))}
            </Select>
          </div>
          <Button danger onClick={() => onDel(index)}>
            删除不良反应
          </Button>
        </div>
        <div style={{ display: 'flex', marginTop: '30px' }}>
          <div style={{ width: '100px', textAlign: 'right' }}>反应后操作：</div>
          <TextArea
            rows={4}
            style={{ width: '600px' }}
            placeholder="请输入反应后操作"
            onChange={this.onAfterOperationChange}
            value={afterOperation}
          ></TextArea>
        </div>
        <div style={{ display: 'flex', marginTop: '30px' }}>
          <div style={{ width: '100px', textAlign: 'right' }}>备注：</div>
          <TextArea
            rows={4}
            onChange={this.onRemarkChange}
            style={{ width: '600px' }}
            placeholder="请输入备注"
            value={remark}
          ></TextArea>
        </div>
      </Card>
    );
  }
}
