import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/model/Product';
import { BuyerserviceService } from 'src/app/services/buyerservice.service';
import { IProduct } from '../IProduct.interface';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  sellerId = 2;
  products: Array<Product> = [];
  constructor(
    private route: ActivatedRoute,
    private buyerService: BuyerserviceService,
    private router: Router
  ) {
    //this.router.navigateByUrl('/navbar');
  }

  ngOnInit(): void {
    this.buyerService.getAllProducts(this.sellerId).subscribe(
      (data) => {
        this.products = data;
        console.log('i am in product list', this.products);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
