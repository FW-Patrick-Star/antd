/*
 * @Author: your name
 * @Date: 2021-06-24 14:44:24
 * @LastEditTime: 2021-06-24 14:45:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \antd\src\services\common.js
 */

import request from "@/utils/request";

export const OssConfig = () => {
  return request('/auth/oss/token');
}