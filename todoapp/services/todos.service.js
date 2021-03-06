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
    date: new Date(),
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

  if(!existingTodo) {
    return false;
  }

  existingTodo.title = todo.title;
  existingTodo.description = todo.description;
  existingTodo.status = todo.status;

  try {
    var savedTodo = await existingTodo.save();
    return savedTodo;
  } catch(e) {
    throw Error("Unable to update todo");
  }
};

exports.deleteTodo = async function(id) {
  try {
    var deletedTodo = await ToDo.remove({_id: id})
    if(deletedTodo.result.n === 0){
      throw Error("Todo could not be deleted")
    }
    return deletedTodo
  } catch(e){
    throw Error("Error while deleting the todo item");
  }
};

exports.deleteAll = async function() {
  try {
    var deletedTodoList = await ToDo.remove({})
    if(deletedTodoList.result.n === 0){
      throw Error("Todo List could not be deleted");
    }
    return deletedTodoList
  } catch(e) {
    throw Error(e);
  }
}