import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Diagnostics } from './../models/diagnostics';

import { environment} from '../../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class GameService {
  apiDoamin = 'http://'+environment.host+':8000/';
  apiDoaminForDrive = 'http://'+environment.host+':8001/';

  constructor(private http: HttpClient) {}

  startJustDrive(): Observable<{}> {
    return this.http.post<{}>(`${this.apiDoaminForDrive}startJustDrive`, null);
  }
  postStartGame(driverName: string, driverEmail: string): Observable<{}> {
    return this.http.post<{}>(`${this.apiDoamin}startGame?driver_name=${driverName}&driver_email=${driverEmail}`, null);
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
  }
}
