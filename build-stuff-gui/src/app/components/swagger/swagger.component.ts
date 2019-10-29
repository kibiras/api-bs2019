import { Component, OnInit } from '@angular/core';
import { faFastBackward } from '@fortawesome/free-solid-svg-icons';
import { GameService } from './../../services/game.service';

@Component({
  selector: 'app-swagger',
  templateUrl: './swagger.component.html',
  styleUrls: ['./swagger.component.scss']
})
export class SwaggerComponent implements OnInit {
  constructor(private gameService: GameService) {}
  faFastBackward = faFastBackward;

  ngOnInit() {}

  startGame() {
    this.gameService.postStartGame().subscribe(token => {
      localStorage.setItem('token', token['token']);
      setTimeout(() => {
        this.gameService.postStartDrive(localStorage.getItem('token')).subscribe(result => {
          const modalFirst = document.querySelector('#swagger-time-over');
          modalFirst.classList.remove('show', 'd-block');
          modalFirst.classList.add('d-none');

          document.querySelector('#counted-speed').textContent = result['max_speed'];
          const modalBack = document.querySelector('.modal-backdrop');
          const modal = document.querySelector('#start-drive-description');
          modalBack.classList.add('show', 'd-block');
          modalBack.classList.remove('d-none');
          modal.classList.add('show', 'd-block');
          modal.classList.remove('d-none');
        });
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
