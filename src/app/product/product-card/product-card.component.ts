import { Component, Input, OnInit } from '@angular/core';
import { BuyerserviceService } from 'src/app/services/buyerservice.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent implements OnInit {
  foundImage: boolean = false;
  @Input() product: any;
  productImgUrl: string = '';

  constructor(private buyerService: BuyerserviceService) {}

  ngOnInit(): void {
    //console.log('i am in card', this.product);
    this.buyerService.getProductImage(this.product.productId).subscribe(
      (data) => {
        this.productImgUrl = data[0].productImageUrl;
        let text = this.productImgUrl;
        let position = text.search('http');
        if (position == -1) {
          this.foundImage = false;
          // console.log('image not found', this.productImgUrl);
        } else {
          //console.log('imagefound', this.productImgUrl);
          this.foundImage = true;
        }

        // console.log(
        //   'getting card image data that is url in localts file',
        //   this.productImgUrl
        // );
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
