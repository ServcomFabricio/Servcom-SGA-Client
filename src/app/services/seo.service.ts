import { Title, DOCUMENT } from '@angular/platform-browser';
import { Injectable, Renderer2, RendererFactory2, Inject, ViewEncapsulation } from '@angular/core';
import { StringUtils } from '../utils/string.utils';


@Injectable()

export class SeoService {
    private titleService: Title;
    private DOM: Renderer2;

    constructor(titleService: Title, private rendererFactory: RendererFactory2,
        @Inject(DOCUMENT) private document) {

        this.titleService = titleService;

        this.DOM = this.rendererFactory.createRenderer(this.document, {
            id: '-1',
            encapsulation: ViewEncapsulation.None,
            styles: [],
            data: {}
        });
        this.setTitle('');
    }


    public setSeoData(seoModel: SeoModel) {
        this.setTitle(seoModel.title);

    }
    private setTitle(newTitle: string) {
        if (StringUtils.isNullOrEmpty(newTitle)) { newTitle = "Defina um Título" }
        this.titleService.setTitle(newTitle + " - Servcom-SGA");
    }

}


export class SeoModel {
    public title: string = '';
}

