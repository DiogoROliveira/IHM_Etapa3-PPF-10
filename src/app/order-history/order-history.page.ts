import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { SupabaseService } from '../services/supabase.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.page.html',
  styleUrls: ['./order-history.page.scss'],
})
export class OrderHistoryPage implements OnInit {
  orderHistory: any[] = [];

  constructor(
    private storage: Storage,
    private supabase: SupabaseService,
  ) {}

  async ngOnInit() {
    await this.storage.create();
    const email = await this.storage.get('currentUserEmail');
    
    if (email) {
      this.orderHistory = await this.supabase.getOrdersByEmail(email);
      console.log('Order History:', this.orderHistory);
    }
  }

  getImageUrl(dishId: number): string {
    return `../../assets/resources/dishes/${dishId}.png`;
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  }
}
