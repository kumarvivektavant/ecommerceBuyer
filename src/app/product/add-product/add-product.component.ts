import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit {
  basicDetails = false;
  desc = false;
  photo = false;
  addAndDetails = false;
  activeButton = 'active';
  @ViewChild('Form') addPropertyForm: NgForm | undefined;
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.basicDetails = true;
  }
  onBack() {
    this.router.navigate(['/']);
  }
  onSubmit() {
    console.log('Congrats');
    console.log(this.addPropertyForm);
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
}
