import { Component, OnInit } from '@angular/core';
import { GetDataService } from '../get-data.service';
import {debounceTime} from 'rxjs/operators';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {


    menuData = {}
    objectKeys = Object.keys;
    currentJustify = 'center';
    staticAlertClosed = true;
    errorMessage = ""



    constructor(
    private getDataService : GetDataService
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
    validateItem(itemKey)
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
        return {"validation":false ,"message":"minimum " + this.menuData[itemKey]["req"]["min"]+ " must be selected"} ;

       }
    }

    if(this.menuData[itemKey]["req"]["max"])
    {
      if(this.menuData[itemKey]["req"]["max"]<= totalCount)
      {
        return {"validation":false ,"message":"maximum " + this.menuData[itemKey]["req"]["max"]+ " must be selected"} ;

      }


    }

    }



    return {"validation":true ,"message":""} ;

    }

    showAlert(message)
    {
    this.errorMessage = message ;
    setTimeout(() => this.staticAlertClosed = true, 5000);
    this.staticAlertClosed = false;


    }

   //add item to pizza
   addItemToPizza(itemKey,listKey,count)
   {
       let validationResult = this.validateItem(itemKey) ;
       if(validationResult["validation"])
       {
       this.menuData[itemKey]['list'][listKey]["count"] = this.menuData[itemKey]['list'][listKey]["count"] + count  ;
       }
       else
       {
          this.showAlert(validationResult["message"])
       }

   }

   ngOnInit(){
       this.getDataService.getMenuJSON().subscribe(data => {


            this.menuData = this.addCountfield(data) ;

        });

        }



}
