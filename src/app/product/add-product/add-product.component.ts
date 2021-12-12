import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit {
  Id: number = 1;
  Name: string = '';
  InGallery: number = 1;
  Type: string = '';
  Price: number = 0;
  Image?: string;
  Brand: string = '';
  sub_type: string = '';
  country: String = '';
  quantity: number = 0;
  terms_and_condition: string = '';
  description: string = '';
  basicDetails = false;
  desc = false;
  photo = false;
  addAndDetails = false;
  activeButton = 'active';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.basicDetails = true;
  }
  onBack() {
    this.router.navigate(['/']);
  }
  onSubmit(form: NgForm) {
    console.log('Congrats');
    console.log(form);
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
