
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Book } from '../models/book.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) { }

  getAllBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${environment.apiUrl}/books`);
  }

  getBookById(id: number): Observable<Book> {
    return this.http.get<Book>(`${environment.apiUrl}/books/${id}`);
  }

  getAvailableBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${environment.apiUrl}/books/available`);
  }

  searchBooksByTitle(title: string): Observable<Book[]> {
    return this.http.get<Book[]>(`${environment.apiUrl}/books/search/title?title=${title}`);
  }

  searchBooksByAuthor(author: string): Observable<Book[]> {
    return this.http.get<Book[]>(`${environment.apiUrl}/books/search/author?author=${author}`);
  }

  createBook(book: Book): Observable<Book> {
    return this.http.post<Book>(`${environment.apiUrl}/books`, book);
  }

  updateBook(id: number, book: Book): Observable<Book> {
    return this.http.put<Book>(`${environment.apiUrl}/books/${id}`, book);
  }

  deleteBook(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/books/${id}`);
  }
}
