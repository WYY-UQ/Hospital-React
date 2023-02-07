import React, { Component } from 'react';
import { Select } from 'antd';
import styles from './index.less';
import { DeleteFilled, PlusCircleFilled } from '@ant-design/icons';
import { queryObjects, queryCommonNameDrugGroups } from '@/services/common';
import { queryCommonNameSpecGroups } from '@/services/common-name';

const { Option } = Select;

export default class ListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      commonNameList: [],
      commonName: props.item?.commonName || null,
      drugGroups: props.item?.drugGroups?.length ? props.item.drugGroups : [],
      commonNameId: props.item?.commonNameId || null,
      drugGroupId: props.item?.drugGroupId || null,
      specses: props.item?.specses?.length ? props.item.specses : [],
    };
  }

  commonNameChange = async (commonNameId) => {
    const { drugGroupId, commonNameList } = this.state;
    const { index, onChange } = this.props;
    const commonNameObj = commonNameList.find((item) => item.key === commonNameId);
    let specses = [];
    let drugGroups = [];
    let commonName = null;
    if (commonNameObj) {
      commonName = commonNameObj.value;
    }
    const drugRes = await queryCommonNameDrugGroups({
      commonNameId,
    });

    drugGroups = drugRes?.data ?? [];

    const specRes = await queryCommonNameSpecGroups({
      commonNameId,
    });

    specses = specRes?.data ?? [];

    this.setState({
      commonNameId,
      drugGroups,
      specses,
    });

    onChange?.(index, {
      commonName,
      commonNameId,
      drugGroupId,
      specses,
      drugGroups,
    });
  };

  drugGroupChange = (drugGroupId) => {
    const { commonNameId, drugGroups, specses, commonName } = this.state;
    const { index, onChange } = this.props;

    this.setState({
      drugGroupId,
    });
    onChange?.(index, {
      commonName,
      commonNameId,
      drugGroupId,
      specses,
      drugGroups,
    });
  };

  static getDerivedStateFromProps(props, state) {
    if (!state.commonNameList.length && props.item?.commonNameId && props.item?.commonName) {
      const commonNameList = [
        {
          key: props.item?.commonNameId || null,
          value: props.item?.commonName || null,
        },
      ];
      return {
        commonNameList,
      };
    }
    if (
      (JSON.stringify(props.item?.drugGroups) !== state.drugGroups && props.item?.drugGroups) ||
      (JSON.stringify(props.item?.specses) !== state.specses && props.item?.specses) ||
      props.item?.commonNameId !== state.commonNameId ||
      props.item?.commonName !== state.commonName ||
      props.item?.drugGroupId !== state.drugGroupId
    ) {
      return {
        drugGroups: props.item?.drugGroups?.length ? props.item.drugGroups : [],
        commonNameId: props.item?.commonNameId || null,
        commonName: props.item?.commonName || null,
        drugGroupId: props.item?.drugGroupId || null,
        specses: props.item?.specses?.length ? props.item.specses : [],
      };
    }
    return {};
  }

  handleSearch = async (key) => {
    let commonNameList = [];
    if (key) {
      const res = await queryObjects({
        type: 3,
        key,
      });
      commonNameList = res?.data ?? [];
    }
    this.setState({ commonNameList });
  };

  render() {
    const { commonNameId, drugGroupId, drugGroups, commonNameList } = this.state;
    const { index, onDel, onAdd } = this.props;
    return (
      <div className={styles.codeItemContainer} style={index === 0 ? {} : { marginTop: '10px' }}>
        <Select
          showSearch
          value={commonNameId}
          defaultActiveFirstOption={false}
          showArrow={false}
          filterOption={false}
          className={styles.codeItemInput}
          placeholder="请选择通用名"
          onChange={this.commonNameChange}
          onSearch={this.handleSearch}
          notFoundContent={null}
        >
          {commonNameList.map((item) => (
            <Option key={item.key} value={item.key}>
              {item.value}
            </Option>
          ))}
        </Select>
        <Select
          showSearch
          value={drugGroupId}
          optionFilterProp="children"
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
          className={styles.codeItemInput}
          placeholder="请选择药物"
          onChange={this.drugGroupChange}
        >
          {drugGroups.map((item) => (
            <Option key={item.key} value={item.key}>
              {item.value}
            </Option>
          ))}
        </Select>
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
