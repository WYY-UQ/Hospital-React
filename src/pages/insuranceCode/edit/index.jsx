import { Card, Select, Tabs, Button, notification } from 'antd';
import React, { Component } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { queryCommonDicts, queryObjects, queryRegions } from '@/services/common';
import CodeItem from './components/CodeItem';
import {
  saveCommodityMedicalInsurances,
  getCommodityMedicalInsurances,
} from '@/services/insurance-code';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';

const { Option } = Select;
const { TabPane } = Tabs;

export default class InsuranceCodeEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      commodityList: [],
      typeList: [],
      regionList: [],
      province: null,
      formData: {
        commodityId: null,
        countryMedicalInsurance: {},
        provinceMedicalInsurances: [],
      },
    };
  }

  async componentDidMount() {
    let { commodityList, typeList, regionList } = this.state;

    const comodityRes = await queryObjects({ type: 5 });

    commodityList = comodityRes?.data ?? [];

    const dictRes = await queryCommonDicts(18);
    typeList = dictRes?.data[0]?.dicts ?? [];

    const regionsRes = await queryRegions();

    regionList = regionsRes?.data ?? [];
    regionList = regionList.filter((item) => item.level === 1);
    this.listenLocation();
    this.setState({
      commodityList,
      typeList,
      regionList,
    });
  }

  listenLocation = async () => {
    const { commodityId } = this.props.location.query;
    if (commodityId) {
      const res = await getCommodityMedicalInsurances(commodityId);
      if (res?.data) {
        if (res?.data?.countryMedicalInsurance?.startDate) {
          res.data.countryMedicalInsurance.startDate = moment(
            res?.data.countryMedicalInsurance.startDate,
          );
        }
        if (res?.data?.countryMedicalInsurance?.endDate) {
          res.data.countryMedicalInsurance.endDate = moment(
            res?.data.countryMedicalInsurance.endDate,
          );
        } else {
          res.data.countryMedicalInsurance.forever = true;
        }

        res?.data?.provinceMedicalInsurances.forEach((item) => {
          if (item.endDate) {
            // eslint-disable-next-line no-param-reassign
            item.endDate = moment(item.endDate);
          } else {
            // eslint-disable-next-line no-param-reassign
            item.forever = true;
          }
          if (item.startDate) {
            // eslint-disable-next-line no-param-reassign
            item.startDate = moment(item.startDate);
          }
        });
        this.setState({
          formData: res.data,
        });
      }
    }
  };

  onCommodityIdChange = (commodityId) => {
    const { formData } = this.state;
    formData.commodityId = commodityId;
    this.setState({
      formData,
    });
  };

  onCountryChange = (value) => {
    const { formData } = this.state;
    formData.countryMedicalInsurance = Object.assign(formData.countryMedicalInsurance, value);
    this.setState({
      formData,
    });
  };

  onProvinceChange = (province) => {
    const { formData } = this.state;
    formData.provinceMedicalInsurances.push({
      code: null,
      endDate: null,
      id: uuidv4(),
      province,
      reimbursementRatio: null,
      startDate: null,
      type: null,
    });
    this.setState({
      formData,
    });
  };

  onProvinceCodeChange = (value, index) => {
    const { formData } = this.state;
    formData.provinceMedicalInsurances[index] = Object.assign(
      formData.provinceMedicalInsurances[index],
      value,
    );
    this.setState({
      formData,
    });
  };

  onProvinceCodeDel = (index) => {
    const { formData } = this.state;
    formData.provinceMedicalInsurances.splice(index, 1);
    this.setState({
      formData,
    });
  };

  onReset = () => {
    this.setState({
      commodityList: [],
      typeList: [],
      regionList: [],
      province: null,
      formData: {
        commodityId: null,
        countryMedicalInsurance: {},
        provinceMedicalInsurances: [],
      },
    });
  };

  onSubmit = async () => {
    const { formData } = this.state;

    const res = await saveCommodityMedicalInsurances({ medicalInsurance: formData });
    if (res) {
      notification.success({
        description: '保存成功',
        message: '提示',
      });
      this.onReset();
    }
  };

  render() {
    const { formData, commodityList, typeList, province, regionList } = this.state;
    return (
      <PageContainer title={false}>
        <Card>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div>商品：</div>
            <Select
              onChange={this.onCommodityIdChange}
              style={{ width: '500px' }}
              placeholder="请选择商品"
              value={formData.commodityId}
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {commodityList.map((item) => (
                <Option key={item.key} value={item.key}>
                  {item.value}
                </Option>
              ))}
            </Select>
          </div>

          <Tabs type="card" style={{ marginTop: '30px' }}>
            <TabPane tab="国家级" key="country">
              <Card>
                <CodeItem
                  typeList={typeList}
                  onChange={this.onCountryChange}
                  item={formData.countryMedicalInsurance}
                ></CodeItem>
              </Card>
            </TabPane>
            <TabPane tab="省级" key="province">
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div>省份：</div>
                <Select
                  onChange={this.onProvinceChange}
                  value={province}
                  style={{ width: '200px' }}
                  placeholder="请选择省份"
                  showSearch
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {regionList.map((item) => (
                    <Option key={item.provinceId} value={item.province}>
                      {item.province}
                    </Option>
                  ))}
                </Select>
              </div>
              {formData.provinceMedicalInsurances?.map((item, index) => (
                <Card key={item.id} style={{ marginTop: '20px' }}>
                  <div style={{ display: 'flex' }}>
                    <div style={{ marginTop: '5px', marginRight: '20px' }}>{item.province}：</div>
                    <CodeItem
                      typeList={typeList}
                      onDel={() => this.onProvinceCodeDel(index)}
                      onChange={(value) => this.onProvinceCodeChange(value, index)}
                      item={item}
                    ></CodeItem>
                  </div>
                </Card>
              ))}
            </TabPane>
          </Tabs>

          <div style={{ marginTop: '30px', marginLeft: '300px' }}>
            <Button type="primary" onClick={this.onSubmit}>
              提交
            </Button>
            <Button htmlType="button" style={{ marginLeft: '10px' }} onClick={this.onReset}>
              取消
            </Button>
          </div>
        </Card>
      </PageContainer>
    );
  }
}
