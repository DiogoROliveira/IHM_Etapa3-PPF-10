import { Component, Input } from '@angular/core';
import { ModalController, AlertController, LoadingController } from '@ionic/angular';
import { SupabaseService } from 'src/app/services/supabase.service';
import { CartService } from 'src/app/services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-modal',
  templateUrl: './payment-modal.component.html',
  styleUrls: ['./payment-modal.component.scss'],
})
export class PaymentModalComponent {
  @Input() address: any;
  selectedPaymentMethod: string = '';
  cartItems: any[] = [];
  currentUser: string = '';
  totalPrice: number = 0;

  constructor(
    private modalController: ModalController,
    private supabase: SupabaseService,
    private cartService: CartService,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private router: Router
  ) {}

  ngOnInit() {
    this.cartService.currentCartItems.subscribe(items => {
      this.cartItems = items;
      this.totalPrice = this.cartService.getTotalPrice(items);
    });
    this.cartService.getCurrentUser().then(user => {
      this.currentUser = user;
    });
  }

  async confirmPayment() {
    const loading = await this.loadingController.create({
      message: 'Processing payment...',
      duration: 2000 // Simulate a delay of 2 seconds
    });
    await loading.present();

    await this.supabase.saveCart(this.currentUser, this.cartItems, this.totalPrice);
    this.dismiss();

    await loading.onDidDismiss();

    const alert = await this.alertController.create({
      header: 'Payment Successful',
      message: 'Your payment has been processed successfully.',
      buttons: [
        {
          text: 'Back to Home Page',
          handler: () => {
            this.router.navigate(['/home']);
          }
        }
      ]
    });

    await alert.present();
  }

  dismiss() {
    this.modalController.dismiss();
  }
}

