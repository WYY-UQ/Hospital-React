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
      title: '导入类型',
      dataIndex: 'typeName',
      key: 'typeName',
    },
    {
      title: '文件名称',
      dataIndex: 'fileName',
      key: 'fileName',
    },
    {
      title: '执行状态',
      dataIndex: 'cnExcuteStatus',
      key: 'cnExcuteStatus',
      render: (text, record) => {
        let color;
        let opacity = 1;
        switch (record.excuteStatus) {
          case 1:
            color = '#999999';
            opacity = 0.65;
            break;
          case 3:
            color = '#0099ff';
            opacity = 0.65;
            break;
          case 4:
            color = '#00cc33';
            opacity = 0.65;
            break;
          default:
            color = '#000';
        }
        return <div style={{ color, opacity }}>{record.cnExcuteStatus}</div>;
      },
    },
    {
      title: '上传时间',
      dataIndex: 'createTime',
      key: 'createTime',
    },
    {
      title: '执行时间',
      dataIndex: 'excuteTime',
      key: 'excuteTime',
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
              onClick={() => that.download(record.fileUrl)}
            >
              下载
            </Button>
          </div>
        );
      },
    },
  ];
};
