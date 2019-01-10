import { Component, OnInit } from '@angular/core';
import { GetDataService } from '../get-data.service';
import {debounceTime} from 'rxjs/operators';
import {CartInfoService} from '../cart-info.service' ;
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {


    menuData:Object = {}
    objectKeys = Object.keys;
    currentJustify:string = 'center';
    staticAlertClosed:boolean = true;
    errorMessage:string = "";
    menuDataBase:Object = {};
    listOfPizza:Array<Object> = [];
    myCart:string = "0" ;
    showCreatePizzaView:boolean = false ;
    alertMessage ="" ;

  
    constructor(
    private getDataService : GetDataService ,
    private cartData:CartInfoService,
    private router: Router
    ) { }


   // add count field
   addCountfield(data)
   {
      for (let key in data) {
                 for(let item in data[key]['list'])
                 {
                   data[key]['list'][item]["count"] = 0
                 }
            }
     return data
   }


    // validate item
    validateItem(itemKey,count)
    {
    let totalCount = 0 ;
    for(let item in this.menuData[itemKey]['list'])
    {

    totalCount += this.menuData[itemKey]['list'][item]['count']

    }

    if(this.menuData[itemKey]["req"]["required"])
    {
   if(count<0){
    if(this.menuData[itemKey]["req"]["min"])
    {
       if(this.menuData[itemKey]["req"]["min"] > totalCount)
       {
        return {"validation":false ,"message":"minimum " + this.menuData[itemKey]["req"]["min"]+ " "+ itemKey +" must be selected"} ;

       }
    }
  }
   if(count >0){
    if(this.menuData[itemKey]["req"]["max"])
    {
      if(this.menuData[itemKey]["req"]["max"]<= totalCount)
      {
        return {"validation":false ,"message":"maximum " + this.menuData[itemKey]["req"]["max"]+ " "+ itemKey +" allowed"} ;

      }
    }
    }

    }
    return {"validation":true ,"message":""} ;

  }

  // save items locally 

  saveItemLocally()
  {
   this.cartLocalStore();
   this.currentPizzaLocally();

  }

  // save cart locally
  cartLocalStore()
  {
    if (typeof(Storage) !== "undefined") {
      // Store
      localStorage.setItem("myCart",JSON.stringify(this.listOfPizza) );

  }
} 


  //save cuurent pizza locally
  currentPizzaLocally()
  {
    if (typeof(Storage) !== "undefined") {
      // Store
      localStorage.setItem("currentPizza", JSON.stringify(this.menuData));

    }

  }

  

   // validate all items
    validateAll()
    {
    for(let itemKey in this.menuData)
      {
    let totalCount = 0 ;
    for(let item in this.menuData[itemKey]['list'])
    {

    totalCount += this.menuData[itemKey]['list'][item]['count']
    }

    if(this.menuData[itemKey]["req"]["required"])
    {
    if(this.menuData[itemKey]["req"]["min"])
    {
       if(this.menuData[itemKey]["req"]["min"] > totalCount)
       {
        this.showAlert("minimum " + this.menuData[itemKey]["req"]["min"]+ " "+ itemKey +" must be selected")
        return false ;

       }
    }

    if(this.menuData[itemKey]["req"]["max"])
    {
      if(this.menuData[itemKey]["req"]["max"]< totalCount)
      {
        this.showAlert("maximum " + this.menuData[itemKey]["req"]["max"]+ " "+ itemKey +" allowed")

        return false ;

      }


    }


    }
    }



    return true;

    }


    // add another pizza
    addAnother()
      {
       if(this.validateAll())
       {
        this.listOfPizza.push(this.menuData) ;
        this.menuData = JSON.parse(JSON.stringify(this.menuDataBase)) ;
        this.cartData.changeCartData(""+this.listOfPizza.length)
        this.saveItemLocally();

       }
       else {
         return false;
       }
       return true ;
      }



    showAlert(message)
    {
    this.errorMessage = message ;
    setTimeout(() => this.staticAlertClosed = true, 3000);
    this.staticAlertClosed = false;
  }

    //naviage use to checkout
  checkout()
  {
    if(this.addAnother())
    this.router.navigate(['/checkout', {}])
  }


   //add item to pizza
   addItemToPizza(itemKey,listKey,count)
   {

       let validationResult = this.validateItem(itemKey,count) ;
       if(validationResult["validation"])
       {
       this.menuData[itemKey]['list'][listKey]["count"] = this.menuData[itemKey]['list'][listKey]["count"] + count  ;

       this.currentPizzaLocally();
       }
       else
       {
          this.showAlert(validationResult["message"])
       }

   }

  //get cart data from local 
  getCartData()
  {

    if(localStorage.getItem("myCart"))
    {
    this.listOfPizza = JSON.parse(localStorage.getItem("myCart")) ;
    }
    this.cartData.changeCartData(""+this.listOfPizza.length)


  }



  //creaet pizza 
  createPizza()
  {
    this.showCreatePizzaView = true ;

  }

   

   ngOnInit(){
    console.log("test",this.cartData)

    this.cartData.currentCartData.subscribe(message => this.myCart = message)
    this.getDataService.getMenuJSON().subscribe(data => {


            if(localStorage.getItem("currentPizza"))
            {
            this.menuData = JSON.parse(localStorage.getItem("currentPizza")) ;
            this.showCreatePizzaView= true;
            }
            else
            {this.menuData = this.addCountfield(data) ;}
            
          
            this.menuDataBase = JSON.parse(JSON.stringify(this.addCountfield(data))) ;

        });

      this.getCartData();


      }



}
