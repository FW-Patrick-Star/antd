import { getTodoList } from '@/services/todo'

export default {
  namespace: 'todo',

  state: {
    todoList: [],
  },

  effects: {
    *getTodoLists( {}, { call, put } ) {
      const resData = yield call( getTodoList )
      yield put({
        type: 'setTodoList',
        payload: resData,
      })
    },
  },

  reducers: {
    setTodoList( state, {payload} ) {
      return {
        ...state,
        todoList: payload,
      }
    },
  },
}