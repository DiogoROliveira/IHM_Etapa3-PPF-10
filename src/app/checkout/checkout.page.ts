import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { PaymentModalComponent } from '../components/payment-modal/payment-modal.component';

// Lista de países válidos
const validCountries = ["Portugal", "Spain", "France", "Germany", "Italy", "United Kingdom"];

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage {
  addressForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private modalController: ModalController
  ) {
    this.addressForm = this.formBuilder.group({
      street: ['', Validators.required],
      city: ['', Validators.required],
      postalCode: ['', [Validators.required, this.postalCodeValidator()]],
      country: ['', [Validators.required, this.countryValidator()]]
    });
  }

  // Validador customizado para o país
  countryValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const isValid = validCountries.includes(control.value);
      return isValid ? null : { invalidCountry: { value: control.value } };
    };
  }

  // Validador customizado para o código postal
  postalCodeValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const regex = /^[0-9]{4}-[0-9]{3}$/; // Exemplo de formato de código postal português
      const isValid = regex.test(control.value);
      return isValid ? null : { invalidPostalCode: { value: control.value } };
    };
  }

  async submitAddress() {
    if (this.addressForm.valid) {
      this.openPaymentModal();
    }
  }

  async openPaymentModal() {
    const modal = await this.modalController.create({
      component: PaymentModalComponent,
      componentProps: { address: this.addressForm.value }
    });
    await modal.present();
  }
}
