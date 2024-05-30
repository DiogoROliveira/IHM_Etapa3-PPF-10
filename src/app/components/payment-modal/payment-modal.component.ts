import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-payment-modal',
  templateUrl: './payment-modal.component.html',
  styleUrls: ['./payment-modal.component.scss'],
})
export class PaymentModalComponent {
  @Input() address: any;
  selectedPaymentMethod: string = '';

  constructor(private modalController: ModalController) {}

  async confirmPayment() {
    // Your payment confirmation logic here
    this.dismiss();
  }

  dismiss() {
    this.modalController.dismiss();
  }
}

