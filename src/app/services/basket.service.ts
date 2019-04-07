import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Card } from '../product/card';
import { debug } from 'util';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  constructor(private httpClient: HttpClient) { }
  path = "https://localhost:44365/api/";
  card: Card;
  response:boolean;
  count:number;

  addbasket(basket)
  {
   debugger;
  console.log(basket);
  this.httpClient.post(this.path+'addbasket',basket).subscribe(
    entity => { 
      /*this.response=entity("entity");*/
      this.saveinf(entity["entity"]);
   }
  );
 
  }

  addbasketproduct(baskett)
  {
   
  console.log(baskett);
  
  this.httpClient.post(this.path+'addbasketproduct/',baskett).subscribe(
    entity => { 
      /*this.response=entity("entity");*/
      this.saveinf(entity["entity"]);
   }
  );
 
  }

  saveinf(entity)
  {
    debugger;
    
    var userdata=entity;
    var responsee=String(entity);
    localStorage.setItem("denemeid",responsee);
   /* localStorage.setItem("id",userdata.id);
    localStorage.setItem("name",userdata.name);
    localStorage.setItem("surname",userdata.surname);
    localStorage.setItem("email",userdata.email);*/
    
  }

  getbasketcount(userid)
  {
    debugger;
    return this.httpClient.get<number>(this.path + "count/" + userid);
  }

}
