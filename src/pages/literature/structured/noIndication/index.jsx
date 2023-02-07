import { PageContainer } from '@ant-design/pro-layout';
import { Card, Form, Button, notification, Select } from 'antd';
import React, { Component } from 'react';
import {
  queryCommonDicts,
  queryIndicationTplSections,
  queryIndicationChildren,
} from '@/services/common';
import { saveDirectionIndication, getDirectionIndication } from '@/services/direction';
import { history } from 'umi';
import IndicationCard from '@/components/IndicationCard';

const layout = {
  labelCol: {
    span: 3,
  },
  wrapperCol: {
    span: 13,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 6,
    span: 16,
  },
};

const { Option } = Select;

export default class NoIndication extends Component {
  constructor(props) {
    super(props);
    this.formRef = React.createRef();
    this.state = {
      sysList: [],
      tplId: null,
      tplList: [],
      activeKey: null,
      indicationTree: [],
      showUnContainIndications: false,
      form: {
        indications: [],
      },
    };
  }

  async componentDidMount() {
    let sysList = [];
    let tplList = [];
    let activeKey = null;
    let indicationTree = [];
    const { form } = this.state;
    const dictRes = await queryCommonDicts(15);
    if (dictRes) {
      sysList = dictRes.data[0]?.dicts ?? [];
      activeKey = sysList[0].key;
      form.indications = sysList.map((item) => {
        return {
          containIndications: [],
          sysCode: item.key,
          sysName: item.value,
          unContainIndications: [],
        };
      });
    }

    const res = await queryIndicationChildren({
      sysCode: activeKey,
    });
    if (res) {
      indicationTree = res?.data?.length ? res.data : [];
    }
    const tplRes = await queryIndicationTplSections({
      isSuit: false,
    });

    if (tplRes) {
      tplList = tplRes.data;
    }

    this.listenLocation();

    this.setState({
      sysList,
      activeKey,
      tplList,
      indicationTree,
      form,
    });
  }

  onTabChange = async (activeKey) => {
    let indicationTree = [];
    const res = await queryIndicationChildren({
      sysCode: activeKey,
    });
    if (res) {
      indicationTree = res?.data?.length ? res.data : [];
    }
    this.setState({
      indicationTree,
      activeKey,
    });
  };

  onloadData = async (node) => {
    const { activeKey, indicationTree } = this.state;

    const res = await queryIndicationChildren({
      sysCode: activeKey,
      parentId: node.key,
    });

    if (res?.data?.length) {
      this.setState({
        indicationTree: this.updateTreeData(indicationTree, node.key, res.data),
      });
    }
  };

  updateTreeData = (list, key, children) => {
    return list.map((node) => {
      if (node.key === key) {
        return {
          ...node,
          children,
        };
      }
      if (node.children) {
        return {
          ...node,
          children: this.updateTreeData(node.children, key, children),
        };
      }
      return node;
    });
  };

  listenLocation = async () => {
    const { directionId } = this.props.location.query;
    if (directionId) {
      const res = await getDirectionIndication({
        directionId,
        isSuit: false,
      });
      if (res) {
        const form = {
          indications: res.data,
        };
        this.setState({
          form,
        });
      }
    }
  };

  onTplChange = (tplId) => {
    const { form, tplList } = this.state;

    const res = tplList.find((item) => item.id === tplId);

    if (res) {
      form.indications = res.indications;
    }
    this.setState({
      form,
    });
  };

  onSubmit = async () => {
    const { directionId } = this.props.location.query;
    const { form } = this.state;
    const postdData = {
      directionId,
      isSuit: false,
      syses: form.indications,
    };

    const res = await saveDirectionIndication(postdData);
    if (res) {
      notification.success({
        description: '保存成功',
        message: '提示',
      });
      this.onReset();
    }
  };

  onReset = () => {
    const form = {
      indications: [],
    };
    this.setState({ form });
    history.goBack();
  };

  onIndicationsChange = (indications) => {
    const { form } = this.state;
    form.indications = indications;
    this.setState({
      form,
    });
  };

  render() {
    const {
      sysList,
      form,
      showUnContainIndications,
      tplList,
      tplId,
      activeKey,
      indicationTree,
    } = this.state;
    return (
      <PageContainer title={false}>
        <Card title="基础信息">
          <Form ref={this.formRef} {...layout}>
            <Form.Item label="模板名称">
              <Select
                placeholder="请选择模板类型"
                value={tplId}
                onChange={this.onTplChange}
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                {tplList.map((item) => (
                  <Option key={item.id} value={item.id}>
                    {item.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <IndicationCard
              title="禁忌症"
              sysList={sysList}
              activeKey={activeKey}
              onloadData={this.onloadData}
              indicationTree={indicationTree}
              onTabChange={this.onTabChange}
              indications={form.indications}
              showUnContainIndications={showUnContainIndications}
              onChange={this.onIndicationsChange}
            ></IndicationCard>

            <Form.Item {...tailLayout} style={{ marginTop: '30px' }}>
              <Button type="primary" onClick={this.onSubmit}>
                提交
              </Button>
              <Button htmlType="button" style={{ marginLeft: '8px' }} onClick={this.onReset}>
                取消
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </PageContainer>
    );
  }
}
