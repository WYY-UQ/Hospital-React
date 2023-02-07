/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
import { PageContainer } from '@ant-design/pro-layout';
import React, { Component } from 'react';
import styles from './index.less';
import { Card, Form, Button, Select, notification } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import PackageMethod from './PackageMethod';
import { queryCommonDicts, queryUnits } from '@/services/common';
import { getDirectionSpecsPacks, saveDirectionSpecsPacks } from '@/services/direction';
import { v4 as uuidv4 } from 'uuid';
import { history } from 'umi';

const { Option } = Select;

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

export default class Pack extends Component {
  constructor(props) {
    super(props);
    this.state = {
      unitList: [],
      specsList: [],
      packageMethodList: [],
      form: {
        specs: [
          {
            id: uuidv4(),
            specsUnit: null,
            specsValue: null,
            packs: [
              {
                packType: null,
                levels: [
                  {
                    id: uuidv4(),
                    childUnit: null,
                    childValue: null,
                    levelNo: null,
                    parentUnit: null,
                    parentValue: null,
                  },
                ],
              },
            ],
          },
        ],
      },
    };
  }

  async componentDidMount() {
    let packageMethodList = [];
    let unitList = [];
    let specsList = [];
    const dicRes = await queryCommonDicts(9);
    if (dicRes) {
      packageMethodList = dicRes.data[0]?.dicts ?? [];
    }
    const unitRes = await queryUnits(null);
    if (unitRes) {
      unitList = unitRes.data;
    }
    const { directionId } = this.props.location.query;
    const res = await getDirectionSpecsPacks(directionId);
    const { form } = this.state;
    if (res) {
      if (res.data?.specsPacks?.length) {
        form.specs = res.data?.specsPacks;
        form.specs.forEach((item) => {
          item.packs.forEach((pack) => pack.levels.forEach((l) => (l.id = uuidv4())));
        });
      }

      specsList = res.data?.specses ?? [];
    }
    this.setState({
      packageMethodList,
      unitList,
      specsList,
      form,
    });
  }

  onPackAdd = (index) => {
    const { form } = this.state;
    form.specs[index].packs.push({
      packType: null,
      levels: [
        {
          id: uuidv4(),
          childUnit: null,
          childValue: null,
          levelNo: null,
          parentUnit: null,
          parentValue: null,
        },
      ],
    });
    this.setState({
      form,
    });
  };

  packageMethodChange = (index, packIndex, value) => {
    const { form } = this.state;
    form.specs[index].packs.splice(packIndex, 1, value);
    this.setState({
      form,
    });
  };

  packageMethodDel = (index, packIndex) => {
    const { form } = this.state;
    form.specs[index].packs.splice(packIndex, 1);
    this.setState({
      form,
    });
  };

  onReset = () => {
    const form = {
      specs: [
        {
          id: uuidv4(),
          specsUnit: null,
          specsValue: null,
          packs: [
            {
              packType: null,
              levels: [
                {
                  childUnit: null,
                  childValue: null,
                  levelNo: null,
                  parentUnit: null,
                  parentValue: null,
                },
              ],
            },
          ],
        },
      ],
    };

    this.setState({
      form,
    });
    history.goBack();
  };

  submit = async () => {
    const { form } = this.state;
    const { directionId } = this.props.location.query;
    const postdData = {
      ...form,
      directionId,
    };
    const res = await saveDirectionSpecsPacks(postdData);
    if (res) {
      notification.success({
        description: '保存成功',
        message: '提示',
      });
      this.onReset();
    }
  };

  specChange = (index, value) => {
    const { form } = this.state;
    form.specs[index].specsValue = value.replace(/[^0-9]/gi, '');
    form.specs[index].specsUnit = value.replace(/\d+/g, '');
    this.setState({
      form,
    });
  };

  onSpecsesAdd = () => {
    const { form } = this.state;
    form.specs.push({
      id: uuidv4(),
      specsUnit: null,
      specsValue: null,
      packs: [
        {
          packType: null,
          levels: [
            {
              childUnit: null,
              childValue: null,
              levelNo: null,
              parentUnit: null,
              parentValue: null,
            },
          ],
        },
      ],
    });
    this.setState({
      form,
    });
  };

  render() {
    const { form, unitList, packageMethodList, specsList } = this.state;
    return (
      <PageContainer title={false}>
        <div className={styles.scanEditContainer}>
          <Form ref={this.formRef} {...layout} name="basic">
            {form.specs.map((item, index) => (
              <Card
                style={{
                  marginTop: '30px',
                }}
                key={item.id}
                title="产品规格"
                extra={
                  <Button type="primary" onClick={() => this.onPackAdd(index)}>
                    添加包装
                  </Button>
                }
              >
                <Form.Item label="规格">
                  <Select
                    showSearch
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                    placeholder="请选择规格"
                    value={item.specsValue ? item.specsValue + item.specsUnit : null}
                    onChange={(value) => this.specChange(index, value)}
                  >
                    {specsList.map((spec) => (
                      <Option key={spec.specsValue} value={spec.specsValue + spec.specsUnit}>
                        {spec.specsValue + spec.specsUnit}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                {item.packs.map((pack, packIndex) => (
                  <PackageMethod
                    key={`pack_${packIndex}`}
                    value={pack}
                    onChange={(value) => {
                      this.packageMethodChange(index, packIndex, value);
                    }}
                    onDel={() => {
                      this.packageMethodDel(index, packIndex);
                    }}
                    packageMethodList={packageMethodList}
                    unitList={unitList}
                  />
                ))}
              </Card>
            ))}

            <div className={styles.addProvinceConfigContainer} onClick={this.onSpecsesAdd}>
              <div className={styles.addProvinceConfig}>
                <PlusOutlined />
                <div>添加规格</div>
              </div>
            </div>

            <Form.Item {...tailLayout} style={{ marginTop: '30px' }}>
              <Button type="primary" onClick={this.submit}>
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
