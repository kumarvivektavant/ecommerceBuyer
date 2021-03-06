import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { LoginComponent } from './buyer/login/login.component';
import { RegisterComponent } from './buyer/register/register.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { ProductCardComponent } from './product/product-card/product-card.component';
import { ProductDetailComponent } from './product/product-detail/product-detail.component';
import { AddProductComponent } from './product/add-product/add-product.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BuyerserviceService } from './services/buyerservice.service';
import { UserServiceService } from './services/user-service.service';
import { TestComponent } from './test/test.component';
import { AuthService } from './services/auth.service';
import { environment } from '../environments/environment';

import { AngularFireModule } from '@angular/fire/compat'; // For setup

import { AngularFireDatabaseModule } from '@angular/fire/compat/database'; // For database

import { AngularFirestore } from '@angular/fire/compat/firestore'; // For database --> firestore

import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { DashbordComponent } from './buyer/dashbord/dashbord.component';
import { LandingpageComponent } from './landingpage/landingpage.component';

const appRoutes: Routes = [
  { path: '', component: ProductListComponent },
  { path: 'ingallary-products', component: ProductListComponent },
  { path: 'add-product', component: AddProductComponent },
  { path: 'product-detail/:id', component: ProductDetailComponent },
  { path: 'buyer/login', component: LoginComponent },
  { path: 'buyer/register', component: RegisterComponent },
  { path: 'buyer/dashbord', component: DashbordComponent },
  { path: 'test', component: TestComponent },

  { path: '**', component: ProductListComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    LoginComponent,
    RegisterComponent,
    ProductListComponent,
    ProductCardComponent,
    ProductDetailComponent,
    AddProductComponent,
    TestComponent,
    DashbordComponent,
    LandingpageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
  ],
  providers: [BuyerserviceService, UserServiceService, AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
