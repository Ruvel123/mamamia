import { Component, OnInit } from '@angular/core';
import {CartInfoService} from '../cart-info.service' ;



@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.sass']
})
export class NavBarComponent implements OnInit {

  myCart:string = "0" ;


  constructor(private cartData:CartInfoService) { }

  ngOnInit() {
    this.cartData.currentCartData.subscribe(message => this.myCart = message)

  }

}
