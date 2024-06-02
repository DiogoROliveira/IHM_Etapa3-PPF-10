import { Component } from '@angular/core';
import { ScreenOrientationService } from './services/screen-orientation.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private screenOrientationService: ScreenOrientationService) {}
}
