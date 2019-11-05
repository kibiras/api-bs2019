import { RegistrationService } from './../../services/registration.service';
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
  ongoingRegistration = false;

  constructor(private formBuilder: FormBuilder, private gameService: GameService, private registrationService: RegistrationService) {
    this.modalForm = this.formBuilder.group({
      name: '',
      email: '',
      agreeToShowInLeaderBoard: false,
      agreeToGetInformation: false
    });
  }

  faSlidersH = faSlidersH;
  faEye = faEye;
  faQuestion = faQuestion;
  faFlagCheckered = faFlagCheckered;
  faFastBackward = faFastBackward;

  public startJustDrive() {
    this.gameService.startJustDrive().subscribe(token => {
      localStorage.setItem('token', token['token']);
      const modalBack = document.querySelector('.modal-backdrop');
      const modal = document.querySelector('#start-drive-description');
      modalBack.classList.add('show', 'd-block');
      modalBack.classList.remove('d-none');
      modal.classList.add('show', 'd-block');
      modal.classList.remove('d-none');
    });
  }
  ngOnInit() {
    localStorage.setItem('timerReStart', 'true');
  }

  public isDisabled(): boolean {
    return this.modalForm.controls['name'].value.length < 1 || this.ongoingRegistration;
  }

  public startGame() {
    this.ongoingRegistration = true;
    localStorage.setItem('driveName', this.modalForm.controls.name.value);
    localStorage.setItem('driveEmail', this.modalForm.controls.email.value);
    localStorage.setItem('agreeToShowInLeaderBoard', this.modalForm.controls.agreeToShowInLeaderBoard.value);
    localStorage.setItem('agreeToGetInformation', this.modalForm.controls.agreeToGetInformation.value);

    this.registrationService
      .postRegisterNewGame(
        this.modalForm.controls.name.value,
        this.modalForm.controls.email.value,
        this.modalForm.controls.agreeToShowInLeaderBoard.value,
        this.modalForm.controls.agreeToGetInformation.value
      )
      .subscribe(
        result => {
          const modalBack = document.querySelector('.modal-backdrop');
          const modal = document.querySelector('.modal.show');
          modalBack.classList.remove('show', 'd-block');
          modalBack.classList.add('d-none');
          modal.classList.remove('show', 'd-block');
          modal.classList.add('d-none');
        },
        () => {
          this.ongoingRegistration = false;
          alert('Something went wrong. Contact responsible person.');
        }
      );
  }

  public startOver() {
    document.querySelector('#again-button div').classList.remove('d-none');
    location.reload();
  }

  public startTimer(gameName: string) {
    localStorage.setItem('timerStart', 'true');
    localStorage.setItem('choosenGame', gameName);
  }
}
