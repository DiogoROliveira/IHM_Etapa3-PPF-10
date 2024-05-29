import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-search-results-modal',
  templateUrl: './search-results-modal.component.html',
  styleUrls: ['./search-results-modal.component.scss'],
})
export class SearchResultsModalComponent {
  @Input() searchResults: any[] = [];

  constructor(
    private modalController: ModalController,
    private router: Router
  ) {}

  dismissModal() {
    this.modalController.dismiss();
  }

  openDishPage(recipeId: string) {
    this.dismissModal();
    this.router.navigate(['/dish', recipeId]);
  }
}
