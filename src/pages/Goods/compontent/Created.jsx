import React, { useEffect, useState } from 'react';
import { Modal, Cascader, Button } from 'antd';
import ProForm, { ProFormText,
   ProFormTextArea, 
   ProFormDigit, 
  } from '@ant-design/pro-form';
import { fetchCategory } from '@/services/category';
import AliyunOSSUpload from '@/components/AliyunOssUpload';
import { UploadOutlined } from '@ant-design/icons';
import Editor from '@/components/Editor';


function Created(props) {
  const { isModalVisible, setIsModalVisible, addGood } = props;

  const [form] = ProForm.useForm();

  const [options, setOptions] = useState(undefined);

  useEffect(() => {
    async function getCategory() {
      const res = await fetchCategory();
      setOptions(res);
    }
    getCategory();
  },[])

  const setDetails = (key) =>{ form.setFieldsValue({"details": key})};
  const setCoverKey = (key) =>{ form.setFieldsValue({'cover': key})};


  return (

    <Modal title="添加商品" 
        visible={isModalVisible}  
        onCancel={() => {setIsModalVisible(false)}}
        maskClosable={false}
        destroyOnClose={true}
        footer={null}
        >
        <ProForm form={form} onFinish={(values) => addGood(values)} >
          <ProForm.Item name="category_id" label="分类" rules={[{ required: true, message: '请选择分类' }]}>
            <Cascader options={options} fieldNames={ {label: 'name', value: 'id'} } />
          </ProForm.Item>
          <ProFormText name="title" label="名称" rules={[{ required: true }]}/>
          <ProFormTextArea name="description" label="描述" rules={[{ required: true }]}/>
          <ProFormDigit name="price" label="价格" min={0} max={999999} rules={[{ required: true }]}/>
          <ProFormDigit name="stock" label="库存" min={0} max={999999} rules={[{ required: true }]}/>
          <ProForm.Item name="cover" label="商品图片" rules={[{ required: true, message: '请上传图片' }]}>
            <div>
              <AliyunOSSUpload accept="image/*" setCoverKey={setCoverKey}>
                <Button icon={<UploadOutlined />}>上传商品图片</Button>
              </AliyunOSSUpload>
            </div>
          </ProForm.Item>
          <ProForm.Item name="details" label="商品详情" rules={[{ required: true}]} >
            <Editor setDetails={setDetails}/>
          </ProForm.Item>
        </ProForm>
      </Modal>
  )
}


export default Created

