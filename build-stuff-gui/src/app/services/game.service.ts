import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Diagnostics } from './../models/diagnostics';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  apiDoamin = 'http://lsp7490d.sebank.se:8000/';

  constructor(private http: HttpClient) {}

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
