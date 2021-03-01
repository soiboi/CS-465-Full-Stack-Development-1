import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import {AuthenticationService} from '../authentication'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public formError : string = 'oops';

  public credentials:{
    name: '',
    email: '',
    password: ''
  }

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
  }

  public onLoginSubmit(): void {
    this.formError = '';
    if (!this.credentials.email || !this.credentials.password) {
      this.formError = 'All fields are required, please try again';
    }
    else{
      this.doLogin();
    }
  }

  public doLogin(): void {
    this.authenticationService.login(this.credentials)
      .then(() => this.router.navigateByUrl('#'))
      .catch((message) => this.formError = message)
  }

}