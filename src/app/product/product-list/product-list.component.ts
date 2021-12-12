import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BuyerserviceService } from 'src/app/services/buyerservice.service';
import { IProperty } from '../IProduct.interface';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  InGallery = 1;
  products: Array<IProperty> = [];
  constructor(
    private route: ActivatedRoute,
    private buyerService: BuyerserviceService
  ) {}

  ngOnInit(): void {
    if (this.route.snapshot.url.toString()) {
      this.InGallery = 2; // for product in gallary
    }
    this.buyerService.getAllProducts(this.InGallery).subscribe(
      (data) => {
        this.products = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}