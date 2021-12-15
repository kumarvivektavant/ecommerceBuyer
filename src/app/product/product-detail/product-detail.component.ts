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
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private buyerService: BuyerserviceService
  ) {}

  ngOnInit(): void {
    this.productId = Number(this.route.snapshot.params['id']);
    this.route.params.subscribe((params) => {
      this.productId = Number(params['id']);
      //getting id as number
    });
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
