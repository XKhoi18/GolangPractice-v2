import { Component, OnInit, Input } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-add-edit-product',
  templateUrl: './add-edit-product.component.html',
  styleUrls: ['./add-edit-product.component.css']
})
export class AddEditProductComponent implements OnInit {
  constructor(private sharedService: SharedService,private router: Router) {}

  @Input() product:any;
  Id: string | undefined;
  Name: string | undefined;
  Price:string | undefined;
  Quantity:string | undefined;
  Photo:string | undefined;
  PhotoFilePath:string | undefined;

  ngOnInit(): void {
    this.Id=this.product.Id;
    this.Name=this.product.Name;
    this.Price=this.product.Price;
    this.Quantity=this.product.Quantity;
    //this.Photo=this.product.Photo;
    this.Photo=this.product.Photo;
    this.PhotoFilePath=this.sharedService.PhotoUrl+this.Photo;

    if (sessionStorage.getItem("role") != "admin"){
      this.router.navigate(["/login"])
    }
  }

  addProduct(){
    var val = {
      Name:this.Name,
      Price:this.Price,
      Quantity:this.Quantity,
      Photo: this.Photo
    };
    this.sharedService.addProduct(val).subscribe(res=>{
      alert('Add Product Successful !!!');
    });
  }
  
  editProduct(){
    var val = {
      Id:this.Id,
      Name:this.Name,
      Price:this.Price,
      Quantity:this.Quantity,
      Photo: this.Photo
    };
    this.sharedService.updateProduct(val).subscribe(res=>{
      alert('Edit Product Successful !!!');
    });
  }

  // uploadFile(event: any){
  //   var file=event.target.files[0];
  //   const formData:FormData=new FormData();
  //   formData.append('uploadedFile',file,file.name);

  //   this.sharedService.UploadFile(formData).subscribe((data:any)=>{
  //     this.Photo=data.toString();
  //     this.PhotoFilePath=this.sharedService.PhotoUrl+this.Photo;
  //   })
  // }

  onFileChanged(event: any){
    this.Photo= event.target.files[0].name ;
    console.log(this.Photo);
    
  }
}
