import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Product } from 'src/app/model/Product';
import { BuyerserviceService } from 'src/app/services/buyerservice.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit {
  addProductForm: FormGroup | any;
  product: Product = {
    sellerId: 0,
    productBrandName: '',
    productType: '',
    productSubType: '',
    productName: '',
    productPrice: 0,
    deliveryCharges: 0,
    productDescription: '',
    productCountryOrigin: '',
    productTermsAndCondition: '',
  };
  basicDetails = false;
  desc = false;
  photo = false;
  addAndDetails = false;
  activeButton = 'active';
  quantity = 0;
  private seller_id: number = 1;
  constructor(
    private router: Router,
    private buyerService: BuyerserviceService
  ) {}

  ngOnInit(): void {
    this.basicDetails = true;
    //for registration
    this.addProductForm = new FormGroup({
      sellerId: new FormControl(this.seller_id),
      productBrandName: new FormControl(null, Validators.required),
      productType: new FormControl(null, Validators.required),
      productSubType: new FormControl(null, Validators.required),
      productName: new FormControl(null, Validators.required),
      productPrice: new FormControl(null, Validators.required),
      deliveryCharges: new FormControl(null, Validators.required),
      productDescription: new FormControl(null, [Validators.required]),
      productCountryOrigin: new FormControl(null, [Validators.required]),
      productTermsAndCondition: new FormControl(null, [Validators.required]),
    });
  }
  productData(): Product {
    return (this.product = {
      sellerId: this.seller_id,
      productBrandName: this.addProductForm.value.productBrandName,
      productType: this.addProductForm.value.productType,
      productSubType: this.addProductForm.value.productSubType,
      productName: this.addProductForm.value.productName,
      productPrice: this.addProductForm.value.productPrice,
      deliveryCharges: this.addProductForm.value.deliveryCharges,
      productDescription: this.addProductForm.value.productDescription,
      productCountryOrigin: this.addProductForm.value.productCountryOrigin,
      productTermsAndCondition:
        this.addProductForm.value.productTermsAndCondition,
    });
  }
  onBack() {
    this.router.navigate(['/']);
  }
  onSubmit(addProductForm: FormGroup) {
    this.product = Object.assign(this.productData());
    console.log(this.product);
    this.buyerService.addAProduct(this.product).subscribe((result) => {
      console.log(result);
    });
  }
  onDasicDetailsClick() {
    this.basicDetails = true;
    this.desc = false;
    this.photo = false;
    this.addAndDetails = false;
  }
  onDescClick() {
    this.basicDetails = false;
    this.desc = true;
    this.photo = false;
    this.addAndDetails = false;
  }
  onAddressClick() {
    this.basicDetails = false;
    this.desc = false;
    this.photo = false;
    this.addAndDetails = true;
  }
  onPhotoClick() {
    this.basicDetails = false;
    this.desc = false;
    this.photo = true;
    this.addAndDetails = false;
  }
  onClickPlus() {
    this.quantity += 1;
  }
  onClickMinus() {
    if (this.quantity == 0) {
      return;
    }
    this.quantity -= 1;
  }
}
