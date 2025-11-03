import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { CookieService } from 'ngx-cookie-service';
import { Products } from '../../../core/models/products.interface';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly httpClient = inject(HttpClient);
  private readonly cookieService = inject(CookieService);
cartNumber:WritableSignal<number>=signal(0);


  addToCart(id: string): Observable<any> {
    return this.httpClient.post(
      environment.baseUrl + 'cart',

      {
        productId: id,
      }
    );
  }

  cartLogged(): Observable<any> {
    return this.httpClient.get(environment.baseUrl + 'cart');
  }

  removeSpecificCartItem(id: string): Observable<any> {
    return this.httpClient.delete(environment.baseUrl + `cart/${id}`);
  }

  updateCartCount(id: string, count: number): Observable<any> {
    return this.httpClient.put(
      environment.baseUrl + `cart/${id}`,

      {
        count: count,
      }
    );
  }

  checkOutSessionByVisa(id: string | null, data: object): Observable<any> {
    return this.httpClient.post(
      environment.baseUrl + `orders/checkout-session/${id}?url=http://localhost:4200`,
      data
    );
  }

  checkOutByCash(id:string, data:any):Observable<any>{
return this.httpClient.post(environment.baseUrl +`orders/${id}`, {
  shippingAddress:data.shippingAddress
} );


  }


  getUserOrder(userId:string|null=null):Observable<any>{

    return this.httpClient.get(environment.baseUrl + `orders/user/${userId}`);
  }
}
