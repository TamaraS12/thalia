import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SearchResponse} from "../../shared/model/search-response.model";
import {Book} from "../model/book.model";

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private apiUrl = 'http://localhost:8080/api/books';
  private http = inject(HttpClient);

  searchBooks(params: any) {
    console.log(params);
    return this.http.get<SearchResponse<Book>>(this.apiUrl + '/search', { params });
  }
}
