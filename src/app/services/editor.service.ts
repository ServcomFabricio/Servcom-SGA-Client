import { Injectable } from '@angular/core';


@Injectable()
export class EditorTextoService {
 
    public htmlContentEditor: any;
    public tituloEditor;
    public height: any;
    public width: any;
    public configEditor = {
        width:0,
        height:0,
        resize_enabled: false,
        removePlugins: ['easyimage,cloudservices'],
        toolbar: [
            { name: 'styles', items: ['Styles', 'Format', 'Font', 'FontSize'] },
            { name: 'basicstyles', groups: ['basicstyles', 'cleanup'], items: ['Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', '-', 'CopyFormatting', 'RemoveFormat'] },
            { name: 'paragraph', groups: ['list', 'indent', 'blocks', 'align', 'bidi'], items: ['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock'] },
            { name: 'colors', items: ['TextColor', 'BGColor'] },
            { name: 'clipboard', groups: ['clipboard', 'undo'], items: ['Cut', 'Copy', 'Paste', '-', 'Undo', 'Redo'] },
            { name: 'document', items: ['Source'] }
        ]
    }
}