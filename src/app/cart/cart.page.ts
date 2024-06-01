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

  // Initialize the cartItems array with the current cart items from the service
  ngOnInit() {
    this.cartService.currentCartItems.subscribe(items => {
      this.cartItems = items;
    });
  }

  // Calculate the subtotal price by summing the totalPrice of each item in the cart
  getSubtotalPrice(): number {
    return this.cartItems.reduce((total, item) => total + item.totalPrice, 0);
  }
  
  // Calculate the delivery fee by taking 10% of the subtotal price
  getDeliveryFee(): number {
    const subtotal = this.getSubtotalPrice();
    return subtotal / 10;
  }
  
  // Calculate the total price by adding the subtotal price and the delivery fee
  getTotalPrice(): number {
    const subtotal = this.getSubtotalPrice();
    const deliveryFee = this.getDeliveryFee();
    return subtotal + deliveryFee;
  }

  // Clear the cart by calling the clearCart method of the cart service
  clearCart() {
    this.cartService.clearCart();
  }

  // Calculate the number of points by dividing the total price by 10 and rounding down
  calculatePoints(totalPrice: number): number {
    return Math.floor(totalPrice / 10);
  }

  // Navigate to the checkout page
  checkout() {
    this.navCtrl.navigateForward('/checkout');
  }

  // Show an action sheet to confirm the removal of an item from the cart
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
        }
      }]
    });
    await actionSheet.present();
  }

  // Remove an item from the cart by calling the removeItem method of the cart service
  removeItem(index: number) {
    this.cartService.removeItem(index);
  }
}
