import { searchUsers } from '@/services/ant-design-pro/api';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable, TableDropdown } from '@ant-design/pro-components';
import { useRef } from 'react';

import { Image } from 'antd';
export const waitTimePromise = async (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export const waitTime = async (time: number = 100) => {
  await waitTimePromise(time);
};

const columns: ProColumns<API.CurrentUser>[] = [
  {
    dataIndex: 'id', // 要与接口返回的字段保持一致
    valueType: 'indexBorder',
    width: 48,
  },
  {
    // 展示名
    title: '用户名',
    // 字段名
    dataIndex: 'username',
    // 是否允许缩略
    ellipsis: true,
    tooltip: '标题过长会自动收缩',
  },
  {
    // 展示名
    title: '用户账户',
    // 字段名
    dataIndex: 'userAccount',
    // 是否允许缩略
    ellipsis: true,
    tooltip: '标题过长会自动收缩',
  },
  {
    // 展示名
    title: '星球编号',
    // 字段名
    dataIndex: 'planetCode',
    // 是否允许缩略
    ellipsis: true,
    tooltip: '标题过长会自动收缩',
  },
  {
    // 展示名
    title: '用户头像',
    // 字段名
    dataIndex: 'avatarUrl',
    // 是否允许缩略
    ellipsis: true,
    render: (_, record) => (
      <>
        <Image src={record.avatarUrl} width={50} height={50} />
      </>
    ),
  },
  {
    // 展示名
    title: '性别',
    // 字段名
    dataIndex: 'gender',
    // 是否允许缩略
    ellipsis: true,
    tooltip: '标题过长会自动收缩',
  },
  {
    // 展示名
    title: '手机号',
    // 字段名
    dataIndex: 'phone',
    // 是否允许复制
    copyable: true,
    // 是否允许缩略
    ellipsis: true,
    tooltip: '标题过长会自动收缩',
  },
  {
    // 展示名
    title: '邮箱',
    // 字段名
    dataIndex: 'email',
    // 是否允许复制
    copyable: true,
    // 是否允许缩略
    ellipsis: true,
    tooltip: '标题过长会自动收缩',
  },
  {
    title: '用户状态',
    dataIndex: 'userStatus',
    filters: true,
    onFilter: true,
    ellipsis: true,
    // 可以进行下拉筛选
    valueType: 'select',
    valueEnum: {
      0: { text: '正常', status: 'Success' },
      1: { text: '冻结', status: 'Error' },
    },
  },
  {
    title: '用户角色',
    dataIndex: 'userRole',
    filters: true,
    onFilter: true,
    ellipsis: true,
    valueType: 'select',
    valueEnum: {
      0: { text: '普通用户', status: 'Default' },
      1: { text: '管理员', status: 'Success' },
    },
  },

  {
    title: '创建时间',
    dataIndex: 'createTime',
    valueType: 'dateTime',
  },

  {
    title: '操作',
    valueType: 'option',
    key: 'option',
    render: (text, record: any, _, action) => [
      <a
        key="editable"
        onClick={() => {
          action?.startEditable?.(record.id);
        }}
      >
        编辑
      </a>,
      <a href={record.url} target="_blank" rel="noopener noreferrer" key="view">
        查看
      </a>,
      <TableDropdown
        key="actionGroup"
        onSelect={() => action?.reload()}
        menus={[
          { key: 'copy', name: '复制' },
          { key: 'delete', name: '删除' },
        ]}
      />,
    ],
  },
];

const UserManage = () => {
  const actionRef = useRef<ActionType>();
  return (
    <ProTable<API.CurrentUser>
      columns={columns}
      actionRef={actionRef}
      cardBordered
      request={async () => {
        const res = await searchUsers();
        return {
          data: res.data,
        };
      }}
      editable={{
        type: 'multiple',
      }}
      columnsState={{
        persistenceKey: 'pro-table-singe-demos',
        persistenceType: 'localStorage',
        defaultValue: {
          option: { fixed: 'right', disable: true },
        },
        onChange(value) {
          console.log('value: ', value);
        },
      }}
      rowKey="id"
      search={{
        labelWidth: 'auto',
      }}
      options={{
        setting: {
          listsHeight: 400,
        },
      }}
      form={{
        // 由于配置了 transform，提交的参数与定义的不同这里需要转化一下
        syncToUrl: (values, type) => {
          if (type === 'get') {
            return {
              ...values,
              created_at: [values.startTime, values.endTime],
            };
          }
          return values;
        },
      }}
      pagination={{
        pageSize: 5,
        onChange: (page) => console.log(page),
      }}
      dateFormatter="string"
      headerTitle="高级表格"
    />
  );
};

export default UserManage;
