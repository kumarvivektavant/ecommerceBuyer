import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  loggedInUser: any;
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
    this.loggedInUser = localStorage.getItem('token');
    return localStorage.getItem('token');
  }
  onLogOut() {
    this.isLoggedin = false;
    localStorage.removeItem('token');
  }
}
