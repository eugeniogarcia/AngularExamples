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
const appRoutes: Routes = [
  //Apunta al componente de login
  { path: 'login', component: LoginComponent },
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
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
