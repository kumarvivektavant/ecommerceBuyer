import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  loggedInUser: any;
  loggedInUserid: any;
  UserData: User = {
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
  isLoggedin: boolean = false;
  currentUser: any;
  constructor(public authService: AuthService) {
    this.loggedIn();
  }

  ngOnInit(): void {
    this.loggedIn();
  }
  loggedIn() {
    if (localStorage.getItem('token')) {
      this.isLoggedin = true;
    }
    this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    console.log('iam in nav geeting seller userdata', this.currentUser);
    this.loggedInUser = Number(localStorage.getItem('token'));
    this.loggedInUserid = Number(localStorage.getItem('token'));
    this.authService.getbuyerdata(this.loggedInUserid).subscribe((data) => {
      this.UserData = Object.assign(data);
      console.log('getting userdata', this.UserData.lastName);
    });
  }
  onLogOut() {
    this.isLoggedin = false;
    localStorage.removeItem('token');
  }
}
