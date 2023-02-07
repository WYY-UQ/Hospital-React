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
      title: '商品名称',
      dataIndex: 'commodityName',
      key: 'commodityName',
    },
    {
      title: '省份',
      dataIndex: 'province',
      key: 'province',
    },
    {
      title: '医保代码',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: '有效期',
      dataIndex: 'effectiveDate',
      key: 'effectiveDate',
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
              onClick={() => that.goToEdit(record.commodityId)}
            >
              编辑
            </Button>
            <Popconfirm
              title="确定要删除吗？"
              onConfirm={() => that.disabledConfirm(record.commodityId)}
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
