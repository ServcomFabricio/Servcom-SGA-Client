import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


import { Subscription } from 'rxjs';

import { Usuario } from '../models/usuario';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-detalhe-usuario',
  templateUrl: './detalhe-usuario.component.html',
  styleUrls: ['./detalhe-usuario.component.css']
})
export class DetalheUsuarioComponent implements OnInit {

  public sub:Subscription;
  public usuarioId: string;
  public usuario: Usuario;
  isDataAvailable: boolean = false;

  constructor(private usuarioService:UsuarioService,
              private routeAc:ActivatedRoute,
              private router:Router) { }

  ngOnInit():void {
    this.sub = this.routeAc.params.subscribe(
      params => {
        this.usuarioId = params['id'];
      }); 

    this.usuarioService.obterUsuario(this.usuarioId)
    .subscribe(
      usuario =>{
        this.usuario=usuario;
        this.isDataAvailable=true;
      }
    );

    let usu=this.usuario;
  }

}
