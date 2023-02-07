import React, { Component } from 'react';
import { Button, Card, Select } from 'antd';
import { queryCommonNameWithSpecGroups } from '@/services/common';

import { v4 as uuidv4 } from 'uuid';

const { Option } = Select;

export default class CommonNameSpecCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: props?.item?.id || uuidv4(),
      commonNameId: props?.item?.commonNameId || null,
      specGroupId: props?.item?.specGroupId || null,
      commonNameList: [],
      specsList: [],
    };
  }

  handleSearch = async (key) => {
    const res = await queryCommonNameWithSpecGroups({
      key,
    });
    this.setState({
      commonNameList: res?.data ?? [],
    });
  };

  commonNameChange = (commonNameId) => {
    const { commonNameList, specGroupId, id } = this.state;
    const { onChange } = this.props;
    const commonName = commonNameList.find((item) => item.commonNameId === commonNameId);

    this.setState({
      commonNameId,
      specsList: commonName?.specGroups ?? [],
    });
    onChange?.({
      id,
      commonNameId,
      specGroupId,
    });
  };

  specGroupIdChange = (specGroupId) => {
    const { commonNameId, id } = this.state;
    const { onChange } = this.props;
    this.setState({
      specGroupId,
    });
    onChange?.({
      id,
      commonNameId,
      specGroupId,
    });
  };

  static getDerivedStateFromProps(props, state) {
    if (
      !state.commonNameList.length &&
      !state.specsList.length &&
      ((props?.item?.commonNameId && props?.item?.commonNameName) ||
        (props?.item?.specGroupName && props?.item?.specGroupId))
    ) {
      return {
        commonNameList: [
          {
            commonNameId: props?.item?.commonNameId,
            commonNameName: props?.item?.commonNameName,
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
      props?.item?.specGroupId !== state.specGroupId
    ) {
      return {
        id: props?.item?.id || uuidv4(),
        commonNameId: props?.item?.commonNameId || null,
        specGroupId: props?.item?.specGroupId || null,
      };
    }
    return {};
  }

  render() {
    const { commonNameId, commonNameList, specsList, specGroupId } = this.state;
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
                <Option key={item.commonNameId} value={item.commonNameId}>
                  {item.commonNameName}
                </Option>
              ))}
            </Select>
          </div>
          <Button danger onClick={onDel}>
            删除
          </Button>
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
