import { Input, Select } from 'antd';
import { level } from 'chalk';
import React, { Component } from 'react';

const { Option } = Select;

export default class Address extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cityList: [],
      districtList: [],
      province: props.value?.province || null,
      district: props.value?.district || null,
      city: props.value?.city || null,
      address: props.value?.address || null,
    };
  }

  onProvinceChange = (province) => {
    const { district, city, address } = this.state;
    const { onChange, regionList } = this.props;
    const cityList = regionList.filter((item) => item.province === province && item.level === 2);
    this.setState({
      province,
      cityList,
    });
    onChange?.({
      province,
      city,
      district,
      address,
    });
  };

  onCityChange = (city) => {
    const { district, province, address } = this.state;
    const { onChange, regionList } = this.props;
    const districtList = regionList.filter((item) => item.city === city && item.level === 3);
    this.setState({
      city,
      districtList,
    });
    onChange?.({
      province,
      city,
      district,
      address,
    });
  };

  onDistrictChange = (district) => {
    const { city, province, address } = this.state;
    const { onChange } = this.props;
    this.setState({
      district,
    });
    onChange?.({
      province,
      city,
      district,
      address,
    });
  };

  onAddressChange = (e) => {
    const { city, province, district } = this.state;
    const { onChange } = this.props;
    const address = e.target.value;
    this.setState({
      address,
    });
    onChange?.({
      province,
      city,
      district,
      address,
    });
  };

  static getDerivedStateFromProps(props, state) {
    if (
      props.value?.province !== state.province ||
      props.value?.city !== state.city ||
      props.value?.district !== state.district ||
      props.value?.address !== state.address
    ) {
      return {
        province: props.value?.province || null,
        district: props.value?.district || null,
        city: props.value?.city || null,
        address: props.value?.address || null,
      };
    }
    return {};
  }

  render() {
    const { cityList, districtList, district, city, address, province } = this.state;
    const { regionList = [] } = this.props;

    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Select
            value={province}
            style={{ width: '200px' }}
            placeholder="选择省"
            onChange={this.onProvinceChange}
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {regionList
              .filter((item) => item.level === 1)
              .map((item) => (
                <Option key={item.regionName} value={item.regionName}>
                  {item.regionName}
                </Option>
              ))}
          </Select>
          <Select
            value={city}
            style={{ width: '200px' }}
            placeholder="选择市"
            onChange={this.onCityChange}
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {cityList.map((item) => (
              <Option key={item.regionName} value={item.regionName}>
                {item.regionName}
              </Option>
            ))}
          </Select>
          <Select
            value={district}
            style={{ width: '200px' }}
            placeholder="选择区"
            onChange={this.onDistrictChange}
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {districtList.map((item) => (
              <Option key={item.regionName} value={item.regionName}>
                {item.regionName}
              </Option>
            ))}
          </Select>
        </div>
        <div style={{ marginTop: '10px' }}>
          <Input placeholder="请输入详细地址" value={address} onChange={this.onAddressChange} />
        </div>
      </div>
    );
  }
}
