import { Card, Form, Button, notification } from 'antd';
import React, { Component } from 'react';
import styles from './index.less';
import { PageContainer } from '@ant-design/pro-layout';
import { queryCommonDicts } from '@/services/common';
import KeepItem from './components/SelectItem';
import { getDirectionContraindication, saveDirectionContraindication } from '@/services/direction';
import { history } from 'umi';

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

export default class Keep extends Component {
  constructor(props) {
    super(props);

    this.formRef = React.createRef();
    this.state = {
      peopleOptionList: [],
      symptomOptionList: [],
    };
  }

  async componentDidMount() {
    const { directionId } = this.props.location.query;
    const res = await getDirectionContraindication({ directionId });
    if (res) {
      this.formRef?.current?.setFieldsValue(res.data);
    }
    let peopleOptionList = [];
    let symptomOptionList = [];
    const dicRes = await queryCommonDicts(0);
    if (dicRes) {
      peopleOptionList = dicRes.data.find((item) => item.dictType === 16)?.dicts ?? [];
      symptomOptionList = dicRes.data.find((item) => item.dictType === 17)?.dicts ?? [];
    }
    this.setState({
      peopleOptionList,
      symptomOptionList,
    });
  }

  onFinish = async (values) => {
    const { directionId } = this.props.location.query;
    const postdData = {
      directionId,
      ...values,
    };
    const res = await saveDirectionContraindication({
      contraindication: {
        ...postdData,
      },
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
    history.goBack();
  };

  render() {
    const { peopleOptionList, symptomOptionList } = this.state;
    return (
      <PageContainer title={false}>
        <div className={styles.medicineEditContainer}>
          <div>
            <Form ref={this.formRef} onFinish={this.onFinish} {...layout} name="basic">
              <Card title="禁忌">
                <Form.Item label="禁忌人群" name="contraindicationPeople">
                  <KeepItem optionList={peopleOptionList} placeholder="禁忌人群" />
                </Form.Item>
                <Form.Item label="禁忌病症" name="contraindicationSymptom">
                  <KeepItem optionList={symptomOptionList} placeholder="禁忌病症" />
                </Form.Item>
              </Card>

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
        </div>
      </PageContainer>
    );
  }
}
