import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { EditorTextoService } from 'src/app/services/editor.service';
import { SeoService } from 'src/app/services/seo.service';
import { ConfiguracaoService } from '../services/configuracao.service';

import { Configuracao } from '../models/configuracao';

import { BaseComponet } from 'src/app/utils/base.compent';
import { GenericValidator } from 'src/app/utils/generic.form.validator';



@Component({
  selector: 'app-configuracao-home',
  templateUrl: './configuracao-home.component.html',
  styleUrls: ['./configuracao-home.component.css']
})
export class ConfiguracaoHomeComponent extends BaseComponet implements OnInit, AfterViewInit {

  public tituloPainelAtendimentoForm: FormGroup;
  public configuracao: Configuracao;
  configuracaoId:string;

  constructor(fb: FormBuilder,
    route: ActivatedRoute,
    router: Router,
    toastr: ToastrService,
    seoService: SeoService,
    private editorTextoService: EditorTextoService,
    private configuracaoGeralService: ConfiguracaoService) {

    super(fb, route, router, toastr, seoService, "Atualizar Configuração");
    editorTextoService.tituloEditor = "Texto Fixo";
    editorTextoService.configEditor.height = 200;
    editorTextoService.configEditor.width = 500;

    this.validationMessagens = {
      tituloPainelAtendimento: {
        required: 'Informe o titulo do painel de atendimento'
      },
      textoFixoPainelAtendimento: {
        required: 'Informe o texto fixo do painel de atendimento'
      },
      entradaVideo:{},
      conteudoConfigurado:{}
    }
    this.genericValidator = new GenericValidator(this.validationMessagens);
    this.configuracao = new Configuracao();
  }

  ngAfterViewInit(): void {
    this.customAfterViewInit(this.tituloPainelAtendimentoForm);
  }

  ngOnInit() {
    this.tituloPainelAtendimentoForm = this.fb.group({
      tituloPainelAtendimento: ['', [Validators.required]],
      textoFixoPainelAtendimento: '',
      entradaVideo:false,
      conteudoConfigurado:false
    });
    this.obterConfiguracao()
  }

  obterConfiguracao() {
    this.configuracaoGeralService.obterConfiguracao()
      .subscribe(
        configuracao => {
          this.preencherFormConfiguracao(configuracao),
            this.isDataAvailable = true
        }

      );
  }

  preencherFormConfiguracao(configuracao) {
    this.configuracao = configuracao|| new Configuracao();
    this.tituloPainelAtendimentoForm.patchValue({
      tituloPainelAtendimento: this.configuracao.tituloPainelAtendimento,
      entradaVideo: this.configuracao.entradaVideo,
      conteudoConfigurado: this.configuracao.conteudoConfigurado
    });
    this.editorTextoService.htmlContentEditor=this.configuracao.textoFixoPainelAtendimento
  }

  atualizaConfiguracaoGeral() {
    if (this.tituloPainelAtendimentoForm.dirty && this.tituloPainelAtendimentoForm.valid) {
      let atualizaConfiguracao = Object.assign({}, this.configuracao, this.tituloPainelAtendimentoForm.value);
      this.configuracaoGeralService.atualizarConfiguracaoGeral(atualizaConfiguracao)
        .subscribe(
          result => { this.onSaveComplete('Configuracao Atualizada','/home',this.tituloPainelAtendimentoForm) },
          error => { this.onError(error) });
    }
  }

}
