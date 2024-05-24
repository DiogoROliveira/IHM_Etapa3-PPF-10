import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonInput } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements AfterViewInit {

  @ViewChild('passwordInput', { static: false }) passwordInput!: ElementRef<HTMLInputElement>;

  email: string = '';
  password: string = '';

  constructor(private router: Router) {}

  ngAfterViewInit() {
    this.passwordInput && this.passwordInput.nativeElement.setAttribute('type', 'password');
  }

  login() {
    // Add authentication logic here
    if (this.email === 'user@example.com' && this.password === 'password') {
      // If authentication is successful, redirect to the home page
      this.router.navigate(['/home']);
    } else {
      // Display an error message or handle failed authentication
      alert('Invalid credentials');
    }
  }

  togglePasswordVisibility() {
    if (this.passwordInput) {
      const inputType = this.passwordInput.nativeElement.type;
      this.passwordInput.nativeElement.type = inputType === 'password' ? 'text' : 'password';
    }
  }
}
