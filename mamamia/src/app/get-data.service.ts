import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';


@Injectable({
  providedIn: 'root'
})

export class GetDataService {

    constructor(private http: HttpClient) {
        this.getMenuJSON().subscribe(data => {
            console.log(data)
        });
    }

     public getMenuJSON(): Observable<any> {
        return this.http.get("./assets/pizza-menu.json")
    }

}






