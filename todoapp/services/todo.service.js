var ToDo = require('../models/todo.model');

_this = this;

exports.getTodos = async function(query, page, limit) {
  var options = {
    page,
    limit
  };

  try {
    var todos = await ToDo.paginate(query, options);

    return todos;
  } catch(e) {
    throw Error('Error while Paginating ToDos');
  }
};

exports.createTodo = async function(todo) {
  var newTodo = new ToDo({
    title: todo.title,
    description: todo.description,
    date: new Date();
    status: todo.status
  });

  try {
    var savedTodo = await newTodo.save();

    return savedTodo;
  } catch(e) {
    throw Error("Error saving Todo");
  }
};

exports.updateTodo = async function(todo) {
  var id = todo.id;

  try {
    var existingTodo = await ToDo.findById(id);
  } catch(e) {
    throw Error("Error while finding the Todo item");
  }
};