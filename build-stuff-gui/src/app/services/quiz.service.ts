import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Questions } from '../models/questions';
import { QuizResult } from '../models/quizResult';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  apiDoamin = 'http://lsp7490d.sebank.se:8001/';

  constructor(private http: HttpClient) {}

  getQuestions(name: string, email: string): Observable<Questions> {
    return this.http.get<Questions>(`${this.apiDoamin}getQuestions?name=${name}&email=${email}`);
  }

  postQuizResults(token: string, arg1: string, arg2: string, arg3: string, arg4: string, arg5: string): Observable<QuizResult> {
    return this.http.post<QuizResult>(`${this.apiDoamin}postQuizResults?a5=${arg5}&a4=${arg4}&a3=${arg3}&a2=${arg2}&a1=${arg1}&token=${token}`, null);
  }
}
