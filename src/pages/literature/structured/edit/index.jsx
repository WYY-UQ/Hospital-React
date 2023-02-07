import { PageContainer } from '@ant-design/pro-layout';
import React, { Component } from 'react';
import { getDirectionInfo, delDirectionUsageAndDosage } from '@/services/direction';
import { Button, Card, Tabs, Tag, Popconfirm } from 'antd';
import { history } from 'umi';

const { TabPane } = Tabs;

export default class StructuredEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      directionInfo: {},
      specsPacks: [
        {
          packs: '',
          specs: '',
        },
      ],
      shapeProperty: {
        directionId: '',
        epidermisColor: '',
        innerColor: '',
        tastes: [],
      },
      keep: '',
      adverseReactions: [
        {
          reactionId: '',
          reactionName: '',
          reactionLevel: '',
          cnRreactionLevel: '',
          reactionProbability: '',
          cnRreactionProbability: '',
          afterOperation: '',
          remark: '',
        },
      ],
      suitIndicationSyses: [],
      unSuitIndicationSyses: [],
      contraindication: {
        contraindicationPeople: [],
        contraindicationSymptom: [],
      },
      usageAndDosages: [],
    };
  }

  async componentDidMount() {
    await this.getData();
  }

  getData = async () => {
    const { directionId } = this.props.location.query;
    const directionRes = await getDirectionInfo(directionId);
    let {
      directionInfo,
      specsPacks,
      shapeProperty,
      keep,
      adverseReactions,
      suitIndicationSyses,
      unSuitIndicationSyses,
      contraindication,
      usageAndDosages,
    } = this.state;
    if (directionRes) {
      directionInfo = directionRes.data;
      specsPacks = directionRes.data?.specsPacks ?? [];
      if (directionRes.data?.shapeProperty) {
        shapeProperty = directionRes.data?.shapeProperty;
      }
      keep = directionRes.data?.keep ?? '';
      adverseReactions = directionRes.data?.adverseReactions ?? [];
      suitIndicationSyses = directionRes.data?.suitIndicationSyses ?? [];
      unSuitIndicationSyses = directionRes.data?.unSuitIndicationSyses ?? [];
      contraindication = directionRes.data?.contraindication ?? {
        contraindicationPeople: [],
        contraindicationSymptom: [],
      };
      usageAndDosages = directionRes.data?.usageAndDosages ?? [];
    }
    this.setState({
      directionInfo,
      specsPacks,
      shapeProperty,
      unSuitIndicationSyses,
      keep,
      suitIndicationSyses,
      adverseReactions,
      usageAndDosages,
      contraindication,
    });
  };

  editPacking = () => {
    const { directionId } = this.props.location.query;
    history.push({
      pathname: '/literature/structured/pack',
      query: {
        directionId,
      },
    });
  };

  editCharacter = () => {
    const { directionId } = this.props.location.query;
    history.push({
      pathname: '/literature/structured/character',
      query: {
        directionId,
      },
    });
  };

  editKeep = () => {
    const { directionId } = this.props.location.query;
    history.push({
      pathname: '/literature/structured/keep',
      query: {
        directionId,
      },
    });
  };

  editAdverseReaction = () => {
    const { directionId } = this.props.location.query;
    history.push({
      pathname: '/literature/structured/adverseReaction',
      query: {
        directionId,
      },
    });
  };

  editIndication = () => {
    const { directionId } = this.props.location.query;
    history.push({
      pathname: '/literature/structured/indication',
      query: {
        directionId,
      },
    });
  };

  editNoIndication = () => {
    const { directionId } = this.props.location.query;
    history.push({
      pathname: '/literature/structured/noIndication',
      query: {
        directionId,
      },
    });
  };

  editTaboo = () => {
    const { directionId } = this.props.location.query;
    history.push({
      pathname: '/literature/structured/taboo',
      query: {
        directionId,
      },
    });
  };

  addUsageDosage = () => {
    const { directionId } = this.props.location.query;
    history.push({
      pathname: '/literature/structured/usageDosage',
      query: {
        directionId,
      },
    });
  };

  eidtUsageDosage = (usageAndDosageId, copy) => {
    const { directionId } = this.props.location.query;
    history.push({
      pathname: '/literature/structured/usageDosage',
      query: {
        directionId,
        usageAndDosageId,
        copy,
      },
    });
  };

  delUsageDosage = async (usageAndDosageId) => {
    const res = await delDirectionUsageAndDosage({
      usageAndDosageId,
    });
    if (res) {
      await this.getData();
    }
  };

  render() {
    const {
      specsPacks,
      shapeProperty,
      keep,
      adverseReactions,
      suitIndicationSyses,
      unSuitIndicationSyses,
      contraindication,
      usageAndDosages,
    } = this.state;
    return (
      <PageContainer title={false}>
        <Card
          title="规格包装"
          extra={
            <Button type="primary" onClick={this.editPacking}>
              编辑
            </Button>
          }
        >
          {specsPacks.map((item, index) => (
            <Card key={item.specs} style={{ marginTop: index === 0 ? '' : '20px' }}>
              <div style={{ display: 'flex' }}>
                <div style={{ width: '80px', textAlign: 'right' }}>规格：</div>
                <div>{item.specs}</div>
              </div>
              <div style={{ display: 'flex', marginTop: '20px' }}>
                <div style={{ width: '80px', textAlign: 'right' }}>包装：</div>
                <div>{item.packs}</div>
              </div>
            </Card>
          ))}
        </Card>

        <Card
          title="性状"
          style={{ marginTop: '30px' }}
          extra={
            <Button type="primary" onClick={this.editCharacter}>
              编辑
            </Button>
          }
        >
          <div style={{ margin: '24px' }}>
            <div style={{ display: 'flex' }}>
              <div style={{ width: '80px', textAlign: 'right' }}>表皮颜色：</div>
              <div style={{ width: '250px' }}>{shapeProperty.epidermisColor}</div>
              <div style={{ width: '80px', textAlign: 'right' }}>内容颜色：</div>
              <div>{shapeProperty.innerColor}</div>
            </div>
            <div style={{ display: 'flex', marginTop: '20px' }}>
              <div style={{ width: '80px', textAlign: 'right' }}>味道：</div>
              <div>{shapeProperty.tastes.join('，')}</div>
            </div>
          </div>
        </Card>

        <Card
          title="贮存"
          style={{ marginTop: '30px' }}
          extra={
            <Button type="primary" onClick={this.editKeep}>
              编辑
            </Button>
          }
        >
          <div style={{ margin: '24px' }}>
            <div style={{ display: 'flex' }}>
              <div style={{ width: '80px', textAlign: 'right' }}>贮存条件：</div>
              <div>{keep}</div>
            </div>
          </div>
        </Card>

        <Card
          title="不良反应"
          style={{ marginTop: '30px' }}
          extra={
            <Button type="primary" onClick={this.editAdverseReaction}>
              编辑
            </Button>
          }
        >
          {adverseReactions.map((item, index) => (
            <Card style={index === 0 ? {} : { marginTop: '20px' }} key={item.reactionId}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{ width: '100px', textAlign: 'right' }}>术语：</div>
                  <div style={{ width: '200px' }}>{item.reactionName}</div>
                  <div style={{ marginLeft: '30px' }}>级别：</div>
                  <div style={{ width: '200px' }}>{item.cnRreactionLevel}</div>
                  <div style={{ marginLeft: '30px' }}>概率：</div>
                  <div style={{ width: '200px' }}>{item.cnRreactionProbability}</div>
                </div>
              </div>
              <div style={{ display: 'flex', marginTop: '30px' }}>
                <div style={{ width: '100px', textAlign: 'right' }}>反应后操作：</div>
                <div>{item.afterOperation}</div>
              </div>
              <div style={{ display: 'flex', marginTop: '30px' }}>
                <div style={{ width: '100px', textAlign: 'right' }}>备注：</div>
                <div>{item.remark}</div>
              </div>
            </Card>
          ))}
        </Card>

        <Card
          title="适应症"
          style={{ marginTop: '30px' }}
          extra={
            <Button type="primary" onClick={this.editIndication}>
              编辑
            </Button>
          }
        >
          <Tabs type="card">
            {suitIndicationSyses.map((item) => (
              <TabPane key={item.sysCode} tab={item.sysName}>
                <div>
                  <Button type="primary">新增适应症</Button>
                  <div>
                    {item?.containIndications?.map((indication) => (
                      <Tag
                        key={indication.id}
                        style={{
                          marginTop: '10px',
                          marginRight: '10px',
                          background: '#F5F5F5',
                          padding: '5px',
                          border: '1px solid #D9D9D9',
                          borderRadius: '3px',
                        }}
                      >
                        {indication.name}
                      </Tag>
                    ))}
                  </div>
                </div>

                <div style={{ marginTop: '10px' }}>
                  <Button danger>新增排除</Button>
                  <div>
                    {item?.unContainIndications?.map((indication) => (
                      <Tag
                        key={indication.id}
                        style={{
                          marginTop: '10px',
                          marginRight: '10px',
                          background: '#F5F5F5',
                          padding: '5px',
                          border: '1px solid #D9D9D9',
                          borderRadius: '3px',
                        }}
                      >
                        {indication.name}
                      </Tag>
                    ))}
                  </div>
                </div>
              </TabPane>
            ))}
          </Tabs>
        </Card>

        <Card
          title="禁忌症"
          style={{ marginTop: '30px' }}
          extra={
            <Button type="primary" onClick={this.editNoIndication}>
              编辑
            </Button>
          }
        >
          <Tabs type="card">
            {unSuitIndicationSyses.map((item) => (
              <TabPane key={item.sysCode} tab={item.sysName}>
                <div>
                  <Button type="primary">新增禁忌症</Button>
                  <div>
                    {item?.containIndications?.map((indication) => (
                      <Tag
                        key={indication.id}
                        style={{
                          marginTop: '10px',
                          marginRight: '10px',
                          background: '#F5F5F5',
                          padding: '5px',
                          border: '1px solid #D9D9D9',
                          borderRadius: '3px',
                        }}
                      >
                        {indication.name}
                      </Tag>
                    ))}
                  </div>
                </div>
              </TabPane>
            ))}
          </Tabs>
        </Card>

        <Card
          title="禁忌"
          style={{ marginTop: '30px' }}
          extra={
            <Button type="primary" onClick={this.editTaboo}>
              编辑
            </Button>
          }
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ width: '100px', textAlign: 'right' }}>禁忌人群：</div>
            <div>
              {contraindication?.contraindicationPeople?.map((item) => (
                <Tag
                  key={item.key}
                  color="blue"
                  style={{
                    marginRight: '10px',
                    padding: '5px',
                  }}
                >
                  {item.value}
                </Tag>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', marginTop: '30px', alignItems: 'center' }}>
            <div style={{ width: '100px', textAlign: 'right' }}>禁忌病症：</div>
            <div>
              {contraindication?.contraindicationSymptom?.map((item) => (
                <Tag
                  key={item.key}
                  color="blue"
                  style={{
                    marginRight: '10px',
                    padding: '5px',
                  }}
                >
                  {item.value}
                </Tag>
              ))}
            </div>
          </div>
        </Card>

        <Card
          title="用法用量"
          style={{ marginTop: '30px' }}
          extra={
            <Button type="primary" onClick={this.addUsageDosage}>
              新增
            </Button>
          }
        >
          {usageAndDosages.map((item) => (
            <Card key={item.id} style={{ marginBottom: '30px' }}>
              <div
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center ' }}
              >
                <div></div>
                <div>
                  <Button type="primary" onClick={() => this.eidtUsageDosage(item.id)}>
                    查看
                  </Button>
                  <Button
                    style={{ marginLeft: '10px' }}
                    type="primary"
                    onClick={() => this.eidtUsageDosage(item.id, 'true')}
                  >
                    复制
                  </Button>
                  <Popconfirm title="确定删除吗？" onConfirm={() => this.delUsageDosage(item.id)}>
                    <Button style={{ marginLeft: '10px' }} danger>
                      删除
                    </Button>
                  </Popconfirm>
                </div>
              </div>
            </Card>
          ))}
        </Card>
      </PageContainer>
    );
  }
}
