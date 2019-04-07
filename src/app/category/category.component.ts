import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../customer/category';
import { HttpClient } from '@angular/common/http';
import { Product } from '../product/product';
import { debug } from 'util';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
  providers: [CategoryService]
})
export class CategoryComponent implements OnInit {

  constructor(private httpClient: HttpClient,private activatedRoute: ActivatedRoute, private categoryService: CategoryService,private router: Router) { }
  category: Category;
  ngOnInit() {
    debugger;
    this.activatedRoute.params.subscribe(data => {
      this.getAllCategory()
    });
    var id=localStorage.getItem('id');
    if(id=="0" || id==null || id=="null")
    {
      this.router.navigate(["/user"])
    }
    else
    {
      this.router.navigate(["/category"])
    }
  }

  getAllCategory() {

    this.categoryService.getallcategory().subscribe(data => {
      this.category = data["entity"];
    })
  }

 


}
