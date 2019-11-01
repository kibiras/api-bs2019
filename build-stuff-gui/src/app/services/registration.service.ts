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
  /*
  postStartGame(): Observable<{}> {
    return this.http.post<{}>(`${this.apiDoamin}startGame`, null);
  }

  getTestDrive(token: string): Observable<string> {
    return this.http.get<string>(`${this.apiDoamin}testDrive?token=${token}`);
  }

  getDiagnostics(token: string): Observable<[Diagnostics]> {
    return this.http.get<[Diagnostics]>(`${this.apiDoamin}diagnostics?token=${token}`);
  }

  fixRoadDiagnostic(token: string, problemName: string) {
    return this.http.post(`${this.apiDoamin}fixRoadProblem?${problemName}=0&token=${token}`, null);
  }

  fixCarDiagnostic(token: string, problemName: string) {
    return this.http.post(`${this.apiDoamin}fixCarProblem?${problemName}=1&token=${token}`, null);
  }

  postStartDrive(token: string): Observable<{}> {
    return this.http.post<{}>(`${this.apiDoamin}startDrive?token=${token}`, null);
  }*/
}
