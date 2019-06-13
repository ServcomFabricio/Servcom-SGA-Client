import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/usuario/services/usuario.service';
import { DataSharingService } from 'src/app/services/service.base';



@Component({
  selector: 'app-menu-login',
  templateUrl: './menu-login.component.html',
  styleUrls: ['./menu-login.component.css']
})
export class MenuLoginComponent {
  public token;
  public user;
  public nome: string = "";

  constructor(private usuarioService: UsuarioService,
    private dataSharingService: DataSharingService,
    private router: Router,) {
      
     }

  public usuarioLogado() {
    this.token = this.usuarioService.getUserToken();
    this.user = JSON.parse(this.usuarioService.getUser());
    if (this.user)
      this.nome = this.user.nome;
      this.dataSharingService.usuarioNome.subscribe(
        usuarioNome=>{this.nome=usuarioNome}
      );
      
    return this.token !== null
  }

  logout() {
    this.usuarioService.removeUserToken();
    this.router.navigate(['/home'])
  }

}
