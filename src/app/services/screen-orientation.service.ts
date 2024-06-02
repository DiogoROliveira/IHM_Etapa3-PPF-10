import { Injectable } from '@angular/core';
import { ScreenOrientation } from '@awesome-cordova-plugins/screen-orientation/ngx';

@Injectable({
  providedIn: 'root'
})
export class ScreenOrientationService {
  constructor(private screenOrientation: ScreenOrientation) {
    this.lockOrientation();
  }

  lockOrientation() {
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT)
      .then(() => console.log('Orientation locked'))
      .catch((error: any) => console.error('Error locking orientation', error));
  }
}

