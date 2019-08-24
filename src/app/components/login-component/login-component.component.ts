import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Services/LoginAuth/auth.service';

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css',
  './login-component.component.util.css'
]
})
export class LoginComponentComponent implements OnInit {


  loginform : any = {};
  constructor(private _authService : AuthService) { }

  ngOnInit() {
  }


  login()
  {
     this._authService.login(this.loginform);
  }
}