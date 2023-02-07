import React, { Component } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import DrugClassificationItem from './Item';
import { v4 as uuidv4 } from 'uuid';

export default class DrugClassification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drugCategories: props.value?.length
        ? props.value
        : [
            {
              id: uuidv4(),
              categoryId: null,
              sysCode: null,
            },
          ],
    };
  }

  onAdd = () => {
    const { drugCategories } = this.state;
    const { onChange } = this.props;
    drugCategories.push({ id: uuidv4(), categoryId: null, sysCode: null });
    this.setState(
      {
        drugCategories,
      },
      () => {
        onChange?.(drugCategories);
      },
    );
  };

  onDel = (index) => {
    const { drugCategories } = this.state;
    const { onChange } = this.props;
    drugCategories.splice(index, 1);
    this.setState(
      {
        drugCategories,
      },
      () => onChange?.(drugCategories),
    );
  };

  static getDerivedStateFromProps(props) {
    if (props.value?.length) {
      return {
        drugCategories: props.value,
      };
    }
    return {};
  }

  onChange = (index, item) => {
    const { onChange } = this.props;
    const { drugCategories } = this.state;
    drugCategories.splice(index, 1, item);
    this.setState(
      {
        drugCategories,
      },
      () => onChange?.(drugCategories),
    );
  };

  render() {
    const { drugCategories } = this.state;
    const { sysList } = this.props;
    return (
      <div>
        {drugCategories.map((item, index) => (
          <DrugClassificationItem
            key={item.id}
            item={item}
            onDel={this.onDel}
            index={index}
            sysList={sysList}
            onChange={this.onChange}
          />
        ))}

        <div
          onClick={this.onAdd}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              cursor: 'pointer',
              border: '1px  gray solid',
              width: '200px',
              height: '30px',
              display: 'flex',
              borderRadius: '5px',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <PlusOutlined /> 添加分类
          </div>
        </div>
      </div>
    );
  }
}
