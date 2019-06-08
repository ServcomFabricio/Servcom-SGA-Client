import { HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';

export abstract class ServiceBase {

    protected UrlServiceV1: string = '/api/';

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