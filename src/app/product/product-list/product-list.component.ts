import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BuyerserviceService } from 'src/app/services/buyerservice.service';
import { IProduct } from '../IProduct.interface';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  InGallery = 1;
  products: Array<IProduct> = [];
  constructor(
    private route: ActivatedRoute,
    private buyerService: BuyerserviceService,
    private router: Router
  ) {
    //this.router.navigateByUrl('/navbar');
  }

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
