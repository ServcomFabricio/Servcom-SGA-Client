import { Component, OnInit, AfterViewInit } from '@angular/core';
import { BaseComponet } from 'src/app/utils/base.compent';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SeoService } from 'src/app/services/seo.service';
import { GenericValidator } from 'src/app/utils/generic.form.validator';
import { TipoAtendimento } from '../../models/tipoatendimento';
import { CustomValidators } from 'ng2-validation';
import { TipoAtendimentoService } from '../../services/tipoatendimento.service';

@Component({
  selector: 'app-editar-tipo-atendimento',
  templateUrl: './editar-tipo-atendimento.component.html',
  styleUrls: ['./editar-tipo-atendimento.component.css']
})
export class EditarTipoAtendimentoComponent extends BaseComponet implements OnInit, AfterViewInit {

  public editarTipoAtendimentoForm:FormGroup;
  public tipoAtendimento:TipoAtendimento;
  public tipoAtendimentoId:string="";

  constructor(fb: FormBuilder,
    route: ActivatedRoute,
    router: Router,
    toastr: ToastrService,
    seoService: SeoService,
    private tipoAtendimentoService:TipoAtendimentoService) {
    super(fb, route, router, toastr, seoService, "Editar usuário");

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
    this.tipoAtendimento= new TipoAtendimento()
    this.isDataAvailable= false; 
  }

  ngOnInit() {
    this.editarTipoAtendimentoForm = this.fb.group({
      tipo: ['', [Validators.required, CustomValidators.rangeLength([3, 4])]],
      descricao: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(150)]],
      prioritario:''
    });

    this.sub = this.route.params.subscribe(
      params => {
        this.tipoAtendimentoId = params['id'];
        this.obterTipoAtendimento(this.tipoAtendimentoId);
      }
    );
  }

  
  ngAfterViewInit(): void {
    this.customAfterViewInit(this.editarTipoAtendimentoForm);
  }

  obterTipoAtendimento(id: string) {
    this.tipoAtendimentoService.obterTipoAtendimento(id)
      .subscribe(
        tipoA => {
          this.preencherFormTipoAtendimento(tipoA),
            this.isDataAvailable = true
        }

      );
  }

  preencherFormTipoAtendimento(tipoAtendimento: TipoAtendimento): void {
    this.tipoAtendimento = tipoAtendimento;
    this.editarTipoAtendimentoForm.patchValue({
      tipo: this.tipoAtendimento.tipo,
      descricao: this.tipoAtendimento.descricao,
      prioritario: this.tipoAtendimento.prioritario
    });
  }

  editarTipoAtendimento() {
    if (this.editarTipoAtendimentoForm.dirty && this.editarTipoAtendimentoForm.valid) {
      let edTipoA = Object.assign({}, this.tipoAtendimento, this.editarTipoAtendimentoForm.value);
      this.tipoAtendimentoService.atualizarTipoAtendimento(edTipoA)
        .subscribe(
          result => { this.onSaveComplete('Tipo atendimento atualizado com sucesso','/atendimentos/tipo-atendimento/listar',this.editarTipoAtendimentoForm) },
          error => { this.onError(error) });
    }
  }
}
