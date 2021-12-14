import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  authUser(user: any): Observable<any> {
    console.log(user.email);
    // let UserArray = [];
    // if (localStorage.getItem('users')) {
    //   UserArray = JSON.parse(localStorage.getItem('users') || '{}');
    // }
    // return UserArray.find(
    //   (p: { email: any; password: any }) =>
    //     p.email === user.email && p.password === user.password
    // );
    const params = new HttpParams()
      .set('Email', user.email)
      .set('Password', user.password);
    console.log('Hello i am in just above api call');
    return this.http.post(
      'http://localhost:34365/api/Seller/SellerLogin',
      params
    );
  }
  addAByer(user: User): Observable<any> {
    console.log('i am in auth servce', user);
    return this.http.post(
      'http://localhost:34365/api/Seller/SellerRegister',
      user
    );
  }
}
