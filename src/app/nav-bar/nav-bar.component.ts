import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  loggedInUser: any;
  isLoggedin: boolean = false;
  constructor() {
    this.loggedIn();
  }

  ngOnInit(): void {
    this.loggedIn();
  }
  loggedIn() {
    if (localStorage.getItem('token')) {
      this.isLoggedin = true;
    }
    this.loggedInUser = localStorage.getItem('token');
    return localStorage.getItem('token');
  }
  onLogOut() {
    this.isLoggedin = false;
    localStorage.removeItem('token');
  }
}
