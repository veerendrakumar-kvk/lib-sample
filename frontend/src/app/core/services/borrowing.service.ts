
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { BorrowedBook } from '../models/borrowed-book.model';

@Injectable({
  providedIn: 'root'
})
export class BorrowingService {

  constructor(private http: HttpClient) { }

  borrowBook(userId: number, bookId: number): Observable<BorrowedBook> {
    return this.http.post<BorrowedBook>(`${environment.apiUrl}/borrowing/borrow`, { userId, bookId });
  }

  returnBook(userId: number, bookId: number): Observable<BorrowedBook> {
    return this.http.post<BorrowedBook>(`${environment.apiUrl}/borrowing/return`, { userId, bookId });
  }

  getUserBorrowedBooks(userId: number): Observable<BorrowedBook[]> {
    return this.http.get<BorrowedBook[]>(`${environment.apiUrl}/borrowing/user/${userId}`);
  }

  getAllBorrowedBooks(): Observable<BorrowedBook[]> {
    return this.http.get<BorrowedBook[]>(`${environment.apiUrl}/borrowing/active`);
  }

  getBorrowingHistory(): Observable<BorrowedBook[]> {
    return this.http.get<BorrowedBook[]>(`${environment.apiUrl}/borrowing/history`);
  }
}
