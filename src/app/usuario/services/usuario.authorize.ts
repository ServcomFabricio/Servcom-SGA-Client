import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';

import { UsuarioService } from './usuario.service';

@Injectable()
export class UsuarioAuthorize implements CanActivate {
    public token;
    public user;

    constructor(private usuarioService: UsuarioService,
        private router: Router) { }

    canActivate(routerAc: ActivatedRouteSnapshot): boolean {
        this.token = this.usuarioService.getUserToken();
        this.user = this.usuarioService.getUser();

        if (!this.token) {
            this.router.navigate(['/entrar']);

            let claim: any = routerAc.data[0];
            if (claim !== undefined) {
                claim = routerAc.data[0]['claim'];
                if (claim) {
                    if (!this.user.claim) {
                        this.router.navigate(['/acesso-negado']);
                    }
                    let userClaims = this.user.claims.some(x => x.type === claim.nome && x.value === claim.valor);
                    if (!userClaims) {
                        this.router.navigate(['/acesso-negado']);
                    }
                }
            }
        }
        return true;

    }
}