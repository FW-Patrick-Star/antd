/*
 * @Author: your name
 * @Date: 2021-06-21 17:31:32
 * @LastEditTime: 2021-06-21 17:33:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \antd\src\services\dashboard.js
 */
import request from '@/utils/request';

export const fetchDashBoard = () => {
  return request(`/admin/index`);
}