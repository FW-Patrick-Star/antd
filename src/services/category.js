/*
 * @Author: your name
 * @Date: 2021-06-24 13:36:04
 * @LastEditTime: 2021-06-28 10:59:09
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \antd\src\services\categary.js
 */
import request from '@/utils/request';




/**
 * 获取分类列表
 */
export async function fetchCategory(params) {
  return request('/admin/category', {params});
}


/**
 * @description: 获取分类详情
 * @param {*}
 * @return {*}
 */
export async function fetchCategoryId(category) {
  return request(`/admin/category/${category}`)
}
