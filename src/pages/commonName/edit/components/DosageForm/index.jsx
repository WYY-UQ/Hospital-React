import React, { Component } from 'react';
// import { Select, Input, Button } from 'antd';
// import styles from './index.less';
// import { PlusOutlined } from '@ant-design/icons';
import { Select } from 'antd';

const { Option } = Select;

export default class DosageForm extends Component {
  constructor(props) {
    super(props);

    console.log(props);

    this.state = {
      fstDosageCodeList: props?.dosageList?.length ? props?.dosageList[0]?.dosages : [],
      secDosageCodeList: [],
      dosageSysCode: props.value?.dosageSysCode || null,
      fstDosageCode: props.value?.fstDosageCode || null,
      secDosageCode: props.value?.secDosageCode || null,
    };
  }

  // onDosageSysCodeChange = (dosageSysCode) => {
  //   const { fstDosageCode, secDosageCode } = this.state;
  //   const { dosageList, onChange } = this.props;
  //   const dosage = dosageList.find((item) => item.dosageSysCode === dosageSysCode);
  //   let fstDosageCodeList = [];
  //   if (dosage) {
  //     fstDosageCodeList = dosage.dosages;
  //   }
  //   this.setState({
  //     dosageSysCode,
  //     fstDosageCodeList,
  //   });
  //   onChange?.({
  //     dosageSysCode,
  //     fstDosageCode,
  //     secDosageCode,
  //   });
  // };

  onFstDosageCodeChange = (fstDosageCode) => {
    const { dosageSysCode, secDosageCode, fstDosageCodeList } = this.state;
    const { onChange } = this.props;
    const fstDosageCodeItem = fstDosageCodeList.find((item) => item.code === fstDosageCode);
    let secDosageCodeList = [];
    if (fstDosageCodeItem) {
      secDosageCodeList = fstDosageCodeItem.children;
    }
    this.setState({
      fstDosageCode,
      secDosageCodeList,
    });
    onChange?.({
      dosageSysCode,
      fstDosageCode,
      secDosageCode,
    });
  };

  onSecDosageCodeChange = (secDosageCode) => {
    const { dosageSysCode, fstDosageCode } = this.state;
    const { onChange } = this.props;
    this.setState({
      fstDosageCode,
    });
    onChange?.({
      dosageSysCode,
      fstDosageCode,
      secDosageCode,
    });
  };

  static getDerivedStateFromProps(props, state) {
    if (
      props.value?.dosageSysCode !== state.dosageSysCode ||
      props.value?.fstDosageCode !== state.fstDosageCode ||
      props.value?.secDosageCode !== state.secDosageCode ||
      !state?.fstDosageCodeList?.length ||
      !state?.secDosageCodeList?.length
    ) {
      const fstDosageCodeList = props?.dosageList?.length ? props?.dosageList[0]?.dosages : [];
      let secDosageCodeList = [];
      if (props?.value?.fstDosageCode) {
        secDosageCodeList =
          fstDosageCodeList.find((item) => item.code === props?.value?.fstDosageCode)?.children ??
          [];
      }

      return {
        dosageSysCode: props.value?.dosageSysCode,
        fstDosageCode: props.value?.fstDosageCode,
        secDosageCode: props.value?.secDosageCode,
        fstDosageCodeList,
        secDosageCodeList,
      };
    }
    return {};
  }

  render() {
    const { fstDosageCode, secDosageCode, fstDosageCodeList, secDosageCodeList } = this.state;
    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {/* <Select
          placeholder="请选择体系"
          style={{ width: '150px', marginRight: '10px' }}
          value={dosageSysCode}
          onChange={this.onDosageSysCodeChange}
        >
          {dosageList.map((item) => (
            <Option key={item.dosageSysCode} value={item.dosageSysCode}>
              {item.dosageSysName}
            </Option>
          ))}
        </Select> */}
        <Select
          placeholder="请选择一级剂型"
          style={{ width: '150px', marginRight: '10px' }}
          value={fstDosageCode}
          onChange={this.onFstDosageCodeChange}
        >
          {fstDosageCodeList.map((item) => (
            <Option key={item.name} value={item.code}>
              {item.name}
            </Option>
          ))}
        </Select>
        <Select
          placeholder="请选择二级剂型"
          style={{ width: '150px' }}
          value={secDosageCode}
          onChange={this.onSecDosageCodeChange}
        >
          {secDosageCodeList.map((item) => (
            <Option key={item.name} value={item.code}>
              {item.name}
            </Option>
          ))}
        </Select>
      </div>
    );
  }
}
