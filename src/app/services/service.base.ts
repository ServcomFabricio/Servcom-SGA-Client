import { HttpHeaders, HttpClient } from '@angular/common/http';
import { throwError, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ConfigService } from 'ngx-envconfig';

const config: any = require('../../assets/config/config.json');

export abstract class ServiceBase {
    protected UrlServiceV1: any;
    protected UrlServiceV1x: any;

    constructor(configService: ConfigService) {

        if (environment.production == true) {
            configService.onLoad.subscribe(() => {
                this.UrlServiceV1 = configService.get('UrlServiceBase');
            })
        } else {
            configService.onLoad.subscribe(() => {
                this.UrlServiceV1 = configService.get('UrlServiceBase');
            })
        }
    }

    protected obterHeaderJson() {
        return {
            headers: new HttpHeaders({
                'content-type': 'application/json'
            })
        };
    }

    protected obterAuthHeaderJson() {
        return {
            headers: new HttpHeaders({
                'content-type': 'application/json',
                'Authorization': `Bearer ${this.getUserToken()}`
            })
        };
    }
    protected extractData(response: any) {
        return response.data || {};
    }

    protected serviceError(error: Response | any) {
        let errMsg: string;

        if (error instanceof Response) {
            errMsg = `${error.status} - ${error.statusText || ''}`
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);

        return throwError(error);
    }

    public setLocalStorage(token: string, user: string) {
        localStorage.setItem('sga.token', token);
        localStorage.setItem('sga.user', user);

    }

    public getUserToken(): string {
        return localStorage.getItem('sga.token');
    }

    public getUser(): string {
        return localStorage.getItem('sga.user');
    }

    public removeUserToken() {
        localStorage.removeItem('sga.token');
        localStorage.removeItem('sga.user');

    }
}


@Injectable()
export class DataSharingService extends ServiceBase {

    constructor(configService: ConfigService) { super(configService) }

    getUser = JSON.parse(this.getUser());
    userNome: string = this.getUser == null ? "" : this.getUser.nome;
    public usuarioNome: BehaviorSubject<string> = new BehaviorSubject<string>(this.userNome);

    public menuSuperiorAtivo: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
}