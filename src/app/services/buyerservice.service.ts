import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { IProduct } from '../product/IProduct.interface';
import { Observable } from 'rxjs';
import { Product } from '../model/Product';

@Injectable({
  providedIn: 'root',
})
export class BuyerserviceService {
  product: IProduct | any;
  productById: any;
  constructor(private http: HttpClient) {}
  getAllProducts(sellerId: number) {
    return this.http
      .get<Product[]>(
        `http://localhost:34365/api/ProductEmpty/GetProductDetailsById?SellerRegId=${sellerId}`
      )
      .pipe(
        map((data) => {
          const productArray: Array<Product> = [];
          //works fine till here
          data.forEach((element) => {
            productArray.push(element);
          });
          console.log(
            'i am in buyer service and this is get all product api',
            productArray
          );
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
  addAProduct(product: Product): Observable<any> {
    return this.http.post(
      'http://localhost:34365/api/ProdcutImage/AddProduct',
      product
    );
  }
}
