import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Review } from './review';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {

  private supabaseUrl = 'https://rgarrzqqqpoxzndreqrj.supabase.co';
  private supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJnYXJyenFxcXBveHpuZHJlcXJqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTcwNzg2MTgsImV4cCI6MjAzMjY1NDYxOH0.3zM_Ly0Y-WGsmccotYeWGA6Yht7Ja7zxM0uYF9iK0RM'
  private supabaseClient: SupabaseClient;
  
  constructor() {
    this.supabaseClient = createClient(this.supabaseUrl, this.supabaseKey);
  }

  async signUp(email: string, password: string): Promise<void> {
    const { data, error } = await this.supabaseClient.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      throw error;
    }
  }
  

  async signIn(email: string, password: string): Promise<void> {
    const { data, error } = await this.supabaseClient.auth.signInWithPassword({
      email: email,
      password: password,
    });
  
    if (error) {
      throw error;
    }
  }
  
  async signOut(): Promise<void> {
    const { error } = await this.supabaseClient.auth.signOut();
    if (error) {
      throw error;
    }
  }
  


  async getReviews(): Promise<Review[]> {
    const { data, error } = await this.supabaseClient
      .from('reviews')
      .select('*')
      .order('date', { ascending: false });
    if (error) {
      return [];
    }
    return data as Review[];
  }

  async getReviewById(id: number): Promise<Review> {
    const { data, error } = await this.supabaseClient
      .from('reviews')
      .select('*')
      .eq('id', id)
      .single();
    if (error) {
      throw error;
    }
    return data as Review;
  }

  async getReviewsByDishId(dishId: string): Promise<Review[]> {
    const { data, error } = await this.supabaseClient
      .from('reviews')
      .select('*')
      .eq('dishId', dishId);
    if (error) {
      throw error;
    }
    return data as Review[];
  }
  
  async insertReview(review: Review) {
    const {data, error} = await this.supabaseClient
      .from('reviews')
      .insert(review)
      .single();

    if (error) {
      return null;
    }
    return data;
  }

  async updateReview(review: Review): Promise<void> {
    const {data, error} = await this.supabaseClient
      .from('reviews')
      .update(review)
      .eq('id', review.id)
      .single();

    if (error) {
      console.error(error);
      throw new Error('Erro ao atualizar avaliação');
    }
  }

  async deleteReview(id: number): Promise<void> {
    await this.supabaseClient.from('reviews').delete().eq('id', id);
  }

}
