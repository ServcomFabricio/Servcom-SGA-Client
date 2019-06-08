import { Component, OnInit } from '@angular/core';
import { Usuario } from '../models/usuario';
import { UsuarioService } from '../services/usuario.service';
import { SeoService, SeoModel } from 'src/app/services/seo.service';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})
export class ListaUsuariosComponent implements OnInit {
  public usuarios: Usuario[];
  erroMessage: string;

  constructor(public usuarioService: UsuarioService,
    seoService: SeoService) {
    let seoModel: SeoModel = <SeoModel>{
      title: "lista usuário"
    }
    seoService.setSeoData(seoModel);
  }

  ngOnInit() {
    this.usuarioService.obterUsuarios()
      .subscribe(
        usuarios => this.usuarios = usuarios,
        error => this.erroMessage = error
      );
  }

}
