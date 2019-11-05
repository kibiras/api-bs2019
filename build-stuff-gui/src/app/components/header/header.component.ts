import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import { GameService } from './../../services/game.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  totalTime: number = 90;
  timeLeft: number = this.totalTime;
  interval;
  minutes;
  seconds;

  constructor(private gameService: GameService, private quizService: QuizService) {}

  ngOnInit() {
    this.interval = setInterval(() => {
      if (this.isTimerRestarted()) {
        this.timeLeft = this.totalTime;
        localStorage.setItem('timerReStart', 'false');
        localStorage.setItem('timerStart', 'false');
      }
      if (this.timeLeft > 0 && this.isTimerStarted()) {
        this.timeLeft--;
      } else if (this.timeLeft < 1 && this.isTimerStarted()) {
        switch (localStorage.getItem('choosenGame')) {
          case 'gui':
            document.querySelector('#start-button div').classList.remove('d-none');
            localStorage.setItem('timerStart', 'false');
            this.gameService.postStartDrive(localStorage.getItem('token')).subscribe(result => {
              document.querySelector('#counted-speed').textContent = '' + parseInt(result['max_speed'] * 100 + '');
              document.querySelector('#start-drive-description .modal-title').textContent = 'Time is over';
              const modalBack = document.querySelector('.modal-backdrop');
              const modal = document.querySelector('#start-drive-description');
              modalBack.classList.add('show', 'd-block');
              modalBack.classList.remove('d-none');
              modal.classList.add('show', 'd-block');
              modal.classList.remove('d-none');
              document.querySelector('#start-button div').classList.add('d-none');
            });
            break;
          case 'quiz':
            localStorage.setItem('timerStart', 'false');
            this.quizService
              .postQuizResults(localStorage.getItem('token'), this.getQuizResult(0), this.getQuizResult(1), this.getQuizResult(2), this.getQuizResult(3), this.getQuizResult(4))
              .subscribe(result => {
                document.querySelector('#counted-speed').textContent = `${result.speed[0] * 100}`;
                document.querySelector('#start-drive-description .modal-title').textContent = 'Time is over';
                const modalBack = document.querySelector('.modal-backdrop');
                const modal = document.querySelector('#start-drive-description');
                modalBack.classList.add('show', 'd-block');
                modalBack.classList.remove('d-none');
                modal.classList.add('show', 'd-block');
                modal.classList.remove('d-none');
              });
            break;
          case 'swagger':
            localStorage.setItem('timerStart', 'false');
            const modalBack = document.querySelector('.modal-backdrop');
            const modal = document.querySelector('#swagger-time-over');
            modalBack.classList.add('show', 'd-block');
            modalBack.classList.remove('d-none');
            modal.classList.add('show', 'd-block');
            modal.classList.remove('d-none');
            break;
          default:
            break;
        }
      }

      this.minutes = Math.floor(this.timeLeft / 60);
      this.seconds = Math.floor(this.timeLeft - this.minutes * 60);
    }, 1000);
  }

  private getQuizResult(index: number): string {
    return localStorage.getItem(`quiz-answer-${index}`) === 'true' ? 'True' : 'False';
  }

  public timerClass(): string {
    let classes = '';
    if (!this.isTimerStarted()) {
      classes = 'alert alert-info';
    } else if (this.timeLeft > this.totalTime / 2) {
      classes = 'alert alert-success';
    } else {
      classes = 'alert alert-warning';
    }
    if (this.timeLeft < 11) {
      classes = 'alert alert-danger';
    }
    return classes;
  }

  private isTimerStarted(): boolean {
    return localStorage.getItem('timerStart') !== null && localStorage.getItem('timerStart') === 'true';
  }

  private isTimerRestarted(): boolean {
    return localStorage.getItem('timerReStart') !== null && localStorage.getItem('timerReStart') === 'true';
  }

  public reStartTimer() {
    localStorage.setItem('timerReStart', 'true');
  }
}
