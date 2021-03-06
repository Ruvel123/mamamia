import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import {CartInfoService} from './cart-info.service' ;
import { FormsModule } from '@angular/forms';

import { GetDataService } from './get-data.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';


@NgModule({
  declarations: [

    AppComponent,
    HomeComponent,
    CheckoutComponent,
    NavBarComponent,

  ],
  imports: [
    NgbModule ,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [GetDataService,CartInfoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
