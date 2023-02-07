import { PageContainer } from '@ant-design/pro-layout';
import { Card, Form, Button, Input, Select, notification, Radio, Tabs } from 'antd';

import React, { Component } from 'react';
import styles from './index.less';
import { queryCommonDicts } from '@/services/common';

import Dragger from './Dragger';
import { saveLiterature, getLiterature } from '@/services/literature';
import TagsInput from './TagsInput';
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
    const { literatureId } = this.props.location.query;
    let activeKey = 'product';
    if (literatureId) {
      const res = await getLiterature(literatureId);
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
          },
        });
      }
    }
  };

  onFinish = async (values) => {
    const { initValues, form } = this.state;
    const postdData = {
      ...values,
      ...form,
    };
    const res = await saveLiterature({ literature: { ...Object.assign(initValues, postdData) } });
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
    let { initValues } = this.state;
    initValues = Object.assign(initValues, all);
    this.setState({
      initValues,
    });
  };

  onTabChange = (activeKey) => {
    this.setState({
      activeKey,
    });
  };

  render() {
    const { typeList, form, initValues, activeKey } = this.state;
    return (
      <PageContainer title={false}>
        <div className={styles.scanEditContainer}>
          <Form
            ref={this.formRef}
            {...layout}
            name="basic"
            initialValues={{
              versionType: 0,
              hasChapter: false,
            }}
            onValuesChange={this.onValuesChange}
            onFinish={this.onFinish}
          >
            <Card title="基础信息">
              <Form.Item
                style={{ marginTop: '20px' }}
                label="文献名称"
                name="name"
                rules={[
                  {
                    required: true,
                    message: '请输入文献名称',
                  },
                ]}
              >
                <Input placeholder="请输入文献名称" />
              </Form.Item>

              <Form.Item label="英文名" name="enName">
                <Input placeholder="请输入英文名" />
              </Form.Item>

              <Form.Item
                label="类型"
                name="type"
                rules={[
                  {
                    required: true,
                    message: '请选择类型',
                  },
                ]}
              >
                <Select
                  placeholder="请选择类型"
                  showSearch
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {typeList.map((item) => (
                    <Option key={item.key} value={item.key}>
                      {item.value}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item label="出处" name="source">
                <Input placeholder="请输入出处" />
              </Form.Item>

              <Form.Item label="作者" name="author">
                <Input placeholder="请输入作者" />
              </Form.Item>

              <Form.Item
                label="版本"
                name="versionNo"
                rules={[
                  {
                    required: true,
                    message: '请输入版本',
                  },
                ]}
              >
                <Input placeholder="请输入版本" />
              </Form.Item>

              <Form.Item
                label="版本类型"
                name="versionType"
                rules={[
                  {
                    required: true,
                    message: '请输入版本类型',
                  },
                ]}
              >
                <Group>
                  <Radio value={0}>无类型</Radio>
                  <Radio value={1}>核准</Radio>
                  <Radio value={2}>修订</Radio>
                </Group>
              </Form.Item>

              <Form.Item
                hidden={initValues.type === '1'}
                label="包含章节"
                name="hasChapter"
                rules={[
                  {
                    required: true,
                    message: '请输入包含章节',
                  },
                ]}
              >
                <Group>
                  <Radio value={false}>否</Radio>
                  <Radio value={true}>是</Radio>
                </Group>
              </Form.Item>

              <Form.Item label="关键词" name="keywords">
                <TagsInput></TagsInput>
              </Form.Item>

              <Form.Item label="摘要" name="summary">
                <Input.TextArea placeholder="请输入摘要" rows={4} />
              </Form.Item>
            </Card>

            {/* <Form.Item
                label="文件上传"
                name="files"
                rules={[
                  {
                    required: true,
                    message: '请上传文件',
                  },
                ]}
              >
                <Dragger></Dragger>
              </Form.Item> */}

            {initValues.type === '1' || !initValues.hasChapter ? (
              <Card title="关联对象" style={{ marginTop: '20px' }}>
                <Tabs type="card" activeKey={activeKey} onChange={this.onTabChange}>
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
