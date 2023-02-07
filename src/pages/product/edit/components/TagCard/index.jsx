import React, { Component } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { Card, Select } from 'antd';

const { Option } = Select;

export default class TagCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: props.title,
      tags: props.tags?.length ? props.tags : [],
    };
  }

  onTagChange = (value) => {
    const { tags } = this.state;
    const { tagList = [], onChange } = this.props;

    const tag = tagList.find((item) => item.tagId === `${value}`);
    if (tag) {
      const item = {
        tagId: tag.tagId,
        tagName: tag.tagName,
        tagValues: tag.tagValues,
        valueId: null,
      };
      tags.push(item);
      this.setState({
        tags,
      });
      onChange?.(tags);
    }
  };

  onValueChange = (value, index) => {
    const { tags } = this.state;
    const { onChange } = this.props;
    tags[index].valueId = value;
    this.setState({
      tags,
    });
    onChange?.(tags);
  };

  onTagDel = (index) => {
    const { tags } = this.state;
    const { onChange } = this.props;
    if (tags.length) {
      tags.splice(index, 1);
      this.setState({
        tags,
      });
    }
    onChange?.(tags);
  };

  static getDerivedStateFromProps(props, state) {
    if (JSON.stringify(props.tags) !== JSON.stringify(state.tags) && props.tags) {
      return {
        tags: props.tags.length ? props.tags : [],
      };
    }
    return {};
  }

  render() {
    const { title, tags } = this.state;
    const { tagList = [] } = this.props;
    return (
      <Card title={false} style={{ marginBottom: '10px' }}>
        <div>
          {title ? `${title}医院配置：` : '统一标签配置：'}
          <Select
            style={{ width: '150px' }}
            placeholder="添加标签"
            value={null}
            onChange={this.onTagChange}
          >
            {tagList.map((item) => (
              <Option key={item.tagId} value={item.tagId}>
                {item.tagName}
              </Option>
            ))}
          </Select>
        </div>
        <div style={{ marginTop: '20px', display: 'flex' }}>
          {tags && tags.length ? (
            tags.map((item, index) => (
              <div
                style={{ display: 'flex', alignItems: 'center', marginRight: '30px' }}
                key={item.tagName}
              >
                <div>{item.tagName}：</div>
                <Select
                  onChange={(value) => this.onValueChange(value, index)}
                  style={{ width: '120px', marginRight: '10px' }}
                  placeholder="选择值"
                  value={item.valueId}
                >
                  {item.tagValues.map((tagValue) => (
                    <Option key={tagValue.value} value={tagValue.key}>
                      {tagValue.value}
                    </Option>
                  ))}
                </Select>
                <CloseOutlined style={{ fontSize: '15px' }} onClick={() => this.onTagDel(index)} />
              </div>
            ))
          ) : (
            <div>请选择</div>
          )}
        </div>
      </Card>
    );
  }
}
