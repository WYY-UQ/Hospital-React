import React, { Component } from 'react';
import { Input, Select } from 'antd';
import styles from './index.less';
import { DeleteFilled, PlusCircleFilled } from '@ant-design/icons';

const { Option } = Select;

export default class ProductListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: props.item?.productId || null,
      ratioUnit: props.item?.ratioUnit || null,
      ratioValue: props.item?.ratioValue || null,
    };
  }

  onProductChange = (value) => {
    const { index, onChange } = this.props;
    const item = JSON.parse(JSON.stringify(this.state));
    item.productId = value;
    this.setState(item);
    onChange?.(index, item);
  };

  onRatioValueChange = (e) => {
    const { index, onChange } = this.props;
    const item = JSON.parse(JSON.stringify(this.state));
    item.ratioValue = e.target.value;
    this.setState(item);
    onChange?.(index, item);
  };

  onRatioUnitChange = (value) => {
    const { index, onChange } = this.props;
    const item = JSON.parse(JSON.stringify(this.state));
    item.ratioUnit = value;
    this.setState(item);
    onChange?.(index, item);
  };

  static getDerivedStateFromProps(props, state) {
    if (
      props.item?.productId !== state.productId ||
      props.item?.ratioUnit !== state.ratioUnit ||
      props.item?.ratioValue !== state.ratioValue
    ) {
      return {
        productId: props.item?.productId || null,
        ratioUnit: props.item?.ratioUnit || null,
        ratioValue: props.item?.ratioValue || null,
      };
    }
    return {};
  }

  render() {
    const { productId, ratioUnit, ratioValue } = this.state;
    const { index, onDel, onAdd, productList = [], unitList = [], ratioType = 0 } = this.props;
    return (
      <div
        className={styles.materialCodeItemContainer}
        style={index === 0 ? {} : { marginTop: '10px' }}
      >
        <Select
          onChange={this.onProductChange}
          placeholder="请选择产品"
          style={{ width: '250px', marginRight: '10px' }}
          value={productId}
          showSearch
          optionFilterProp="children"
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {productList.map((item) => (
            <Option key={item.id} value={item.id}>
              {item.name}
            </Option>
          ))}
        </Select>
        {ratioType !== 0 ? (
          <>
            <div style={{ marginRight: '5px' }}>配比：</div>
            <Input
              style={{ width: '100px', marginRight: '10px' }}
              placeholder="规格数值"
              value={ratioValue}
              onChange={this.onRatioValueChange}
            ></Input>

            {ratioType === 2 ? (
              <Select
                onChange={this.onRatioUnitChange}
                placeholder="单位"
                style={{ width: '100px', marginRight: '10px' }}
                value={ratioUnit}
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                {unitList.map((unit) => (
                  <Option key={unit} value={unit}>
                    {unit}
                  </Option>
                ))}
              </Select>
            ) : (
              <div></div>
            )}
          </>
        ) : (
          <></>
        )}

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
