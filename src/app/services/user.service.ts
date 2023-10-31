import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Token } from '../models/token';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private readonly http: HttpClient, private router: Router) {}
  url: string = `http://localhost:3000/api/`;

  loginUser(user: User): Observable<Token> {
    // On envoie l'utilisateur au serveur
    return this.http.post<Token>(`${this.url}auth/login`, user);
  }

  logout(): void {
    // je supprime le token de l'espace de stockage
    localStorage.removeItem('token');

    // je redirige l'usager vers la page de connexion ou la page d'accueil
    this.router.navigate(['/home']);
  }
}
