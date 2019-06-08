import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/usuario/services/usuario.service';

@Component({
  selector: 'app-menu-superior',
  templateUrl: './menu-superior.component.html',
  styleUrls: ['./menu-superior.component.css']
})
export class MenuSuperiorComponent implements OnInit {

  public isCollapsed: boolean = false;
  private token: string;

  constructor(private usuarioService: UsuarioService) { }

  usuarioLogado() {
    this.token = this.usuarioService.getUserToken();

    if (!this.token) {
      return false;
    }
    return true;
  }
  
  ngOnInit() {
  }

}
