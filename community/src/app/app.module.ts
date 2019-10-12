import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClarityModule } from 'clarity-angular';
import { ForumsModule } from './forums/forums.module';

import { AppComponent } from './app.component';
import { ChatComponent } from './chat/chat.component';
import { ChatListComponent } from './chat-list/chat-list.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';

import { UserService } from './services/user.service';

//Para definir las rutas
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';
const appRoutes: Routes = [
  //Todos los componentes aqui referenciados se declaran en declarations y pertenecen al App module

  //En el App component usamos dos outlets, uno por defecto, sin nombre, y otro que hemos nombrado como chat. Algunas de las rutas se "vuelcan" en uno de los outlets, otras en otro

  //Aqui solo se definen las rutas del App module. Si el modulo hace uso de otros modulos, feature modules, y estos definen child routes, esas child routes se "añaden" a las definidas aqui. Por ejemplo /forums se ha definido en el feature module Forums, asi que cuando naveguemos a /forums, las rutas definidas en este feature module aplicaran

  //Apunta al componente de login
  { path: 'login', component: LoginComponent },
  //Especificamos un outlet secundaro. En este caso, el que tiene el nombre chat
  {
    path: 'users', component: ChatListComponent, outlet: 'chat', canActivate:[AuthGuardService]},
  { path: 'users/:username', component: ChatComponent, outlet: 'chat', },
  //Redirecciona a la ruta /forums. Este es un feature module
  { path: '', redirectTo: '/forums', pathMatch: 'full' },
  //Se aplican las rutas en orden. Si llegamos aqui, muestra el componente de pagina no encontrada
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    ChatListComponent,
    LoginComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    ClarityModule.forRoot(),
    //Feature module que queremos utilizar
    ForumsModule,
    //Cargamos el modulo con las rutas
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    UserService,
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
