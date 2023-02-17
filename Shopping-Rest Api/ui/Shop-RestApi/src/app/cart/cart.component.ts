import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{
  constructor(private sharedService: SharedService,private router: Router) {}
  CartList:any=[];
  sumCart = 0;
  ngOnInit(): void{
    this.refreshCartList();
    //sessionStorage.clear();
  }

  refreshCartList(){
    var sumCart = 0;
    this.CartList = this.sharedService.getCartList();
    for (var item of this.CartList){
      sumCart += item.Price * item.Quantity;
    }
    this.sumCart = sumCart;
  }

  removeCart(val :any){
    this.sharedService.removeCart(val);
    this.refreshCartList();
  }

  orderCart(){
    this.sharedService.orderCart().subscribe(res=>{
      alert('Add Order Successful !!!');
    });
    sessionStorage.removeItem('cart_items');
    this.refreshCartList();
  }

  plus(val: any){
    this.sharedService.plusCart(val);
    this.refreshCartList();
  }

  minus(val: any){
    this.sharedService.minusCart(val);
    this.refreshCartList();
  }
}
