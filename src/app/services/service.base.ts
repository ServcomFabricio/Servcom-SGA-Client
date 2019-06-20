import { HttpHeaders } from '@angular/common/http';
import { throwError, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

export abstract class ServiceBase {

    //Produção
    //TODO: Liberar para produção Raspberry
    //protected UrlServiceV1: string = 'http://192.168.0.19:5000/api/';

    //dev
    protected UrlServiceV1: string = 'https://192.168.0.24:8003/';

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
export class DataSharingService extends ServiceBase{
    getUser=JSON.parse(this.getUser());
    userNome:string=this.getUser==null?"":this.getUser.nome;
    public usuarioNome: BehaviorSubject<string> = new BehaviorSubject<string>(this.userNome);

    public menuSuperiorAtivo: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
}