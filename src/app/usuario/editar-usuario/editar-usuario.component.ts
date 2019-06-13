import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { CustomValidators } from 'ng2-validation';

import { Usuario } from '../models/usuario';
import { BaseComponet } from 'src/app/utils/base.compent';
import { SeoService } from 'src/app/services/seo.service';
import { GenericValidator } from 'src/app/utils/generic.form.validator';
import { UsuarioService } from '../services/usuario.service';
import { DataSharingService } from 'src/app/services/service.base';


@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})
export class EditarUsuarioComponent extends BaseComponet implements OnInit,AfterViewInit {
  

  public editarUsuarioForm: FormGroup;
  public usuario: Usuario;
  public usuarioId: string = "";
  public user;

  constructor(fb:FormBuilder,
    route: ActivatedRoute,
     router: Router,
     toastr: ToastrService,
     seoService: SeoService,
     private usuarioService:UsuarioService,
     private dataSharingService: DataSharingService) {
       super(fb,route,router,toastr,seoService,"Editar usuário");

       this.validationMessagens = {
        sigla: {
          required: 'Informe a sigla',
          rangeLength: 'A silga deve possuir 3 caracteres'
        },
        nome: {
          required: 'O nome é requerido.',
          minlength: 'O nome precisa ter no mínimo 2 caracteres',
          maxlength: 'O nome precisa ter no máximo 150 caracteres'
        },
        setor: {
          required: 'O setor é requerido.',
          minlength: 'O setor precisa ter no mínimo 2 caracteres',
          maxlength: 'O setor precisa ter no máximo 150 caracteres'
        }
      }
      this.genericValidator = new GenericValidator(this.validationMessagens);
      this.usuario= new Usuario();
      this.isDataAvailable= false;
    }

  ngOnInit() {
    this.editarUsuarioForm= this.fb.group({
      sigla: ['', [Validators.required, CustomValidators.rangeLength([3, 4])]],
      nome: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(150)]],
      setor: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(150)]],
   
    });

    this.sub = this.route.params.subscribe(
      params => {
        this.usuarioId = params['id'];
        this.obterUsuario(this.usuarioId);
      }
    );

  }

  ngAfterViewInit(): void {
    this.customAfterViewInit(this.editarUsuarioForm);
  }

  obterUsuario(id: string) {
    this.usuarioService.obterUsuario(id)
      .subscribe(
        usuario => {
          this.preencherFormUsuario(usuario),
            this.isDataAvailable = true
        }

      );
  }

  preencherFormUsuario(usuario: Usuario): void {
    this.usuario = usuario;
    this.editarUsuarioForm.patchValue({
      sigla: this.usuario.sigla,
      nome: this.usuario.nome,
      setor: this.usuario.setor
    });

  }

  editarUsuario() {
    if (this.editarUsuarioForm.dirty && this.editarUsuarioForm.valid) {
      this.user = JSON.parse(this.usuarioService.getUser());
      let edUser = Object.assign({}, this.usuario, this.editarUsuarioForm.value);
      if (this.user.id == this.usuario.id) {
        this.dataSharingService.usuarioNome.next(edUser.nome);
      }
      this.usuarioService.atualizarUsuario(edUser)
        .subscribe(
          result => { this.onSaveComplete('Usuário atualizado com sucesso','/usuarios/lista-usuarios',this.editarUsuarioForm) },
          error => { this.onError(error) });

    }
  }

}
