import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { IonInput, AlertController, LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  @ViewChild('passwordInput', { static: false }) passwordInput!: ElementRef<HTMLInputElement>;

  email: string = '';
  password: string = '';
  passwordFocused: boolean = false;
  errorMessage: string = '';

  private _storage: Storage | null = null;

  constructor(
    private router: Router, 
    private storage: Storage, 
    private alertController: AlertController,
    private loadingController: LoadingController 
  ) {
    this.init();
  }

  async init() {
    this._storage = await this.storage.create();
  }

  async login() {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
      duration: 1500
    });

    await loading.present();

    setTimeout(async () => {
      const user = await this._storage?.get(this.email);

      await loading.dismiss();

      if (user && user.password === this.password) {
        
        await this._storage?.set('currentUserEmail', this.email);

        this.router.navigate(['/home']);
      } else {
        
        this.showAlert('Invalid Credentials', 'The email or password you entered is incorrect.');
      }
    }, 1500); 
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });

    await alert.present();
  }
}

