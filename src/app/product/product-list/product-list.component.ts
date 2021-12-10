import { Component, OnInit } from '@angular/core';
import { BuyerserviceService } from 'src/app/services/buyerservice.service';
import { IProperty } from '../IProduct.interface';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: Array<IProperty> = [];
  constructor(private buyerService: BuyerserviceService) {}

  ngOnInit(): void {
    this.buyerService.getAllProducts().subscribe(
      (data) => {
        this.products = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
