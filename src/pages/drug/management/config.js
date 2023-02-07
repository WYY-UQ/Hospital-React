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
      title: '药品名称',
      dataIndex: 'drugName',
      key: 'drugName',
    },
    {
      title: '上市许可持有人',
      dataIndex: 'marketAuthHolder',
      key: 'marketAuthHolder',
    },
    {
      title: '批准文号',
      dataIndex: 'approvalNo',
      key: 'approvalNo',
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
          </div>
        );
      },
    },
  ];
};
