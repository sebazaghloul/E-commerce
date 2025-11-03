import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DetailsService } from './services/details.service';
import { Products } from '../../core/models/products.interface';
import { CartService } from '../cart/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-details',
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit {
id:string | null =null
productDetails:Products = { } as Products
  private readonly activatedRoute= inject(ActivatedRoute)
  private readonly detailsService = inject(DetailsService)
  private readonly cartService= inject(CartService)
  private readonly toastrService= inject(ToastrService)


ngOnInit(): void {
  this.getDetails();
  this.getProductDetails()
}


addProductToCart(id:string):void{
  this.cartService.addToCart(id).subscribe({
 next:(res)=>{
   console.log(res)
   if(res.status==="success"){


    this.toastrService.success(res.message,"FreshCart")
   }
 },
 error:(err)=>{
   console.log(err)
 }
 
 
 
  })
 
 
   }
 


getDetails():void{
this.activatedRoute.paramMap.subscribe({
next:(urlParams)=>{

  this.id=urlParams.get('id');
  
}
 



})



}



getProductDetails():void{


  this.detailsService.getSpecificProduct(this.id).subscribe({
    next:(res)=>{
      this.productDetails=res.data;
      
    },

    error:(err)=>{
      console.log(err);
      
    }



  })
}


}
