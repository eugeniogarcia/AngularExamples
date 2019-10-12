import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UserService } from './user.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
//Implementa un guard CanActivate
export class AuthGuardService implements CanActivate{

  constructor(private userService: UserService,
    private router: Router) { }

  //Determina si se puede o no navegar a la ruta
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    if (!this.userService.isGuest()) {
      return true;
    } else {
      //Navegamos a la pagina de login. Le pasamos un query param con la url a la que queriamos navegar antes de ir a la pagina de login
      this.router.navigate(['/login'], {
        queryParams: {
          return: state.url
        }
      });
      return false;
    }
  }
}
