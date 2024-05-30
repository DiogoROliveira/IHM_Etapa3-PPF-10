import { Injectable } from "@angular/core";
import { SupabaseService } from "./supabase.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private supabase: SupabaseService) {}

  async getCurrentUser() {
    try {
      const user = await this.supabase.getCurrentUser();
      if (!user) {
        throw new Error('Usuário não autenticado');
      }
      return user;
    } catch (error) {
      console.error('Erro ao obter usuário atual:', error);
      return null;
    }
  }
}
