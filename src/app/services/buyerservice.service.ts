import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { IProperty } from '../product/IProduct.interface';

@Injectable({
  providedIn: 'root',
})
export class BuyerserviceService {
  constructor(private http: HttpClient) {}
  getAllProducts() {
    return this.http.get<IProperty[]>('data/products.json').pipe(
      map((data) => {
        const productArray: Array<IProperty> = [];
        data.forEach((element) => {
          productArray.push(element);
        });
        return productArray;
      })
    );
  }
}
