import { Button, Popconfirm } from 'antd';

export const columns = (that) => {

  return [
    {
      title: '序号',
      key: 'no',
      dataIndex: 'no',
      render: (text, record, index) => `${index + 1}`,
    },
    {
      title:'说明书名称',
      dataIndex:'title',
      key:'title'
    },
    {
      title:'厂商名称',
      dataIndex:'companyName',
      key:'companyName'
    },
    {
      title:'版本日期',
      dataIndex:'versionDate',
      key:'versionDate'
    },
    {
      title:'版本类型',
      dataIndex:'cnVersionType',
      key:'cnVersionType'
    },
    {
      title: '录入人',
      dataIndex: 'drugsStr',
      key: 'drugsStr',
    },
    {
      title: '上传时间',
      dataIndex: 'createTime',
      key: 'createTime',
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      render: (text, record) => {
        return (
          <div>
            <Button
              type="text"
              style={{ color: 'rgb(24 144 255)' }}
              onClick={() => that.goToEdit(record.id)}
            >
              编辑
            </Button>
            <Popconfirm
              title="确定要删除吗？"
              onConfirm={() => that.disabledConfirm(record.id)}
            >
              <Button type="text" danger>
                删除
              </Button>
            </Popconfirm>
          </div>
        );
      },
    },
  ];
};
