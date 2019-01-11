import { Component, OnInit } from '@angular/core';
import {CartInfoService} from '../cart-info.service' ;
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.sass']
})
export class CheckoutComponent implements OnInit {

  listOfPizza:Array<Object> = [];
  myCart:string = "0" ;
  objectKeys = Object.keys;
  totalPrice:number = 0;
  paymentFormOpen = false ;
  firstName:string = "" ;
  lastName:string = "";
  address:String = "";
  couponCode:string = "";
  alertMessage:string;
  staticAlertClosed:boolean = true;
  messageType:string = "danger" ;

  constructor( 
    private route:ActivatedRoute,   private cartData:CartInfoService ,
    private router: Router
    ) { }

  //get cart data from local 
  getCartData()
  {

    if(localStorage.getItem("myCart"))
    {
    this.listOfPizza = JSON.parse(localStorage.getItem("myCart")) ;
    }
    this.cartData.changeCartData(""+this.listOfPizza.length)
    this.calculatePrice();
    


  }

  // show paymentForm
  showPaymentForm()
  {
    this.paymentFormOpen = true ;
  }


  // validate form
  validateForm()
  {
    this.messageType = "danger";
    if(this.firstName.length ==0)
    {
      this.showAlert("Enter valid first name")
      return false
    }
    if(this.lastName.length ==0)
    {
      this.showAlert("Enter valid last name")
      return false
    }
    if(this.address.length <10)
    {
      this.showAlert("Enter valid and complete address")
      return false ;
    }
    return true ;
  }

  //validate coupon code
  validateCouponCode()
  {
     if(this.couponCode.toString() != "OFF10" )
     {
      this.messageType = "danger";
       this.showAlert("Invalid coupon code")
     }
     else
     {
       this.totalPrice = Math.floor(this.totalPrice - ((this.totalPrice*10)/100))
       this.messageType = "success";
       this.showAlert("You got 10% off on your purchase , your payable amount now will be Rs."+ this.totalPrice )
       
     }
     this.couponCode = "" 

  }

  // show alert message
  showAlert(message)
  {
  this.alertMessage = message ;
  setTimeout(() => this.staticAlertClosed = true, 3000);
  this.staticAlertClosed = false;
}

  

  // on form data submitted
  onSubmit(event: Event) {
    this.proceedPayment();
    event.preventDefault();

  }
  
 // proceed payment
 proceedPayment()
 {
   if(this.validateForm())
   {
    this.messageType = "success";
    this.showAlert("Payment successful")
   this.listOfPizza=[] ;
   localStorage.removeItem("myCart");
   localStorage.removeItem("currentPizza");
   this.cartData.changeCartData(""+this.listOfPizza.length)
   this.totalPrice = 0 ;
   this.paymentFormOpen = false ;
   this.router.navigate(['/'], { queryParams: {  } });
   }


   
   
 }


  //calculate price
  calculatePrice()
  {

    for(let items of this.listOfPizza)
    {
      for(let item of this.objectKeys(items))
      {
        for(let data of items[item]['list'])
        {
          if(data["count"])
          {
            this.totalPrice +=   parseInt(data["price"])
          }
        }
      }
    }


  }


  getPizzaNumber(key)
  {

    return parseInt(key)+1;
  }

  ngOnInit() {
  
    this.getCartData();
  }



}
