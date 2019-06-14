import { Component, OnInit } from '@angular/core';

import { SeoService, SeoModel } from 'src/app/services/seo.service';
import { TipoAtendimentoService } from '../../services/tipoatendimento.service';

import { TipoAtendimento } from '../../models/tipoatendimento';




@Component({
  selector: 'app-lista-tipo-atendimento',
  templateUrl: './lista-tipo-atendimento.component.html',
  styleUrls: ['./lista-tipo-atendimento.component.css']
})
export class ListaTipoAtendimentoComponent implements OnInit {

  public tiposAtendimento: TipoAtendimento[];
  erroMessage: string;

  constructor(seoService: SeoService,
    private tipoAtendimentoService: TipoAtendimentoService) {
    let seoModel: SeoModel = <SeoModel>{
      title: "lista Tipos Atendimentos "
    }
    seoService.setSeoData(seoModel);

  }

  ngOnInit() {
  this.tipoAtendimentoService.obterTipos()
  .subscribe(
    tipoAtendimentos=> this.tiposAtendimento=tipoAtendimentos,
    error=>this.erroMessage=error
  );
  }


}
