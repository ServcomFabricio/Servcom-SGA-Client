import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpRequest, HttpHandler } from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/internal/Observable';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { UsuarioService } from '../usuario/services/usuario.service';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(private usuarioSevice:UsuarioService,
                private router:Router){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError(err => {
                if (err.status === 401) {
                    this.usuarioSevice.removeUserToken();
                    this.router.navigate(['/entrar']);
                }

                if (err.status === 403) {
                    this.router.navigate(['/acesso-negado']);
                }

                if (err.status === 404) {
                    this.router.navigate(['/nao-encontrado']);
                }
                return throwError(err);
            })
        );
    }

}