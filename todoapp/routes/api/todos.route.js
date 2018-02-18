var express = require('express');

var router = express.Router();

var ToDoController = require('../../controllers/todos.controllers');

router.get('/', ToDoController.getTodos);
router.post('/', ToDoController.createToDo);
router.put('/', ToDoController.updateTodo);
router.delete('/:id', ToDoController.removeTodo);

module.exports = router;