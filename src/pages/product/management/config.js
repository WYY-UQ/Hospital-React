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
      title: '生产厂家',
      dataIndex: 'manufactureName',
      key: 'manufactureName',
    },
      {
      title: '通用名',
      dataIndex: 'commonNameStr',
      key: 'commonNameStr',
    },
    {
      title: '录入时间',
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
            <Popconfirm title="确定要禁用吗？" onConfirm={() => that.disabledConfirm(record.id)}>
              <Button type="text" danger>
                禁用
              </Button>
            </Popconfirm>
          </div>
        );
      },
    },
  ];
};
