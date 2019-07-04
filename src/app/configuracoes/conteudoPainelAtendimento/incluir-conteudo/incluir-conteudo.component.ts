import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { SeoService } from 'src/app/services/seo.service';
import { EditorTextoService } from 'src/app/services/editor.service';
import { GenericValidator } from 'src/app/utils/generic.form.validator';
import { BaseComponet } from 'src/app/utils/base.compent';
import { ConfiguracaoService } from '../../services/configuracao.service';

import { ConteudoConfigurado } from '../../models/conteudoConfigurado';
@Component({
  selector: 'app-incluir-conteudo',
  templateUrl: './incluir-conteudo.component.html',
  styleUrls: ['./incluir-conteudo.component.css']
})
export class IncluirConteudoComponent extends BaseComponet implements OnInit, AfterViewInit {

  public incluirConteudoForm: FormGroup;
  conteudoConfigurado: ConteudoConfigurado;
  tipo: string = "0";
  conteudo: any = "";

  //imagem
  dragging: boolean = false;
  loaded: boolean = false;
  imageLoaded: boolean = false;

  @ViewChild('inputConteudo') inputConteudo: ElementRef;

  constructor(fb: FormBuilder,
    route: ActivatedRoute,
    router: Router,
    toastr: ToastrService,
    seoService: SeoService,
    private editorTextoService: EditorTextoService,
    private configuracaoService: ConfiguracaoService) {
    super(fb, route, router, toastr, seoService, "Incluir Conteudo Configurado");
    editorTextoService.tituloEditor = "Conteúdo HTML";
    editorTextoService.configEditor.height = 550;
    editorTextoService.configEditor.width = 550;

    this.validationMessagens = {
      tipo: {},
      descricao: {
        required: 'Informe a descrição do conteúdo configurado'
      },
      ativo: {},
      conteudo: {
        required: 'Informe o conteúdo configurado'
      }
    }
    this.genericValidator = new GenericValidator(this.validationMessagens);
    this.conteudoConfigurado = new ConteudoConfigurado();

  }

  clearConteudo() {
    this.editorTextoService.htmlContentEditor = "";
    if (this.inputConteudo) {
      this.inputConteudo.nativeElement.value="";
    }
    this.conteudo = "";
  }

  ngOnInit() {
    this.incluirConteudoForm = this.fb.group({
      tipo: ['0'],
      descricao: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(150)]],
      ativo: [false],
      conteudo: [''],
    });

  }

  ngAfterViewInit(): void {
    this.customAfterViewInit(this.incluirConteudoForm);
  }

  incluirConteudo() {
    if (this.tipo === '0') this.incluirConteudoForm.get('conteudo').setValue(this.editorTextoService.htmlContentEditor)
    if (this.incluirConteudoForm.dirty && this.incluirConteudoForm.valid) {
      let conteudo = Object.assign({}, this.conteudoConfigurado, this.incluirConteudoForm.value);
      if (this.tipo === '1') conteudo.conteudo =this.conteudo
      this.configuracaoService.incluirConteudoConfigurado(conteudo)
        .subscribe(
          result => { this.onSaveComplete('Registro realizado com sucesso', '/configuracoes/conteudo/listar', this.incluirConteudoForm) },
          error => { this.onError(error); }
        );
        return;
    }
    this.displayMessage = this.genericValidator.processMessages(this.incluirConteudoForm);
  }

  //upload imagem
  handleDragEnter() {
    this.dragging = true;
  }

  handleDragLeave() {
    this.dragging = false;
  }

  handleDrop(e) {
    e.preventDefault();
    this.dragging = false;
    this.handleInputChange(e);
  }

  handleImageLoad() {
    this.imageLoaded = true;
  }

  handleInputChange(e) {
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    var pattern = /image-*/;
    var reader = new FileReader();

    if (!file.type.match(pattern)) {
      alert('Formato de imagem não é valido');
      return;
    }

    this.loaded = false;
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }

  _handleReaderLoaded(e) {
    var reader = e.target;
    this.conteudo = reader.result;
    this.loaded = true;
  }

  cancel() {
    this.conteudo = "";
    this.inputConteudo.nativeElement.value="";
  }

}
