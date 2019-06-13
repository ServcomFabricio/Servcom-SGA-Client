import { Router,Routes } from '@angular/router';
import { LoginComponent } from './usuario/login/login.component';
import { HomeComponent } from './home/home.component';
import { AcessoNegadoComponent } from './shared/acesso-negado/acesso-negado.component';
import { NaoEncontradoComponent } from './shared/nao-encontrado/nao-encontrado.component';

export const rootRouterConfig: Routes=[
    {path:'',redirectTo:'home',pathMatch:'full'},
    {path:'home',component:HomeComponent},
    {path:'entrar',component:LoginComponent},
    { path: 'acesso-negado', component: AcessoNegadoComponent },
    { path: 'nao-encontrado', component: NaoEncontradoComponent },
    { path: 'usuarios', loadChildren: './usuario/usuario.module#UsuarioModule' },
    { path: 'atendimentos', loadChildren: './atendimentos/atendimento.module#AtendimentoModule' },
];