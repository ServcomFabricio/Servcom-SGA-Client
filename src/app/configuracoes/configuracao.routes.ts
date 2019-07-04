import { Routes } from "@angular/router";
import { ConfiguracaoComponent } from './configuracao.component';
import { UsuarioAuthorize } from '../usuario/services/usuario.authorize';
import { ConfiguracaoHomeComponent } from './configuracao-home/configuracao-home.component';
import { ListaConteudoComponent } from './conteudoPainelAtendimento/lista-conteudo/lista-conteudo.component';
import { IncluirConteudoComponent } from './conteudoPainelAtendimento/incluir-conteudo/incluir-conteudo.component';
import { EditarConteudoComponent } from './conteudoPainelAtendimento/editar-conteudo/editar-conteudo.component';
import { DetalheConteudoComponent } from './conteudoPainelAtendimento/detalhe-conteudo/detalhe-conteudo.component';
import { ExcluirConteudoComponent } from './conteudoPainelAtendimento/excluir-conteudo/excluir-conteudo.component';


export const configuracoesRouterConfig: Routes = [
    {
        path: '', component: ConfiguracaoComponent,
        children: [
            { path: '', component: ConfiguracaoComponent },
            { path: 'configuracao-geral', canActivate: [UsuarioAuthorize], component: ConfiguracaoHomeComponent, data: [{ claim: { nome: 'Atendimentos', valor: 'Gravar' } }] },
            { path: 'conteudo/listar', canActivate: [UsuarioAuthorize], component:ListaConteudoComponent , data: [{ claim: { nome: 'Atendimentos', valor: 'Gravar' } }] },
            { path: 'conteudo/incluir', canActivate: [UsuarioAuthorize], component:IncluirConteudoComponent , data: [{ claim: { nome: 'Atendimentos', valor: 'Gravar' } }] },
            { path: 'conteudo/editar/:id', canActivate: [UsuarioAuthorize], component:EditarConteudoComponent, data: [{ claim: { nome: 'Atendimentos', valor: 'Gravar' } }] },
            { path: 'conteudo/detalhes/:id', canActivate: [UsuarioAuthorize], component:DetalheConteudoComponent, data: [{ claim: { nome: 'Atendimentos', valor: 'Gravar' } }] },
            { path: 'conteudo/excluir/:id', canActivate: [UsuarioAuthorize], component:ExcluirConteudoComponent, data: [{ claim: { nome: 'Atendimentos', valor: 'Gravar' } }] },

        ]
    }

]