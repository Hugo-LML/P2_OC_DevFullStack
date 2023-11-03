import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Olympic } from '../models/Olympic';

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  private olympics$ = new BehaviorSubject<Olympic[] | null>(null);

  constructor(private http: HttpClient) {}

  // HTTP request to get all the mock data stored inside the json
  loadInitialData() {
    return this.http.get<Olympic[]>(this.olympicUrl).pipe(
      tap((value) => this.olympics$.next(value)),
      catchError(error => {
        console.error(error);
        this.olympics$.next(null);
        return error;
      })
    );
  }

  // Get the result of the HTTP request as observable
  getOlympics() {
    return this.olympics$.asObservable();
  }

  // Get one olympic country by its name
  getOlympicByName(name: string): Olympic | undefined {
    return this.olympics$.value?.find(olympic => olympic.country === name);
  }
}
