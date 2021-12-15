import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registrationForm: FormGroup | any;
  user: User = {
    firstName: '',
    lastName: '',
    emailId: '',
    sellerPassword: '',
    mobileNo: 0,
    country: '',
    sellerAddress: '',
    companyName: '',
    companyUrl: '',
  };
  constructor(
    private fb: FormBuilder,
    private userService: UserServiceService,
    private authservice: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registrationForm = new FormGroup({
      country: new FormControl(null, Validators.required),
      sellerAddress: new FormControl(null, Validators.required),
      companyName: new FormControl(null, Validators.required),
      companyUrl: new FormControl(null, Validators.required),
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      emailId: new FormControl(null, [Validators.required, Validators.email]),
      sellerPassword: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
      ]),
      confirmPassword: new FormControl(null, [Validators.required]),
      mobileNo: new FormControl(null, [
        Validators.required,
        Validators.minLength(10),
      ]),
    });
  }
  uerData(): User {
    return (this.user = {
      firstName: this.registrationForm.value.firstName,
      lastName: this.registrationForm.value.lastName,
      emailId: this.registrationForm.value.emailId,
      sellerPassword: this.registrationForm.value.sellerPassword,
      mobileNo: this.registrationForm.value.mobileNo,
      country: this.registrationForm.value.country,
      sellerAddress: this.registrationForm.value.sellerAddress,
      companyName: this.registrationForm.value.companyName,
      companyUrl: this.registrationForm.value.companyUrl,
    });
  }
  onSubmit(registrationForm: FormGroup) {
    //good till here//console.log('data from reg form', this.registrationForm.value);
    this.user = Object.assign(this.uerData());
    //localStorage.setItem('user', JSON.stringify(this.user));
    console.log('i am register ts file after object assigning', this.user);

    this.authservice.addAByer(this.user).subscribe((result) => {
      console.log(result);
    });
    this.registrationForm.reset();
    this.router.navigateByUrl('/buyer/login');
  }
}
