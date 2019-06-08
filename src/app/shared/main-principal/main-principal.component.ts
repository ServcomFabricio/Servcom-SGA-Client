import { Component, OnInit } from '@angular/core';
import { SeoService, SeoModel } from 'src/app/services/seo.service';



@Component({
  selector: 'app-main-principal',
  templateUrl: './main-principal.component.html',
  styleUrls: ['./main-principal.component.css']
})
export class MainPrincipalComponent implements OnInit {

  constructor(seoService: SeoService) {
    let seoModel: SeoModel = <SeoModel>{
      title: 'Seja Bem vindo'

    };
    seoService.setSeoData(seoModel);
  }

  ngOnInit() {
  }

}
