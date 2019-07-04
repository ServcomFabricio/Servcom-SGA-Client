import { Component, OnInit } from '@angular/core';

import { ConteudoConfigurado } from '../../models/conteudoConfigurado';
import { SeoService, SeoModel } from 'src/app/services/seo.service';
import { ConfiguracaoService } from '../../services/configuracao.service';

@Component({
  selector: 'app-lista-conteudo',
  templateUrl: './lista-conteudo.component.html',
  styleUrls: ['./lista-conteudo.component.css']
})
export class ListaConteudoComponent implements OnInit {

  public conteudosConfigurado: ConteudoConfigurado[];
  erroMessage: string;

  constructor(seoService: SeoService,
              private configuracaoService: ConfiguracaoService) {
    let seoModel: SeoModel = <SeoModel> {
      title: "lista Conteúdo Configurado "
    }
    seoService.setSeoData(seoModel);
  }

  ngOnInit() {
    this.configuracaoService.obterConteudoConfiguradoLista()
      .subscribe(
        conteudoConfigurado => this.conteudosConfigurado = conteudoConfigurado,
        error => this.erroMessage = error
      );

  }


}
