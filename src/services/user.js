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

export async function queryNotices() {
  return request('/api/notices');
}
