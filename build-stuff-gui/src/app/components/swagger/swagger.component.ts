import { Component, OnInit } from '@angular/core';
import { SafeResourceUrl, ɵDomSanitizerImpl } from '@angular/platform-browser';


import { environment} from '../../../environments/environment'
@Component({
  selector: 'app-swagger',
  templateUrl: './swagger.component.html',
  styleUrls: ['./swagger.component.scss']
})
export class SwaggerComponent implements OnInit {
  host// = "http://"+environment.host+":8000/__swagger__/";
  ngOnInit() {}

  constructor(sanitizer: ɵDomSanitizerImpl) {
    this.host = sanitizer.bypassSecurityTrustResourceUrl("http://"+environment.host+":8000/__swagger__/");
  }
  get(){
    return this.host
  }
}
