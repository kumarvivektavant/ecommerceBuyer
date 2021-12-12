import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { User } from 'src/app/model/user';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registrationForm!: FormGroup;
  user: User = {
    userName: '',
    email: '',
    password: '',
    mobile: 0,
  };
  constructor(
    private fb: FormBuilder,
    private userService: UserServiceService
  ) {}

  ngOnInit(): void {
    this.registrationForm = new FormGroup({
      userName: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
      ]),
      confirmPassword: new FormControl(null, [Validators.required]),
      mobile: new FormControl(null, [
        Validators.required,
        Validators.minLength(10),
      ]),
    });
    //this.createRegistrationForm();
  }

  // createRegistrationForm() {
  //   this.registrationForm = this.fb.group({
  //     userName: [null, Validators.required],
  //     email: [null, [Validators.required, Validators.email]],
  //     password: [null, [Validators.required, Validators.minLength(8)]],
  //     confirmPassword: [null, Validators.required],
  //     mobile: [null, Validators.required, Validators.minLength(10)],
  //   });
  // }
  uerData(): User {
    return (this.user = {
      userName: this.registrationForm.value.userName,
      email: this.registrationForm.value.email,
      password: this.registrationForm.value.password,
      mobile: this.registrationForm.value.mobile,
    });
  }
  onSubmit(): void {
    console.log(this.registrationForm.value);
    this.user = Object.assign(this.uerData());
    //localStorage.setItem('user', JSON.stringify(this.user));
    this.userService.addUser(this.user);
    this.registrationForm.reset();
  }
}
