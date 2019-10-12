import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ClarityModule } from 'clarity-angular';

import { ForumComponent } from './forum/forum.component';
import { ForumsComponent } from './forums/forums.component';
import { ThreadComponent } from './thread/thread.component';
import { ThreadsComponent } from './threads/threads.component';

import { ForumsService } from './services/forums.service';

//Soporte para la definicion de rutas dentro del feature module
import { RouterModule, Routes } from '@angular/router';
const forumsRoutes: Routes = [
  { path: 'forums', component: ForumsComponent },
  //Añade ruta con parametro, y apunta al componente Forum, singular
  { path: 'forums/:forum_alias', component: ForumComponent,
    //Añadimos rutas children a esta ruta. Esto nos permitira definir un segundo outlet dentro de este modulo donde poder mostrar estas rutas children
    children: [
      //El root. Correspondera con forums/:forum_alias
      { path: '', component: ThreadsComponent },
      { path: ':thread_alias', component: ThreadComponent }
    ]
  }
];

@NgModule({
  declarations: [
    ForumComponent,
    ForumsComponent,
    ThreadComponent,
    ThreadsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ClarityModule.forChild(),
    //Añade las rutas a utilizar dentro del feature module
    RouterModule.forChild(forumsRoutes),
  ],
  providers: [
    ForumsService
  ]
})
export class ForumsModule { }
