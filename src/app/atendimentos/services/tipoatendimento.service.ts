import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { ServiceBase } from 'src/app/services/service.base';
import { TipoAtendimento } from '../models/tipoatendimento';



@Injectable()
export class TipoAtendimentoService extends ServiceBase {

    constructor(private http: HttpClient) { super() }

    obterTipos(): Observable<TipoAtendimento[]> {
        return this.http
            .get<TipoAtendimento[]>(this.UrlServiceV1 + "listar-tipos-atendimento", super.obterAuthHeaderJson())
            .pipe(
                catchError(super.serviceError)
            );
    }

    obterTipoAtendimento(id: string): Observable<TipoAtendimento> {
        return this.http
            .get<TipoAtendimento>(this.UrlServiceV1 + "obter-tipo-atendimento/" + id, super.obterAuthHeaderJson())
            .pipe(
                catchError(super.serviceError));
    }

    incluirTipoAtendimento(tipoAtendimento: TipoAtendimento): Observable<TipoAtendimento> {
        return this.http
            .post(this.UrlServiceV1 + "incluir-tipo-atendimento", tipoAtendimento, super.obterAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError)
            );
    }
    
    atualizarTipoAtendimento(tipoAtendimento:TipoAtendimento):Observable<TipoAtendimento> {
        return this.http
        .put(this.UrlServiceV1+"editar-tipo-atendimento",tipoAtendimento,this.obterAuthHeaderJson())
        .pipe(
            map(super.extractData),
            catchError(super.serviceError)
        );

    }

    excluirTipoAtendimento(id:string):Observable<TipoAtendimento>{
        return this.http
        .delete(this.UrlServiceV1+"excluir-tipo-atendimento/"+id,this.obterAuthHeaderJson())
        .pipe(
            map(super.extractData),
            catchError(super.serviceError)
        );
    }



}