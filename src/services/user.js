/*
 * @Author: your name
 * @Date: 2021-06-16 09:17:20
 * @LastEditTime: 2021-06-23 15:10:18
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \antd\src\services\user.js
 */
import request from '@/utils/request';

export async function query() {
  return request('/api/users');
}

/**
 * 获取用户信息
 */
export async function queryCurrent() {
  return request('/admin/user');
  /* return request.post(`/auth/login`); */
}

/**
 * 获取用户列表
 */
export async function queryUsers(params) {
  return request('/admin/users', params);
}

/**
 * 添加用户
 */
export const addUser = ( params ) => {
  return request.post('/admin/users', {params})
}

/**
 * 编辑用户
 */
export const editUser = ( uid, params ) => {
  return request.put(`/admin/users/${uid}`, {params})
}

/**
 * 获取用户详情
 */
export const getUser = ( uid ) => {
  return request(`/admin/users/${uid}`)
}

export async function queryNotices() {
  return request('/api/notices');
}

export const editLock = (user) => {
  return request.patch(`/admin/users/${user}/lock`)
}

