import React, { useState, useEffect } from 'react';
import { Modal, Cascader, Button, Skeleton, Image } from 'antd';
import ProForm, { ProFormText, ProFormTextArea, ProFormDigit } from '@ant-design/pro-form';
import { UploadOutlined } from '@ant-design/icons';
import AliyunOSSUpload from '@/components/AliyunOssUpload';
import { fetchCategory } from '@/services/category';
import Editor from '@/components/Editor';


function Edit(props) {
  const { editVisible, setEditVisible, editGoods, editId } = props;
  const [options, setOptions] = useState(undefined);
  const [form] = ProForm.useForm();

  const setDetails = (key) =>{ form.setFieldsValue({"details": key})};
  const setCoverKey = (key) =>{ form.setFieldsValue({'cover': key})};
  
  useEffect(() => {
    async function getCategory() {
      const res = await fetchCategory();
      
      setOptions(res);
      
    }
    getCategory();
  },[])
  

  return (
      <Modal title="编辑商品" 
        visible={editVisible}  
        onCancel={() => {setEditVisible(false)}}
        maskClosable={false}
        destroyOnClose={true}
        footer={null}
        >
        {
          editId === undefined ? <Skeleton active={true} /> :
          <ProForm form={form} 
          initialValues={{
              category_id: editId.category_id,
              title: editId.title,
              description: editId.description,
              price: editId.price,
              stock: editId.stock,
              cover: editId.cover,
              details: editId.details,   
          }}
          onFinish={(values) => editGoods(editId.id, values)} 
        >
          <ProForm.Item name="category_id" label="分类" rules={[{ required: true, message: '请选择分类' }]}>
            <Cascader options={options} fieldNames={ {label: 'name', value: 'id'} } />
          </ProForm.Item>
          <ProFormText name="title" label="名称" rules={[{ required: true }]}/>
          <ProFormTextArea name="description" label="描述" rules={[{ required: true }]}/>
          <ProFormDigit name="price" label="价格" min={0} max={999999} rules={[{ required: true }]}/>
          <ProFormDigit name="stock" label="库存" min={0} max={999999} rules={[{ required: true }]}/>
          <ProFormText hidden={true} name="cover" />
          <ProForm.Item name="cover" label="商品图片" rules={[{ required: true, message: '请上传图片' }]}>
            <div>
              <AliyunOSSUpload accept="image/*" setCoverKey={setCoverKey}>
                <Button icon={<UploadOutlined />}>上传商品图片</Button>
              </AliyunOSSUpload>
              {
                !editId.cover_url ? '' :
                <Image width={120} src={editId.cover_url}></Image>
              }
            </div>
          </ProForm.Item>
          <ProForm.Item name="details" label="商品详情" rules={[{ required: true}]} >
            <Editor setDetails={setDetails} content={editId.details}/>
          </ProForm.Item>
        </ProForm>}
      </Modal>
  )
}


export default Edit;

