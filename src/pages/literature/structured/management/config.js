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
      dataIndex: 'literatureTypeName',
      key: 'literatureTypeName',
    },
    {
      title: '结构化名称',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '版本号',
      dataIndex: 'versionNo',
      key: 'versionNo',
    },
    {
      title: '厂商',
      dataIndex: 'companyName',
      key: 'companyName',
    },
    {
      title: '状态',
      dataIndex: 'cnReviewStatus',
      key: 'cnReviewStatus',
      render: (text, record) => {
        let color;
        let opacity = 1;
        switch (record.reviewStatus) {
          case 1:
            color = '#00CC00';
            opacity = 0.65;
            break;
          case 2:
            color = '#FF0000';
            opacity = 0.65;
            break;
          default:
            color = '#000';
            opacity = 0.65;
        }
        return <div style={{ color, opacity }}>{record.cnReviewStatus}</div>;
      },
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
            {record.reviewStatus !== 1 ? (
              <>
                <Popconfirm
                  title="确定要通过吗？"
                  onConfirm={() => that.reviewLiteratureStruct(record.id, 1)}
                >
                  <Button type="text" danger style={{ color: '#00CC00', opacity: 0.65 }}>
                    通过
                  </Button>
                </Popconfirm>
                <Popconfirm
                  title="确定要不通过吗？"
                  onConfirm={() => that.reviewLiteratureStruct(record.id, 2)}
                >
                  <Button type="text" danger style={{ color: '#FF0000', opacity: 0.65 }}>
                    不通过
                  </Button>
                </Popconfirm>
              </>
            ) : null}
          </div>
        );
      },
    },
  ];
};
