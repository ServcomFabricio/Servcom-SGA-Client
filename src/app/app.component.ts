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
  constructor() {}

 

  ngOnInit(): void {
    
  }
}
