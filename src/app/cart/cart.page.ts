import { Component, OnInit } from '@angular/core';
import { ActionSheetController, NavController } from '@ionic/angular';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  cartItems: any[] = [];

  constructor(
    private cartService: CartService, 
    private actionSheetController: ActionSheetController,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    this.cartService.currentCartItems.subscribe(items => {
      this.cartItems = items;
    });
  }

  getSubtotalPrice(): number {
    return this.cartItems.reduce((total, item) => total + item.totalPrice, 0);
  }
  
  getDeliveryFee(): number {
    const subtotal = this.getSubtotalPrice();
    return subtotal / 10;
  }
  
  getTotalPrice(): number {
    const subtotal = this.getSubtotalPrice();
    const deliveryFee = this.getDeliveryFee();
    return subtotal + deliveryFee;
  }

  clearCart() {
    this.cartService.clearCart();
  }

  calculatePoints(totalPrice: number): number {
    return Math.floor(totalPrice / 10); // 1 ponto para cada 10 EUR gastos
  }

  checkout() {
    this.navCtrl.navigateForward('/checkout');
  }

  async confirmRemoveItem(index: number) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Confirm Removal',
      buttons: [{
        text: 'Remove',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          this.removeItem(index);
        }
      }, {
        text: 'Cancel',
        role: 'cancel',
        icon: 'close',
        handler: () => {
          // Ação ao cancelar
        }
      }]
    });
    await actionSheet.present();
  }

  removeItem(index: number) {
    this.cartService.removeItem(index);
  }
}
