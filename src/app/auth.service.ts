import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.api;
  private isLoggedInStatus = false;

  constructor(private http: HttpClient) {
    this.isLoggedInStatus = localStorage.getItem('isLoggedIn') === 'true';
  }

  public isLoggedIn(): boolean {
    return this.isLoggedInStatus;
  }

  login(username: string, password: string): Observable<boolean> {
    return this.http.get<any[]>(`${this.apiUrl}/auth?username=${username}`).pipe(
      map(users => {
        const user = users.find(u => u.username === username && u.password === password);
        if (user) {
          localStorage.setItem('isLoggedIn', 'true');
          this.isLoggedInStatus = true;
          return true;
        }
        return false;
      }),
      catchError(error => {
        console.error('Login error', error);
        return of(false);
      })
    );
  }

  getDefaultCredentials(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/auth/1`);
  }

  logout(): void {
    localStorage.removeItem('isLoggedIn');
    this.isLoggedInStatus = false;
  }

  isAuthenticated(): boolean {
    return this.isLoggedInStatus || localStorage.getItem('isLoggedIn') === 'true';
  }
}
