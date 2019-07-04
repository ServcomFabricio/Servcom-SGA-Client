import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConteudoConfigurado } from '../../models/conteudoConfigurado';
import { ToastrService } from 'ngx-toastr';
import { SeoService } from 'src/app/services/seo.service';
import { EditorTextoService } from 'src/app/services/editor.service';
import { ConfiguracaoService } from '../../services/configuracao.service';
import { BaseComponet } from 'src/app/utils/base.compent';
import { GenericValidator } from 'src/app/utils/generic.form.validator';

@Component({
  selector: 'app-editar-conteudo',
  templateUrl: './editar-conteudo.component.html',
  styleUrls: ['./editar-conteudo.component.css']
})
export class EditarConteudoComponent  extends BaseComponet implements OnInit, AfterViewInit  {

  public editarConteudoForm: FormGroup;
  conteudoConfigurado: ConteudoConfigurado;
  conteudoConfiguradoId:string;
  tipo: any = "0";
  conteudo: any ;

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
      conteudo: {}
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
    this.loaded=false;
  }

  ngOnInit() {
    this.editarConteudoForm = this.fb.group({
      tipo: ['0'],
      descricao: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(150)]],
      ativo: [false],
      conteudo: [''],
    });

    this.sub = this.route.params.subscribe(
      params => {
        this.conteudoConfiguradoId = params['id'];
        this.obterConteudo(this.conteudoConfiguradoId);
      }
    );
  }

  obterConteudo(id:string){
    this.configuracaoService.obterConteudoConfigurado(id)
    .subscribe(
      conteudo => {
        this.preencherFormConteudoConfigurado(conteudo),
          this.isDataAvailable = true
      }

    );
  }

  preencherFormConteudoConfigurado(conteudoConfigurado:ConteudoConfigurado)
  {
    this.conteudoConfigurado = conteudoConfigurado;
    this.editarConteudoForm.patchValue({
      tipo: this.conteudoConfigurado.tipo,
      descricao: this.conteudoConfigurado.descricao,
      ativo: this.conteudoConfigurado.ativo
    });
    this.tipo=this.conteudoConfigurado.tipo;
    if (this.tipo==0){
      this.editorTextoService.htmlContentEditor=this.conteudoConfigurado.conteudo
    }
    this.loaded=false;
    if (this.tipo==1 && this.conteudoConfigurado.conteudo !==""){
      this.conteudo=this.conteudoConfigurado.conteudo
      this.loaded=true;
    }
  }


  ngAfterViewInit(): void {
    this.customAfterViewInit(this.editarConteudoForm);
  }

  editarConteudo() {
    if (this.tipo == 0) this.editarConteudoForm.get('conteudo').setValue(this.editorTextoService.htmlContentEditor)
   
    if (this.editarConteudoForm.valid) {
      let conteudo = Object.assign({}, this.conteudoConfigurado, this.editarConteudoForm.value);
      if (this.tipo == 1) conteudo.conteudo =this.conteudo
      this.configuracaoService.editarConteudoConfigurado(conteudo)
        .subscribe(
          result => { this.onSaveComplete('Registro atualizado com sucesso', '/configuracoes/conteudo/listar', this.editarConteudoForm) },
          error => { this.onError(error); }
        );
    }
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
