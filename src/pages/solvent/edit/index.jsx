import { Card, Form, Input, Button, notification } from 'antd';
import React, { Component } from 'react';
import styles from './index.less';
import { PageContainer } from '@ant-design/pro-layout';
import { queryCommonDicts, queryObjects } from '@/services/common';
import { saveDissolution, getDissolution } from '@/services/solvent';
import DrugList from './components/DrugList';
import Step from './components/Step';
import { v4 as uuidv4 } from 'uuid';

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

export default class SolventEdit extends Component {
  constructor(props) {
    super(props);

    this.formRef = React.createRef();
    this.state = {
      productList: [],
      commonNameList: [],
      levelList: [],
      formData: {
        volume: null,
        finishDuring: null,
        items: [
          {
            id: uuidv4(),
            type: null,
            typeId: null,
          },
        ],
        steps: [
          {
            items: [
              {
                id: uuidv4(),
                menstruumId: '',
                recommendLevelCode: '',
              },
            ],
            step: 1,
            id: uuidv4(),
          },
        ],
      },
    };
  }

  async componentDidMount() {
    let { productList, commonNameList, levelList } = this.state;
    productList = (await queryObjects({ type: 4 }))?.data ?? [];
    commonNameList = (await queryObjects({ type: 3 }))?.data ?? [];
    levelList = (await queryCommonDicts(21))?.data[0]?.dicts;
    this.listenLocation();
    this.setState({
      productList,
      commonNameList,
      levelList,
    });
  }

  listenLocation = async () => {
    const { dissolutionId } = this.props.location.query;
    if (dissolutionId) {
      const res = await getDissolution(dissolutionId);
      if (res) {
        this.setState({
          formData: res.data,
        });
      }
    }
  };

  submit = async () => {
    const { formData } = this.state;

    const res = await saveDissolution({ dissolution: formData });
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
      volume: null,
      finishDuring: null,
      items: [
        {
          id: uuidv4(),
          type: null,
          typeId: null,
        },
      ],
      steps: [
        {
          items: [
            {
              id: uuidv4(),
              menstruumId: '',
              recommendLevelCode: '',
            },
          ],
          step: 1,
          id: uuidv4(),
        },
      ],
    };
    this.setState({ formData });
  };

  onVolumeChange = (e) => {
    const { formData } = this.state;
    formData.volume = e.target.value;
    this.setState({ formData });
  };

  onFinishDuringChange = (e) => {
    const { formData } = this.state;
    formData.finishDuring = e.target.value;
    this.setState({ formData });
  };

  addStep = () => {
    const { formData } = this.state;
    if (formData.steps.length >= 2) {
      notification.warn({
        description: '步骤最多为两步',
        message: '提示',
      });
      return;
    }
    formData.steps.push({
      items: [
        {
          id: uuidv4(),
          menstruumId: '',
          recommendLevelCode: '',
        },
      ],
      step: 2,
      id: uuidv4(),
    });
    this.setState({ formData });
  };

  onStepChange = (step, index) => {
    const { formData } = this.state;
    formData.steps.splice(index, 1, step);
    this.setState({ formData });
  };

  render() {
    const { formData, productList, commonNameList, levelList } = this.state;
    return (
      <PageContainer title={false}>
        <div className={styles.medicineEditContainer}>
          <div>
            <Form ref={this.formRef} {...layout} name="basic">
              <Card title="基础信息">
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{ width: '70px', textAlign: 'right' }}>滴速：</div>
                  <Input
                    onChange={this.onVolumeChange}
                    placeholder="请输入滴速"
                    style={{ width: '150px' }}
                    value={formData.volume}
                  />
                  <div style={{ margin: '0px 30px 0 10px' }}>ml</div>
                  <div>滴完时间：</div>
                  <Input
                    onChange={this.onFinishDuringChange}
                    placeholder="请输入滴完时间"
                    style={{ width: '150px' }}
                    value={formData.finishDuring}
                  />
                  <div style={{ margin: '0px 10px' }}> 分钟</div>
                </div>
                <div style={{ display: 'flex', marginTop: '30px' }}>
                  <div style={{ width: '70px', textAlign: 'right' }}>药品清单：</div>
                  <DrugList
                    productList={productList}
                    commonNameList={commonNameList}
                    value={formData.items}
                  ></DrugList>
                </div>
              </Card>

              <Card
                title="溶媒步骤"
                style={{ marginTop: '30px' }}
                extra={
                  <Button onClick={this.addStep} type="primary">
                    新增步骤
                  </Button>
                }
              >
                {formData.steps.map((item, index) => (
                  <Step
                    key={item.id}
                    index={index}
                    value={item}
                    onChange={(step) => this.onStepChange(step, index)}
                    productList={productList}
                    levelList={levelList}
                    step={index + 1}
                  ></Step>
                ))}
              </Card>

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
        </div>
      </PageContainer>
    );
  }
}
