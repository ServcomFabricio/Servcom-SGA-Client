import { Component, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public isCollapsed:boolean= true;

  title = 'ServcomSGA';

  elem;
  constructor(@Inject(DOCUMENT) private document: any) {

    this.elem = document.documentElement;


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

  ngOnInit(): void {
    
  }
}
