import { Component, OnInit } from '@angular/core';
import { faFastBackward, faPlay } from '@fortawesome/free-solid-svg-icons';
import { QuizService } from 'src/app/services/quiz.service';
import { Questions } from './../../models/questions';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {
  token: string;
  driveName: string;
  driveEmail: string;
  quizResult: Questions;
  speed: number;

  faFastBackward = faFastBackward;
  faPlay = faPlay;

  currentQuestion = 0;

  answers = new Array();

  quizFinished: boolean;

  constructor(private quizService: QuizService) {}

  ngOnInit() {
    localStorage.removeItem(`quiz-answer-0`);
    localStorage.removeItem(`quiz-answer-1`);
    localStorage.removeItem(`quiz-answer-2`);
    localStorage.removeItem(`quiz-answer-3`);
    localStorage.removeItem(`quiz-answer-4`);

    this.driveName = localStorage.getItem('driveName');

    this.quizService.getQuestions().subscribe(
      questions => {
        this.quizResult = questions;
        this.token = questions.quiz[0].token;
        localStorage.setItem('token', this.token);
        let i = 0;
        questions.questions.forEach(element => {
          localStorage.setItem(`quiz-answer-${i}`, `${element.correct_answer === 'True' ? 'false' : 'true'}`);
          i++;
        });
      },
      () => {
        alert('Something went wrong during getting questions. Contact responsible person.');
      }
    );
  }

  public getProgressStyle(): string {
    const currentStep = this.currentQuestion;
    if (this.quizResult) {
      const percentage = (currentStep / this.quizResult.questions.length) * 100;
      return `w-${percentage}`;
    }
  }

  public answer(answer: boolean) {
    localStorage.setItem(`quiz-answer-${this.answers.length}`, `${answer}`);
    this.answers.push(answer);
    this.currentQuestion++;
    if (this.currentQuestion === this.quizResult.questions.length) {
      this.quizFinished = true;
    }
  }

  public getAnswerState(index: number): string {
    const isTrueAnswer = this.quizResult.questions[index].correct_answer === 'True';
    return isTrueAnswer === this.answers[index] ? 'correct' : 'wrong';
  }

  public startOver() {
    document.querySelector('#again-button div').classList.remove('d-none');
    window.history.back();
  }

  private getStringAnswer(index: number): string {
    return this.answers[index] ? 'True' : 'False';
  }

  public startDrive() {
    document.querySelector('#start-button div').classList.remove('d-none');
    localStorage.setItem('timerStart', 'false');
    setTimeout(() => {
      this.quizService.postQuizResults(this.token, this.getStringAnswer(0), this.getStringAnswer(1), this.getStringAnswer(2), this.getStringAnswer(3), this.getStringAnswer(4)).subscribe(
        result => {
          this.speed = parseInt(result.speed[0] * 100 + '');
          const modalBack = document.querySelector('.modal-backdrop');
          const modal = document.querySelector('#start-drive-description');
          modalBack.classList.add('show', 'd-block');
          modalBack.classList.remove('d-none');
          modal.classList.add('show', 'd-block');
          modal.classList.remove('d-none');
          document.querySelector('#start-button div').classList.add('d-none');
        },
        () => {
          alert('Something went wrong during posting answers. Contact responsible person.');
        }
      );
    }, 1000);
  }
}
