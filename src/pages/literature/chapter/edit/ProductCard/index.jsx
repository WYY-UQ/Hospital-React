import React, { Component } from 'react';
import { Button, Card, Select } from 'antd';
import { queryCommonNameWithCompanies } from '@/services/common';

import { v4 as uuidv4 } from 'uuid';

const { Option } = Select;

export default class ProductCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: props?.item?.id || uuidv4(),
      commonNameId: props?.item?.commonNameId || null,
      manufactureId: props?.item?.manufactureId || null,
      specGroupId: props?.item?.specGroupId || null,
      commonNameList: [],
      companyList: [],
      specsList: [],
    };
  }

  handleSearch = async (key) => {
    const res = await queryCommonNameWithCompanies({
      key,
    });
    this.setState({
      commonNameList: res?.data ?? [],
    });
  };

  commonNameChange = (commonNameId) => {
    const { commonNameList, manufactureId, specGroupId, id } = this.state;
    const { onChange } = this.props;
    const commonName = commonNameList.find((item) => item.id === commonNameId);

    this.setState({
      commonNameId,
      companyList: commonName?.companies ?? [],
    });
    onChange?.({
      id,
      commonNameId,
      manufactureId,
      specGroupId,
    });
  };

  manufactureIdChange = (manufactureId) => {
    const { commonNameId, specGroupId, id } = this.state;
    const { companyList } = this.state;
    const { onChange } = this.props;
    const company = companyList.find((item) => item.id === manufactureId);
    this.setState({
      manufactureId,
      specsList: company.specses ?? [],
    });
    onChange?.({
      id,
      commonNameId,
      manufactureId,
      specGroupId,
    });
  };

  specGroupIdChange = (specGroupId) => {
    const { commonNameId, manufactureId, id } = this.state;
    const { onChange } = this.props;
    this.setState({
      specGroupId,
    });
    onChange?.({
      id,
      commonNameId,
      manufactureId,
      specGroupId,
    });
  };

  static getDerivedStateFromProps(props, state) {
    if (
      !state.commonNameList.length &&
      !state.companyList.length &&
      !state.specsList.length &&
      ((props?.item?.manufactureId && props?.item?.manufactureName) ||
        (props?.item?.commonNameId && props?.item?.commonNameName) ||
        (props?.item?.specGroupName && props?.item?.specGroupId))
    ) {
      return {
        commonNameList: [
          {
            id: props?.item?.commonNameId,
            name: props?.item?.commonNameName,
          },
        ],
        companyList: [
          {
            id: props?.item?.manufactureId,
            name: props?.item?.manufactureName,
          },
        ],
        specsList: [
          {
            key: props?.item?.specGroupId,
            value: props?.item?.specGroupName,
          },
        ],
      };
    }

    if (
      props?.item?.id !== state.id ||
      props?.item?.commonNameId !== state.commonNameId ||
      props?.item?.manufactureId !== state.manufactureId ||
      props?.item?.specGroupId !== state.specGroupId
    ) {
      return {
        id: props?.item?.id || uuidv4(),
        commonNameId: props?.item?.commonNameId || null,
        manufactureId: props?.item?.manufactureId || null,
        specGroupId: props?.item?.specGroupId || null,
      };
    }
    return {};
  }

  render() {
    const {
      commonNameId,
      commonNameList,
      companyList,
      manufactureId,
      specsList,
      specGroupId,
    } = this.state;
    const { onDel } = this.props;
    return (
      <Card style={{ marginBottom: '30px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ width: '100px', textAlign: 'right' }}>通用名：</div>
            <Select
              style={{ width: '300px' }}
              placeholder="请选择"
              showSearch
              value={commonNameId}
              defaultActiveFirstOption={false}
              showArrow={false}
              filterOption={false}
              onChange={this.commonNameChange}
              onSearch={this.handleSearch}
              notFoundContent={null}
            >
              {commonNameList.map((item) => (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </div>
          <Button danger onClick={onDel}>
            删除
          </Button>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
          <div style={{ width: '100px', textAlign: 'right' }}>生产厂家：</div>
          <Select
            style={{ width: '300px' }}
            placeholder="请选择"
            value={manufactureId}
            showSearch
            onChange={this.manufactureIdChange}
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {companyList.map((item) => (
              <Option key={item.id} value={item.id}>
                {item.name}
              </Option>
            ))}
          </Select>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
          <div style={{ width: '100px', textAlign: 'right' }}>规格：</div>
          <Select
            style={{ width: '300px' }}
            placeholder="请选择"
            value={specGroupId}
            onChange={this.specGroupIdChange}
          >
            {specsList.map((item) => (
              <Option key={item.key} value={item.key}>
                {item.value}
              </Option>
            ))}
          </Select>
        </div>
      </Card>
    );
  }
}
