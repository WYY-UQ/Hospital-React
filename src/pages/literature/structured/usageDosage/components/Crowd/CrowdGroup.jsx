import { Button, Collapse } from 'antd';
import React, { Component } from 'react';
import CrowdItem from './CrowdItem';
import { PlusOutlined } from '@ant-design/icons';
import { v4 as uuidv4 } from 'uuid';

const { Panel } = Collapse;

export default class CrowdGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      crowds: props.value?.crowds?.length
        ? props.value?.crowds
        : [
            {
              useDefaultValue: true,
              maxValue: null,
              paraName: null,
              paraUnit: null,
              minValue: null,
              crowdId: null,
              id: uuidv4(),
              typeCode: null,
            },
          ],
      id: props.value?.id || uuidv4(),
    };
  }

  onAddCrowd = () => {
    const { crowds } = this.state;
    crowds.push({
      useDefaultValue: true,
      maxValue: null,
      paraName: null,
      paraUnit: null,
      minValue: null,
      crowdId: null,
      id: uuidv4(),
      typeCode: null,
    });
    this.setState({
      crowds,
    });
  };

  onCrowdChange = (index, value) => {
    console.log(index, value);
    const { id, crowds } = this.state;
    const { onChange } = this.props;
    crowds.splice(index, 1, value);
    this.setState({
      crowds,
    });
    onChange?.({
      id,
      crowds,
    });
  };

  onCrowdDel = (index) => {
    const { id, crowds } = this.state;
    const { onChange } = this.props;
    crowds.splice(index, 1);
    this.setState({
      crowds,
    });
    onChange?.({
      id,
      crowds,
    });
  };

  static getDerivedStateFromProps(props, state) {
    if (
      props.value?.id !== state.id ||
      JSON.stringify(props.value?.crowds) !== JSON.stringify(state.crowds)
    ) {
      return {
        id: props.value?.id || uuidv4(),
        crowds: props.value?.crowds?.length
          ? props.value?.crowds
          : [
              {
                useDefaultValue: true,
                maxValue: null,
                paraName: null,
                paraUnit: null,
                minValue: null,
                crowdId: null,
                id: uuidv4(),
                typeCode: null,
              },
            ],
      };
    }
    return {};
  }

  render() {
    const { crowds } = this.state;
    const { crowdTypeList = [], onDel } = this.props;
    return (
      <Collapse defaultActiveKey={['1']} style={{ marginBottom: '30px' }}>
        <Panel
          header="人群组"
          key="1"
          extra={
            <Button danger size="small" onClick={onDel}>
              删除
            </Button>
          }
        >
          {crowds.map((item, index) => (
            <CrowdItem
              key={item.id}
              onDel={() => this.onCrowdDel(index)}
              value={item}
              crowdTypeList={crowdTypeList}
              onChange={(value) => this.onCrowdChange(index, value)}
            />
          ))}

          <div
            onClick={this.onAddCrowd}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                background: '#FFF',
                cursor: 'pointer',
                border: '1px  gray dashed',
                width: '200px',
                height: '30px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <PlusOutlined /> 添加人群
            </div>
          </div>
        </Panel>
      </Collapse>
    );
  }
}
