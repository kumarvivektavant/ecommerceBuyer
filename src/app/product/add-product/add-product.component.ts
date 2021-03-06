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
    deliveryCharge: 0,
    productDescription: '',
    productionCountryOrigin: '',
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
  //////////////////////////////////////////////////////////////////
  ///purpose:setting form for validation for adding a product
  //Author:Kumar Vivek
  /////////////////////////////////////////////////////////////////
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
      deliveryCharge: new FormControl(null, Validators.required),
      productDescription: new FormControl(null, [Validators.required]),
      productionCountryOrigin: new FormControl(null, [Validators.required]),
      productTermsAndCondition: new FormControl(null, [Validators.required]),
      productQuantity: new FormControl(null, [Validators.required]),
      deliveryTime: new FormControl(null, [Validators.required]),
      productsSold: new FormControl(null, [Validators.required]),
    });
  }
  //////////////////////////////////////////////////////////////////
  ///purpose:Assigning data to form
  //Author:Kumar Vivek
  /////////////////////////////////////////////////////////////////
  productData(): Product {
    return (this.product = {
      sellerId: Number(localStorage.getItem('token')),
      productBrandName: this.addProductForm.value.productBrandName,
      productType: this.addProductForm.value.productType,
      productSubType: this.addProductForm.value.productSubType,
      productName: this.addProductForm.value.productName,
      productPrice: this.addProductForm.value.productPrice,
      deliveryCharge: this.addProductForm.value.deliveryCharge,
      productDescription: this.addProductForm.value.productDescription,
      productionCountryOrigin:
        this.addProductForm.value.productionCountryOrigin,
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
  //////////////////////////////////////////////////////////////////
  ///purpose:sending product data to database
  //Author:Kumar Vivek
  /////////////////////////////////////////////////////////////////
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
    this.addProductForm.reset();
    alert('Product uploaded successful');
  }
  //////////////////////////////////////////////////////////////////
  ///purpose:for navting in add product form
  //Author:Kumar Vivek
  /////////////////////////////////////////////////////////////////
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
  //////////////////////////////////////////////////////////////////
  ///purpose:for navting in add product form
  //Author:Kumar Vivek
  /////////////////////////////////////////////////////////////////
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
        alert('image uploaded ,again choose the file to upload again');
      });
      // (await this.task).ref.getDownloadURL().then(URL: => {this.downloadableURL = URL; });
    } else {
      alert('No images selected');

      //console.log(this.downloadableURL);
      this.downloadableURL = '';
    }
  }
}
