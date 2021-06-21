/*
 * @Author: your name
 * @Date: 2021-06-16 09:17:20
 * @LastEditTime: 2021-06-21 16:54:20
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \antd\src\models\login.js
 */
import { history } from 'umi';
import { fakeAccountLogin, logout } from '@/services/login';
import { message } from 'antd';


const Model = {
  namespace: 'login',
  state: {
  },

  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(fakeAccountLogin, payload);
      
      if (response.status === undefined) {
        message.success('登录成功');
        yield put({
          type: 'changeLoginStatus',
          payload: response,
        }); // Login successfully

        history.replace('/');
      }
      
    },

    *logout(_, { call }) {
      
      const response = yield call(logout);
      const key = 'updatable';
      message.loading({ content: '退出中', key });

      if(response.status === undefined) {
        
        localStorage.removeItem('access_token');
        localStorage.removeItem('userInfo');
        setTimeout(() => {
          message.success({ content: '退出成功', key, duration: 2 });
        }, 1000);
        history.replace('/login');
      }

    },
  },
  reducers: {
    changeLoginStatus(state, { payload }) {
      localStorage.setItem("access_token", payload.access_token);
      return { ...state };
    },
  },
};
export default Model;
