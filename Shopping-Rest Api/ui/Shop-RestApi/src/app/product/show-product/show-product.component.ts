import { Component, OnInit } from '@angular/core';
//Added
import { SharedService } from 'src/app/shared.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-show-product',
  templateUrl: './show-product.component.html',
  styleUrls: ['./show-product.component.css']
})
export class ShowProductComponent implements OnInit {
  constructor(private sharedService: SharedService, private router: Router) { }

  ProductList: any = [];

  ModalTitle: string | undefined;
  ActivateAddEditProductComp: boolean = false;
  product: any;
  page: number = 1;
  searchText!: string;

  ngOnInit(): void {
    this.refreshProductList();
    if (sessionStorage.getItem("role") != "admin") {
      this.router.navigate(["/login"])
    }
  }

  addClick() {
    this.product = {
      Id: 0,
      Name: "",
    }
    this.ModalTitle = "Add Product";
    this.ActivateAddEditProductComp = true;
  }

  editClick(item: any) {
    this.product = item;
    this.ModalTitle = "Edit Product";
    this.ActivateAddEditProductComp = true;
  }

  deleteClick(item: { Id: any; }) {
    if (confirm('Are you sure ??')) {
      this.sharedService.deleteProduct(item.Id).subscribe(data => {
        alert('Product Deleted !!!');
        this.refreshProductList();
      })
    }
  }

  closeClick() {
    this.ActivateAddEditProductComp = false;
    this.refreshProductList();
  }

  refreshProductList() {
    this.sharedService.getProductList().subscribe(data => {
      this.ProductList = data;
    });
  }

  search(event: any) {
    if (event.target.value == "" || event.target.value == null) {
      this.refreshProductList();
    } else {
      this.sharedService.searchProduct(event.target.value).subscribe(data => {
        if (data != null) {
          this.ProductList = data;
        } else {
          this.ProductList = [];
        }
      });
    }
  }
}
