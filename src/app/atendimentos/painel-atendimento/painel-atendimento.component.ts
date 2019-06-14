import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { SignalRService } from '../services/signalR.service';
import { DataSharingService } from 'src/app/services/service.base';
import { DOCUMENT } from '@angular/platform-browser';


@Component({
  selector: 'app-painel-atendimento',
  templateUrl: './painel-atendimento.component.html',
  styleUrls: ['./painel-atendimento.component.css']
})

export class PainelAtendimentoComponent implements OnInit,OnDestroy {
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
  }
  ngOnDestroy(){
    this.dataSharingService.menuSuperiorAtivo.next(true);  
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
