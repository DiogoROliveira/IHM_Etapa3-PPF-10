import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { CartService } from 'src/app/services/cart.service';
import { SupabaseService } from 'src/app/services/supabase.service';

@Component({
  selector: 'app-address-modal',
  templateUrl: './address-modal.component.html',
  styleUrls: ['./address-modal.component.scss'],
})
export class AddressModalComponent {
  addressForm: FormGroup;
  cartItems: any[] = [];
  currentUser: string = '';
  totalPrice: number = 0;
  requiredPoints: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private loadingController: LoadingController,
    private supabase: SupabaseService,
    private modalController: ModalController,
    private cartService: CartService,
    private router: Router,
    private alertController: AlertController
  ) {
    this.addressForm = this.formBuilder.group({
      street: ['', Validators.required],
      city: ['', Validators.required],
      postalCode: ['', Validators.required],
      country: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.cartService.currentCartItems.subscribe(items => {
      this.cartItems = items;
      this.totalPrice = this.cartService.getTotalPrice(items);
      this.requiredPoints = this.cartService.getTotalPoints(items);
    });
    this.cartService.getCurrentUser().then(user => {
      this.currentUser = user;
    });
  }

  async submitAddress() {
    if (this.addressForm.valid) {
      const loading = await this.loadingController.create({
        message: 'Processing payment...',
        duration: 2000 // Simulate a delay of 2 seconds
      });
      await loading.present();
  
      try {
        await this.supabase.deductPoints(this.currentUser, this.cartItems, this.requiredPoints);
      } catch (error: any) {
        await loading.dismiss();
        const alert = await this.alertController.create({
          header: 'Error',
          message: error.message,
          buttons: ['OK']
        });
        await alert.present();
        return;
      }
  
      this.closeModal();
  
      await loading.onDidDismiss();
  
      const alert = await this.alertController.create({
        header: 'Order Successful',
        message: 'Your order has been processed successfully.',
        buttons: [
          {
            text: 'Back to Home Page',
            handler: () => {
              this.router.navigate(['/points']);
            }
          }
        ]
      });
  
      await alert.present();
    }
  }

  async closeModal() {
    await this.modalController.dismiss();
  }
}
