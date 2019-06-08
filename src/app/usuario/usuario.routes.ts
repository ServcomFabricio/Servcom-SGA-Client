import { Routes } from '@angular/router';

import { UsuarioComponent } from 'src/app/usuario/usuario.component'
import { ListaUsuariosComponent } from './lista-usuarios/lista-usuarios.component';
import { DetalheUsuarioComponent } from './detalhe-usuario/detalhe-usuario.component';
import { UsuarioAuthorize } from './services/usuario.authorize';
import { ExcluirUsuarioComponent } from './excluir-usuario/excluir-usuario.component';
import { IncluirUsuarioComponent } from './incluir-usuario/incluir-usuario.component';
import { EditarUsuarioComponent } from './editar-usuario/editar-usuario.component';



export const usuariosRouterConfig: Routes = [
    {
        path: '', component: UsuarioComponent,
        children: [
            { path: '', component: UsuarioComponent },
            { path: 'lista-usuarios', canActivate: [UsuarioAuthorize], component: ListaUsuariosComponent, data: [{ claim: { nome: 'Atendimentos', valor: 'Gravar' } }] },
            { path: 'detalhes/:id', canActivate: [UsuarioAuthorize], component: DetalheUsuarioComponent, data: [{ claim: { nome: 'Atendimentos', valor: 'Gravar' } }] },
            { path: 'excluir/:id', canActivate: [UsuarioAuthorize], component: ExcluirUsuarioComponent, data: [{ claim: { nome: 'Atendimentos', valor: 'Gravar' } }] },
            { path: 'incluir', canActivate: [UsuarioAuthorize], component: IncluirUsuarioComponent, data: [{ claim: { nome: 'Atendimentos', valor: 'Gravar' } }] },
            { path: 'editar/:id', canActivate: [UsuarioAuthorize], component: EditarUsuarioComponent, data: [{ claim: { nome: 'Atendimentos', valor: 'Gravar' } }] },

        ]

    }
]
