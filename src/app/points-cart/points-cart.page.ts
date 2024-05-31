import { Component, OnInit } from '@angular/core';
import { ActionSheetController, NavController, ModalController, LoadingController, AlertController } from '@ionic/angular';
import { CartService } from '../services/cart.service';
import { SupabaseService } from '../services/supabase.service';
import { Storage } from '@ionic/storage-angular';
import { AddressModalComponent } from '../components/address-modal/address-modal.component';

@Component({
  selector: 'app-points-cart',
  templateUrl: './points-cart.page.html',
  styleUrls: ['./points-cart.page.scss'],
})
export class PointsCartPage implements OnInit {

  cartItems: any[] = [];
  userPoints: number = 0;
  requiredPoints: number = 0;

  constructor(
    private cartService: CartService, 
    private actionSheetController: ActionSheetController,
    private storage: Storage,
    private supabase: SupabaseService,
    private modalController: ModalController,
    private loadingController: LoadingController,
    private alertController: AlertController
  ) {}

  async ngOnInit() {
    this.cartService.currentCartItems.subscribe(items => {
      this.cartItems = items;
      this.calculateRequiredPoints();
    });

    await this.storage.create();

    const email = await this.storage.get('currentUserEmail');
    if (!email) {
      this.userPoints = 0;
    } else {
      this.loadUserPoints(email);
    }
  }

  async loadUserPoints(email: string) {
    try {
      const recentOrders = await this.supabase.getOrdersByEmail(email);
      if (recentOrders && recentOrders.length > 0) {
        this.userPoints = recentOrders.reduce((totalPoints, order) => totalPoints + order.points_earned, 0);
      } else {
        this.userPoints = 0;
      }
    } catch (error) {
      console.error('Erro ao carregar pontos:', error);
    }
  }

  calculateRequiredPoints() {
    this.requiredPoints = this.cartItems.reduce((totalPoints, item) => totalPoints + item.points, 0);
  }

  getTotalPoints(): number {
    return this.requiredPoints;
  }

  clearCart() {
    this.cartService.clearCart();
  }

  async checkout() {
    const modal = await this.modalController.create({
      component: AddressModalComponent
    });

    modal.onDidDismiss().then(async (result) => {
      if (result.data) {
        const loading = await this.loadingController.create({
          message: 'Processing your order...'
        });
        await loading.present();

        // Simulate order processing
        setTimeout(async () => {
          await loading.dismiss();
          const alert = await this.alertController.create({
            header: 'Order Processed',
            message: 'Your order has been successfully processed.',
            buttons: ['OK']
          });
          await alert.present();
          this.clearCart();
        }, 2000);
      }
    });

    await modal.present();
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
