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
      title: '医院名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '等级',
      dataIndex: 'level',
      key: 'level',
      render: (text, record) => record.levelName + record.gradeName,
    },
    {
      title: '地址',
      dataIndex: 'fullAddress',
      key: 'fullAddress',
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
            <Popconfirm title="确定要删除吗？" onConfirm={() => that.disabledConfirm(record.id)}>
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
