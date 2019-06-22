import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

import { Subject, Observable, interval, timer } from 'rxjs';

import {WebcamImage, WebcamInitError, WebcamUtil} from 'ngx-webcam';
import { SignalRService } from '../services/signalR.service';

import { DataSharingService } from 'src/app/services/service.base';





@Component({
  selector: 'app-painel-atendimento',
  templateUrl: './painel-atendimento.component.html',
  styleUrls: ['./painel-atendimento.component.css']
})



export class PainelAtendimentoComponent implements OnInit,OnDestroy {
  time = new Date();
  elem;
  constructor(public signalRService: SignalRService,
              private dataSharingService: DataSharingService,
              @Inject(DOCUMENT) private document: any) {
    this.dataSharingService.menuSuperiorAtivo.next(false);  
    this.elem = document.documentElement;
   }

  ngOnInit() {
    this.signalRService.startConnection();
    this.signalRService.addTransferChartDataListener();   
    this.openFullScreen();

    setInterval(() => {
      this.time = new Date();
   }, 1000);

  }


  ngOnDestroy(){
    this.dataSharingService.menuSuperiorAtivo.next(true); 
    this.closeFullScreen(); 
  }

 
  openFullScreen(){
    if (this.elem.requestFullscreen) {
      this.elem.webkitRequestFullscreen();
    } else if (this.elem.mozRequestFullScreen) {
      /* Firefox */
      this.elem.mozRequestFullScreen();
    } else if (this.elem.webkitRequestFullscreen) {
      /* Chrome, Safari and Opera */
      this.elem.webkitRequestFullscreen();
    } else if (this.elem.msRequestFullscreen) {
      /* IE/Edge */
      this.elem.msRequestFullscreen();
    }
   }
  
   closeFullScreen() {
    if (this.document.exitFullscreen) {
      this.document.exitFullscreen();
    } else if (this.document.mozCancelFullScreen) {
      /* Firefox */
      this.document.mozCancelFullScreen();
    } else if (this.document.webkitExitFullscreen) {
      /* Chrome, Safari and Opera */
      this.document.webkitExitFullscreen();
    } else if (this.document.msExitFullscreen) {
      /* IE/Edge */
      this.document.msExitFullscreen();
    }
  }

}
