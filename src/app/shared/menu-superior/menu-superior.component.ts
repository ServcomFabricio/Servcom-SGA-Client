import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/usuario/services/usuario.service';
import { DataSharingService } from 'src/app/services/service.base';

@Component({
  selector: 'app-menu-superior',
  templateUrl: './menu-superior.component.html',
  styleUrls: ['./menu-superior.component.css']
})
export class MenuSuperiorComponent implements OnInit {

  public isCollapsed: boolean = false;
  public menuSuperiorAtivo:boolean;
  private token: string;

  constructor(private usuarioService: UsuarioService, private dataSharingService: DataSharingService) 
  {
    this.dataSharingService.menuSuperiorAtivo.next(true);   
   }

  usuarioLogado() {
    this.token = this.usuarioService.getUserToken();

    if (!this.token) {
      return false;
    }
    return true;
  }
  
  ngOnInit() {
    this.dataSharingService.menuSuperiorAtivo.subscribe(
      menuS=>{this.menuSuperiorAtivo=menuS}
      );
  }

}
