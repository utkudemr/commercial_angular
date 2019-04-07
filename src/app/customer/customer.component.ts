import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../services/customer.service';
import { User, Userr } from './user';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import {ReactiveFormsModule, Validators, FormBuilder} from '@angular/forms';
import { delay } from 'q';
import { debug } from 'util';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
  providers:[CustomerService]
})
export class CustomerComponent implements OnInit {

  constructor(private httpClient: HttpClient,private activatedRoute:ActivatedRoute, private customerService:CustomerService,private router: Router,private formBuilder: FormBuilder) { }
  path = "https://localhost:44365/api/";;
  user:Userr;
  loading:any;
  submitted = false;
  logincontrol:boolean=false;
  regcontrol:boolean=false;
  loginform=new FormGroup({
    emaill:new FormControl('',[Validators.required, Validators.email]),
    passwordd:new FormControl('',[Validators.required, Validators.minLength(6)])
  });
  registerform=new FormGroup({
    email:new FormControl('', [Validators.required, Validators.email]),
    name:new FormControl('', Validators.required),
    surname:new FormControl('', Validators.required),
    password:new FormControl('',[Validators.required, Validators.minLength(6)])
  });

  ngOnInit() {
  debugger;
    var id=localStorage.getItem('id');
    if(id=="null")
    {
      return;
    }
    if(id=="0" || id==null)
    {
      alert("kullanıcı adı veya şifre hatalı");
      localStorage.setItem("id", "null");
      return;
    }
    else
    {
      this.router.navigate(["/category"])
    }
  }

  get f() { 
    debugger;
    
      return this.loginform.controls;
    

   }

  get d() {
    debugger;
    
     return this.registerform.controls; 
    
    }

  getUser(userrr){
    debugger;
    this.submitted = true;
    if (this.loginform.invalid) {
      this.logincontrol=true;
      this.regcontrol=false;
      return;
   }
   var info=this.loginform.value;
  
    var top={
      email: info.emaill,
      password: info.passwordd
    };
    console.log(localStorage.getItem('id'));
    this.loading=false;
    this.customerService.login(top);
    var id=localStorage.getItem("id");
    this.loading=this.customerService.loading;
   /* if(id!=null)
    {
      
      this.router.navigate(["/category"])
    }*/
    window.location.reload();
  }

  onSubmit():void{
    debugger;
    console.log(this.loginform.value);
  }

  addUser(userrs)
  {

    debugger;
    this.submitted = true;
    if (this.registerform.invalid) {
      this.regcontrol=true;
      this.logincontrol=false;
      return;
    }
   var info=this.registerform.value;
    var top={
      name:info.name,
      surname:info.surname,
      password:info.password, 
      email:info.email
    };
    console.log(top);
    this.loading=false;
    this.customerService.register(top);
    window.location.reload();
  }

}
