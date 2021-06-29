import React, { useRef, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { Button, Image , Switch, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { fetchGoods, editOn, editRecommend, addGoods, editGood } from '@/services/goods';
import Created from './compontent/Created';
import Edit from './compontent/Edit';
import { fetchCategoryId } from '@/services/category';


export default function User() {


  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [editId, setEditId] = useState(undefined);
  const ref = useRef();

  const showEditModal = async(visible, record) => {
    setEditVisible(visible);
    const category = await fetchCategoryId(record.category_id);
    const arr = (category.pid === 0 ? [category.id] : [category.pid, category.id]);
    const temp = {...record, category_id: arr};
    setEditId(temp);
  }

  const fetchGood = async(params) => {
    const response = await fetchGoods(params);
    return {
      data: response.data,
      // success 请返回 true，
      // 不然 table 会停止解析数据，即使有数据
      success: true,
      // 不传会使用 data 的长度，如果是分页一定要传
      total: response.meta.pagination.total,
    };

  }

  const changeOn = async(gid) => {
    const response = await editOn(gid);
    if ( response.status === undefined ){
      message.success('操作成功');
    }
  }

  const changeRecommend = async(gid) => {
    const response = await editRecommend(gid);
    if ( response.status === undefined ){
      message.success('操作成功');
    }
  }
  
  // 处理提交
  const addGood = async(values) =>{
    const response = await addGoods({...values, category_id: values.category_id.slice(-1)});
    if( response.status === undefined ){
      message.success('添加商品成功');
      ref.current.reload();
      setIsModalVisible(false);
    }
  }

  // 处理编辑
  const editGoods = async(gid, values) =>{
    const response = 
      await editGood(gid, {...values, category_id: values.category_id.slice(-1)});
    if( response.status === undefined ){
      message.success('编辑商品成功');
      ref.current.reload();
      setEditVisible(false);
    }
  }

  const columns = [
    {
      title: '商品',
      dataIndex: 'cover_url',
      hideInSearch: true,
      render: (_, record) => (
        <Image
        width={80}
        src={record.cover_url}
        placeholder={
          <Image
            preview={false}
            src={record.cover_url}
            width={200}
          />
        }
      />
      ),
    },
    {
      title: '名称',
      dataIndex: 'title',
    },
    {
      title: '价格',
      dataIndex: 'price',
      hideInSearch: true,
    },
    {
      title: '库存',
      dataIndex: 'stock',
      hideInSearch: true,
    },
    {
      title: '销量',
      dataIndex: 'sales',
      hideInSearch: true,
    },
    {
      title: '是否上架',
      dataIndex: 'is_on',
      valueType: 'radio',
      valueEnum: {
        1: { text: '已上架' },
        0: { text: '未上架' },
      },
      render: (_, record) => <Switch 
        checkedChildren="已上架" 
        unCheckedChildren="未上架" 
        onChange={() => changeOn(record.id)}
        defaultChecked={record.is_on === 1} 
      />,
    },
    {
      title: '是否推荐',
      dataIndex: 'is_recommend',
      valueType: 'radio',
      valueEnum: {
        1: { text: '已推荐' },
        0: { text: '未推荐' },
      },
      render: (_, record) => <Switch 
        checkedChildren="已推荐" 
        unCheckedChildren="未推荐" 
        onChange={() => changeRecommend(record.id)}
        defaultChecked={record.is_recommend === 1} 
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
      render: (_, record) => <a onClick={() => showEditModal(true, record)}>编辑</a>,
    },
  ];
  

  

  return (
    <PageContainer>
      <ProTable 
        columns={columns} 
        actionRef={ref}
        /* dataSource={data}  */
        request={async (params) => fetchGood (params)} 
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
        addGood={addGood}/>
      {
        editVisible ? 
        <Edit editVisible={editVisible}
        setEditVisible={setEditVisible}
        editGoods={editGoods}
        editId={editId}
        /> : ''
      }
    </PageContainer>
  )
}
