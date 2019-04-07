import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ProductService } from '../services/product.service';
import { Product } from '../product/product';
import { Card } from '../product/card';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  constructor(private httpClient: HttpClient, private activatedRoute: ActivatedRoute, private productService: ProductService, private router: Router) { }
 
  private totall: number = 0;
  userid: number;
  numara: number;
  productt: Product;
  cards: Card[];
  ngOnInit() {
    debugger;
    var id = localStorage.getItem('id');
    if (id == "0" || id == null || id == "null") {
      this.router.navigate(["/user"])
    }
    this.userid = parseInt(id);
    this.activatedRoute.params.subscribe(data => {
      this.getCards(this.userid);
    });
  }

  getCards(userid) {
    debugger;
    //var count = params['count'];
    this.productService.getcards(userid).subscribe(data => {
      this.cards = data["entity"];
    })
    console.log(this.cards);
  } 

  remove(id)
  {
    debugger;
    this.productService.deletecard(id).subscribe(data => {
      var sadsad = data["entity"];
    });
    window.location.reload();
    
  }

}
