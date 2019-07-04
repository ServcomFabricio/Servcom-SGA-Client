import { Component, OnInit } from '@angular/core';
import { BaseComponet } from 'src/app/utils/base.compent';
import { ConteudoConfigurado } from '../../models/conteudoConfigurado';
import { ConfiguracaoService } from '../../services/configuracao.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SeoService } from 'src/app/services/seo.service';

@Component({
  selector: 'app-excluir-conteudo',
  templateUrl: './excluir-conteudo.component.html',
  styleUrls: ['./excluir-conteudo.component.css']
})
export class ExcluirConteudoComponent extends BaseComponet implements OnInit {


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
    super(fb, route, router, toastr, seoService, "Excluir Conteudo Configurado");
                
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

  excluirConteudo(){
    this.conteudoConfiguradoService.excluirConteudoConfigurado(this.conteudoId)
    .subscribe(
      conteudo=>{this.onDeleteComplete()},
      error=>{this.onError(error)}
    );
  }

  public onDeleteComplete() {
     this.onSaveComplete('Conteúdo excluido com Sucesso!','/configuracoes/conteudo/listar');
  }
}
