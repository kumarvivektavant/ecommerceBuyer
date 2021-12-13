import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { IProduct } from '../product/IProduct.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BuyerserviceService {
  product: IProduct | any;
  productById: any;
  constructor(private http: HttpClient) {}
  getAllProducts(InGallery: number) {
    return this.http.get<IProduct[]>('data/products.json').pipe(
      map((data) => {
        const productArray: Array<IProduct> = [];
        data.forEach((element) => {
          if (element.InGallery == InGallery) {
            productArray.push(element);
          }
        });
        return productArray;
      })
    );
  }
  getAProduct(productId: number): Observable<any> {
    return this.http.get<IProduct[]>('data/products.json').pipe(
      map((data) => {
        data.forEach((element) => {
          if (element.Id == productId) {
            debugger;
            this.product = element;

            console.log('in service');
            return this.product;
          }
        });
        return this.product;
      })
    );
  }
}
