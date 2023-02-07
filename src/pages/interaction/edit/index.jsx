import { PageContainer } from '@ant-design/pro-layout';
import { Card, Form, Button, notification, Select, Input } from 'antd';

import React, { Component } from 'react';
import styles from './index.less';
import {
  queryCommonDicts,
  queryDirectionSections,
  queryLiteratureSections,
} from '@/services/common';

import { saveInteraction, getInteraction } from '@/services/interaction';
import CompositionCard from './components/CompositionCard';
import { PlusOutlined } from '@ant-design/icons';
import { v4 as uuidv4 } from 'uuid';
import EvidenceCard from './components/EvidenceCard';

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

const { TextArea } = Input;

export default class InteractionEdit extends Component {
  constructor(props) {
    super(props);
    this.formRef = React.createRef();
    this.state = {
      categoryList: [],
      directionList: [],
      levelList: [],
      literatureList: [],
      strongCodeList: [],
      formData: {
        influence: null,
        strengthCode: null,
        items: [
          {
            categorySysCode: null,
            id: uuidv4(),
            type: null,
            drugCategoryTree: [],
            typeId: null,
            substanceSections: [],
          },
        ],
        evidences: [
          {
            id: uuidv4(),
            level: null,
            source: null,
            type: null,
            typeId: null,
          },
        ],
      },
      drugCategoryTree: [],
    };
  }

  async componentDidMount() {
    let { categoryList, directionList, literatureList, levelList, strongCodeList } = this.state;
    const dicRes = await queryCommonDicts(5);
    categoryList = dicRes?.data[0]?.dicts ?? [];
    directionList = (await queryDirectionSections())?.data ?? [];
    literatureList = (await queryLiteratureSections())?.data ?? [];
    levelList = (await queryCommonDicts(20))?.data[0]?.dicts ?? [];
    strongCodeList = (await queryCommonDicts(21))?.data[0]?.dicts ?? [];
    this.listenLocation();
    this.setState({
      literatureList,
      categoryList,
      directionList,
      strongCodeList,
      levelList,
    });
  }

  listenLocation = async () => {
    const { interactionId } = this.props.location.query;
    if (interactionId) {
      const res = await getInteraction(interactionId);
      if (res) {
        this.setState({
          formData: res.data,
        });
      }
    }
  };

  onSubmit = async () => {
    const { formData } = this.state;
    const res = await saveInteraction({ interaction: formData });
    if (res) {
      notification.success({
        description: '保存成功',
        message: '提示',
      });
      this.onReset();
    }
  };

  onReset = () => {
    const formData = {
      influence: null,
      strengthCode: null,
      items: [
        {
          categorySysCode: null,
          id: uuidv4(),
          type: null,
          drugCategoryTree: [],
          typeId: null,
          substanceSections: [],
        },
      ],
      evidences: [
        {
          id: uuidv4(),
          level: null,
          source: null,
          type: null,
          typeId: null,
        },
      ],
    };
    this.setState({
      formData,
    });
  };

  onItemsChange = (value, index) => {
    const { formData } = this.state;
    formData.items.splice(index, 1, value);
    this.setState({
      formData,
    });
  };

  onItemsDel = (index) => {
    const { formData } = this.state;
    if (formData.items.length === 1) {
      notification.warn({
        description: '最后一个了~不能再删了',
        message: '提示',
      });
      return;
    }
    formData.items.splice(index, 1);
    this.setState({
      formData,
    });
  };

  onItemAdd = () => {
    const { formData } = this.state;
    formData.items.push({
      categorySysCode: null,
      id: uuidv4(),
      type: null,
      drugCategoryTree: [],
      typeId: null,
      substanceSections: [],
    });
    this.setState({
      formData,
    });
  };

  onEvidenceChange = (value, index) => {
    const { formData } = this.state;
    formData.evidences.splice(index, 1, value);
    this.setState({
      formData,
    });
  };

  onEvidenceDel = (index) => {
    const { formData } = this.state;
    if (formData.evidences.length === 1) {
      notification.warn({
        description: '最后一个了~不能再删了',
        message: '提示',
      });
      return;
    }
    formData.evidences.splice(index, 1);
    this.setState({
      formData,
    });
  };

  onEvidenceAdd = () => {
    const { formData } = this.state;
    formData.evidences.push({
      id: uuidv4(),
      level: null,
      source: null,
      type: null,
      typeId: null,
    });
    this.setState({
      formData,
    });
  };

  onStrongCodeChange = (strengthCode) => {
    const { formData } = this.state;
    formData.strengthCode = strengthCode;
    this.setState({
      formData,
    });
  };

  onInfluenceChange = (e) => {
    const { formData } = this.state;
    formData.influence = e.target.value;
    this.setState({
      formData,
    });
  };

  render() {
    const {
      categoryList,
      formData,
      directionList,
      literatureList,
      levelList,
      strongCodeList,
    } = this.state;
    return (
      <PageContainer title={false}>
        <div className={styles.scanEditContainer}>
          <Form ref={this.formRef} {...layout} name="basic">
            <Card title="相互作用组成">
              {formData.items.map((item, index) => (
                <CompositionCard
                  style={index === 0 ? {} : { marginTop: '20px' }}
                  key={item.id}
                  item={item}
                  onDel={this.onItemsDel}
                  onChange={(value) => this.onItemsChange(value, index)}
                  categoryList={categoryList}
                ></CompositionCard>
              ))}

              <div className={styles.addProvinceConfigContainer} onClick={this.onItemAdd}>
                <div className={styles.addProvinceConfig}>
                  <PlusOutlined />
                  <div> 添加相互作用组成</div>
                </div>
              </div>
            </Card>

            <Card title="相互作用" style={{ marginTop: '30px' }}>
              <Card>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div>作用强度：</div>
                  <Select
                    style={{ width: '460px' }}
                    value={formData.strengthCode}
                    placeholder="请选择作用强度"
                    showSearch
                    onChange={this.onStrongCodeChange}
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {strongCodeList.map((item) => (
                      <Option key={item.key} value={item.key}>
                        {item.value}
                      </Option>
                    ))}
                  </Select>
                </div>
                <div style={{ display: 'flex', marginTop: '20px' }}>
                  <div style={{ width: '71px', textAlign: 'right' }}>影响：</div>
                  <TextArea
                    onChange={this.onInfluenceChange}
                    placeholder="请输入影响"
                    value={formData.influence}
                    style={{ width: '460px' }}
                    rows={4}
                  ></TextArea>
                </div>
              </Card>
            </Card>

            <Card title="证据" style={{ marginTop: '30px' }}>
              {formData.evidences.map((item, index) => (
                <EvidenceCard
                  style={index === 0 ? {} : { marginTop: '20px' }}
                  key={item.id}
                  item={item}
                  onDel={this.onEvidenceDel}
                  onChange={(value) => this.onEvidenceChange(value, index)}
                  levelList={levelList}
                  literatureList={literatureList}
                  directionList={directionList}
                ></EvidenceCard>
              ))}
              <div className={styles.addProvinceConfigContainer} onClick={this.onEvidenceAdd}>
                <div className={styles.addProvinceConfig}>
                  <PlusOutlined />
                  <div> 添加证据</div>
                </div>
              </div>
            </Card>

            <Form.Item {...tailLayout} style={{ marginTop: '30px' }}>
              <Button type="primary" onClick={this.onSubmit}>
                提交
              </Button>
              <Button htmlType="button" className={styles.resetBtn} onClick={this.onReset}>
                取消
              </Button>
            </Form.Item>
          </Form>
        </div>
      </PageContainer>
    );
  }
}
