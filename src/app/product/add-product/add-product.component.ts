import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Product } from 'src/app/model/Product';
import { BuyerserviceService } from 'src/app/services/buyerservice.service';
import {
  AngularFireStorage,
  AngularFireUploadTask,
} from '@angular/fire/compat/storage';
import { Image } from 'src/app/model/image';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit {
  imageArray: Array<{ productImageUrl: string; imageCaption: string }> = [];
  imageUrlArray: Array<string> = [];
  basePath = '/images';
  downloadableURL = '';
  task!: AngularFireUploadTask;
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
    productQuantity: 0,
    deliveryTime: '',
    productsSold: 0,
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
    private buyerService: BuyerserviceService,
    private fireStorage: AngularFireStorage
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
      productQuantity: new FormControl(null, [Validators.required]),
      deliveryTime: new FormControl(null, [Validators.required]),
      productsSold: new FormControl(null, [Validators.required]),
    });
  }
  productData(): Product {
    return (this.product = {
      sellerId: Number(localStorage.getItem('token')),
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
      productQuantity: this.quantity,
      deliveryTime: this.addProductForm.value.deliveryTime,
      productsSold: 0,
    });
  }
  onBack() {
    this.router.navigate(['/']);
  }
  onSubmit(addProductForm: FormGroup) {
    this.product = Object.assign(this.productData());

    this.imageUrlArray.forEach((element) => {
      var currurl = {
        productImageUrl: element,
        imageCaption: this.product.productName,
      };
      this.imageArray.push(currurl);
      console.log('after pushing all images inimageArray', this.imageArray);
    });
    Object.assign(this.product, { productImages: this.imageArray });
    console.log('i am in adding a product', this.product);
    this.buyerService.addAProduct(this.product).subscribe((result) => {
      console.log('geeting response from add product api', result);
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
  async onFileChanged(event: any) {
    const file = event.target.files[0];
    if (file) {
      const filePath = `${this.basePath}/${file.name}`; // path at which image will be stored in the firebase storage
      this.task = this.fireStorage.upload(filePath, file); // upload task

      // this.progress = this.snapTask.percentageChanges();

      (await this.task).ref.getDownloadURL().then((url) => {
        this.downloadableURL = url;
        this.imageUrlArray.push(this.downloadableURL);
        console.log(this.imageUrlArray);
      });
      // (await this.task).ref.getDownloadURL().then(URL: => {this.downloadableURL = URL; });
    } else {
      alert('No images selected');

      //console.log(this.downloadableURL);
      this.downloadableURL = '';
    }
  }
}
