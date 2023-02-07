import { Button, Popconfirm } from 'antd';

export const columns = (that) => {
  const { materialCategoryList } = that.state;

  return [
    {
      title: '序号',
      key: 'no',
      dataIndex: 'no',
      render: (text, record, index) => `${index + 1}`,
    },
    {
      title: '物质类型',
      dataIndex: 'type',
      key: 'type',
      render: (text, record) => {
        const materialCategory = materialCategoryList.find((item) => item.key === record.type);
        return materialCategory?.value ?? '';
      },
    },
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '编码',
      dataIndex: 'substanceCodeStr',
      key: 'substanceCodeStr',
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
            <Popconfirm
              title="确定要禁用吗？"
              onConfirm={() => that.disabledConfirm(record.id)}
            >
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
