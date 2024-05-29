import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor(private http: HttpClient) { }

  getRecipes(): Observable<any[]> {
    return this.http.get<any[]>('assets/dishes_corrected.json');
  }

  getDishById(id: string): Observable<any> {
    return this.http.get<any[]>('assets/dishes_corrected.json').pipe(
      map((recipes: any[]) => recipes.find(recipe => recipe.id.toString() === id))
    );
  }
  
}