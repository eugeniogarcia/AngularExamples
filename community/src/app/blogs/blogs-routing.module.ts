//Este es un modulo especial. Lo vamos a utilizar para definir rutas, esta especializado en definir rutas
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlogsComponent } from './blogs/blogs.component';
import { BlogComponent } from './blog/blog.component';

//Creamos una lista de rutas. No tienen definida la base de las rutas, porque esta se definira en el modulo Blogs. En el App module hemos definido una ruta llamada blogs que tiene como child el modulo Blogs. Esto significa que a la ruta blogs se le concatenaran estas rutas
const routes: Routes = [
  { path: '', component: BlogsComponent },
  { path: ':post_id', component: BlogComponent }
];

@NgModule({
  //Como en cualquier otro modulo, definimos las rutas
  imports: [RouterModule.forChild(routes)],
  //Esto es novedoso. Vamos a hacer que el modulo este disponible para ser usado en otros lugares, en nuestro caso lo usaremos en el Module Blog
  exports: [RouterModule],
  providers: []
})
export class BlogsRoutingModule { }
