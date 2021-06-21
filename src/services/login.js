/*
 * @Author: your name
 * @Date: 2021-06-16 09:17:20
 * @LastEditTime: 2021-06-21 16:42:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \antd\src\services\login.js
 */
import request from '@/utils/request';

export async function fakeAccountLogin(params) {
  return request('/auth/login', {
    method: 'POST',
    data: params,
  });
}

export async function logout() {
  return request('auth/logout');
}
