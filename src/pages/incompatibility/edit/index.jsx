import { PageContainer } from '@ant-design/pro-layout';
import { Card, Form, Button, notification } from 'antd';

import React, { Component } from 'react';
import styles from './index.less';
import {
  queryCommonDicts,
  queryDirectionSections,
  queryLiteratureSections,
  queryObjects,
} from '@/services/common';

import { saveIncompatibility, getIncompatibility } from '@/services/incompatibility';
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

export default class IncompatibilityEdit extends Component {
  constructor(props) {
    super(props);
    this.formRef = React.createRef();
    this.state = {
      categoryList: [],
      substanceList: [],
      directionList: [],
      levelList: [],
      literatureList: [],
      formData: {
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
    let { categoryList, substanceList, directionList, literatureList, levelList } = this.state;
    const dicRes = await queryCommonDicts(5);
    categoryList = dicRes?.data[0]?.dicts ?? [];
    substanceList =
      (
        await queryObjects({
          type: 1,
        })
      )?.data ?? [];
    directionList = (await queryDirectionSections())?.data ?? [];
    literatureList = (await queryLiteratureSections())?.data ?? [];
    levelList = (await queryCommonDicts(20))?.data[0]?.dicts ?? [];
    this.listenLocation();
    this.setState({
      literatureList,
      categoryList,
      substanceList,
      directionList,
      levelList,
    });
  }

  listenLocation = async () => {
    const { incompatibilityId } = this.props.location.query;
    if (incompatibilityId) {
      const res = await getIncompatibility(incompatibilityId);
      if (res) {
        this.setState({
          formData: res.data,
        });
      }
    }
  };

  onSubmit = async () => {
    const { formData } = this.state;
    const res = await saveIncompatibility({ incompatibility: formData });
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

  render() {
    const {
      categoryList,
      substanceList,
      formData,
      directionList,
      literatureList,
      levelList,
    } = this.state;
    return (
      <PageContainer title={false}>
        <div className={styles.scanEditContainer}>
          <Form ref={this.formRef} {...layout} name="basic">
            <Card title="配伍禁忌组成">
              {formData.items.map((item, index) => (
                <CompositionCard
                  style={index === 0 ? {} : { marginTop: '20px' }}
                  key={item.id}
                  item={item}
                  onDel={this.onItemsDel}
                  onChange={(value) => this.onItemsChange(value, index)}
                  categoryList={categoryList}
                  substanceList={substanceList}
                ></CompositionCard>
              ))}

              <div className={styles.addProvinceConfigContainer} onClick={this.onItemAdd}>
                <div className={styles.addProvinceConfig}>
                  <PlusOutlined />
                  <div> 添加配伍禁忌组成</div>
                </div>
              </div>
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
