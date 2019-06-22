import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { Title } from '@angular/platform-browser';

import {NgxEditorModule } from 'ngx-editor';
import { CKEditorModule } from 'ngx-ckeditor';

import { configuracoesRouterConfig } from './configuracao.routes';

import { SharedModule } from '../shared/shared.module';

import { SeoService } from '../services/seo.service';
import { UsuarioAuthorize } from '../usuario/services/usuario.authorize';
import { ErrorInterceptor } from '../services/erro.handker.service';

import { ConfiguracaoComponent } from './configuracao.component';
import { ConfiguracaoHomeComponent } from './configuracao-home/configuracao-home.component';



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
        ConfiguracaoHomeComponent
    ],
    providers: [
        Title,
        SeoService,
        UsuarioAuthorize,
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
