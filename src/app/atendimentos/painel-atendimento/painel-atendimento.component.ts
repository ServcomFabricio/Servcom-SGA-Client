import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

import { Subject, Observable } from 'rxjs';

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
  public showWebcam = true;
  public allowCameraSwitch = true;
  public multipleWebcamsAvailable = false;
  public deviceId: string;
  public webcamImage: WebcamImage = null;
  private trigger: Subject<void> = new Subject<void>();

  public videoOptions: MediaTrackConstraints = {
     
    // width: {ideal: 1024},
    // height: {ideal: 576}
   
  };
  public errorsWebcam: WebcamInitError[] = [];
  private nextWebcam: Subject<boolean|string> = new Subject<boolean|string>();
  

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

    WebcamUtil.getAvailableVideoInputs()
    .then((mediaDevices: MediaDeviceInfo[]) => {
      this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
    });

    setInterval(() => {
      this.time = new Date();
   }, 1000);
  }

  ngOnDestroy(){
    this.dataSharingService.menuSuperiorAtivo.next(true); 
    this.closeFullScreen(); 
  }

  public showNextWebcam(directionOrDeviceId: boolean|string): void {
    // true => move forward through devices
    // false => move backwards through devices
    // string => move to device with given deviceId
    this.nextWebcam.next(directionOrDeviceId);
  }
  
  
  public handleInitError(error: WebcamInitError): void {
    if (error.mediaStreamError && error.mediaStreamError.name === "NotAllowedError") {
      console.warn("O acesso da câmera não foi permitido pelo usuário!");
    }
    this.errorsWebcam.push(error);
  }

  public handleImage(webcamImage: WebcamImage): void {
    console.log('received webcam image', webcamImage);
    this.webcamImage = webcamImage;
  }

  public cameraWasSwitched(deviceId: string): void {
    console.log('active device: ' + deviceId);
    this.deviceId = deviceId;
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  public get nextWebcamObservable(): Observable<boolean|string> {
    return this.nextWebcam.asObservable();
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
