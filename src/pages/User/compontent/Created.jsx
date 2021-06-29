import React from 'react';
import { Modal } from 'antd';
import ProForm, { ProFormText } from '@ant-design/pro-form';


function Created(props) {
  const { isModalVisible, setIsModalVisible, addUsers } = props;
  return (

    <Modal title="添加用户" 
        visible={isModalVisible}  
        onCancel={() => {setIsModalVisible(false)}}
        maskClosable={false}
        destroyOnClose={true}
        footer={null}>
        <ProForm onFinish={(values) => addUsers(values)}>
          <ProFormText name="name" label="姓名" rules={[{ required: true }]}/>
          <ProFormText name="email" label="邮箱" rules={[{ required: true }, { type: 'email'}]}/>
          <ProFormText.Password name="password" label="密码" rules={[{ required: true }, { min: 6 }]}/>
        </ProForm>
      </Modal>
  )
}


export default Created

