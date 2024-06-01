import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { SupabaseService } from '../services/supabase.service';
import { DishService } from '../services/dish.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-points',
  templateUrl: './points.page.html',
  styleUrls: ['./points.page.scss'],
})
export class PointsPage implements OnInit {
  points: number = 0;
  dishes: any[] = [];
  loadingPoints: boolean = false;

  constructor(
    private supabase: SupabaseService,
    private storage: Storage,
    private dishService: DishService,
    private router: Router
  ) {}

  async ngOnInit() {
    await this.storage.create();

    const email = await this.storage.get('currentUserEmail');
    if (!email) {
      this.points = 0;
    } else {
      // Load points initially
      this.loadPoints(email);

      // Subscribe to router events to reload points if needed
      this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
        this.loadPoints(email);
      });

      this.loadDishes();
    }
  }

  async loadPoints(email: string) {
    this.loadingPoints = true; // Show loading indicator
    try {
      const recentOrders = await this.supabase.getOrdersByEmail(email);
      if (recentOrders && recentOrders.length > 0) {
        this.points = recentOrders.reduce((totalPoints, order) => totalPoints + order.points_earned, 0);
      } else {
        this.points = 0;
      }
    } catch (error) {
      console.error('Erro ao carregar pontos:', error);
    }
    this.loadingPoints = false; // Hide loading indicator
  }

  loadDishes() {
    this.dishService.getRecipes().subscribe(
      (recipes) => {
        recipes = this.shuffle(recipes);
        this.dishes = recipes.slice(0, 4);
      },
      (error) => {
        console.error('Erro ao carregar pratos:', error);
      }
    );
  }

  shuffle(array: any[]) {
    let currentIndex = array.length;
    let temporaryValue, randomIndex;
    
    while (0 !== currentIndex) {    
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  openDishPage(dishId: string) {
    this.router.navigate(['/points-dish', dishId]);
  }
}
