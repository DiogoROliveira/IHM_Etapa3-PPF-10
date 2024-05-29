import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DishService } from '../services/dish.service';

@Component({
  selector: 'app-dish',
  templateUrl: './dish.page.html',
  styleUrls: ['./dish.page.scss'],
})
export class DishPage implements OnInit {
  dish: any;

  constructor(
    private route: ActivatedRoute,
    private dishService: DishService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const dishId = params['id'];
      if (dishId) {
        this.loadDishDetails(dishId);
      }
    });
  }
  

  loadDishDetails(id: string) {
    // Converta o ID para string
    id = String(id);
  
    this.dishService.getDishById(id).subscribe(
      (data: any) => {
        console.log(data); // Verifique os dados do prato no console
        this.dish = data;
      },
      (error: any) => {
        console.error('Erro ao carregar detalhes do prato:', error);
      }
    );
  }
  
  
}
