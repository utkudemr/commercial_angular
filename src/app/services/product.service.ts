import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../product/product';
import { debug } from 'util';
import { Card, deletedCard } from '../product/card';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

constructor(private httpClient: HttpClient) { }
path = "https://localhost:44365/api/";

getproductbycategoryId(categoryId) {
  return this.httpClient.get<Product[]>(this.path + "bycategoryid/" + categoryId);
}

getproduct(sid)
{
 // var idd=parseInt(sid);
 var asdsad=this.path + "byid/" + sid;
 alert(asdsad);
  return this.httpClient.get<Product[]>(this.path + "byid/" + sid);
}

getcards(id)
{
  debugger;
  return this.httpClient.get<Card[]>(this.path + "baskets/" + id);
}

deletecard(id)
{
  debugger;
  var asdsa=this.path+"dbasket/"+id;
  //alert(asdsa);
  return this.httpClient.get<deletedCard>(this.path + "dbasket/" + id);
}

}
