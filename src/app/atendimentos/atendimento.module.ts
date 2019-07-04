import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {WebcamModule} from 'ngx-webcam';

//services
import { SeoService } from '../services/seo.service';
import { ErrorInterceptor } from '../services/erro.handker.service';
import { ConfiguracaoService } from '../configuracoes/services/configuracao.service';
import { SignalRService } from './services/signalR.service';
import { UsuarioAuthorize } from '../usuario/services/usuario.authorize';

//shared modules
import { SharedModule } from '../shared/shared.module';

//3s module
import { CarouselModule } from 'ngx-bootstrap/carousel';

// routes
import { atendimentosRouterConfig } from './atendimento.routes';

//component
import { ListaTipoAtendimentoComponent } from './tipoatendimento/lista-tipo-atendimento/lista-tipo-atendimento.component';
import { AtendimentoComponent } from './atendimento.component';
import { IncluirTipoAtendimentoComponent } from './tipoatendimento/incluir-tipo-atendimento/incluir-tipo-atendimento.component';
import { EditarTipoAtendimentoComponent } from './tipoatendimento/editar-tipo-atendimento/editar-tipo-atendimento.component';
import { ExcluirTipoAtendimentoComponent } from './tipoatendimento/excluir-tipo-atendimento/excluir-tipo-atendimento.component';
import { PainelAtendimentoComponent } from './painel-atendimento/painel-atendimento.component';
import { EntradaVideoComponent } from './entrada-video/entrada-video.component';
import { SafeHtmlPipe } from '../pipes/safe-html.pipe';



@NgModule({
    imports: [
        SharedModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        CarouselModule,
        WebcamModule,
        RouterModule.forChild(atendimentosRouterConfig),
    ],
    declarations: [
        AtendimentoComponent,
        ListaTipoAtendimentoComponent,
        IncluirTipoAtendimentoComponent,
        EditarTipoAtendimentoComponent,
        ExcluirTipoAtendimentoComponent,
        PainelAtendimentoComponent,
        EntradaVideoComponent,
        SafeHtmlPipe
    ],
    providers: [
        Title,
        SeoService,
        UsuarioAuthorize,
        ConfiguracaoService,
        SignalRService,
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
export class AtendimentoModule { }