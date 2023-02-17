import { Component } from '@angular/core';
import { ShowProductComponent } from './product/show-product/show-product.component';

@Component({
  providers:[ShowProductComponent ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Shop Rest-Api';
  constructor(private showProductComponent: ShowProductComponent) {}

  logOut(){
    sessionStorage.clear();
  }
  username = sessionStorage.getItem("username");
  role = sessionStorage.getItem("role");
}
