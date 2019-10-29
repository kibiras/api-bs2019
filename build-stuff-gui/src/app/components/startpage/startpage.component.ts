import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { faEye, faFlagCheckered, faQuestion, faSlidersH, faFastBackward } from '@fortawesome/free-solid-svg-icons';
import { GameService } from './../../services/game.service';

@Component({
  selector: 'app-startpage',
  templateUrl: './startpage.component.html',
  styleUrls: ['./startpage.component.scss']
})
export class StartpageComponent implements OnInit {
  modalForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private gameService: GameService) {
    this.modalForm = this.formBuilder.group({
      name: '',
      email: ''
    });
  }

  faSlidersH = faSlidersH;
  faEye = faEye;
  faQuestion = faQuestion;
  faFlagCheckered = faFlagCheckered;
  faFastBackward = faFastBackward;

  ngOnInit() {}
  public startJustDrive() {
    this.gameService.startJustDrive().subscribe(token => {
      localStorage.setItem('token', token['token']);
      setTimeout(() => {
        this.gameService.postStartDrive(localStorage.getItem('token')).subscribe(result => {
          const modalBack = document.querySelector('.modal-backdrop');
          const modal = document.querySelector('#start-drive-description');
          modalBack.classList.add('show', 'd-block');
          modalBack.classList.remove('d-none');
          modal.classList.add('show', 'd-block');
          modal.classList.remove('d-none');
        });
      }, 1000);
    });
  }

  public startDrive() {
    this.gameService.postStartGame(localStorage.getItem('driveName'), localStorage.getItem('driveEmail')).subscribe(token => {
      localStorage.setItem('token', token['token']);
      setTimeout(() => {
        this.gameService.postStartDrive(localStorage.getItem('token')).subscribe(result => {
          const modalBack = document.querySelector('.modal-backdrop');
          const modal = document.querySelector('#start-drive-description');
          modalBack.classList.add('show', 'd-block');
          modalBack.classList.remove('d-none');
          modal.classList.add('show', 'd-block');
          modal.classList.remove('d-none');
        });
      }, 1000);
    });
  }

  public startGame() {
    localStorage.setItem('driveName', this.modalForm.controls.name.value);
    localStorage.setItem('driveEmail', this.modalForm.controls.email.value);
    const modalBack = document.querySelector('.modal-backdrop');
    const modal = document.querySelector('.modal.show');
    modalBack.classList.remove('show', 'd-block');
    modalBack.classList.add('d-none');
    modal.classList.remove('show', 'd-block');
    modal.classList.add('d-none');
  }

  public startGameAndCallToGetToken() {
    this.gameService.postStartGame(localStorage.getItem('driveName'), localStorage.getItem('driveEmail')).subscribe(token => {
      localStorage.setItem('token', token['token']);
    });
  }

  public startOver() {
    document.querySelector('#again-button div').classList.remove('d-none');
    location.reload();
  }
}
