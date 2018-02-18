import { Response } from '@angular/http';
import { TodoService } from './services/todo.service';
import ToDo from './models/todo.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private todoService: TodoService){}

  public newTodo: ToDo = new ToDo()

  todosList: ToDo[];
  title = 'app';

  ngOnInit(): void {
    this.todoService.getToDos()
    .subscribe(todos => {
      this.todosList = todos;
      console.log(todos);
    })
  }

  create() {
    this.todoService.createTodo(this.newTodo)
    .subscribe((res) => {
      this.todosList.push(res.data);
      this.newTodo = new ToDo();
    })
  }
}
