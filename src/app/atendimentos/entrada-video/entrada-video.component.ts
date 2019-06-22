import { Component, OnInit } from '@angular/core';
import { WebcamImage, WebcamInitError,WebcamUtil } from 'ngx-webcam';
import { Subject, Observable } from 'rxjs';

@Component({
  selector: 'app-entrada-video',
  templateUrl: './entrada-video.component.html',
  styleUrls: ['./entrada-video.component.css']
})
export class EntradaVideoComponent implements OnInit {

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
  
  constructor() { }

  ngOnInit() {
    WebcamUtil.getAvailableVideoInputs()
    .then((mediaDevices: MediaDeviceInfo[]) => {
      this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
    });
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
  

}
