import { Component, ViewChild } from '@angular/core';
import { IonModal, AlertController, NavController, LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { OverlayEventDetail } from '@ionic/core/components';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage {
  @ViewChild(IonModal) modal!: IonModal;
  
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(
    private alertController: AlertController,
    private loadingController: LoadingController,
    private storage: Storage,
    private navCtrl: NavController
  ) {}

  async verifyEmail() {
    const loading = await this.loadingController.create({
      message: 'Verifying email...',
    });
    await loading.present();

    const user = await this.storage.get(this.email);
    await loading.dismiss();

    if (user) {
      this.showLoadingAndOpenModal();
    } else {
      this.showAlert('Error', 'Email not found. Please enter a registered email.');
    }
  }

  async showLoadingAndOpenModal() {
    const loading = await this.loadingController.create({
      message: 'Email found. Loading...',
      duration: 1000
    });
    await loading.present();

    loading.onDidDismiss().then(() => {
      this.modal.present();
    });
  }

  async confirm() {
    if (this.password !== this.confirmPassword) {
      this.showAlert('Error', 'Passwords do not match. Please try again.');
      return;
    }

    const user = await this.storage.get(this.email);
    if (user) {
      user.password = this.password;
      await this.storage.set(this.email, user);
      this.showAlert('Success', 'Your password has been reset successfully.', false, true);
      this.modal.dismiss();
    }
  }

  async showAlert(header: string, message: string, openModal: boolean = false, navigateToLogin: boolean = false) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: [{
        text: 'OK',
        handler: () => {
          if (openModal) {
            this.modal.present();
          }
          if (navigateToLogin) {
            this.navCtrl.navigateBack('/login');
          }
        }
      }]
    });

    await alert.present();
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.confirm();
    }
  }
}

