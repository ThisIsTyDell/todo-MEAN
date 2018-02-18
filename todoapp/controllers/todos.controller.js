var TodoService = require('../services/todos.service');

_this = this;

exports.getTodos = async function(req, res, next) {
  var page = req.query.page ? req.query.page : 1;
  var limit = req.query.limit ? req.query.limit : 10;

  try {
    var todos = await TodoService.getTodos({}, page, limit);

    return res.status(200).json({
      status: 200,
      data: todos,
      message: "ToDo List Recieved Successfully"
    });
  } catch(e) {
    return res.status(400).json({
      status: 400,
      message: e.message
    });
  }
};

exports.createTodo = async function(req, res, next) {
  var todo = {
    title: req.body.title,
    description: req.body.description,
    status: req.body.status
  };
};