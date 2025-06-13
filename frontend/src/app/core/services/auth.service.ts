
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;
  private sessionId: string | null = null;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User | null>(null);
    this.currentUser = this.currentUserSubject.asObservable();
    
    // Check if user is already logged in
    const sessionId = localStorage.getItem('sessionId');
    if (sessionId) {
      this.sessionId = sessionId;
      this.validateSession();
    }
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/auth/login`, { username, password })
      .pipe(map(response => {
        if (response && response.sessionId) {
          this.sessionId = response.sessionId;
          localStorage.setItem('sessionId', response.sessionId);
          this.currentUserSubject.next(response.user);
        }
        return response;
      }));
  }

  register(user: User): Observable<User> {
    return this.http.post<User>(`${environment.apiUrl}/auth/register`, user);
  }

  logout(): Observable<any> {
    const headers = this.sessionId ? new HttpHeaders({ 'Authorization': this.sessionId }) : new HttpHeaders();
    return this.http.post(`${environment.apiUrl}/auth/logout`, {}, { headers })
      .pipe(map(() => {
        localStorage.removeItem('sessionId');
        this.sessionId = null;
        this.currentUserSubject.next(null);
      }));
  }

  validateSession(): void {
    if (this.sessionId) {
      const headers = new HttpHeaders({ 'Authorization': this.sessionId });
      this.http.get<User>(`${environment.apiUrl}/auth/validate`, { headers })
        .subscribe({
          next: (user) => this.currentUserSubject.next(user),
          error: () => {
            localStorage.removeItem('sessionId');
            this.sessionId = null;
            this.currentUserSubject.next(null);
          }
        });
    }
  }

  getSessionId(): string | null {
    return this.sessionId;
  }

  isLoggedIn(): boolean {
    return !!this.sessionId && !!this.currentUserValue;
  }
}
