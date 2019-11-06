import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  apiDoamin = 'http://' + environment.host + ':8001/';

  constructor(private http: HttpClient) {}

  postRegisterNewGame(nickname: string, email: string, agreedLeaderBoard: boolean, agreedInformation: boolean): Observable<{}> {
    return this.http.post<{}>(`${this.apiDoamin}register?nickname=${nickname}&email=${email}&agreedLeaderBoard=${agreedLeaderBoard}&agreedInformation=${agreedInformation}`, null);
  }
}
