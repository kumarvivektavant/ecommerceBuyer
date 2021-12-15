import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup | any;
  constructor(private authService: AuthService, private router: Router) {}
  user: any = {
    emailId: '',
    sellerPassword: '',
  };
  ngOnInit(): void {
    this.loginForm = new FormGroup({
      emailId: new FormControl(null),
      sellerPassword: new FormControl(null),
    });
  }
  uerData(): any {
    return (this.user = {
      emailId: this.loginForm.value.emailId,
      sellerPassword: this.loginForm.value.sellerPassword,
    });
  }
  onLogin(loginForm: FormGroup) {
    this.user = Object.assign(this.uerData());
    this.authService.authUser(this.user).subscribe((result) => {
      console.log(result);
      if (result.status == 'Success') {
        this.authService.getbuyer(this.user.emailId).subscribe((res) => {
          localStorage.setItem('token', res.sellerRegId);
          this.router.navigateByUrl('/');
        });
      }
    });
  }
}
