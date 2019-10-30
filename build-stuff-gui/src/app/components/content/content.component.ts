import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { faCar, faCheckCircle, faFastBackward, faFastForward, faListAlt, faPlay, faPollH, faQuestionCircle, faRoad, faTachometerAlt, faTimesCircle, faTools } from '@fortawesome/free-solid-svg-icons';
import { GameService } from './../../services/game.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
  carDiagnosticsForm: FormGroup;
  roadDiagnosticsForm: FormGroup;
  speed: number;

  token: string;
  driveName: string;

  faTimesCircle = faTimesCircle;
  faCheckCircle = faCheckCircle;
  faQuestionCircle = faQuestionCircle;
  faTools = faTools;
  faListAlt = faListAlt;
  faFastForward = faFastForward;
  faPlay = faPlay;
  faFastBackward = faFastBackward;
  faCar = faCar;
  faRoad = faRoad;
  faPollH = faPollH;
  faTachometerAlt = faTachometerAlt;

  testDriveDone: boolean;

  diagnosticProblemDescription: string;

  diagnosticInProgress: boolean;

  testDriveResult: string;

  constructor(private formBuilder: FormBuilder, private gameService: GameService) {
    this.carDiagnosticsForm = this.formBuilder.group({
      turbo_charger: '',
      tires: '',
      battery: '',
      fuel: ''
    });
    this.roadDiagnosticsForm = this.formBuilder.group({
      barrier: '',
      pithole: ''
    });
  }

  ngOnInit() {
    this.gameService.postStartGame().subscribe(token => {
      localStorage.setItem('token', token['token']);
      this.token = localStorage.getItem('token');
    });
    this.driveName = localStorage.getItem('driveName');
  }

  public closeModal() {
    const modalBack = document.querySelector('.modal-backdrop');
    const modal = document.querySelector('.modal.show');
    modalBack.classList.remove('show', 'd-block');
    modalBack.classList.add('d-none');
    modal.classList.remove('show', 'd-block');
    modal.classList.add('d-none');
  }

  private openModal() {
    const modalBack = document.querySelector('.modal-backdrop');
    const modal = document.querySelector('#diagnostic-problem-description');
    modalBack.classList.add('show', 'd-block');
    modalBack.classList.remove('d-none');
    modal.classList.add('show', 'd-block');
    modal.classList.remove('d-none');
  }

  public diagnoseCar(parameter: string) {
    document.querySelector(`#diagnose-${parameter}`).classList.add('clicked');
    this.diagnosticInProgress = true;
    setTimeout(() => {
      this.gameService
        .getDiagnostics(this.token)
        .subscribe(carDiagnostics => {
          switch (parameter) {
            case 'turbo_charger':
              this.diagnosticProblemDescription = carDiagnostics[0].turbo_charger === 1 ? '' : 'Turbo chager should be changed. Otherwise car speed during race will be lower';
              if (carDiagnostics[0].turbo_charger === 0) {
                this.openModal();
              }
              this.carDiagnosticsForm.controls.turbo_charger.setValue(carDiagnostics[0].turbo_charger);
              break;
            case 'tires':
              this.diagnosticProblemDescription = carDiagnostics[0].tires === 1 ? '' : 'Tires should be inflated. Otherwise car speed during race will be lower';
              if (carDiagnostics[0].tires === 0) {
                this.openModal();
              }
              this.carDiagnosticsForm.controls.tires.setValue(carDiagnostics[0].tires);
              break;
            case 'battery':
              this.diagnosticProblemDescription = carDiagnostics[0].battery === 1 ? '' : 'Battery should be charged. Otherwise car speed during race will be lower';
              if (carDiagnostics[0].battery === 0) {
                this.openModal();
              }
              this.carDiagnosticsForm.controls.battery.setValue(carDiagnostics[0].battery);
              break;
            case 'fuel':
              this.diagnosticProblemDescription = carDiagnostics[0].fuel === 1 ? '' : 'Fuel should be reffiled. Otherwise car speed during race will be lower';
              if (carDiagnostics[0].fuel === 0) {
                this.openModal();
              }
              this.carDiagnosticsForm.controls.fuel.setValue(carDiagnostics[0].fuel);
              break;
            default:
              break;
          }
        })
        .add(() => {
          this.diagnosticInProgress = undefined;
        });
    }, 500);
  }

  public diagnoseRoad(parameter: string) {
    document.querySelector(`#diagnose-${parameter}`).classList.add('clicked');
    this.diagnosticInProgress = true;
    setTimeout(() => {
      this.gameService
        .getDiagnostics(this.token)
        .subscribe(roadDiagnostics => {
          switch (parameter) {
            case 'barrier':
              this.diagnosticProblemDescription = roadDiagnostics[0].barrier === 0 ? '' : 'Barrier should be removed. Otherwise car could hit it and car speed during race will be lower';
              if (roadDiagnostics[0].barrier === 1) {
                this.openModal();
              }
              this.roadDiagnosticsForm.controls.barrier.setValue(roadDiagnostics[0].barrier);
              break;
            case 'pithole':
              this.diagnosticProblemDescription = roadDiagnostics[0].pithole === 0 ? '' : 'Pithole should be repaired. Otherwise car could dropped in it and car speed during race will be lower';
              if (roadDiagnostics[0].pithole === 1) {
                this.openModal();
              }
              this.roadDiagnosticsForm.controls.pithole.setValue(roadDiagnostics[0].pithole);
              break;
            default:
              break;
          }
        })
        .add(() => {
          this.diagnosticInProgress = undefined;
        });
    }, 500);
  }

  public fixCarDiagnostic(problemName: string) {
    document.querySelector(`#fix-${problemName}`).classList.add('clicked');
    setTimeout(() => {
      this.gameService.fixCarDiagnostic(this.token, problemName).subscribe(carDiagnostics => {
        switch (problemName) {
          case 'turbo_charger':
            this.carDiagnosticsForm.controls.turbo_charger.setValue(1);
            break;
          case 'tires':
            this.carDiagnosticsForm.controls.tires.setValue(1);
            break;
          case 'battery':
            this.carDiagnosticsForm.controls.battery.setValue(1);
            break;
          case 'fuel':
            this.carDiagnosticsForm.controls.fuel.setValue(1);
            break;
          default:
            break;
        }
      });
    }, 1000);
  }

  public fixRoadDiagnostic(problemName: string) {
    document.querySelector(`#fix-${problemName}`).classList.add('clicked');
    setTimeout(() => {
      this.gameService.fixRoadDiagnostic(this.token, problemName).subscribe(roadDiagnostics => {
        switch (problemName) {
          case 'barrier':
            this.roadDiagnosticsForm.controls.barrier.setValue(0);
            break;
          case 'pithole':
            this.roadDiagnosticsForm.controls.pithole.setValue(0);
            break;
          default:
            break;
        }
      });
    }, 1000);
  }

  public startOver() {
    document.querySelector('#again-button div').classList.remove('d-none');
    window.history.back();
  }

  public startDrive() {
    document.querySelector('#start-button div').classList.remove('d-none');
    localStorage.setItem('timerStart', 'false');
    setTimeout(() => {
      this.gameService.postStartDrive(this.token).subscribe(result => {
        this.speed = result['max_speed'];
        const modalBack = document.querySelector('.modal-backdrop');
        const modal = document.querySelector('#start-drive-description');
        modalBack.classList.add('show', 'd-block');
        modalBack.classList.remove('d-none');
        modal.classList.add('show', 'd-block');
        modal.classList.remove('d-none');
        document.querySelector('#start-button div').classList.add('d-none');
      });
    }, 1000);
  }

  public testDrive() {
    document.querySelector('#test-button div').classList.remove('d-none');
    setTimeout(() => {
      this.gameService.getTestDrive(this.token).subscribe(testResult => {
        this.testDriveDone = true;
        this.testDriveResult = testResult;
        document.querySelector('#test-button div').classList.add('d-none');
      });
    }, 1000);
  }
}
