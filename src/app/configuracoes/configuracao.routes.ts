import { Routes } from "@angular/router";
import { ConfiguracaoComponent } from './configuracao.component';
import { UsuarioAuthorize } from '../usuario/services/usuario.authorize';
import { ConfiguracaoHomeComponent } from './configuracao-home/configuracao-home.component';


export const configuracoesRouterConfig: Routes = [
    {
        path: '', component: ConfiguracaoComponent,
        children: [
            { path: '', component: ConfiguracaoComponent },
            { path: 'configuracao-geral', canActivate: [UsuarioAuthorize], component: ConfiguracaoHomeComponent, data: [{ claim: { nome: 'Atendimentos', valor: 'Gravar' } }] },
        ]
    }

]