import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { Router } from "@angular/router";
import { Product } from 'src/app/shared.service';
import { SingleProductComponent } from '../single-product/single-product.component';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
  providers:[SingleProductComponent],
})
export class HomepageComponent implements OnInit {
  constructor(private sharedService: SharedService, private router: Router, private singleProductComponent:SingleProductComponent) { }
  ProductList: any = [];
  username = sessionStorage.getItem("username");
  page: number = 1;
  searchText: any;

  ngOnInit(): void {
    this.refreshProductList();

    if (sessionStorage.getItem("role") != "user") {
      this.router.navigate(["/login"])
    }
  }

  addCart(data: any) {
    let item = new Product();
    item.Id = data.Id;
    item.Name = data.Name;
    item.Price = data.Price;
    item.Quantity = 1;
    item.Photo = data.Photo;
    this.sharedService.addCart(item);
    this.router.navigate(["/cart"]);
  }

  singleProduct(data: any) {
    sessionStorage.setItem("singleProId", data);
    this.router.navigate(['/single-product']);
  }

  refreshProductList() {
    this.sharedService.getProductList().subscribe(data => {
      this.ProductList = data;
    });
  }
}
