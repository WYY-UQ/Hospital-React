import { Card, Table } from 'antd';
import SearchHeader from './components/SearchHeader';
import React, { Component } from 'react';
import { columns } from './config';
import styles from './index.less';
import { PageContainer } from '@ant-design/pro-layout';
import { history } from 'umi';
import { queryHospitalDrugsToAdd } from '@/services/hospital-side';

export default class DrugChangeAddManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      durgs: [],
      durgsParams: {
        drugName: null,
        approvalNo: null,
      },
    };
  }

  async componentDidMount() {
    await this.getData();
  }

  getData = async () => {
    const { durgsParams } = this.state;
    const durgsRes = await queryHospitalDrugsToAdd(durgsParams);
    if (durgsRes?.data) {
      this.setState({
        durgs: durgsRes?.data,
      });
    }
  };

  goToEdit = (saasDrugId) => {
    history.push({
      pathname: '/drugChange/add/edit',
      query: {
        saasDrugId,
      },
    });
  };

  // disabledConfirm = async (drugId) => {
  //   const res = await disableDrug({
  //     drugId,
  //   });
  //   if (res) {
  //     await this.getData();
  //   }
  // };

  onQuery = ({ drugName, approvalNo }) => {
    const { durgsParams } = this.state;
    durgsParams.drugName = drugName;
    durgsParams.approvalNo = approvalNo;
    this.setState(durgsParams, async () => {
      await this.getData();
    });
  };

  render() {
    const { durgs } = this.state;
    return (
      <PageContainer title={false}>
        <div className={styles.goodsManagementContainer}>
          <Card>
            <SearchHeader onQuery={this.onQuery}></SearchHeader>
            <div className={styles.goodsManagementTableContainer}>
              <Table
                columns={columns(this)}
                dataSource={durgs}
                pagination={false}
                rowKey={(record) => record.id}
              ></Table>
            </div>
          </Card>
        </div>
      </PageContainer>
    );
  }
}
