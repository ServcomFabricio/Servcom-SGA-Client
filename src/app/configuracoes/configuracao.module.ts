import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { CKEditorModule } from 'ngx-ckeditor';

import { configuracoesRouterConfig } from './configuracao.routes';

import { SharedModule } from '../shared/shared.module';

import { SeoService } from '../services/seo.service';
import { UsuarioAuthorize } from '../usuario/services/usuario.authorize';
import { ErrorInterceptor } from '../services/erro.handker.service';
import { ConfiguracaoService } from './services/configuracao.service';

import { ConfiguracaoComponent } from './configuracao.component';
import { ConfiguracaoHomeComponent } from './configuracao-home/configuracao-home.component';
import { ListaConteudoComponent } from './conteudoPainelAtendimento/lista-conteudo/lista-conteudo.component';
import { IncluirConteudoComponent } from './conteudoPainelAtendimento/incluir-conteudo/incluir-conteudo.component';
import { EditarConteudoComponent } from './conteudoPainelAtendimento/editar-conteudo/editar-conteudo.component';
import { DetalheConteudoComponent } from './conteudoPainelAtendimento/detalhe-conteudo/detalhe-conteudo.component';
import { ExcluirConteudoComponent } from './conteudoPainelAtendimento/excluir-conteudo/excluir-conteudo.component';



@NgModule({
    imports: [
        SharedModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        CKEditorModule,
        RouterModule.forChild(configuracoesRouterConfig),
    ],
    declarations: [
        ConfiguracaoComponent,
        ConfiguracaoHomeComponent,
        ListaConteudoComponent,
        IncluirConteudoComponent,
        EditarConteudoComponent,
        DetalheConteudoComponent,
        ExcluirConteudoComponent
    ],
    providers: [
        Title,
        SeoService,
        UsuarioAuthorize,
        ConfiguracaoService,
          {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorInterceptor,
            multi: true
          }
    ],
    exports: [
        RouterModule
    ]

})
export class ConfiguracaoModule { }
