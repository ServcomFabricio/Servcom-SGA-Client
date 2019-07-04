import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfiguracaoService } from '../../services/configuracao.service';
import { BaseComponet } from 'src/app/utils/base.compent';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder } from '@angular/forms';
import { SeoService } from 'src/app/services/seo.service';
import { ConteudoConfigurado } from '../../models/conteudoConfigurado';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-detalhe-conteudo',
  templateUrl: './detalhe-conteudo.component.html',
  styleUrls: ['./detalhe-conteudo.component.css']
})
export class DetalheConteudoComponent extends BaseComponet implements OnInit {

  conteudoId:string;
  conteudoConfigurado:ConteudoConfigurado;
  conteudoRender:any;

  constructor(private conteudoConfiguradoService:ConfiguracaoService,
              private sanitizer: DomSanitizer,
              route:ActivatedRoute,
              router:Router,
              fb: FormBuilder,
              toastr: ToastrService,
              seoService: SeoService) {
    super(fb, route, router, toastr, seoService, "Detalhe Conteudo Configurado");
                
  }

  ngOnInit() {

    this.sub = this.route.params.subscribe(
      params => {
        this.conteudoId = params['id'];
      }); 

    this.conteudoConfiguradoService.obterConteudoConfigurado(this.conteudoId)
    .subscribe(
      conteudo =>{
        this.conteudoConfigurado=conteudo;
        this.conteudoRender= this.sanitizer.bypassSecurityTrustHtml(this.conteudoConfigurado.conteudo);
        this.isDataAvailable=true;
      }
    );

   
  }

}
