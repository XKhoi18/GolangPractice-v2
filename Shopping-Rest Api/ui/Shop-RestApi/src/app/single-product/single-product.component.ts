import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Product, SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css']
})
export class SingleProductComponent implements OnInit{
  constructor(private sharedService: SharedService, private router: Router) { }
  item: any = [];

  ngOnInit(): void {
    this.singleProduct();
  }

  singleProduct() {
    let i = sessionStorage.getItem("singleProId");
    let id;
    if (i != null) {
      id = i;
    } else {
      id = 1;
    }
    this.sharedService.getProduct(id).subscribe(data => {
      this.item = data;
      console.log(data);
    });
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
}
