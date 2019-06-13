import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

//components

//services
import { SeoService } from '../services/seo.service';
import { UsuarioService } from './services/usuario.service';
import { UsuarioAuthorize } from './services/usuario.authorize';
import { ErrorInterceptor } from '../services/erro.handker.service';

//router
import { usuariosRouterConfig } from './usuario.routes';

//shared modules
import { SharedModule } from '../shared/shared.module';
import { UsuarioComponent } from './usuario.component';
import { ListaUsuariosComponent } from './lista-usuarios/lista-usuarios.component';
import { EditarUsuarioComponent } from './editar-usuario/editar-usuario.component';
import { DetalheUsuarioComponent } from './detalhe-usuario/detalhe-usuario.component';
import { ExcluirUsuarioComponent } from './excluir-usuario/excluir-usuario.component';
import { IncluirUsuarioComponent } from './incluir-usuario/incluir-usuario.component';

@NgModule(
    {
        imports: [
            SharedModule,
            CommonModule,
            FormsModule,
            ReactiveFormsModule,
            HttpClientModule,
            RouterModule.forChild(usuariosRouterConfig)
        ],
        declarations: [
           UsuarioComponent,
           ListaUsuariosComponent,
           EditarUsuarioComponent,
           DetalheUsuarioComponent,
           ExcluirUsuarioComponent,
           IncluirUsuarioComponent,
           EditarUsuarioComponent
        ],
        providers: [
            Title,
            SeoService,
            UsuarioService,
            UsuarioAuthorize,
            {
                provide: HTTP_INTERCEPTORS,
                useClass: ErrorInterceptor,
                multi: true
              }
            
        ],
        exports:[
            RouterModule
        ]
    }
)
export class UsuarioModule { }