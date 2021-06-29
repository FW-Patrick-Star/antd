import React, { useRef, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { Button, Avatar, Switch, message } from 'antd';
import { PlusOutlined, UserOutlined } from '@ant-design/icons';
import { queryUsers, editLock, addUser, editUser, getUser } from '@/services/user';
import Created from './compontent/Created';
import Edit from './compontent/Edit';


export default function User() {


  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [editId, setEditId] = useState(undefined);
  const ref = useRef();

  const showEditModal = (visible, id) => {
    setEditVisible(visible);
    setEditId(id);
  }

  const fetchUsers = async(params) => {
    const response = await queryUsers({params});
    return {
      data: response.data,
      // success 请返回 true，
      // 不然 table 会停止解析数据，即使有数据
      success: true,
      // 不传会使用 data 的长度，如果是分页一定要传
      total: response.meta.pagination.total,
    };

  }

  const changeLock = async(uid) => {
    const response = await editLock(uid);
    if ( response.status === undefined ){
      message.success('操作成功');
    }
  }
  
  // 处理提交
  const addUsers = async(values) =>{
    const response = await addUser(values);
    if( response.status === undefined ){
      message.success('添加用户成功');
      ref.current.reload();
      setIsModalVisible(false);
    }
  }

  // 处理编辑
  const editUsers = async(uid, values) =>{
    const response = await editUser(uid, values);
    if( response.status === undefined ){
      message.success('编辑用户成功');
      ref.current.reload();
      setEditVisible(false);
    }
  }

  const columns = [
    {
      title: '头像',
      dataIndex: 'avatar_url',
      hideInSearch: true,
      render: (_, record) => (
        <Avatar src={record.avatar_url} size={32} icon={<UserOutlined />} />
      ),
    },
    {
      title: '姓名',
      dataIndex: 'name',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
    },
    {
      title: '是否禁用',
      dataIndex: 'is_locked',
      hideInSearch: true,
      render: (_, record) => <Switch 
        checkedChildren="启用" 
        unCheckedChildren="禁用" 
        onChange={() => changeLock(record.id)}
        defaultChecked={record.is_locked === 0} 
      />,
    },
    {
      title: '创建时间',
      dataIndex: 'created_at',
      hideInSearch: true,
    },
    {
      title: '操作',
      hideInSearch: true,
      render: (_, record) => <a onClick={() => showEditModal(true, record.id)}>编辑</a>,
    },
  ];
  

  

  return (
    <PageContainer>
      <ProTable 
        columns={columns} 
        actionRef={ref}
        /* dataSource={data}  */
        request={async (params) => fetchUsers (params)} 
        editable={{
            type: 'multiple',
        }} 
        rowKey="id" 
        search={{
            labelWidth: 'auto',
        }} 
        pagination={{
            pageSize: 10,
        }} 
        dateFormatter="string" 
        headerTitle="用户列表" 
        toolBarRender={() => [
          <Button key="button" 
            icon={<PlusOutlined />} 
            type="primary" 
            onClick={() => {setIsModalVisible(true)}}>
            新建
          </Button>,
        ]}
      />
      <Created isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        addUsers={addUsers}/>
      {
        editVisible ? 
        <Edit editVisible={editVisible}
        setEditVisible={setEditVisible}
        editUsers={editUsers}
        editId={editId}
        /> : ''
      }
    </PageContainer>
  )
}
