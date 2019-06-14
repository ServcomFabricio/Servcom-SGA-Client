import { Routes } from '@angular/router';

import { AtendimentoComponent } from './atendimento.component';
import { ListaTipoAtendimentoComponent } from './tipoatendimento/lista-tipo-atendimento/lista-tipo-atendimento.component';
import { IncluirTipoAtendimentoComponent } from './tipoatendimento/incluir-tipo-atendimento/incluir-tipo-atendimento.component';
import { UsuarioAuthorize } from '../usuario/services/usuario.authorize';
import { EditarTipoAtendimentoComponent } from './tipoatendimento/editar-tipo-atendimento/editar-tipo-atendimento.component';
import { ExcluirTipoAtendimentoComponent } from './tipoatendimento/excluir-tipo-atendimento/excluir-tipo-atendimento.component';
import { PainelAtendimentoComponent } from './painel-atendimento/painel-atendimento.component';






export const atendimentosRouterConfig:Routes=[
    {
        path:'',component:AtendimentoComponent,
        children:[
            { path: '', component: AtendimentoComponent },
            { path: 'tipo-atendimento/listar', canActivate: [UsuarioAuthorize], component: ListaTipoAtendimentoComponent, data: [{ claim: { nome: 'Atendimentos', valor: 'Gravar' } }] },
            { path: 'tipo-atendimento/incluir', canActivate: [UsuarioAuthorize], component: IncluirTipoAtendimentoComponent, data: [{ claim: { nome: 'Atendimentos', valor: 'Gravar' } }] },
            { path: 'tipo-atendimento/editar/:id', canActivate: [UsuarioAuthorize], component: EditarTipoAtendimentoComponent, data: [{ claim: { nome: 'Atendimentos', valor: 'Gravar' } }] },
            { path: 'painel-atendimento', component:PainelAtendimentoComponent},
        ]
    }
]