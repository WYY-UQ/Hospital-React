import { Card, Tabs, Tag, Select, Button } from 'antd';
import React, { Component } from 'react';

const { Option } = Select;
const { TabPane } = Tabs;

export default class Indication extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: '1',
      indicationSyses: props.indicationSyses?.length ? props.indicationSyses : [],
    };
  }

  onTabChange = (activeKey) => {
    this.setState(
      {
        activeKey,
      },
      () => {
        this.props.onTabChange?.(activeKey);
      },
    );
  };

  static getDerivedStateFromProps(props, state) {
    if (!state.activeKey) {
      return {
        activeKey: props.activeKey,
      };
    }
    if (JSON.stringify(props?.indicationSyses) !== JSON.stringify(state.indicationSyses)) {
      return {
        indicationSyses: props.indicationSyses?.length ? props.indicationSyses : [],
      };
    }
    return {};
  }

  onContainIndicationsChange = (value) => {
    const { indicationSyses, activeKey } = this.state;
    const { indicationList, onChange } = this.props;
    const matchIndicationSyses = indicationSyses.find((item) => item.sysCode === activeKey);
    if (matchIndicationSyses) {
      const res = value.split('_');
      if (!matchIndicationSyses?.containIndications) {
        matchIndicationSyses.containIndications = [];
      }
      matchIndicationSyses?.containIndications?.push({
        id: res[0],
        code: res[1],
        name: res[2],
      });
    } else {
      const res = value.split('_');
      const item = indicationList.find((i) => i.sysCode === activeKey);
      if (item) {
        const temp = {
          sysCode: activeKey,
          sysName: item?.sysName,
          containIndications: [],
        };
        temp?.containIndications?.push({
          id: res[0],
          code: res[1],
          name: res[2],
        });
        indicationSyses.push(temp);
      }
    }
    this.setState({ indicationSyses }, () => {
      onChange?.(indicationSyses);
    });
  };

  onContainIndicationsDel = (index) => {
    const { indicationSyses, activeKey } = this.state;
    const { onChange } = this.props;
    const matchIndicationSyses = indicationSyses.find((item) => item.sysCode === activeKey);
    matchIndicationSyses?.containIndications?.splice(index, 1);
    this.setState({ indicationSyses });
    this.setState({ indicationSyses }, () => {
      onChange?.(indicationSyses);
    });
  };

  onUnContainIndicationsDel = (index) => {
    const { indicationSyses, activeKey } = this.state;
    const { onChange } = this.props;
    const matchIndicationSyses = indicationSyses.find((item) => item.sysCode === activeKey);
    matchIndicationSyses?.unContainIndications?.splice(index, 1);
    this.setState({ indicationSyses });
    this.setState({ indicationSyses }, () => {
      onChange?.(indicationSyses);
    });
  };

  onUnContainIndicationsChange = (value) => {
    const { indicationSyses, activeKey } = this.state;
    const { indicationList, onChange } = this.props;
    const matchIndicationSyses = indicationSyses.find((item) => item.sysCode === activeKey);
    if (matchIndicationSyses) {
      const res = value.split('_');
      if (!matchIndicationSyses?.unContainIndications) {
        matchIndicationSyses.unContainIndications = [];
      }
      matchIndicationSyses?.unContainIndications?.push({
        id: res[0],
        code: res[1],
        name: res[2],
      });
    } else {
      const res = value.split('_');
      const item = indicationList.find((i) => i.sysCode === activeKey);
      if (item) {
        const temp = {
          sysCode: activeKey,
          sysName: item?.sysName,
          unContainIndications: [],
        };
        temp?.unContainIndications?.push({
          id: res[0],
          code: res[1],
          name: res[2],
        });
        indicationSyses.push(temp);
      }
    }
    this.setState({ indicationSyses }, () => {
      onChange?.(indicationSyses);
    });
  };

  onDiseaseSymptomGroupChange = (value) => {
    const { indicationSyses, activeKey } = this.state;
    const { indicationList, onChange } = this.props;
    const matchIndicationSyses = indicationSyses.find((item) => item.sysCode === activeKey);
    if (matchIndicationSyses) {
      const res = value.split('_');
      if (!matchIndicationSyses?.diseaseSymptomGroups) {
        matchIndicationSyses.diseaseSymptomGroups = [];
      }
      matchIndicationSyses?.diseaseSymptomGroups?.push({
        id: res[0],
        groupStr: res[1],
      });
    } else {
      const res = value.split('_');
      const item = indicationList.find((i) => i.sysCode === activeKey);
      if (item) {
        const temp = {
          sysCode: activeKey,
          sysName: item?.sysName,
          diseaseSymptomGroups: [],
        };
        temp?.diseaseSymptomGroups?.push({
          id: res[0],
          groupStr: res[1],
        });
        indicationSyses.push(temp);
      }
    }
    this.setState({ indicationSyses }, () => {
      onChange?.(indicationSyses);
    });
  };

  onDiseaseSymptomGroupDel = (index) => {
    const { indicationSyses, activeKey } = this.state;
    const { onChange } = this.props;
    const matchIndicationSyses = indicationSyses.find((item) => item.sysCode === activeKey);
    matchIndicationSyses?.diseaseSymptomGroups?.splice(index, 1);
    this.setState({ indicationSyses }, () => {
      onChange?.(indicationSyses);
    });
  };

  render() {
    const { activeKey, indicationSyses } = this.state;
    const { indicationList = [], onDel } = this.props;
    return (
      <Card
        title="适应症"
        style={{ marginBottom: '30px' }}
        extra={
          <Button danger onClick={onDel}>
            删除
          </Button>
        }
      >
        <Tabs type="card" activeKey={activeKey} onChange={this.onTabChange}>
          {indicationList.map((item) => (
            <TabPane key={item.sysCode} tab={item.sysName}>
              {item?.sysName === '中成药体系' ? (
                <div>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{ width: '70px', textAlign: 'right' }}>病症组：</div>
                    <Select
                      style={{ width: '300px' }}
                      placeholder="请选择"
                      value={null}
                      onChange={this.onDiseaseSymptomGroupChange}
                    >
                      {item?.diseaseSymptomGroups?.map((diseaseSymptom) => (
                        <Option
                          key={diseaseSymptom?.id}
                          value={`${diseaseSymptom?.id}_${diseaseSymptom?.groupStr}`}
                        >
                          {diseaseSymptom?.groupStr}
                        </Option>
                      ))}
                    </Select>
                  </div>
                  {indicationSyses
                    ?.find((indication) => indication.sysCode === `${activeKey}`)
                    ?.diseaseSymptomGroups?.map((indication, index) => (
                      <Tag
                        key={indication.id}
                        color="blue"
                        closable
                        onClose={() => this.onDiseaseSymptomGroupDel(index)}
                        style={{
                          marginTop: '10px',
                          marginRight: '10px',
                          padding: '5px',
                          borderRadius: '3px',
                        }}
                      >
                        {indication.groupStr}
                      </Tag>
                    ))}
                </div>
              ) : (
                <div>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{ width: '70px', textAlign: 'right' }}>适应症：</div>
                    <Select
                      style={{ width: '300px' }}
                      placeholder="请选择"
                      value={null}
                      onChange={this.onContainIndicationsChange}
                    >
                      {item?.containIndications?.map((containIndication) => (
                        <Option
                          key={containIndication?.code}
                          value={`${containIndication?.id}_${containIndication?.code}_${containIndication?.name}`}
                        >
                          {containIndication?.name}
                        </Option>
                      ))}
                    </Select>
                  </div>
                  {indicationSyses
                    ?.find((indication) => indication.sysCode === `${activeKey}`)
                    ?.containIndications?.map((indication, index) => (
                      <Tag
                        key={indication.id}
                        closable
                        onClose={() => this.onContainIndicationsDel(index)}
                        style={{
                          marginTop: '10px',
                          marginRight: '10px',
                          background: '#F5F5F5',
                          padding: '5px',
                          border: '1px solid #D9D9D9',
                          borderRadius: '3px',
                        }}
                      >
                        {indication.name}
                      </Tag>
                    ))}
                  <div style={{ display: 'flex', marginTop: '20px', alignItems: 'center' }}>
                    <div style={{ width: '70px', textAlign: 'right' }}>排除：</div>
                    <Select
                      style={{ width: '300px' }}
                      placeholder="请选择"
                      value={null}
                      onChange={this.onUnContainIndicationsChange}
                    >
                      {item?.unContainIndications?.map((unContainIndications) => (
                        <Option
                          key={unContainIndications.code}
                          value={`${unContainIndications?.id}_${unContainIndications?.code}_${unContainIndications?.name}`}
                        >
                          {unContainIndications.name}
                        </Option>
                      ))}
                    </Select>
                  </div>
                  {indicationSyses
                    ?.find((indication) => indication.sysCode === `${activeKey}`)
                    ?.unContainIndications?.map((indication, index) => (
                      <Tag
                        key={indication.id}
                        closable
                        onClose={() => this.onUnContainIndicationsDel(index)}
                        style={{
                          marginTop: '10px',
                          marginRight: '10px',
                          background: '#F5F5F5',
                          padding: '5px',
                          border: '1px solid #D9D9D9',
                          borderRadius: '3px',
                        }}
                      >
                        {indication.name}
                      </Tag>
                    ))}
                </div>
              )}
            </TabPane>
          ))}
        </Tabs>
      </Card>
    );
  }
}
