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
      title: '类型',
      dataIndex: 'type',
      key: 'type',
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
      title: '审核状态',
      dataIndex: 'cnStatus',
      key: 'cnStatus',
      render: (text, record) => {
        let color;
        let opacity = 1;
        switch (record.status) {
          case 1:
            color = '#0066FF';
            opacity = 0.65;
            break;
          case 2:
            color = '#FF0000';
            opacity = 0.65;
            break;
          default:
            color = '#000';
        }
        return <div style={{ color, opacity }}>{record.cnStatus}</div>;
      },
    },
    {
      title: '审核时间',
      dataIndex: 'reviewTime',
      key: 'reviewTime',
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
              查看
            </Button>
          </div>
        );
      },
    },
  ];
};
