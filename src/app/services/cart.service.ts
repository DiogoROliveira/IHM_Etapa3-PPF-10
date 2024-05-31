import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SupabaseService } from './supabase.service';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems = new BehaviorSubject<any[]>([]);
  currentCartItems = this.cartItems.asObservable();
  currentUser: string = '';

  constructor(
    private supabaseService: SupabaseService,
    private storage: Storage
  ) {}

  async ngOnInit() {
    await this.storage.create();
    const email = await this.storage.get('currentUserEmail');
    if(email) {
      this.currentUser = email;  
    } else {
      this.currentUser = 'Guest';
    }
  }

  async getCurrentUser() {
    await this.ngOnInit();
    return this.currentUser;
  }

  addToCart(item: any) {
    const currentItems = this.cartItems.getValue();
    currentItems.push(item);
    this.cartItems.next(currentItems);
    this.saveCartToDatabase(currentItems);
  }

  async saveCartToDatabase(cartItems: any[]) {
    try {
      const totalPrice = this.getTotalPrice(cartItems);
      console.log('Saving cart to database with total price:', totalPrice);
    } catch (error) {
      console.error('Erro ao salvar carrinho no banco de dados:', error);
    }
  }

  removeItem(index: number) {
    const currentItems = this.cartItems.value;
    currentItems.splice(index, 1);
    this.cartItems.next(currentItems);
  }

  getTotalPrice(cartItems: any[]): number {
    return cartItems.reduce((total, item) => total + item.totalPrice, 0);
  }

  getTotalPoints(items: any[]): number {
    return items.reduce((total, item) => total + item.points, 0);
  }

  clearCart() {
    this.cartItems.next([]);
  }

  getCartItems() {
    return this.cartItems.getValue();
  }
}