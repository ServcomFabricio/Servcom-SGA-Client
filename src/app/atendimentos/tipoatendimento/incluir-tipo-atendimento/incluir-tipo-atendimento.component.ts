import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { TipoAtendimentoService } from '../../services/tipoatendimento.service';
import { SeoService } from 'src/app/services/seo.service';
import { TipoAtendimento } from '../../models/tipoatendimento';
import { BaseComponet } from 'src/app/utils/base.compent';
import { GenericValidator } from 'src/app/utils/generic.form.validator';
import { CustomValidators } from 'ng2-validation';


@Component({
  selector: 'app-incluir-tipo-atendimento',
  templateUrl: './incluir-tipo-atendimento.component.html',
  styleUrls: ['./incluir-tipo-atendimento.component.css']
})
export class IncluirTipoAtendimentoComponent extends BaseComponet implements OnInit, AfterViewInit {

  public incluirTipoAtendimentoForm: FormGroup;
  public tipoAtendimento:TipoAtendimento;

  constructor(fb: FormBuilder,
    route: ActivatedRoute,
    router: Router,
    toastr: ToastrService,
    private tipoAtendimentoService:TipoAtendimentoService,
    seoService: SeoService) {
    super(fb, route, router, toastr,seoService,"Incluir Tipo Atendimento");
    this.validationMessagens = {
      tipo: {
        required: 'Informe o tipo de Atendimento',
        rangeLength: 'O tipo deve possuir 3 caracteres'
      },
      descricao: {
        required: 'A descrição é requerida',
        minlength: 'A descrição precisa ter no mínimo 2 caracteres',
        maxlength: 'A descrição precisa ter no máximo 150 caracteres'
      }
    }
    this.genericValidator = new GenericValidator(this.validationMessagens);  
  }


  ngOnInit() {
    this.incluirTipoAtendimentoForm = this.fb.group({
      tipo: ['', [Validators.required, CustomValidators.rangeLength([3, 4])]],
      descricao: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(150)]],
      prioritario:''
    });
  }

  ngAfterViewInit(): void {
    this.customAfterViewInit(this.incluirTipoAtendimentoForm);
  }

  incluirTipoAtendimento() {
    if (this.incluirTipoAtendimentoForm.dirty && this.incluirTipoAtendimentoForm.valid) {
      let tipoA = Object.assign({},this.tipoAtendimento,this.incluirTipoAtendimentoForm.value);
      this.tipoAtendimentoService.incluirTipoAtendimento(tipoA)
      .subscribe(
        result=>{this.onSaveComplete('Registro realizado com sucesso','/atendimentos/tipo-atendimento/listar',this.incluirTipoAtendimentoForm)},
        error=>{this.onError(error);}
      );
      
    }
  }


}
