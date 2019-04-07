import { Component } from '@angular/core';
import { debug } from 'util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'comm';
  id: any = localStorage.getItem('id');
  name: any = localStorage.getItem('name');
  surname: any = localStorage.getItem('surname');

  logoff() {
    debugger;
    localStorage.clear();
    var id=localStorage.getItem('id');
    localStorage.setItem('id',"null");
    alert(id);
    window.location.reload();
  }
}

