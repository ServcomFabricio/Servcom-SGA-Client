import { Injectable } from '@angular/core';
import { ServiceBase } from 'src/app/services/service.base';
import { HttpClient } from '@angular/common/http';

import * as signalR from "@aspnet/signalr";
import { PainelAtendimentoModel } from '../models/painelatendimento';


@Injectable()
export class SignalRService extends ServiceBase {

    private hubConnection: signalR.HubConnection
    public dataResponse: PainelAtendimentoModel[];
    constructor(private http: HttpClient) { super() }

    public startConnection = () => {
        this.hubConnection = new signalR.HubConnectionBuilder()
            .withUrl(this.UrlServiceV1 + 'painel-atendimento-client')
            .build();

        this.hubConnection
            .start()
            .then()
            .catch(super.serviceError)
    }

    public addTransferChartDataListener = () => {
        this.hubConnection.on('painelAtendimento', data => {
            this.dataResponse=data;
            console.log(data);
        });
    }

}