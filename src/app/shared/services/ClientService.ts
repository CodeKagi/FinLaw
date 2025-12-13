import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private api = 'http://localhost:4000'; // change to real API base

  constructor(private http: HttpClient) {}

  createClient(payload: any): Observable<any> {
    // If you don't have backend yet keep a mocked response:
    // return of({ id: 'mock-123', ...payload }).pipe(delay(800));

    // When backend is ready, uncomment:
    return this.http.post(`${this.api}/clients`, payload);
  }
}
