import React, { useState, useEffect } from 'react';
import { Modal, Skeleton } from 'antd';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import { getUser } from '@/services/user';


function Edit(props) {
  const { editVisible, setEditVisible, editUsers, editId } = props;
  const [value, setValue] = useState(undefined);
  
  useEffect(() => {
    async function getUsers() {
      if (editId !== undefined) {
        const res =  await getUser(editId);
        setValue(res);
      }
    };
    getUsers();
  },[])
  

  return (

    <Modal title="编辑用户" 
        visible={editVisible}  
        onCancel={() => {setEditVisible(false)}}
        maskClosable={false}
        destroyOnClose={true}
        footer={null}
        >
        {
          value === undefined ?
          <Skeleton active={true} /> :
          <ProForm onFinish={(values) => editUsers(editId, values)}
            initialValues={{
              name: value.name,
              email: value.email,
            }}>
            <ProFormText name="name" label="姓名" rules={[{ required: true }]}/>
            <ProFormText name="email" label="邮箱" rules={[{ required: true }, { type: 'email'}]}/>
          </ProForm>
        }
     </Modal>
  )
}


export default Edit;

