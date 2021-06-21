import request from '@/utils/request';

export const getTodoList = async() => {
  return request('/api/todoList')
};

export const addList = async(data) => {
  return request.post('/api/addList', {data})
};

export const editList = async(data) => {
  return request.put('/api/editList', {data})
};