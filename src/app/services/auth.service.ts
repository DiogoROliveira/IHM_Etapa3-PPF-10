import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserEmailKey = 'currentUserEmail';

  constructor(private storage: Storage) {
    this.storage.create();
  }

  async getCurrentUser() {
    const email = await this.storage.get(this.currentUserEmailKey);
    if (email) {
      return await this.storage.get(email);
    }
    return null;
  }
}
