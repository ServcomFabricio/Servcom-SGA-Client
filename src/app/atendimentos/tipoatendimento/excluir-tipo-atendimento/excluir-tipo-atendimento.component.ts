import { Component, OnInit } from '@angular/core';
import { TipoAtendimentoService } from '../../services/tipoatendimento.service';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SeoService } from 'src/app/services/seo.service';
import { TipoAtendimento } from '../../models/tipoatendimento';
import { BaseComponet } from 'src/app/utils/base.compent';

@Component({
  selector: 'app-excluir-tipo-atendimento',
  templateUrl: './excluir-tipo-atendimento.component.html',
  styleUrls: ['./excluir-tipo-atendimento.component.css']
})
export class ExcluirTipoAtendimentoComponent extends BaseComponet implements OnInit {

  public tipoAtendimento: TipoAtendimento;
  public tipoAtendimentoId: string;

  constructor(fb: FormBuilder,
    route: ActivatedRoute,
    router: Router,
    toastr: ToastrService,
    seoService: SeoService,
    private tipoAtendimentoService: TipoAtendimentoService) {

    super(fb, route, router, toastr, seoService, "Excluir Usuário");
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(
      params => { 
        this.tipoAtendimentoId = params['id']; 
      }
    )

    this.tipoAtendimentoService.obterTipoAtendimento(this.tipoAtendimentoId)
    .subscribe(
      tipoAtendimento=>{
        this.tipoAtendimento=tipoAtendimento;
        this.isDataAvailable=true;
      }
    )
  }

  escxluirTipoAtendimento(){
    this.tipoAtendimentoService.excluirTipoAtendimento(this.tipoAtendimentoId)
    .subscribe(
      result=>{this.onDeleteComplete()},
      error=>{this.onError(error)}
    )
  }
  onDeleteComplete(){
    this.onSaveComplete('Tipo atendimento excluido com sucesso','/atendimentos/tipo-atendimento/listar');
  }
}
