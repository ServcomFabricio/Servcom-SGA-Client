import { Component, OnInit} from '@angular/core';
import { EditorTextoService } from 'src/app/services/editor.service';



@Component({
  selector: 'app-configuracao-home',
  templateUrl: './configuracao-home.component.html',
  styleUrls: ['./configuracao-home.component.css']
})
export class ConfiguracaoHomeComponent implements OnInit {

  constructor( private editorTextoService:EditorTextoService) { 
    editorTextoService.tituloEditor="Texto Fixo";
    editorTextoService.configEditor.height=200;
    editorTextoService.configEditor.width=500;
  }
  

  ngOnInit() {
  }


 
  
}
