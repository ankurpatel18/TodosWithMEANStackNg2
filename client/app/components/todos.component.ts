import { Component, OnInit } from '@angular/core';

import { TodoService } from '../services/app.service';
import { Todo } from '../model/app.model';
import 'rxjs/add/operator/map';

@Component({
    moduleId: module.id,
    selector: 'todos',
    templateUrl: 'todos.component.html'
})
export class ToDosComponent implements OnInit {
    todos:Todo[];
    constructor(private _todoService:TodoService) { 
        
    }

    ngOnInit() { 
        this.todos = [];
        this._todoService.getTodos()
        .subscribe(todos => this.todos = todos );
    }
    addTodo($event, todoText){
        if(($event.which === 1) || ($event.which === 13)){
            if(todoText.value) {
            var result;
            var newTodo = {
                text: todoText.value,
                isCompleted: false
            }           
            this._todoService.saveTodo(newTodo)
                .subscribe(todo => {
                    this.todos.push(todo);                    
                    todoText.value = ''; 
                });
            }
        }
    }
    setEditState(todo,state){
        if(state){
            todo.isEditable = state;
        }else{
            delete todo.isEditable;
        }
    }
    updateTodoText($event,todo){
        if($event.which === 13){
            todo.text = $event.target.value;

            var _todo = {
                "_id" : todo._id,
                "text" : todo.text,
                "isCompleted" : todo.isCompleted
            };

            this._todoService.updateTodo(_todo)
                .subscribe(data => {
                    this.setEditState(todo, false);
                });
        }
    }
    updateTodoStatus(todo){
        var _todo = {
            "_id" : todo._id,
            "text" : todo.text,
            "isCompleted" : !todo.isCompleted
        };

        this._todoService.updateTodo(_todo)
        .subscribe(data => {
                todo.isCompleted = !todo.isCompleted;
            });
         
    }

    deleteTodo($event,todo){
        if($event.which == 1){ 
            this._todoService.deleteTodo(todo._id)
            .subscribe(data => {
                if( data.n === 1)
                {
                    for (var cnt = 0; cnt < this.todos.length; cnt++) {
                         if (this.todos[cnt]["_id"] === todo._id){
                            this.todos.splice(cnt,1);
                            break;
                         };
                    }
                }
            });
         }
    }
}