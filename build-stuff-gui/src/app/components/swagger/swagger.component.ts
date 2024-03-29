import { Component, OnInit } from '@angular/core';
import { SafeResourceUrl, ɵDomSanitizerImpl } from '@angular/platform-browser';
import { faFastBackward } from '@fortawesome/free-solid-svg-icons';
import { GameService } from './../../services/game.service';

import { environment } from '../../../environments/environment';
@Component({
  selector: 'app-swagger',
  templateUrl: './swagger.component.html',
  styleUrls: ['./swagger.component.scss']
})
export class SwaggerComponent implements OnInit {
  host; // = "http://"+environment.host+":8000/__swagger__/";

  constructor(sanitizer: ɵDomSanitizerImpl, private gameService: GameService) {
    this.host = sanitizer.bypassSecurityTrustResourceUrl('http://' + environment.host + ':8000/__swagger__/');
  }
  get() {
    return this.host;
  }
  faFastBackward = faFastBackward;

  ngOnInit() {}

  startGame() {
    this.gameService.postStartGame().subscribe(token => {
      localStorage.setItem('token', token['token']);
      setTimeout(() => {
        this.gameService.postStartDrive(localStorage.getItem('token')).subscribe(
          result => {
            const modalFirst = document.querySelector('#swagger-time-over');
            modalFirst.classList.remove('show', 'd-block');
            modalFirst.classList.add('d-none');

            document.querySelector('#counted-speed').textContent = '' + parseInt(result['max_speed'] * 100 + '');
            const modalBack = document.querySelector('.modal-backdrop');
            const modal = document.querySelector('#start-drive-description');
            modalBack.classList.add('show', 'd-block');
            modalBack.classList.remove('d-none');
            modal.classList.add('show', 'd-block');
            modal.classList.remove('d-none');
          },
          () => {
            alert('Something went wrong during starting a game. Contact responsible person.');
          }
        );
      }, 1);
    });
  }

  finishGame() {
    const modalFirst = document.querySelector('#swagger-time-over');
    modalFirst.classList.remove('show', 'd-block');
    modalFirst.classList.add('d-none');

    const modalBack = document.querySelector('.modal-backdrop');
    const modal = document.querySelector('#finished-description');
    modalBack.classList.add('show', 'd-block');
    modalBack.classList.remove('d-none');
    modal.classList.add('show', 'd-block');
    modal.classList.remove('d-none');
  }

  public startOver() {
    document.querySelector('#again-button div').classList.remove('d-none');
    window.history.back();
  }
}
