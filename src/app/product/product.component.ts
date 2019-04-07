import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CustomerService } from '../services/customer.service';
import { ProductService } from '../services/product.service';
import { Product, ProductInfo } from './product';
import { debug } from 'util';
import { BasketService } from '../services/basket.service';
import { Validators, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor(private httpClient: HttpClient, private activatedRoute: ActivatedRoute, private productService: ProductService, private basketService: BasketService, private router: Router) { }
  products: Product[];
  productlist: Product[] = [];
  productsolo: Product;
  count: number;
  userid:number;
  cardItem: any;
  currentCard: any;
  submitted = false;
  productidList: any = [];
  productcountList: any = [];
  productInfo:any=[];
  totall: number = 0;
  flag: boolean = false;
  basketForm=new FormGroup({
    shippin:new FormControl('', [Validators.required]),
    billin:new FormControl('', Validators.required)
  });
  ngOnInit() {
    debugger;
    var id = localStorage.getItem('id');
    if (id == "null" || id == null) {
      this.router.navigate(["/user"])
    }
    else {
      this.userid = parseInt(id);
      this.getBasketCount();
      this.activatedRoute.params.subscribe(data => {
        this.getAllCategory(data["id"]);
      });
      var ccard = localStorage.getItem('card');
      if (ccard != "null") {
        this.currentCard = JSON.parse(ccard);
        console.log(this.currentCard);
      }
      else {
        this.currentCard = this.products;
      }
      this.totally();
    }

    // alert(localStorage.getItem("id"));
  }

  getAllCategory(categoryId) {
    debugger;
    this.productService.getproductbycategoryId(categoryId).subscribe(data => {
      this.products = data["entity"];
    })
    console.log(this.products);
  }

  getProduct(categoryId) {
    debugger;
    //localStorage.setItem("card", "null");
    var denem2e = localStorage.getItem('card');
    /*this.productService.getproduct(categoryId).subscribe(data => {
      this.productlist = data["entity"];
    })*/
    this.productsolo = {
      id: categoryId.id,
      name: categoryId.name,
      description: categoryId.description,
      stock: categoryId.stock,
      count: 0,
      price: categoryId.price
    }
    var cardResponse = localStorage.getItem('card');
    var cardString = String(cardResponse);
    if (cardString == "[]") {
      cardString = "null";
    }
    if (cardString != "null") {
      var cardd = JSON.parse(cardResponse);
    }

    if (cardString == "null") {
      this.productlist.push(this.productsolo);
      this.cardItem = {
        CustomerId: localStorage.getItem("id"),
        Total: 0,
        product: this.productlist
      };
      localStorage.setItem("card", JSON.stringify(this.productlist));
      var cart = localStorage.getItem('card');
      var cardd = JSON.parse(cart);
      localStorage.setItem("card", JSON.stringify(cardd));
      var ccard = localStorage.getItem('card');
      this.currentCard = JSON.parse(ccard);
    }



    if (cardd == null) {
      this.productlist.push(categoryId);
      console.log(cardd[0]);
    }
    if (cardd != null) {
      for (var a = 0; a < cardd.length; a++) {
        if (cardd[a].id == this.productsolo.id) {
          if (cardd[a].stock > cardd[a].count) {
            cardd[a].count += 1;
          }
          else {
            alert("Stokta bitti");
          }
          cardd[a].total = 5;
          this.flag = true;
          break;
        }
        this.flag = false;
      }
      if (this.flag == false) {
        cardd.push(this.productsolo);
        this.flag = true;
      }
    }
    localStorage.setItem("card", JSON.stringify(cardd));
    var ccard = localStorage.getItem('card');
    this.currentCard = JSON.parse(ccard);
    this.totally();
  }

  clearBasket() {
    debugger;
    localStorage.setItem("card", "null");
    this.productlist = [];
    window.location.reload();

  }

  removeselectedBasket(productId) {
    debugger;
    var ccard = localStorage.getItem('card');
    var loggedCard = JSON.parse(ccard);
    this.currentCard = loggedCard.product;
    for (var a = 0; a < loggedCard.length; a++) {
      if (loggedCard[a].id == productId.id) {
        loggedCard.splice(a, 1);
        //loggedCard[a]=null;
      }
    }
    if (loggedCard.length == 0) {
      loggedCard = null;
      this.productlist = [];
    }
    localStorage.setItem("card", JSON.stringify(loggedCard));
    var ccard = localStorage.getItem('card');
    this.currentCard = JSON.parse(ccard);
    this.totally();
  }

  reduceBasket(productId, count): void {
    debugger;
    var ccard = localStorage.getItem('card');
    var loggedCard = JSON.parse(ccard);
    this.currentCard = loggedCard.product;
    for (var a = 0; a < loggedCard.length; a++) {
      if (loggedCard[a].id == productId.id) {
        if (loggedCard[a].count == 0) {
          loggedCard.splice(a, 1);
        }
        loggedCard[a].count -= 1;
        if (loggedCard[a].count == 0) {
          loggedCard.splice(a, 1);
        }
        //loggedCard[a]=null;
      }
    }
    localStorage.setItem("card", JSON.stringify(loggedCard));
    var ccard = localStorage.getItem('card');
    this.currentCard = JSON.parse(ccard);
    this.totally();
    return;
    // window.location.reload();
  }

  totally() {
    this.totall = 0;
    if (this.currentCard != null) {
      for (var a = 0; a < this.currentCard.length; a++) {
        this.totall += this.currentCard[a].count * this.currentCard[a].price;
      }
    }
  }

  get f() { 
    debugger;
    
      return this.basketForm.controls;
   }

  addbasket(basket) {
    debugger;
    this.submitted = true;
    if (this.basketForm.invalid) {
      return;
   }
    var card = localStorage.getItem('card');
    var cardd = JSON.parse(card);
    var info=this.basketForm.value;
    var idd = parseInt(localStorage.getItem('id'));
   // var iddd = parseInt(localStorage.getItem('denemeid'));
    for (var a = 0; a < cardd.length; a++) {
      var infoo= {
         id:cardd[a].id,
         quantity:cardd[a].count
      };
      this.productInfo.push(infoo);
      this.productidList.push(cardd[a].id);
      this.productcountList.push(cardd[a].count);
    }
    var top = {
      billingaddress: info.billin,
      shippingaddress: info.shippin,
      customerid: idd,
      total: this.totall,
      ProductList: this.productidList,
      ProductCount:this.productcountList,
      ProductInfo:this.productInfo
    };

    this.basketService.addbasket(top);
    localStorage.setItem("card", null);
    window.location.reload();

  }

  getBasketCount() {
    debugger;
    var id = parseInt(localStorage.getItem('id'));
    this.basketService.getbasketcount(id).subscribe(data => {
      this.count = data["entity"];
    })
  }



}
