import { Button, Card, Select, Input } from 'antd';
import React, { Component } from 'react';

const { Option } = Select;

const { TextArea } = Input;

export default class EvidenceCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      typeList: [
        {
          key: 0,
          value: '其他',
        },
        {
          key: 1,
          value: '说明书',
        },
        {
          key: 2,
          value: '文献',
        },
      ],
      drugCategoryTree: [],
      id: props.item?.id || null,
      typeId: props.item?.typeId || null,
      type: props.item?.type !== null || props.item?.type !== undefined ? props.item?.type : null,
      level: props.item?.level || null,
      source: props.item?.source || null,
    };
  }

  onTypeChange = (type) => {
    let { typeId } = this.state;
    const { id, level, source } = this.state;
    typeId = null;
    const { onChange } = this.props;
    this.setState({
      type,
      typeId,
    });
    onChange?.({
      id,
      type,
      typeId,
      level,
      source,
    });
  };

  onLevelChange = (level) => {
    const { type, typeId, id, source } = this.state;
    const { onChange } = this.props;
    this.setState({
      level,
    });
    onChange?.({
      id,
      type,
      typeId,
      level,
      source,
    });
  };

  onTypeIdChange = (typeId) => {
    const { type, level, id, source } = this.state;
    const { onChange } = this.props;
    this.setState({ typeId });
    onChange?.({
      id,
      type,
      typeId,
      level,
      source,
    });
  };

  onSourceChange = (e) => {
    const { type, level, id, typeId } = this.state;
    const { onChange } = this.props;
    const source = e.target.value;
    this.setState({ source });
    onChange?.({
      id,
      type,
      typeId,
      level,
      source,
    });
  };

  static getDerivedStateFromProps(props, state) {
    if (
      props.item?.level !== state.level ||
      props.item?.id !== state.id ||
      props.item?.typeId !== state.typeId ||
      props.item?.type !== state.type ||
      props.item?.source !== state.source
    ) {
      return {
        id: props.item?.id || null,
        typeId: props.item?.typeId || null,
        type: props.item?.type,
        level: props.item?.level || null,
        source: props.item?.source || null,
      };
    }
    return {};
  }

  render() {
    const { typeList, type, typeId, level, source } = this.state;
    const { onDel, literatureList, directionList, levelList, style = {} } = this.props;
    return (
      <Card style={style}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div>证据类型：</div>
            <Select
              style={{ width: '460px' }}
              placeholder="请选择证据类型"
              value={type}
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              onChange={this.onTypeChange}
            >
              {typeList.map((item) => (
                <Option key={item.key} value={item.key}>
                  {item.value}
                </Option>
              ))}
            </Select>
          </div>
          <Button danger onClick={onDel}>
            删除
          </Button>
        </div>
        {+type !== 0 && (
          <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
            <div style={{ width: '70px' }}></div>
            <Select
              style={{ width: '460px' }}
              placeholder="请选择说明书/文献"
              value={typeId}
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              onChange={this.onTypeIdChange}
            >
              {+type === 2 &&
                literatureList.map((item) => (
                  <Option key={item.key} value={item.key}>
                    {item.value}
                  </Option>
                ))}
              {+type === 1 &&
                directionList.map((item) => (
                  <Option key={item.key} value={item.key}>
                    {item.value}
                  </Option>
                ))}
            </Select>
          </div>
        )}

        <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
          <div style={{ width: '70px' }}>证据等级：</div>
          <Select
            style={{ width: '460px' }}
            placeholder="请选择证据类型"
            value={level}
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            onChange={this.onLevelChange}
          >
            {levelList.map((item) => (
              <Option key={item.key} value={item.key}>
                {item.value}
              </Option>
            ))}
          </Select>
        </div>

        <div style={{ display: 'flex', marginTop: '20px' }}>
          <div>证据出处：</div>
          <TextArea
            style={{ width: '460px' }}
            rows={4}
            onChange={this.onSourceChange}
            placeholder="请输入证据出处"
            value={source}
          />
        </div>
      </Card>
    );
  }
}
