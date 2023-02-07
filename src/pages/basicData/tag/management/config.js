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
      title: '标签分类',
      dataIndex: 'typeName',
      key: 'typeName',
    },
    {
      title: '标签',
      dataIndex: 'tagName',
      key: 'tagName',
    },
    {
      title: '标签值',
      dataIndex: 'tagValueStr',
      key: 'tagValueStr',
    },
    {
      title: '省份自定义',
      dataIndex: 'allowProvinceCustom',
      key: 'allowProvinceCustom',
      render: (text, record) => (record.allowProvinceCustom ? '允许' : '不允许'),
    },
    {
      title: '医院自定义',
      dataIndex: 'allowHospitalCustom',
      key: 'allowHospitalCustom',
      render: (text, record) => (record.allowHospitalCustom ? '允许' : '不允许'),
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
              onClick={() => that.goToEdit(record.tagId)}
            >
              编辑
            </Button>
            <Popconfirm title="确定要删除吗？" onConfirm={() => that.disabledConfirm(record.tagId)}>
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
