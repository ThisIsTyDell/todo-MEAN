var TodoService = require('../services/todos.service');

_this = this;

exports.getTodos = async function(req, res, next) {
  var page = req.query.page ? req.query.page : 1;
  var limit = req.query.limit ? req.query.limit : 10;
}