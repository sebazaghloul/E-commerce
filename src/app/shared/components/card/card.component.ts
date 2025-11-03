
import { Component, inject, Input, input } from '@angular/core';
import { Products } from '../../../core/models/products.interface';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { TermPipe } from '../../pipes/term-pipe';
import { CartService } from '../../../features/cart/services/cart.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-card',
  imports: [RouterLink, CurrencyPipe,TermPipe],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  private readonly cartService = inject(CartService)
  private readonly toastrService = inject(ToastrService)

 
  @Input({required:true}) product:Products ={} as Products;



 addProductToCart(id:string):void{
 this.cartService.addToCart(id).subscribe({
next:(res)=>{
  console.log(res)
  if(res.status==="success"){
this.cartService.cartNumber.set(res.numOfCartItems) 
this.toastrService.success(res.message,'FreshCart')

  }
},
error:(err)=>{
  console.log(err)
}



 })


  }

}
