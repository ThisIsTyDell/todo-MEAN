
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

  try {
    var createdTodo = await TodoService.createTodo(todo);

    return res.status(201).json({
      status: 201,
      data: createdTodo,
      message: "Successfully created ToDo"
    });
  } catch(e) {
    return res.status(400).json({
      status: 400,
      message: "Was unable to create new todo item: " + e.message
    });
  }
};

exports.updateTodo = async function(req, res, next) {
  if(!req.body._id) {
    return res.status(400).json({
      status: 400,
      message: "Must provide id of todo item"
    });
  };

  var id = req.body._id;

  console.log(req.body);

  var todo = {
    id,
    title: req.body.title ? req.body.title : null,
    description: req.body.description ? req.body.description : null,
    status: req.body.status ? req.body.status : null
  };

  try {
    var updatedTodo = await TodoService.updateTodo(todo);

    return res.status(200).json({
      status: 200,
      data: updatedTodo,
      message: "Successfully updated the todo item"
    });
  } catch(e) {
    return res.status(400).json({
      status: 400,
      message: e.message
    });
  }
};

exports.removeTodo = async function(req, res, next) {
  var id = req.params.id;

  try {
    var deleted = await TodoService.deleteTodo(id)

    return res.status(204).json({
      status: 204,
      message: "Todo item successfully deleted"
    });
  } catch(e) {
    return res.status(400).json({
      status: 400,
      message: e.message
    });
  }
};

exports.removeAll = async function(req, res, next) {
  try {
    var deletedAll = await TodoService.deleteAll()

    return res.status(204).json({
      status: 204,
      message: "All Todo items deleted successfully"
    });
  } catch(e) {
    return res.status(400).json({
      status: 400,
      message: e.message
    });
  }
}