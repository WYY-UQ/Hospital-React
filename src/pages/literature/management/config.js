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
      title: '文献类型',
      dataIndex: 'cnType',
      key: 'cnType',
    },
    {
      title: '文献名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '版本号',
      dataIndex: 'versionNo',
      key: 'versionNo',
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
            {record.hasChapter ? (
              <Button
                type="text"
                style={{ color: 'rgb(24 144 255)' }}
                onClick={() => that.goToChapter(record.id)}
              >
                章节
              </Button>
            ) : null}
            <Button
              type="text"
              style={{ color: 'rgb(24 144 255)' }}
              onClick={() => that.goToScan(record.id)}
            >
              扫描件
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
