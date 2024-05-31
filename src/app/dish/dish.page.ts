import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DishService } from '../services/dish.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { SupabaseService } from '../services/supabase.service';
import { Review } from '../services/review';
import { CartService } from '../services/cart.service';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-dish',
  templateUrl: './dish.page.html',
  styleUrls: ['./dish.page.scss'],
})
export class DishPage implements OnInit {
  dish: any;
  selectedSize: string = 'medium';
  customizations: string = '';
  quantity: number = 1;
  averageRating: number = 0;
  reviewForm!: FormGroup;
  reviews: any[] = [];
  isModalOpen = false;
  isReviewModalOpen: boolean = false;
  currentUser: string = '';

  constructor(
    private route: ActivatedRoute,
    private storage: Storage,
    private dishService: DishService,
    private formBuilder: FormBuilder,
    private alertController: AlertController,
    private supabase: SupabaseService,
    private cartService: CartService,
    private router: Router
  ) {
    this.reviewForm = this.formBuilder.group({
      rating: ['', Validators.required],
      comment: ['', Validators.required]
    });    
  }

  async ngOnInit() {

    try {
      await this.supabase.signIn('diogo.rosas.oliveira@ipvc.pt', 'projetofinalIHM2024.'); // Autentique o usuário
    } catch (error) {
      console.error('Erro durante a autenticação:', error);
    }

    const dishId = this.route.snapshot.paramMap.get('id');
    if (dishId) {
      this.loadDishDetails(dishId);
      this.loadReviews(dishId);
      await this.storage.create();
      const email = await this.storage.get('currentUserEmail');
      if (email) {
        const userData = await this.storage.get(email);
      if (userData && userData.name) {
        this.currentUser = userData.name.split(' ')[0];
      } else {
        this.currentUser = 'Guest';
      }
    } else {
      this.currentUser = 'Guest';
    } 
    }
  }


  loadDishDetails(id: string) {
    this.dishService.getDishById(id).subscribe(
      (data: any) => {
        this.dish = data;
      },
      (error: any) => {
        console.error('Erro ao carregar detalhes do prato:', error);
      }
    );
  }

  async loadReviews(dishId: string) {
    try {
      const reviews = await this.supabase.getReviewsByDishId(dishId);
      this.reviews = reviews;
      this.calculateAverageRating();
    } catch (error) {
      console.error('Erro ao carregar avaliações:', error);
    }
  }

  increaseQuantity() {
    this.quantity++;
  }

  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  viewIngredient(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  openReviewModal() {
    this.isReviewModalOpen = true;
  }

  closeReviewModal() {
    this.isReviewModalOpen = false;
  }

  addToCart() {
        const cartItem = {
      dish: this.dish,
      size: this.selectedSize,
      customizations: this.customizations,
      quantity: this.quantity,
      totalPrice: this.dish.price * this.quantity
    };
    this.cartService.addToCart(cartItem);
    this.router.navigate(['/cart']);
  }

  calculateAverageRating() {
    if (this.reviews.length === 0) {
      this.averageRating = 0;
      return;
    }
    const sum = this.reviews.reduce((acc, review) => acc + review.rating, 0);
    this.averageRating = sum / this.reviews.length;
  }

  async submitReview() {
    const newReview: Review = {
      dishId: this.dish.id,
      username: this.currentUser,
      rating: this.reviewForm.value.rating,
      comment: this.reviewForm.value.comment,
      date: new Date().toISOString()
    };
    this.reviews.push(newReview);
    this.calculateAverageRating();
    this.reviewForm.reset();
    try {
      await this.supabase.insertReview(newReview);
      this.closeReviewModal();
    } catch (error) {
      console.error('Erro ao salvar avaliação:', error);
    }
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Review Submitted',
      message: 'Thank you for your review!',
      buttons: [
        {
          text: 'Back to Home',
          handler: () => {
            this.router.navigate(['/home']);
          }
        },
        {
          text: 'Back to Dish Page',
          handler: () => {
            // Nothing needed, just close the alert
          }
        }
      ]
    });

    await alert.present();
  }

}

