import { Component, OnInit, OnDestroy, Inject, ViewEncapsulation } from '@angular/core';
import { DOCUMENT, DomSanitizer } from '@angular/platform-browser';

import { SignalRService } from '../services/signalR.service';

import { DataSharingService } from 'src/app/services/service.base';
import { ConfiguracaoService } from 'src/app/configuracoes/services/configuracao.service';
import { Configuracao } from 'src/app/configuracoes/models/configuracao';
import { ConteudoConfigurado } from 'src/app/configuracoes/models/conteudoConfigurado';





@Component({
  selector: 'app-painel-atendimento',
  templateUrl: './painel-atendimento.component.html',
  styleUrls: ['./painel-atendimento.component.css']
})
export class PainelAtendimentoComponent implements OnInit, OnDestroy {
  time = new Date();
  elem;
  showIndicators: boolean = false;
  public configuracao: Configuracao;
  public conteudosConfigurado: ConteudoConfigurado[];
  public intervalo: any=false;
  private intervaloEnable:boolean=false;
  public  isDataAvailable=false;


  constructor(public signalRService: SignalRService,
    private dataSharingService: DataSharingService,
    private configuracaoService: ConfiguracaoService,
    private sanitizer: DomSanitizer,
    @Inject(DOCUMENT) private document: any) {
    this.dataSharingService.menuSuperiorAtivo.next(false);
    this.elem = document.documentElement;
    this.configuracao = new Configuracao();
    this.obterConfiguracao()
  }

  ngOnInit() {
    this.signalRService.startConnection();
    this.signalRService.addTransferChartDataListener();
    this.openFullScreen();

    setInterval(() => {
      this.time = new Date();
    }, 1000);

  }

  obterConfiguracao() {
    this.configuracaoService.obterConfiguracao()
      .subscribe(
        configuracao => {
          this.configuracao = configuracao;
          this.configuracao.textoFixoPainelAtendimento = this.sanitizer.bypassSecurityTrustHtml(configuracao.textoFixoPainelAtendimento);
          if (this.configuracao.conteudoConfigurado == true) {
            this.configuracaoService.obterConteudoConfiguradoTodos()
              .subscribe(
                configuracao => {
                  this.conteudosConfigurado = configuracao;
                }
              );
          }
          this.isDataAvailable=true;
        }
      );

  }


  ngOnDestroy() {
    this.dataSharingService.menuSuperiorAtivo.next(true);
    this.closeFullScreen();
  }

  carouselChange(numero: any) {
    if (!this.intervaloEnable){
      this.intervaloEnable=true;
      return;
    }
    if (numero == 0 && this.configuracao.entradaVideo === true) {
      this.intervalo = '20000';
    }
    else {
      this.intervalo = '10000';
    }
  }


  openFullScreen() {
    if (this.elem.requestFullscreen) {
      this.elem.webkitRequestFullscreen();
    } else if (this.elem.mozRequestFullScreen) {
      /* Firefox */
      this.elem.mozRequestFullScreen();
    } else if (this.elem.webkitRequestFullscreen) {
      /* Chrome, Safari and Opera */
      this.elem.webkitRequestFullscreen();
    } else if (this.elem.msRequestFullscreen) {
      /* IE/Edge */
      this.elem.msRequestFullscreen();
    }
  }

  closeFullScreen() {
    if (this.document.exitFullscreen) {
      this.document.webkitExitFullscreen();
    } else if (this.document.mozCancelFullScreen) {
      /* Firefox */
      this.document.mozCancelFullScreen();
    } else if (this.document.webkitExitFullscreen) {
      /* Chrome, Safari and Opera */
      this.document.webkitExitFullscreen();
    } else if (this.document.msExitFullscreen) {
      /* IE/Edge */
      this.document.msExitFullscreen();
    }
  }

}
