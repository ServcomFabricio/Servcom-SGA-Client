import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { ServiceBase } from 'src/app/services/service.base';
import { Configuracao } from '../models/configuracao';
import { ConteudoConfigurado } from '../models/conteudoConfigurado';
import { ConfigService } from 'ngx-envconfig';


@Injectable()
export class ConfiguracaoService extends ServiceBase {

    constructor(private http: HttpClient,configService: ConfigService) { super(configService) }

    obterConfiguracao(): Observable<Configuracao> {
        return this.http
            .get<Configuracao>(this.UrlServiceV1 + "obter-configuracao-geral", super.obterAuthHeaderJson())
            .pipe(
                catchError(super.serviceError)
            );
    }
       
    atualizarConfiguracaoGeral(configuracao:Configuracao):Observable<Configuracao> {
        return this.http
        .post(this.UrlServiceV1+"atualizar-configuracao-geral",configuracao,this.obterAuthHeaderJson())
        .pipe(
            map(super.extractData),
            catchError(super.serviceError)
        );
    }

    obterConteudoConfiguradoTodos():Observable<ConteudoConfigurado[]>{
        return this.http
        .get<ConteudoConfigurado[]>(this.UrlServiceV1 + "obter-configuracao-conteudo-todos", super.obterAuthHeaderJson())
        .pipe(
            catchError(super.serviceError)
        );
        
    }

    obterConteudoConfiguradoLista():Observable<ConteudoConfigurado[]>{
        return this.http
        .get<ConteudoConfigurado[]>(this.UrlServiceV1 + "obter-configuracao-conteudo-lista", super.obterAuthHeaderJson())
        .pipe(
            catchError(super.serviceError)
        );
    }

    obterConteudoConfigurado(conteudoId:string):Observable<ConteudoConfigurado>{
        return this.http
        .get<ConteudoConfigurado>(this.UrlServiceV1 + "obter-configuracao-conteudo/"+conteudoId, super.obterAuthHeaderJson())
        .pipe(
            catchError(super.serviceError)
        );
        
    }

    incluirConteudoConfigurado(configuracao:ConteudoConfigurado):Observable<ConteudoConfigurado>{
        return this.http
        .post(this.UrlServiceV1+"incluir-configuracao-conteudo",configuracao,this.obterAuthHeaderJson())
        .pipe(
            map(super.extractData),
            catchError(super.serviceError)
        );
    }

    editarConteudoConfigurado(configuracao:ConteudoConfigurado):Observable<ConteudoConfigurado>{
        return this.http
        .post(this.UrlServiceV1+"editar-configuracao-conteudo",configuracao,this.obterAuthHeaderJson())
        .pipe(
            map(super.extractData),
            catchError(super.serviceError)
        );
    }

    
    excluirConteudoConfigurado(id:string):Observable<ConteudoConfigurado>{
        return this.http
        .delete(this.UrlServiceV1+"excluir-configuracao-conteudo/"+id,this.obterAuthHeaderJson())
        .pipe(
            map(super.extractData),
            catchError(super.serviceError)
        );
    }
}

