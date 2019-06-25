import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { ServiceBase } from 'src/app/services/service.base';
import { Configuracao } from '../models/configuracao';


@Injectable()
export class ConfiguracaoService extends ServiceBase {

    constructor(private http: HttpClient) { super() }

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
}