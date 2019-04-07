import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../customer/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpClient: HttpClient) { }
  path = "https://localhost:44365/api/";
  category: Category;


  getallcategory() {
    return this.httpClient.get<Category>(this.path + "getall");
  }

}
