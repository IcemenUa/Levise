import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeSpecialOfferComponent } from './pages/home-page/home-special-offer/home-special-offer.component';
import { ShopComponent } from './pages/shop/shop.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';



import { AdminComponent } from './admin/admin.component';
import { AdminHomePageComponent } from './admin/admin-home-page/admin-home-page.component';
import { AdminCategoriesComponent } from './admin/admin-categories/admin-categories.component';
import { AdminSubCategoriesComponent } from './admin/admin-sub-categories/admin-sub-categories.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';


import { environment } from '../environments/environment';
import { HomeOfferCardsComponent } from './pages/home-page/home-offer-cards/home-offer-cards.component';

import { HttpClientModule } from '@angular/common/http';
import { EmbedVideo } from 'ngx-embed-video';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CarouselModule } from 'ngx-bootstrap/carousel';










@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomePageComponent,
    FooterComponent,
    HomeSpecialOfferComponent,
    AdminComponent,
    AdminHomePageComponent,
    HomeOfferCardsComponent,
    AdminCategoriesComponent,
    AdminSubCategoriesComponent,
    AdminProductsComponent,
    ShopComponent,
    ProductDetailComponent,
    
    
    
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    HttpClientModule,
    EmbedVideo.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    BsDropdownModule.forRoot(),
    CarouselModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
