import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CartInfoService {


  private cartData = new BehaviorSubject('0');
  currentCartData = this.cartData.asObservable();

  constructor() { }

  changeCartData(message: string) {
    this.cartData.next(message)
  }

}
