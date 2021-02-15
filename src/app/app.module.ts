import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeSpecialOfferComponent } from './pages/home-page/home-special-offer/home-special-offer.component';
import { AdminComponent } from './admin/admin.component';
import { AdminHomePageComponent } from './admin/admin-home-page/admin-home-page.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from '../environments/environment';
import { HomeOfferCardsComponent } from './pages/home-page/home-offer-cards/home-offer-cards.component';

import { HttpClientModule } from '@angular/common/http';
import { EmbedVideo } from 'ngx-embed-video';

import {SidenavModule} from 'angular-ng-sidenav'



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

    
    
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment),
    AngularFireStorageModule,
    AngularFirestoreModule,
    HttpClientModule,
    EmbedVideo.forRoot(),
    SidenavModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
