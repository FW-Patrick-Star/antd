/*
 * @Author: your name
 * @Date: 2021-06-16 09:17:20
 * @LastEditTime: 2021-06-29 00:18:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \antd\src\services\user.js
 */
import request from '@/utils/request';




/**
 * 获取商品列表
 */
export async function fetchGoods(params) {
  return request('/admin/goods', {params});
}

/**
 * 修改商品上架
 */
 export async function editOn(gid) {
  return request.patch(`/admin/goods/${gid}/on`);
}

/**
 * 修改商品推荐
 */
 export async function editRecommend(gid) {
  return request.patch(`/admin/goods/${gid}/recommend`);
}

/**
 * 添加商品
 */
 export async function addGoods(params) {
  return request.post('/admin/goods', {params});
}


/**
 * 修改商品
 */
 export async function editGood(good, params) {
  return request.put(`/admin/goods/${good}`, {params});
}