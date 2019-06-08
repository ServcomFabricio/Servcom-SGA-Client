import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { ServiceBase } from 'src/app/services/service.base';
import { Usuario } from '../models/usuario';



@Injectable()
export class UsuarioService extends ServiceBase {

    constructor(private http: HttpClient) { super() }

    
    loginUsuario(usuario: Usuario): Observable<Usuario> {
        return this.http
            .post(this.UrlServiceV1 + "user/login-usuario", usuario, super.obterHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError)
            );

    }

    incluirUsuario(usuario: Usuario): Observable<Usuario> {
        return this.http
            .post(this.UrlServiceV1 + "user/novo-usuario", usuario, super.obterAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError)
            );

    }

    atualizarUsuario(usuario: Usuario): Observable<Usuario> {
        return  this.http
            .put(this.UrlServiceV1 + "user/editar-usuario", usuario, super.obterAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError)
            );
     }

    excluirUsuario(id: string): Observable<Usuario> {
        return this.http
            .delete(this.UrlServiceV1 + "user/excluir-usuario/" + id, super.obterAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
      
    };

    obterUsuarios(): Observable<Usuario[]> {
        return this.http
            .get<Usuario[]>(this.UrlServiceV1 + "user/lista-usuarios", super.obterAuthHeaderJson())
            .pipe(
                catchError(super.serviceError));
    }

    obterUsuario(id: string): Observable<Usuario> {
        return this.http
            .get<Usuario>(this.UrlServiceV1 + "user/obter-usuario/" + id, super.obterAuthHeaderJson())
            .pipe(
                catchError(super.serviceError));
    }
}
