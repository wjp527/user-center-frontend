import { BASE_URL } from '@/GlobalContext';
import { searchUsers, userListDelete, userListUpdate } from '@/services/ant-design-pro/api';
import { UploadOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable, TableDropdown } from '@ant-design/pro-components';
import { Button, Image, message, Upload } from 'antd';
import { useRef } from 'react';

// 修改用户
const handleUpdate = async (data: any) => {
  let res = await userListUpdate(data);
  if (res.code === 0) {
    message.success('修改成功');
  }
};

// 删除用户
const handleDelete = async (data: number) => {
  let res = await userListDelete(data);
  if (res.code === 0) {
    message.success('删除成功');
  } else {
    message.error(res.description);
  }
};

// 自定义上传的函数
const handleUploadChange = async (
  info: any,
  userData: any,
  actionRef: React.MutableRefObject<ActionType | undefined>,
) => {
  if (info.file.status === 'done') {
    message.success(`${info.file.name} 文件上传成功`);
    userData.avatarUrl = info.file.response.data;
    await handleUpdate(userData);

    // 刷新表格数据
    if (actionRef.current) {
      actionRef.current.reload();
    }
  } else if (info.file.status === 'error') {
    message.error(`${info.file.name} 文件上传失败`);
  }
};

// 主组件
const UserManage = () => {
  const actionRef = useRef<ActionType>();
  // 表格列定义
  const columns: ProColumns<API.CurrentUser>[] = [
    {
      dataIndex: 'id',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: '用户名',
      dataIndex: 'username',
      ellipsis: true,
      tooltip: '用户名',
    },
    {
      title: '用户账户',
      dataIndex: 'userAccount',
      ellipsis: true,
      tooltip: '用户账户',
    },
    {
      title: '星球编号',
      dataIndex: 'planetCode',
      ellipsis: true,
      tooltip: '星球编号',
      hideInSearch: true,
    },
    {
      title: '用户头像',
      dataIndex: 'avatarUrl',
      ellipsis: true,
      width: 300,
      render: (text, record) => (
        <>
          {record.avatarUrl !== '' && <Image src={record.avatarUrl} width={50} height={50} />}
          {!record.avatarUrl && (
            <Upload
              action={`${BASE_URL}/user/upload`}
              onChange={(info) => handleUploadChange(info, record, actionRef)}
              showUploadList={false}
            >
              <Button icon={<UploadOutlined />} size="middle">
                上传头像
              </Button>
            </Upload>
          )}
        </>
      ),
      hideInSearch: true,
    },
    {
      title: '性别',
      dataIndex: 'gender',
      filters: true,
      onFilter: true,
      ellipsis: true,
      valueType: 'select',
      valueEnum: {
        0: { text: '男', status: 'Default' },
        1: { text: '女', status: 'Success' },
      },
      hideInSearch: true,
    },
    {
      title: '手机号',
      dataIndex: 'phone',
      copyable: true,
      ellipsis: true,
      tooltip: '手机号',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      copyable: true,
      ellipsis: true,
      tooltip: '邮箱',
      hideInSearch: true,
    },
    {
      title: '用户状态',
      dataIndex: 'userStatus',
      filters: true,
      onFilter: true,
      ellipsis: true,
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
          onSelect={async (key) => {
            if (key === 'copy') {
              message.success('已复制用户信息');
            } else if (key === 'delete') {
              await handleDelete(record.id);
            }
            action?.reload();
          }}
          menus={[
            { key: 'copy', name: '复制' },
            { key: 'delete', name: '删除' },
          ]}
        />,
      ],
    },
  ];
  return (
    <ProTable<API.CurrentUser>
      columns={columns}
      actionRef={actionRef}
      cardBordered
      request={async (params: API.CurrentUser) => {
        const res: any = await searchUsers(params);
        return {
          data: res.data,
        };
      }}
      editable={{
        type: 'multiple',
        onSave: async (rowKey, data) => {
          await handleUpdate(data);
        },
        onDelete: async (rowKey: any) => {
          await handleDelete(rowKey);
        },
      }}
      columnsState={{
        persistenceKey: 'pro-table-singe-demos',
        persistenceType: 'localStorage',
        defaultValue: {
          option: { fixed: 'right', disable: true },
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
      headerTitle="用户管理"
    />
  );
};

export default UserManage;
