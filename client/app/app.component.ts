import { Component, OnInit } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';

import { ToDosComponent } from './components/todos.component';
import { TodoService } from './services/app.service';

@Component({
    moduleId: module.id,
    selector: 'todo-app',
    templateUrl: 'app.component.html',
    directives: [ToDosComponent],
    providers: [HTTP_PROVIDERS, TodoService] 
})
export class TodoAppComponent implements OnInit {

    constructor() { }

    ngOnInit() { 

    }

}