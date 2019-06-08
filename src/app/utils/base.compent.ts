import { GenericValidator } from './generic.form.validator';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewChildren, ElementRef } from '@angular/core';
import { FormControlName, FormBuilder, FormGroup } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { Observable, merge, fromEvent, Subscription } from 'rxjs';

import { SeoModel, SeoService } from '../services/seo.service';

export class BaseComponet  {

    @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

    public displayMessage: { [key: string]: string } = {};
    protected validationMessagens: { [key: string]: { [key: string]: string } }
    protected genericValidator: GenericValidator;
    public errors: any[] = [];
    isDataAvailable: boolean = false;
    public sub: Subscription;

    constructor(protected fb: FormBuilder,
        protected route: ActivatedRoute,
        protected router: Router,
        protected toastr: ToastrService,
        seoService: SeoService,
        title:string) 
        {
            let seoModel: SeoModel = <SeoModel>{
                title: title
              }
              seoService.setSeoData(seoModel);
         }

    customAfterViewInit(form: FormGroup) {
        let controlBlurs: Observable<any>[] = this.formInputElements.map(
            (formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

        merge(...controlBlurs).subscribe(value => {
            this.displayMessage = this.genericValidator.processMessages(form);
        });

    }
    onSaveComplete(msg: string, router: string,form?:FormGroup): void {
        if (form !== undefined) form.reset();
        this.errors = [];
        const toast = this.toastr.success(msg, 'Tudo Certo!');
        if (toast) {
            toast.onHidden.subscribe(() => {
                this.router.navigate([router]);
            });
        }
    }



    onError(fail) {
        this.toastr.error('Ocorrer um erro no processamento', 'Atenção');
        this.errors = fail.error.errors;
    }

}