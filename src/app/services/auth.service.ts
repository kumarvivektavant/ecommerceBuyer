import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public currentUser: any;
  constructor(private http: HttpClient) {}
  authUser(user: any): Observable<any> {
    console.log('Hello i am in just above api call in auth service auth user');
    console.log(user.emailId);
    return this.http.post(
      'http://localhost:34365/api/Seller/SellerLogin',
      user
    );
  }
  addAByer(user: User): Observable<any> {
    console.log('i am in auth servce', user);
    return this.http.post(
      'http://localhost:34365/api/Seller/SellerRegister',
      user
    );
  }
  getbuyer(emailId: string) {
    return this.http.get<any>(
      `http://localhost:34365/api/Seller/GetSellerDetailsByEmail?Email=${emailId}`
    );
  }
  getbuyerdata(loggedInUserid: number) {
    return this.http.get(
      `http://localhost:34365/api/Seller/GetSellerDetailsById?SellerRegId=${loggedInUserid}`
    );
  }
}
