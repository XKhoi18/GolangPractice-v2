import { Injectable } from '@angular/core';
//Added

import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class SharedService {
  readonly APIUrl = "http://localhost:3001/api";
  readonly PhotoUrl = "http://localhost:3000/assests";

  constructor(private http: HttpClient) { }

  CartItems: Array<Product> = [];

  getProductList(): Observable<any[]> {
    return this.http.get<any>(this.APIUrl + '/product/findall');
  }

  getProduct(val: any) {
    return this.http.get(this.APIUrl + '/product/find/' + val);
  }

  addProduct(val: any) {
    return this.http.post(this.APIUrl + '/product/create', val);
  }

  updateProduct(val: any) {
    return this.http.put(this.APIUrl + '/product/update', val);
  }

  deleteProduct(val: any) {
    return this.http.delete(this.APIUrl + '/product/delete/' + val);
  }

  searchProduct(val: any) {
    return this.http.get(this.APIUrl + '/product/search/' + val);
  }

  getCartList() {
    let cart = sessionStorage.getItem("cart_items")
    if (cart != null) {
      this.CartItems = JSON.parse(cart);
    }
    return this.CartItems;
  }

  addCart(val: any) {
    let cart = sessionStorage.getItem("cart_items");
    if (cart != null) {
      this.CartItems = JSON.parse(cart);
      var index = this.exists(val.Id, this.CartItems);
      if (index != -1) {
        this.CartItems[index].Quantity!++;
      } else {
        this.CartItems.push(val);
      }
    } else {
      this.CartItems.push(val);
    }
    sessionStorage.setItem('cart_items', JSON.stringify(this.CartItems));
  }

  removeCart(val: any) {
    let cart = sessionStorage.getItem("cart_items");
    if (cart != null) {
      this.CartItems = JSON.parse(cart);
      var index = this.exists(val.Id, this.CartItems);
      if (index != -1) {
        this.CartItems.splice(index, 1);
      }
    }
    sessionStorage.setItem('cart_items', JSON.stringify(this.CartItems));
  }

  orderCart() {
    let cart = sessionStorage.getItem("cart_items");
    if (cart != null) {
      this.CartItems = JSON.parse(cart);
    }
    return this.http.post(this.APIUrl + '/cart/order', this.CartItems);
  }

  plusCart(val: any) {
    let cart = sessionStorage.getItem("cart_items");
    if (cart != null) {
      this.CartItems = JSON.parse(cart);
      var index = this.exists(val.Id, this.CartItems);
      if (index != -1) {
        this.CartItems[index].Quantity!++;
        sessionStorage.setItem('cart_items', JSON.stringify(this.CartItems));
      }
    }
  }

  minusCart(val: any) {
    let cart = sessionStorage.getItem("cart_items");
    if (cart != null) {
      this.CartItems = JSON.parse(cart);
      var index = this.exists(val.Id, this.CartItems);
      if (index != -1 && this.CartItems[index].Quantity! > 1) {
        this.CartItems[index].Quantity!--;
        sessionStorage.setItem('cart_items', JSON.stringify(this.CartItems));
      }
    }
  }

  logInCheck(username: string, password: string) {
    return this.http.get(this.APIUrl + '/login/' + username + '/' + password);
  }

  exists(id: number, cart: Array<Product>) {
    for (var i = 0; i < cart.length; i++) {
      if (cart != null) {
        if (cart[i].Id == id) {
          return i;
        }
      }
    }
    return -1;
  }



  UploadFile(val: any) {
    return this.http.post(this.APIUrl + '/product/SaveFile', val);
  }

}

export class Product {
  Id?: number
  Name?: string
  Price?: number
  Quantity?: number
  Photo?: string
}