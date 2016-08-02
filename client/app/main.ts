import { bootstrap } from '@angular/platform-browser-dynamic';
// import { enableProdMode } from '@angular/core';

import { TodoAppComponent } from './app.component'

// enableProdMode(); //Uncomment for production

bootstrap(TodoAppComponent).then(
    success => console.log('TodoAppComponent bootstrapped!'),
    error => console.log(error)
);