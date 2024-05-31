import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  user: string = '';

  constructor(private storage: Storage, private navCtrl: NavController) { }

  async ngOnInit() {
    await this.storage.create();
    const email = await this.storage.get('currentUserEmail');
    if (email) {
      const userData = await this.storage.get(email);
      if (userData && userData.name) {
        this.user = userData.name.split(' ')[0];
      } else {
        this.user = 'Guest';
      }
    } else {
      this.user = 'Guest';
    }
  }

  async signOut() {
    await this.storage.remove('currentUserEmail');
    await this.navCtrl.navigateRoot('/login');
  }

}
