import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BuyerserviceService } from 'src/app/services/buyerservice.service';
import { IProduct } from '../IProduct.interface';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  public productId: number = 0;
  public product: any;
  productImages: Array<any> = [];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private buyerService: BuyerserviceService
  ) {}

  ngOnInit(): void {
    //////////////////////////////////////////////////////////////////
    ///purpose:fetch productId through URL triming
    //Author:Kumar Vivek
    /////////////////////////////////////////////////////////////////
    this.productId = Number(this.route.snapshot.params['id']);
    this.route.params.subscribe((params) => {
      this.productId = Number(params['id']);
      //getting id as number
    });
    //////////////////////////////////////////////////////////////////
    ///purpose:getting a product image to show inproduct detail page
    //Author:Kumar Vivek
    /////////////////////////////////////////////////////////////////
    this.buyerService.getProductImage(this.productId).subscribe((data) => {
      this.productImages = data;
      console.log('getting image array', this.productImages);
    });
    //////////////////////////////////////////////////////////////////
    ///purpose:getting a product
    //Author:Kumar Vivek
    /////////////////////////////////////////////////////////////////
    this.buyerService.getAProduct(this.productId).subscribe(
      (data) => {
        console.log(data);
        this.product = data;
        console.log('in pro dettttt', this.product);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
