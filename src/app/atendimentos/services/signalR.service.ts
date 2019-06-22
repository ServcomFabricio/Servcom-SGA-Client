import { Injectable } from '@angular/core';
import { ServiceBase } from 'src/app/services/service.base';
import { HttpClient } from '@angular/common/http';

import * as signalR from "@aspnet/signalr";
import { PainelAtendimentoModel } from '../models/painelatendimento';


@Injectable()
export class SignalRService extends ServiceBase {

    private hubConnection: signalR.HubConnection
    public dataResponse: PainelAtendimentoModel[] = [new PainelAtendimentoModel()];
    time: number = 0;
    interval;
    public blinkSenha: boolean = true
    constructor() { super() }

    public startConnection = () => {
        this.hubConnection = new signalR.HubConnectionBuilder()
            .withUrl(this.UrlServiceV1 + 'painel-atendimento-client')
            .build();

        this.hubConnection
            .start()
            .then()
            .catch(super.serviceError);

    }

    public addTransferChartDataListener = () => {
        this.hubConnection.on('painelAtendimento', data => {
            this.dataResponse = data;
            this.startBlink();
            this.playAudio();
        });
    }

    playAudio() {
        let audio = new Audio();
        audio.src = '../assets/som.mp3';
        audio.load();
        audio.play();
    }

    startBlink() {
        this.interval = setInterval(() => {
            this.blinkSenha = !this.blinkSenha;
            this.time++;
            if (this.time > 10) {
                this.pauseBlick();
                this.time = 0;
            }
        }, 200)
    }

    pauseBlick() {
        clearInterval(this.interval);
        this.blinkSenha = true;
    }
}