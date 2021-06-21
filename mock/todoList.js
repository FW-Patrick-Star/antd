let todoList = [
  { id: 1, title: '待办1', status: 0, },
  { id: 2, title: '待办2', status: 1, },
  { id: 3, title: '待办3', status: 2, },
  { id: 4, title: '待办4', status: 0, },
]

export default {
  'GET /api/todoList': todoList,

  'POST /api/addList': (req, res) => {
    const newTodo = {
      id: todoList.length + 1,
      title: req.body.todo,
      status: 0,
    };

    todoList.unshift(newTodo);
    res.send({
      code: 0,
      message: '待办添加成功'
    });
  },

  'PUT /api/editList': (req, res) => {
    const {id,status} = req.body;
    todoList.map((item, index) => {
      if (item.id === id) { todoList[index].status = status; }
    })

    res.send({
      code: 0,
      message: '待办修改成功'
    });
  },
}