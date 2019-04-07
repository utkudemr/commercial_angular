import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { login, User, Userr } from '../customer/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

constructor(private httpClient: HttpClient) { }
path = "https://localhost:44365/api/";
user: login;
userinf:any;
response:any;
public loading = true;
login(user)
{
  debugger;
  this.httpClient.post(this.path+'login',user).subscribe(
    entity => { 
      this.userinf = entity["entity"]
      this.saveinf(entity["entity"]);
      this.loading=false;
   }
  );
  
}
register(userr)
{
  debugger;
  console.log(userr);
  this.httpClient.post(this.path+'register',userr).pipe(first()).subscribe(
    entity => {
      this.loading=false;
   }
  );
 
}
saveinf(entity)
  {
    debugger;
    var userdata=entity;
    localStorage.setItem("id",userdata.id);
    localStorage.setItem("name",userdata.name);
    localStorage.setItem("surname",userdata.surname);
    localStorage.setItem("email",userdata.email);
    
  }

  responseControl(entitys)
  {
   // alert(entitys);
    var responsee=entitys;
    localStorage.setItem("response",responsee);
  }
}
