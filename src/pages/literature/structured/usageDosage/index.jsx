/* eslint-disable no-param-reassign */
import React, { Component } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import Combination from './components/Combination';
import {
  queryCommonDicts,
  queryObjects,
  queryUnits,
  queryLiteratureSections,
  queryDirectionSections,
} from '@/services/common';
import { Button, Divider, notification, Modal, Select, Card, Input } from 'antd';
import {
  saveDirectionUsageAndDosage,
  getDirectionUsageAndDosage,
  getDirectionIndication,
} from '@/services/direction';
import { PlusOutlined } from '@ant-design/icons';
import { v4 as uuidv4 } from 'uuid';
import Crowd from './components/Crowd';
import { history } from 'umi';
import AdverseReaction from './components/AdverseReaction';
import Usage from './components/Usage';
import TreatmentCourse from './components/TreatmentCourse';
import UsageStep from './components/UsageStep';
import EvidenceCard from './components/EvidenceCard';
import Dosage from './components/Dosage';
import InspectionIndex from './components/InspectionIndex';
import Indication from './components/Indication';

const { Option } = Select;

const { TextArea } = Input;

const conditionOpts = [
  {
    key: 'indicationSys',
    value: '适应症',
  },
  {
    key: 'combinationMedication',
    value: '联合用药',
  },
  {
    key: 'crowd',
    value: '人群',
  },
  {
    key: 'adverseReaction',
    value: '不良反应',
  },
  {
    key: 'inspectionIndex',
    value: '检验指标',
  },
];

export default class UsageDosage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      substanceList: [],
      drugList: [],
      sysCodeList: [],
      crowdTypeList: [],
      indicationList: [],
      combinationMedicationGroups: [],
      crowdGroups: [],
      adverseReactions: [],
      inspectionIndexes: [],
      usage: {
        usageDosings: [],
        usageRoutes: [],
        usageTimes: [],
      },
      indicationSyses: [],
      dosages: [
        {
          id: uuidv4(),
          calcType: null,
          commonDosage: null,
          dosageType: null,
          dosageUnit: null,
          maxDosage: null,
          maxHeight: null,
          maxWeight: null,
          minDosage: null,
          minHeight: null,
          minWeight: null,
        },
      ],
      treatmentCourse: {
        maxCourse: null,
        minCourse: null,
        items: [],
      },
      usageStep: {
        items: [],
        stepType: null,
      },
      evidences: [],
      attention: null,
      missedMedication: null,
      stopMedication: null,
      elseInfo: null,
      timeUnitList: [],
      unitList: [],
      levelList: [],
      literatureList: [],
      directionList: [],
      conditionModalVisible: false,
      condition: null,
      deliveryWayList: [],
      dosingFrequencyList: [],
      deliveryTimeList: [],
    };
  }

  async componentDidMount() {
    console.log(this.props.location.query.copy === 'true');
    let {
      substanceList,
      drugList,
      sysCodeList,
      crowdTypeList,
      combinationMedicationGroups,
      crowdGroups,
      adverseReactions,
      deliveryWayList,
      dosingFrequencyList,
      timeUnitList,
      deliveryTimeList,
      usage,
      unitList,
      treatmentCourse,
      usageStep,
      attention,
      missedMedication,
      stopMedication,
      elseInfo,
      levelList,
      literatureList,
      evidences,
      directionList,
      dosages,
      inspectionIndexes,
      indicationList,
      indicationSyses,
    } = this.state;
    const { usageAndDosageId, directionId } = this.props.location.query;
    if (usageAndDosageId) {
      const res = await getDirectionUsageAndDosage({ usageAndDosageId });
      if (res) {
        combinationMedicationGroups = res?.data?.combinationMedicationGroups ?? [];
        crowdGroups = res?.data?.crowdGroups ?? [];
        adverseReactions = res?.data?.adverseReactions ?? [];
        inspectionIndexes = res?.data?.inspectionIndexes ?? [];
        indicationSyses = res?.data?.indicationSyses ?? [];
        usage = res?.data?.usage ?? {
          usageDosings: [],
          usageRoutes: [],
          usageTimes: [],
        };
        treatmentCourse = res?.data?.treatmentCourse ?? {
          maxCourse: null,
          minCourse: null,
          items: [],
        };
        usageStep = res?.data?.usageStep ?? {
          items: [],
          stepType: null,
        };
        dosages = res?.data?.dosages ?? [
          {
            id: uuidv4(),
            calcType: null,
            commonDosage: null,
            dosageType: null,
            dosageUnit: null,
            maxDosage: null,
            maxHeight: null,
            maxWeight: null,
            minDosage: null,
            minHeight: null,
            minWeight: null,
          },
        ];
        attention = res?.data?.attention ?? null;
        missedMedication = res?.data?.missedMedication ?? null;
        stopMedication = res?.data?.stopMedication ?? null;
        elseInfo = res?.data?.elseInfo ?? null;
        evidences = res?.data?.evidences ?? [];
        // eslint-disable-next-line no-return-assign
        adverseReactions.forEach((item) => (item.id = uuidv4()));
        combinationMedicationGroups.forEach((combinationMedication) => {
          // eslint-disable-next-line no-return-assign
          combinationMedication.categories.forEach((item) => (item.id = uuidv4()));
        });
        // eslint-disable-next-line no-return-assign
        treatmentCourse?.items?.forEach((item) => (item.id = uuidv4()));
        // eslint-disable-next-line no-return-assign
        usageStep?.items?.forEach((item) => (item.id = uuidv4()));
      }
    }
    substanceList =
      (
        await queryObjects({
          type: 1,
        })
      )?.data ?? [];

    drugList =
      (
        await queryObjects({
          type: 2,
        })
      )?.data ?? [];

    directionList = (await queryDirectionSections())?.data ?? [];

    literatureList = (await queryLiteratureSections())?.data ?? [];
    sysCodeList = (await queryCommonDicts(5))?.data[0]?.dicts ?? [];
    levelList = (await queryCommonDicts(20))?.data[0]?.dicts ?? [];
    crowdTypeList = (await queryCommonDicts(27))?.data[0]?.dicts ?? [];

    deliveryWayList = (await queryCommonDicts(28))?.data[0]?.dicts ?? [];

    dosingFrequencyList = (await queryCommonDicts(29))?.data[0]?.dicts ?? [];
    deliveryTimeList = (await queryCommonDicts(30))?.data[0]?.dicts ?? [];
    timeUnitList = (await queryUnits(4))?.data ?? [];
    unitList = (await queryUnits(null))?.data ?? [];
    indicationList =
      (
        await getDirectionIndication({
          directionId,
          isSuit: true,
        })
      ).data ?? [];
    this.setState({
      combinationMedicationGroups,
      substanceList,
      adverseReactions,
      drugList,
      crowdTypeList,
      timeUnitList,
      sysCodeList,
      crowdGroups,
      deliveryWayList,
      dosingFrequencyList,
      deliveryTimeList,
      usage,
      treatmentCourse,
      unitList,
      usageStep,
      attention,
      missedMedication,
      levelList,
      stopMedication,
      elseInfo,
      literatureList,
      directionList,
      dosages,
      evidences,
      inspectionIndexes,
      indicationList,
      indicationSyses,
    });
  }

  onCombinationMedicationGroupsChange = (combinationMedicationGroups) => {
    this.setState({
      combinationMedicationGroups,
    });
  };

  onCrowdGroupsChange = (crowdGroups) => {
    this.setState({
      crowdGroups,
    });
  };

  onSubmit = async () => {
    const { directionId, usageAndDosageId, copy } = this.props.location.query;
    const {
      combinationMedicationGroups,
      crowdGroups,
      adverseReactions,
      usage,
      treatmentCourse,
      usageStep,
      attention,
      missedMedication,
      stopMedication,
      elseInfo,
      evidences,
      dosages,
      inspectionIndexes,
      indicationSyses,
    } = this.state;
    const postdData = {
      directionId,
      combinationMedicationGroups,
      crowdGroups,
      adverseReactions,
      usage,
      treatmentCourse,
      usageStep,
      attention,
      missedMedication,
      stopMedication,
      elseInfo,
      evidences,
      dosages,
      inspectionIndexes,
      indicationSyses,
    };
    if (usageAndDosageId) {
      postdData.id = usageAndDosageId;
    }
    if (copy === 'true') {
      delete postdData.id;
    }
    const res = await saveDirectionUsageAndDosage({
      usageAndDosage: {
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
    this.setState({
      combinationMedicationGroups: [],
      crowdGroups: [],
    });
    history.goBack();
  };

  onConditionModalCancel = () => {
    this.setState({
      conditionModalVisible: false,
    });
  };

  onConditionChange = (condition) => {
    this.setState({ condition });
  };

  onAdverseReactionsChange = (adverseReactions) => {
    this.setState({ adverseReactions });
  };

  onConditionModalOK = () => {
    const {
      condition,
      combinationMedicationGroups,
      crowdGroups,
      adverseReactions,
      inspectionIndexes,
      indicationList,
    } = this.state;
    let { indicationSyses } = this.state;
    if (condition === 'combinationMedication') {
      combinationMedicationGroups.push({
        categories: [
          {
            excludeDrugs: [],
            excludeSubstances: [],
            itemId: null,
            itemName: null,
            id: uuidv4(),
            itemType: 6,
          },
        ],
        drugs: [],
        id: uuidv4(),
        substances: [],
      });
    } else if (condition === 'crowd') {
      crowdGroups.push({
        crowds: [
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
        id: uuidv4(),
      });
    } else if (condition === 'adverseReaction') {
      adverseReactions.push({
        id: uuidv4(),
        level: null,
        adverseReactions: [],
      });
    } else if (condition === 'inspectionIndex') {
      inspectionIndexes.push({
        type: null,
        inspectionValue: null,
        inspectionUnit: null,
        incrementType: null,
        incrementValue: null,
        incrementUnit: null,
        multiple: null,
        trendType: null,
        trendTimeValue: null,
        trendTimeUnit: null,
        id: uuidv4(),
      });
    } else if (condition === 'indicationSys') {
      indicationSyses = indicationList.map((item) => {
        return {
          containIndications: [],
          diseaseSymptomGroups: [],
          sysCode: item.sysCode,
          sysName: item.sysName,
          unContainIndications: [],
        };
      });
    }

    this.setState({
      crowdGroups,
      adverseReactions,
      combinationMedicationGroups,
      inspectionIndexes,
      indicationSyses,
      condition: null,
      conditionModalVisible: false,
    });
  };

  onCombinationMedicationDel = () => {
    this.setState({
      combinationMedicationGroups: [],
    });
  };

  onCrowdGroupsDel = () => {
    this.setState({
      crowdGroups: [],
    });
  };

  onAdverseReactionsDel = () => {
    this.setState({
      adverseReactions: [],
    });
  };

  onInspectionIndexesDel = () => {
    this.setState({
      inspectionIndexes: [],
    });
  };

  onIndicationSysesDel = () => {
    this.setState({
      indicationSyses: [],
    });
  };

  onUsageChange = (usage) => {
    this.setState({
      usage,
    });
  };

  onTreatmentCourseChange = (treatmentCourse) => {
    this.setState({
      treatmentCourse,
    });
  };

  onUsageStepChange = (usageStep) => {
    this.setState({
      usageStep,
    });
  };

  onDosagesChange = (dosages) => {
    this.setState({ dosages });
  };

  onAttentionChange = (e) => {
    const attention = e.target.value;
    this.setState({
      attention,
    });
  };

  onMissedMedicationChange = (e) => {
    const missedMedication = e.target.value;
    this.setState({
      missedMedication,
    });
  };

  onStopMedicationChange = (e) => {
    const stopMedication = e.target.value;
    this.setState({
      stopMedication,
    });
  };

  onElseInfoChange = (e) => {
    const elseInfo = e.target.value;
    this.setState({
      elseInfo,
    });
  };

  onEvidenceAdd = () => {
    const { evidences } = this.state;
    evidences.push({
      id: uuidv4(),
      level: null,
      source: null,
      type: null,
      typeId: null,
    });
    this.setState({
      evidences,
    });
  };

  onEvidenceChange = (value, index) => {
    const { evidences } = this.state;
    evidences.splice(index, 1, value);
    this.setState({
      evidences,
    });
  };

  onEvidenceDel = (index) => {
    const { evidences } = this.state;
    evidences.splice(index, 1);
    this.setState({
      evidences,
    });
  };

  onInspectionIndexesChange = (inspectionIndexes) => {
    this.setState({
      inspectionIndexes,
    });
  };

  onIndicationSysesChange = (indicationSyses) => {
    this.setState({
      indicationSyses,
    });
  };

  render() {
    const {
      substanceList,
      drugList,
      sysCodeList,
      combinationMedicationGroups,
      crowdGroups,
      conditionModalVisible,
      condition,
      crowdTypeList,
      adverseReactions,
      deliveryWayList,
      dosingFrequencyList,
      deliveryTimeList,
      usage,
      timeUnitList,
      treatmentCourse,
      unitList,
      usageStep,
      attention,
      missedMedication,
      stopMedication,
      elseInfo,
      levelList,
      literatureList,
      directionList,
      evidences,
      dosages,
      inspectionIndexes,
      indicationList,
      indicationSyses,
    } = this.state;
    return (
      <PageContainer title={false}>
        <Divider>服药条件</Divider>
        {indicationSyses.length ? (
          <Indication
            indicationList={indicationList}
            indicationSyses={indicationSyses}
            onChange={this.onIndicationSysesChange}
            onDel={this.onIndicationSysesDel}
          />
        ) : null}

        {combinationMedicationGroups.length ? (
          <Combination
            onDel={this.onCombinationMedicationDel}
            onChange={this.onCombinationMedicationGroupsChange}
            combinationMedicationGroups={combinationMedicationGroups}
            substanceList={substanceList}
            drugList={drugList}
            sysCodeList={sysCodeList}
          />
        ) : null}

        {crowdGroups.length ? (
          <Crowd
            onDel={this.onCrowdGroupsDel}
            crowdTypeList={crowdTypeList}
            onChange={this.onCrowdGroupsChange}
            crowdGroups={crowdGroups}
          />
        ) : null}

        {adverseReactions.length ? (
          <AdverseReaction
            onDel={this.onAdverseReactionsDel}
            adverseReactions={adverseReactions}
            onChange={this.onAdverseReactionsChange}
          />
        ) : null}

        {inspectionIndexes.length ? (
          <InspectionIndex
            onDel={this.onInspectionIndexesDel}
            unitList={unitList}
            inspectionIndexes={inspectionIndexes}
            timeUnitList={timeUnitList}
            onChange={this.onInspectionIndexesChange}
          />
        ) : null}

        <div
          onClick={() => {
            this.setState({ conditionModalVisible: true });
          }}
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
              width: '500px',
              height: '30px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <PlusOutlined /> 添加服药条件
          </div>
        </div>

        <Divider>用法用量</Divider>

        <Usage
          onChange={this.onUsageChange}
          usage={usage}
          deliveryWayList={deliveryWayList}
          dosingFrequencyList={dosingFrequencyList}
          deliveryTimeList={deliveryTimeList}
        />

        <Dosage unitList={unitList} dosages={dosages} onChange={this.onDosagesChange} />

        <TreatmentCourse
          timeUnitList={timeUnitList}
          treatmentCourse={treatmentCourse}
          onChange={this.onTreatmentCourseChange}
        />

        <UsageStep
          usageStep={usageStep}
          timeUnitList={timeUnitList}
          unitList={unitList}
          onChange={this.onUsageStepChange}
        />

        <Card title="其他信息" style={{ marginBottom: '30px' }}>
          <Card bordered={false}>
            <div style={{ display: 'flex' }}>
              <div style={{ width: '70px', textAlign: 'right' }}>漏服：</div>
              <TextArea
                rows={4}
                style={{ width: '600px' }}
                placeholder="请输入漏服说明"
                value={missedMedication}
                onChange={this.onMissedMedicationChange}
              />
            </div>
            <div style={{ display: 'flex', marginTop: '30px' }}>
              <div style={{ width: '70px', textAlign: 'right' }}>停药：</div>
              <TextArea
                rows={4}
                style={{ width: '600px' }}
                placeholder="请输入停药说明"
                value={stopMedication}
                onChange={this.onStopMedicationChange}
              />
            </div>
            <div style={{ display: 'flex', marginTop: '30px' }}>
              <div style={{ width: '70px', textAlign: 'right' }}>注意事项：</div>
              <TextArea
                rows={4}
                style={{ width: '600px' }}
                placeholder="请输入注意事项"
                value={attention}
                onChange={this.onAttentionChange}
              />
            </div>
          </Card>
        </Card>

        <Card title="证据" style={{ marginBottom: '30px' }}>
          {evidences.map((item, index) => (
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
          <div
            onClick={this.onEvidenceAdd}
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
                width: '500px',
                height: '30px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <PlusOutlined /> 添加出处
            </div>
          </div>
        </Card>

        <Card title="其他事项">
          <Card bordered={false}>
            <TextArea
              rows={4}
              style={{ width: '670px' }}
              placeholder="请输入注意事项"
              value={elseInfo}
              onChange={this.onElseInfoChange}
            />
          </Card>
        </Card>

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
          <Button type="primary" onClick={this.onSubmit}>
            提交
          </Button>
          <Button style={{ marginLeft: '30px' }} onClick={this.onReset}>
            取消
          </Button>
        </div>

        <Modal
          title="新增服药条件"
          visible={conditionModalVisible}
          onCancel={this.onConditionModalCancel}
          onOk={this.onConditionModalOK}
        >
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div>服药条件：</div>
            <Select
              placeholder="请选择服药条件"
              style={{ width: '200px' }}
              value={condition}
              onChange={this.onConditionChange}
            >
              {conditionOpts.map((item) => (
                <Option key={item.key} value={item.key}>
                  {item.value}
                </Option>
              ))}
            </Select>
          </div>
        </Modal>
      </PageContainer>
    );
  }
}
