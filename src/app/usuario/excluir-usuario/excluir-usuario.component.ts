import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import { FormControlName, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ToastrService, Toast } from 'ngx-toastr';

import { Subscription } from 'rxjs';
import { Usuario } from '../models/usuario';
import { UsuarioService } from '../services/usuario.service';
import { BaseComponet } from 'src/app/utils/base.compent';
import { SeoService } from 'src/app/services/seo.service';

@Component({
  selector: 'app-excluir-usuario',
  templateUrl: './excluir-usuario.component.html',
  styleUrls: ['./excluir-usuario.component.css']
})
export class ExcluirUsuarioComponent extends BaseComponet implements OnInit {
  

  public usuarioId: string;
  public usuario: Usuario;
  
  constructor(fb: FormBuilder,
    route: ActivatedRoute,
    router: Router,
    toastr: ToastrService,
    private usuarioService:UsuarioService,
    seoService: SeoService) {
    super(fb, route, router, toastr,seoService,"Excluir Usuário");

   }

  ngOnInit() {
    this.sub = this.route.params.subscribe(
      params => {
        this.usuarioId = params['id'];
      }
    );

    this.usuarioService.obterUsuario(this.usuarioId)
      .subscribe(
        usuario => {
        this.usuario = usuario;
          this.isDataAvailable = true;
        }

      );
  }

  excluirUsuario(){
    this.usuarioService.excluirUsuario(this.usuarioId)
    .subscribe(
      usuario=>{this.onDeleteComplete()},
      error=>{this.onError(error)}
    );
  }

  public onDeleteComplete() {
     this.onSaveComplete('Usuario excluido com Sucesso!','/usuarios/lista-usuarios');
  }
}

