import { Component, OnInit } from '@angular/core';
import { SeoService, SeoModel } from '../services/seo.service';
import { UsuarioService } from '../usuario/services/usuario.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private token: string;

  constructor( seoService:SeoService,private usuarioService:UsuarioService) 
  {
    let seoModel:SeoModel =<SeoModel>{
      title:"Seja Bem vindo"
    }
    seoService.setSeoData(seoModel);
   }

   usuarioLogado() {
    this.token = this.usuarioService.getUserToken();

    if (!this.token) {
      return false;
    }
    return true;
  }

  ngOnInit() {
  }

}
