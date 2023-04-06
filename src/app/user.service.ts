import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalhostService } from './localhost.service';
import { AuthResponse } from './auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authChangedEvent = new Subject<AuthResponse>();

  constructor(private http: HttpClient, private localhost: LocalhostService) {
  }

  getAuthenticated() {
    this.http.get<AuthResponse>(this.localhost.getUrl(this.localhost.AUTH_ROUTE)).subscribe(
      {
        next: (response: AuthResponse) => {
          if (response.authorized) {
            this.authChangedEvent.next(response);
          }
        },
        error: (error: any) => {
          console.log(error);
        },
        complete: () => {
          console.log("GET request complete.");
        }
      }
    )
  }


}
