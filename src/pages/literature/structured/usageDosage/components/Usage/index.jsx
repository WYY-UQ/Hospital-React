import React, { Component } from 'react';
import { Card, notification, Select, Tag } from 'antd';

const { Option } = Select;

export default class Usage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usageDosings: props.usage?.usageDosings?.length ? props.usage?.usageDosings : [],
      usageRoutes: props.usage?.usageRoutes?.length ? props.usage?.usageRoutes : [],
      usageTimes: props.usage?.usageTimes?.length ? props.usage?.usageTimes : [],
    };
  }

  onUsageRouteChange = (key) => {
    const { usageRoutes, usageDosings, usageTimes } = this.state;
    const { deliveryWayList, onChange } = this.props;
    const exit = usageRoutes.find((item) => item.key === key);
    if (exit) {
      notification.warn({
        message: '提示',
        description: '已存在该药途径',
      });
      return;
    }
    const route = deliveryWayList.find((item) => item.key === key);
    usageRoutes.push({
      key: route?.key,
      value: route?.value,
    });
    this.setState({
      usageRoutes,
    });
    onChange?.({
      usageRoutes,
      usageDosings,
      usageTimes,
    });
  };

  onUsageRouteDel = (key) => {
    let { usageRoutes } = this.state;
    const { usageDosings, usageTimes } = this.state;
    const { onChange } = this.props;
    usageRoutes = usageRoutes.filter((item) => item.key !== key);
    this.setState({
      usageRoutes,
    });
    onChange?.({
      usageRoutes,
      usageDosings,
      usageTimes,
    });
  };

  onUsageDosingChange = (key) => {
    const { usageRoutes, usageDosings, usageTimes } = this.state;
    const { dosingFrequencyList, onChange } = this.props;
    const exit = usageDosings.find((item) => item.key === key);
    if (exit) {
      notification.warn({
        message: '提示',
        description: '已存在该给药频次',
      });
      return;
    }
    const route = dosingFrequencyList.find((item) => item.key === key);
    usageDosings.push({
      key: route?.key,
      value: route?.value,
    });
    this.setState({
      usageDosings,
    });
    onChange?.({
      usageRoutes,
      usageDosings,
      usageTimes,
    });
  };

  onUsageDosingDel = (key) => {
    let { usageDosings } = this.state;
    const { usageRoutes, usageTimes } = this.state;
    const { onChange } = this.props;
    usageDosings = usageDosings.filter((item) => item.key !== key);
    this.setState({
      usageDosings,
    });
    onChange?.({
      usageRoutes,
      usageDosings,
      usageTimes,
    });
  };

  onUsageTimeChange = (key) => {
    const { usageRoutes, usageDosings, usageTimes } = this.state;
    const { deliveryTimeList, onChange } = this.props;
    const exit = usageTimes.find((item) => item.key === key);
    if (exit) {
      notification.warn({
        message: '提示',
        description: '已存在该给药时机',
      });
      return;
    }
    const route = deliveryTimeList.find((item) => item.key === key);
    usageTimes.push({
      key: route?.key,
      value: route?.value,
    });
    this.setState({
      usageTimes,
    });
    onChange?.({
      usageRoutes,
      usageDosings,
      usageTimes,
    });
  };

  onUsageTimeDel = (key) => {
    let { usageTimes } = this.state;
    const { usageRoutes, usageDosings } = this.state;
    const { onChange } = this.props;
    usageTimes = usageTimes.filter((item) => item.key !== key);
    this.setState({
      usageTimes,
    });
    onChange?.({
      usageRoutes,
      usageDosings,
      usageTimes,
    });
  };

  static getDerivedStateFromProps(props, state) {
    if (
      props.usage !== null &&
      (JSON.stringify(props.usage?.usageDosings) !== JSON.stringify(state.usageDosings) ||
        JSON.stringify(props.usage?.usageRoutes) !== JSON.stringify(state.usageRoutes) ||
        JSON.stringify(props.usage?.usageTimes) !== JSON.stringify(state.usageTimes))
    ) {
      return {
        usageDosings: props.usage?.usageDosings?.length ? props.usage?.usageDosings : [],
        usageRoutes: props.usage?.usageRoutes?.length ? props.usage?.usageRoutes : [],
        usageTimes: props.usage?.usageTimes?.length ? props.usage?.usageTimes : [],
      };
    }
    return {};
  }

  render() {
    const { usageRoutes, usageDosings, usageTimes } = this.state;
    const { deliveryWayList = [], dosingFrequencyList = [], deliveryTimeList = [] } = this.props;
    return (
      <Card title="用法" style={{ marginBottom: '30px' }}>
        <Card bordered={false}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div>给药途径：</div>
            <Select
              style={{ width: '150px' }}
              placeholder="请选择给药途径"
              value={null}
              onChange={this.onUsageRouteChange}
            >
              {deliveryWayList.map((item) => (
                <Option key={item.key} value={item.key}>
                  {item.value}
                </Option>
              ))}
            </Select>
            <div style={{ display: 'flex', marginLeft: '10px' }}>
              {usageRoutes?.map((item) => (
                <Tag
                  color="blue"
                  key={item.key}
                  closable
                  onClose={() => {
                    this.onUsageRouteDel(item.key);
                  }}
                  style={{
                    marginRight: '10px',
                    padding: '5px',
                    borderRadius: '3px',
                  }}
                >
                  {item.value}
                </Tag>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', marginTop: '30px' }}>
            <div>给药频次：</div>
            <Select
              style={{ width: '150px' }}
              placeholder="请选择给药频次"
              value={null}
              onChange={this.onUsageDosingChange}
            >
              {dosingFrequencyList.map((item) => (
                <Option key={item.key} value={item.key}>
                  {item.value}
                </Option>
              ))}
            </Select>

            <div style={{ display: 'flex', marginLeft: '10px' }}>
              {usageDosings?.map((item) => (
                <Tag
                  color="blue"
                  key={item.key}
                  closable
                  onClose={() => {
                    this.onUsageDosingDel(item.key);
                  }}
                  style={{
                    marginRight: '10px',
                    padding: '5px',
                    borderRadius: '3px',
                  }}
                >
                  {item.value}
                </Tag>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', marginTop: '30px' }}>
            <div>给药时机：</div>
            <Select
              style={{ width: '150px' }}
              placeholder="请选择给药时机"
              value={null}
              onChange={this.onUsageTimeChange}
            >
              {deliveryTimeList.map((item) => (
                <Option key={item.key} value={item.key}>
                  {item.value}
                </Option>
              ))}
            </Select>

            <div style={{ display: 'flex', marginLeft: '10px' }}>
              {usageTimes?.map((item) => (
                <Tag
                  color="blue"
                  key={item.key}
                  closable
                  onClose={() => {
                    this.onUsageTimeDel(item.key);
                  }}
                  style={{
                    marginRight: '10px',
                    padding: '5px',
                    borderRadius: '3px',
                  }}
                >
                  {item.value}
                </Tag>
              ))}
            </div>
          </div>
        </Card>
      </Card>
    );
  }
}
