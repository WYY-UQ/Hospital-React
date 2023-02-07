import { PageContainer } from '@ant-design/pro-layout';
import { Card, Form, Button, Input, Select, notification, Radio, Tabs } from 'antd';

import React, { Component } from 'react';
import styles from './index.less';
import { queryCommonDicts } from '@/services/common';

import Dragger from './Dragger';
import { saveLiteratureChapter, getLiteratureChapter } from '@/services/literature';
import ProductCard from './ProductCard';
import DrugCard from './DrugCard';
import SubstanceCard from './SubstanceCard';
import CommonNameCard from './CommonNameCard';
import CommonNameSpecCard from './CommonNameSpecCard';
import { history } from 'umi';

import { PlusOutlined } from '@ant-design/icons';

import { v4 as uuidv4 } from 'uuid';

const { Option } = Select;

const { Group } = Radio;

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

const { TabPane } = Tabs;

export default class LiteratureEdit extends Component {
  constructor(props) {
    super(props);
    this.formRef = React.createRef();
    this.state = {
      typeList: [],
      initValues: {},
      activeKey: 'product',
      form: {
        pageMin: null,
        pageMax: null,
        commonNameSpecs: [],
        commonNames: [],
        drugs: [],
        products: [],
        substances: [],
      },
    };
  }

  async componentDidMount() {
    let { typeList } = this.state;
    const dicRes = await queryCommonDicts(19);
    typeList = dicRes?.data[0]?.dicts ?? [];
    this.listenLocation();
    this.setState({
      typeList,
    });
  }

  listenLocation = async () => {
    const { chapterId } = this.props.location.query;
    let activeKey = 'product';
    if (chapterId) {
      const res = await getLiteratureChapter(chapterId);
      if (res) {
        this.formRef?.current?.setFieldsValue(res.data);
        res?.data?.commonNameSpecs?.forEach((item) => {
          // eslint-disable-next-line no-param-reassign
          item.id = uuidv4();
        });
        res?.data?.drugs?.forEach((item) => {
          // eslint-disable-next-line no-param-reassign
          item.id = uuidv4();
        });
        res?.data?.products?.forEach((item) => {
          // eslint-disable-next-line no-param-reassign
          item.id = uuidv4();
        });
        res?.data?.commonNames?.forEach((item) => {
          // eslint-disable-next-line no-param-reassign
          item.id = uuidv4();
        });
        res?.data?.substances?.forEach((item) => {
          // eslint-disable-next-line no-param-reassign
          item.id = uuidv4();
        });
        if (res?.data?.products?.length) {
          activeKey = 'product';
        } else if (res?.data?.commonNames?.length) {
          activeKey = 'commonName';
        } else if (res?.data?.commonNameSpecs?.length) {
          activeKey = 'commonNameSpec';
        } else if (res?.data?.drugs?.length) {
          activeKey = 'drug';
        } else if (res?.data?.substances?.length) {
          activeKey = 'substance';
        }

        this.setState({
          initValues: res.data,
          activeKey,
          form: {
            commonNameSpecs: res?.data?.commonNameSpecs ?? [],
            commonNames: res?.data?.commonNames ?? [],
            drugs: res?.data?.drugs ?? [],
            products: res?.data?.products ?? [],
            substances: res?.data?.substances ?? [],
            pageMax: res?.data?.pageMax,
            pageMin: res?.data?.pageMin,
          },
        });
      }
    }
  };

  onFinish = async (values) => {
    const { initValues, form } = this.state;
    const { literatureId } = this.props.location.query;
    const postdData = {
      ...values,
      ...form,
    };
    if (literatureId) {
      postdData.literatureId = literatureId;
    }
    const res = await saveLiteratureChapter({
      chapter: { ...Object.assign(initValues, postdData) },
    });
    if (res) {
      notification.success({
        description: '保存成功',
        message: '提示',
      });
      this.onReset();
    }
  };

  onReset = () => {
    this.formRef.current.resetFields();
    this.setState({
      form: {
        commonNameSpecs: [],
        commonNames: [],
        drugs: [],
        products: [],
        substances: [],
      },
    });
    history.goBack();
  };

  onAddProduct = () => {
    const { form } = this.state;
    form.products.push({
      id: uuidv4(),
      specGroupId: null,
      manufactureId: null,
      commonNameId: null,
    });
    this.setState({
      form,
    });
  };

  onProductChange = (index, item) => {
    const { form } = this.state;
    form.products.splice(index, 1, item);
    this.setState({
      form,
    });
  };

  onProductDel = (index) => {
    const { form } = this.state;
    form.products.splice(index, 1);
    this.setState({
      form,
    });
  };

  onAddCommonName = () => {
    const { form } = this.state;
    form.commonNames.push({
      id: uuidv4(),
      key: null,
    });
    this.setState({
      form,
    });
  };

  onCommonNameChange = (index, item) => {
    const { form } = this.state;
    form.commonNames.splice(index, 1, item);
    this.setState({
      form,
    });
  };

  onCommonNameDel = (index) => {
    const { form } = this.state;
    form.commonNames.splice(index, 1);
    this.setState({
      form,
    });
  };

  onAddCommonNameSpecs = () => {
    const { form } = this.state;
    form.commonNameSpecs.push({
      id: uuidv4(),
      commonNameId: null,
      specGroupId: null,
    });
    this.setState({
      form,
    });
  };

  onCommonNameSpecsChange = (index, item) => {
    const { form } = this.state;
    form.commonNameSpecs.splice(index, 1, item);
    this.setState({
      form,
    });
  };

  onCommonNameSpecsDel = (index) => {
    const { form } = this.state;
    form.commonNameSpecs.splice(index, 1);
    this.setState({
      form,
    });
  };

  onAddDrug = () => {
    const { form } = this.state;
    form.drugs.push({
      id: uuidv4(),
      key: null,
    });
    this.setState({
      form,
    });
  };

  onDrugChange = (index, item) => {
    const { form } = this.state;
    form.drugs.splice(index, 1, item);
    this.setState({
      form,
    });
  };

  onDrugDel = (index) => {
    const { form } = this.state;
    form.drugs.splice(index, 1);
    this.setState({
      form,
    });
  };

  onAddSubstance = () => {
    const { form } = this.state;
    form.substances.push({
      id: uuidv4(),
      key: null,
    });
    this.setState({
      form,
    });
  };

  onSubstanceChange = (index, item) => {
    const { form } = this.state;
    form.substances.splice(index, 1, item);
    this.setState({
      form,
    });
  };

  onSubstanceDel = (index) => {
    const { form } = this.state;
    form.substances.splice(index, 1);
    this.setState({
      form,
    });
  };

  onValuesChange = (changedValues, all) => {
    this.setState({
      initValues: all,
    });
  };

  onPageMinChage = (e) => {
    const { form } = this.state;
    const pageMin = e.target.value;
    form.pageMin = pageMin;
    this.setState({
      form,
    });
  };

  onPageMaxChage = (e) => {
    const { form } = this.state;
    const pageMax = e.target.value;
    form.pageMax = pageMax;
    this.setState({
      form,
    });
  };

  onTabChange = (activeKey) => {
    this.setState({
      activeKey,
    });
  };

  render() {
    const { form, initValues, activeKey } = this.state;
    return (
      <PageContainer title={false}>
        <div className={styles.scanEditContainer}>
          <Form
            ref={this.formRef}
            {...layout}
            name="basic"
            initialValues={{
              versionType: '0',
              hasChapter: false,
            }}
            onValuesChange={this.onValuesChange}
            onFinish={this.onFinish}
          >
            <Card title="基础信息">
              <Form.Item label="章节码" name="chapterNo">
                <Input placeholder="请输入章节码" />
              </Form.Item>

              <Form.Item
                style={{ marginTop: '20px' }}
                label="章节名称"
                name="chapterName"
                rules={[
                  {
                    required: true,
                    message: '请输入章节名称',
                  },
                ]}
              >
                <Input placeholder="请输入章节名称" />
              </Form.Item>

              <Form.Item label="页码范围">
                <Input
                  placeholder="最小页码"
                  style={{ width: '100px' }}
                  value={form.pageMin}
                  onChange={this.onPageMinChage}
                />
                <span style={{ marginLeft: '10px', marginRight: '10px' }}>-</span>
                <Input
                  placeholder="最大页码"
                  style={{ width: '100px' }}
                  value={form.pageMax}
                  onChange={this.onPageMaxChage}
                />
              </Form.Item>
            </Card>

            {initValues.type === '1' || !initValues.hasChapter ? (
              <Card
                title="关联对象"
                style={{ marginTop: '20px' }}
                activeKey={activeKey}
                onChange={this.onTabChange}
              >
                <Tabs type="card">
                  <TabPane tab="产品" key="product">
                    {form.products.map((item, index) => (
                      <ProductCard
                        key={item.id}
                        onDel={() => this.onProductDel(index)}
                        item={item}
                        onChange={(value) => this.onProductChange(index, value)}
                      />
                    ))}

                    <div
                      onClick={this.onAddProduct}
                      style={{
                        marginBottom: '30px',
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
                        <PlusOutlined /> 添加产品
                      </div>
                    </div>
                  </TabPane>
                  <TabPane tab="通用名" key="commonName">
                    {form.commonNames.map((item, index) => (
                      <CommonNameCard
                        key={item.id}
                        onDel={() => this.onCommonNameDel(index)}
                        item={item}
                        onChange={(value) => this.onCommonNameChange(index, value)}
                      />
                    ))}

                    <div
                      onClick={this.onAddCommonName}
                      style={{
                        marginBottom: '30px',
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
                        <PlusOutlined /> 添加通用名
                      </div>
                    </div>
                  </TabPane>
                  <TabPane tab="通用名规格" key="commonNameSpec">
                    {form.commonNameSpecs.map((item, index) => (
                      <CommonNameSpecCard
                        key={item.id}
                        onDel={() => this.onCommonNameSpecsDel(index)}
                        item={item}
                        onChange={(value) => this.onCommonNameSpecsChange(index, value)}
                      />
                    ))}

                    <div
                      onClick={this.onAddCommonNameSpecs}
                      style={{
                        marginBottom: '30px',
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
                        <PlusOutlined /> 添加通用名规格
                      </div>
                    </div>
                  </TabPane>
                  <TabPane tab="药物" key="drug">
                    {form.drugs.map((item, index) => (
                      <DrugCard
                        key={item.id}
                        onDel={() => this.onDrugDel(index)}
                        item={item}
                        onChange={(value) => this.onDrugChange(index, value)}
                      />
                    ))}

                    <div
                      onClick={this.onAddDrug}
                      style={{
                        marginBottom: '30px',
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
                        <PlusOutlined /> 添加药物
                      </div>
                    </div>
                  </TabPane>

                  <TabPane tab="物质" key="substance">
                    {form.substances.map((item, index) => (
                      <SubstanceCard
                        key={item.id}
                        onDel={() => this.onSubstanceDel(index)}
                        item={item}
                        onChange={(value) => this.onSubstanceChange(index, value)}
                      />
                    ))}

                    <div
                      onClick={this.onAddSubstance}
                      style={{
                        marginBottom: '30px',
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
                        <PlusOutlined /> 添加物质
                      </div>
                    </div>
                  </TabPane>
                </Tabs>
              </Card>
            ) : null}

            <Form.Item {...tailLayout} style={{ marginTop: '30px' }}>
              <Button type="primary" htmlType="submit">
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
