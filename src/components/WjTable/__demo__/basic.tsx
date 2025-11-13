import { Button, message, Progress, Rate } from 'antd';
import type { WjTableColumns, WjTableRefType } from 'magical-antd-ui';
import { WjTable } from 'magical-antd-ui';
import { useRef } from 'react';
import request from '../request/request';
export default function Index() {
  const actionRef = useRef<WjTableRefType>(null);

  const columns: WjTableColumns = [
    {
      dataIndex: 'title',
      title: '主题',
    },
    {
      dataIndex: 'progress',
      title: '进度',
      render: (value) => <Progress percent={(value / 80) * 100} size="small" />,
    },
    {
      dataIndex: 'createTime',
      title: '创建时间',
    },
    {
      valueType: 'select',
      dataIndex: 'status',
      search: true,
      title: '状态',
      fieldProps: {
        options: [
          {
            label: '失败',
            value: 'fail',
          },
          {
            label: '进行中',
            value: 'running',
          },
          {
            label: '成功',
            value: 'success',
          },
        ],
        placeholder: '请选择状态',
      },
    },
    {
      dataIndex: 'evaluate',
      title: '评价',
      render: (value) => {
        return <Rate disabled value={value} />;
      },
    },
    {
      dataIndex: 'description',
      title: '备注',
    },
  ];

  return (
    <WjTable
      actionRef={actionRef}
      columns={columns}
      scroll={{ y: 'auto-content' }}
      request={request}
      params={{ username: 'ww' }}
      rowKey="id"
      createBtnOperations={[
        <Button
          key="open"
          type="primary"
          onClick={() => message.success('我打开了弹窗~')}
        >
          打开弹窗
        </Button>,
      ]}
    />
  );
}
