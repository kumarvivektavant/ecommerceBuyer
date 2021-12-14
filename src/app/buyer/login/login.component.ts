import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}
  onLogin(loginForm: NgForm) {
    console.log('hello i am in login.ts onlogin');
    console.log(loginForm.value.email);
    this.authService.authUser(loginForm.value).subscribe((result) => {
      console.log('i am in api response ');
      console.log(result);
    });

    // console.log('getting token login.ts', token);
    // if (token) {
    //   localStorage.setItem('token', token.email);
    //   console.log('login Successful');
    //   this.router.navigateByUrl('/');
    // } else {
    //   console.log('Login not succseeful');
    // }
  }
}
