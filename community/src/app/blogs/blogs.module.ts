import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogsComponent } from './blogs/blogs.component';
import { BlogComponent } from './blog/blog.component';

import { BlogsService } from './services/blogs.service';
import { BlogsRoutingModule } from './blogs-routing.module';

@NgModule({
  imports: [
    CommonModule,
    //Importamos nuestro modulo de rutas. Las rutas aqui definida se añaden a las que hemos definido en el propio modulo. De esta forma no tenemos que declarar las rutas a pelo, estan definidas en el Routing module
    BlogsRoutingModule
  ],
  declarations: [
    BlogsComponent,
    BlogComponent,
  ],
  providers: [
    BlogsService
  ]
})
export class BlogsModule { }
