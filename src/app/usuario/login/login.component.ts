import { Component, OnInit, ViewChildren, ElementRef, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControlName } from '@angular/forms';
import { Router } from '@angular/router';

import { Observable, fromEvent, merge } from 'rxjs';

import { CustomValidators } from 'ng2-validation';
import { ToastrService } from 'ngx-toastr';
import { GenericValidator } from 'src/app/utils/generic.form.validator';


import { Usuario } from 'src/app/usuario/models/usuario';
import { SeoService, SeoModel } from 'src/app/services/seo.service';
import { UsuarioService } from '../services/usuario.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit {


  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  loginForm: FormGroup;
  usuario: Usuario;

  validationMessagens: { [key: string]: { [key: string]: string } };
  displayMessage: { [key: string]: string } = {}
  genericValidator: GenericValidator;
  public errors: any[] = [];

  constructor(private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private usuarioService:UsuarioService,
    seoService:SeoService) {
    let seoModel:SeoModel=<SeoModel>{
      title:"Realize seu login"
    }
    seoService.setSeoData(seoModel);

    console.log(this.errors);
    this.validationMessagens = {
      sigla: {
        required: 'Informe a sigla',
        rangeLength: 'A silga deve possuir 3 caracteres'
      },
      senha: {
        required: 'Informe a senha',
        minlength: 'A senha deve possuir no mínimo 4 caracteres'
      }
    }
    this.genericValidator = new GenericValidator(this.validationMessagens);
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      sigla: ['', [Validators.required, CustomValidators.rangeLength([3,3])]],
      senha: ['', [Validators.required, Validators.minLength(4)]]
    });
    this.loginForm.enable();
  }

  ngAfterViewInit() {
    let controlBlurs: Observable<any>[] = this.formInputElements.map(
      (formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    merge(...controlBlurs).subscribe(value => {
      this.displayMessage = this.genericValidator.processMessages(this.loginForm);
    });
  }

  realizarLogin() {

    if (this.loginForm.dirty && this.loginForm.valid) {

      let user = Object.assign({}, this.usuario, this.loginForm.value);

      this.usuarioService.loginUsuario(user)
        .subscribe(
          result => { this.onSaveComplete(result) },
          fail => { this.onError(fail) }
        );
    }
  }

  onSaveComplete(response: any) {
    this.loginForm.reset();
    this.loginForm.disable();
    this.errors = [];

    this.usuarioService.setLocalStorage(response.access_token, JSON.stringify(response.user))
    
    const toastrMessage = this.toastr.success('Login realizado com sucesso', 'Bem Vindo!');
    if (toastrMessage){
      toastrMessage.onHidden.subscribe(()=>{
        this.router.navigate(['/home']);
      });
    }
  }

  onError(fail: any) {
    this.errors = fail.error.errors;
    this.toastr.error('ocorreu um erro', 'Ops!');
  } 

}
