import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import { RouterModule } from '@angular/router';

import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { MenuSuperiorComponent } from './menu-superior/menu-superior.component';
import { MenuLoginComponent } from './menu-login/menu-login.component';
import { MainPrincipalComponent } from './main-principal/main-principal.component';
import { AcessoNegadoComponent } from './acesso-negado/acesso-negado.component';
import { NaoEncontradoComponent } from './nao-encontrado/nao-encontrado.component';
import { FooterComponent } from './footer/footer.component';


@NgModule({
    imports:[
        CommonModule,
        CollapseModule,
        RouterModule,
        BsDropdownModule
    ],
    declarations:[
        MenuSuperiorComponent,
        MenuLoginComponent,
        MainPrincipalComponent,
        AcessoNegadoComponent,
        NaoEncontradoComponent,
        FooterComponent
    ],
    exports:[
        MenuSuperiorComponent,
        MenuLoginComponent,
        MainPrincipalComponent,
        AcessoNegadoComponent,
        NaoEncontradoComponent,
        FooterComponent
    ]
}) 
export class SharedModule {}