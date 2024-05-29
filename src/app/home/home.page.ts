import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { DishService } from '../services/dish.service';
import { ModalController } from '@ionic/angular';
import { SearchResultsModalComponent } from '../components/search-results-modal/search-results-modal.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  user: string = '';
  recipes: any[] = [];
  displayedRecipes: any[] = [];
  searchQuery: string = '';
  searchResults: any[] = [];

  constructor(
    private storage: Storage,
    private dishService: DishService,
    private modalController: ModalController,
    private router: Router
  ) {}

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
    
    this.loadRecipes();
  }

  loadRecipes() {
    this.dishService.getRecipes().subscribe(
      (recipes: any[]) => {
        this.recipes = this.shuffleRecipes(recipes);
        this.displayedRecipes = this.recipes.slice(0, 4);
      },
      (error: any) => {
        console.error('Erro ao carregar receitas:', error);
      }
    );
  }

  shuffleRecipes(recipes: any[]): any[] {
    for (let i = recipes.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [recipes[i], recipes[j]] = [recipes[j], recipes[i]];
    }
    return recipes;
  }

  async onSearch(event: any) {
    const query = event.target.value.toLowerCase();
    if (query && query.trim() !== '') {
      this.searchResults = this.recipes.filter(recipe =>
        recipe.title.toLowerCase().includes(query)
      );
      await this.presentModal();
    }
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: SearchResultsModalComponent,
      componentProps: { searchResults: this.searchResults }
    });
    return await modal.present();
  }

  openDishPage(recipeId: string) {
    this.router.navigate(['/dish', recipeId]);
  }
}
