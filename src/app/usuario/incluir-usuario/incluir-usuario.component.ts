import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { GenericValidator } from 'src/app/utils/generic.form.validator';
import { CustomValidators } from 'ng2-validation';

import { Usuario } from '../models/usuario';
import { BaseComponet } from 'src/app/utils/base.compent';
import { UsuarioService } from '../services/usuario.service';
import { SeoService } from 'src/app/services/seo.service';

@Component({
  selector: 'app-incluir-usuario',
  templateUrl: './incluir-usuario.component.html',
  styleUrls: ['./incluir-usuario.component.css']
})
export class IncluirUsuarioComponent extends BaseComponet implements OnInit, AfterViewInit {

  public incluirUsuarioForm: FormGroup;
  public usuario: Usuario;
  public usuarioId: string = "";

  constructor(fb: FormBuilder,
    route: ActivatedRoute,
    router: Router,
    toastr: ToastrService,
    private usuarioService:UsuarioService,
    seoService: SeoService) {
    super(fb, route, router, toastr,seoService,"Incluir Usuário");

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
      },
      senha: {
        required: 'Informe a senha',
        minlength: 'A senha deve possuir no mínimo 4 caracteres'
      },
      senhaConfirmacao: {
        required: 'Informe a senha novamente',
        minlength: 'A senha deve possuir no mínimo 4 caracteres',
        equalTo: 'As senhas não conferem'
      }
    }
    this.genericValidator = new GenericValidator(this.validationMessagens);
  }

  ngOnInit() {
    let senha = new FormControl('', [Validators.required, Validators.minLength(4)]);
    let senhaConfirmacao = new FormControl('', [Validators.required, Validators.minLength(4), CustomValidators.equalTo(senha)]);

    this.incluirUsuarioForm = this.fb.group({
      sigla: ['', [Validators.required, CustomValidators.rangeLength([3, 4])]],
      nome: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(150)]],
      setor: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(150)]],
      senha: senha,
      senhaConfirmacao: senhaConfirmacao
    });
  }

  ngAfterViewInit(): void {
    this.customAfterViewInit(this.incluirUsuarioForm);
  }

  incluirUsuario() {
    if (this.incluirUsuarioForm.dirty && this.incluirUsuarioForm.valid) {
      let user = Object.assign({},this.usuario,this.incluirUsuarioForm.value);
      this.usuarioService.incluirUsuario(user)
      .subscribe(
        result=>{this.onSaveComplete('Registro realizado com sucesso','/usuarios/lista-usuarios',this.incluirUsuarioForm)},
        error=>{this.onError(error);}
      );
      
    }
  }

 

}
