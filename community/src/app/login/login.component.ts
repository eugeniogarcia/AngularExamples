import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  return: string = '';

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams
      .subscribe( (params: Params) => {
        this.return = params['return'] || '/forums';
        if (!this.userService.isGuest()) {
          this.go();
        }
      });
  }

  login() {
    if (this.username && this.password) {
      this.userService.login(this.username);
      this.go();
    }
  }

  private go() {
    this.router.navigateByUrl(this.return);
  }
}
