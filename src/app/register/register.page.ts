import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { NavController, AlertController, IonInput } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerForm!: FormGroup;
  private _storage: Storage | null = null;
  inputModel = '';

  @ViewChild('ionInputEl', { static: true }) ionInputEl!: IonInput;


  constructor(
    private formBuilder: FormBuilder,
    private navCtrl: NavController,
    private storage: Storage,
    private alertController: AlertController // Adicione esta linha
  ) {
    this.init();
  }

  onInput(ev : any) {
    const value = ev.target!.value;

    // Removes non alphanumeric characters
    const filteredValue = value.replace(/[^0-9]+/g, '');

    /**
     * Update both the state variable and
     * the component to keep them in sync.
     */
    this.ionInputEl.value = this.inputModel = filteredValue;
  }


  async init() {
    this._storage = await this.storage.create();
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]+$/), Validators.minLength(9), Validators.maxLength(9)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator: ValidatorFn = (formGroup: AbstractControl): ValidationErrors | null => {
    const password = formGroup.get('password');
    const confirmPassword = formGroup.get('confirmPassword');
    return password && confirmPassword && password.value === confirmPassword.value ? null : { 'mismatch': true };
  };

  async onRegister() {
    if (this.registerForm.valid) {
      const email = this.registerForm.value.email;
      const existingUser = await this._storage?.get(email);
      
      if (existingUser) {
        this.showAlert('Email Already Exists', 'The email address is already registered. Please use a different email.');
      
      } else {
        await this._storage?.set(email, this.registerForm.value);
        await this._storage?.set('currentUserEmail', email);


        const alert = await this.alertController.create({
          header: 'Success',
          message: 'Your account has been created successfully.',
          buttons: ['OK']
        })
  
        await alert.present();
        this.navCtrl.navigateForward('/home');

      }
    } else {
      this.showAlert('Invalid Form', 'Please ensure all fields are correctly filled out and that the passwords match.');
    }
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