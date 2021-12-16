import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.css'],
})
export class DashbordComponent implements OnInit {
  sellerId = Number(localStorage.getItem('token'));
  UserData: any;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getbuyerdata(this.sellerId).subscribe((data) => {
      this.UserData = Object.assign(data);
      console.log('getting userdata', this.UserData);
    });
  }
}
