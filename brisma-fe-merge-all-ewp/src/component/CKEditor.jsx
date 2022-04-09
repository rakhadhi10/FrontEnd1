import React from 'react';
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import { CKEditor } from '@ckeditor/ckeditor5-react'

const editorConfiguration = {
  toolbar: {
    items: [
      'heading',
      '|',
      'sourceEditing',
      'htmlEmbed',
      'codeBlock',
      'code',
      '|',
      'bold',
      'italic',
      'underline',
      'subscript',
      'superscript',
      'strikethrough',
      'specialCharacters',
      '|',
      'link',
      'bulletedList',
      'numberedList',
      'todoList',
      '|',
      'alignment',
      '|',
      'outdent',
      'indent',
      '|',
      'blockQuote',
      'insertTable',
      'mediaEmbed',
      'undo',
      'redo',
      '-',
      'textPartLanguage',
      '|',
      'fontColor',
      'fontFamily',
      'fontBackgroundColor',
      'highlight',
      'fontSize',
      '|',
      'horizontalLine',
      'pageBreak',
      'removeFormat',
      'findAndReplace',
      '|',
      'imageInsert',
      '|',
      'restrictedEditingException'
    ],
    shouldNotGroupWhenFull: true
  },
  language: 'en',
  image: {
    toolbar: [
      'imageTextAlternative',
      'imageStyle:inline',
      'imageStyle:block',
      'imageStyle:side',
      'linkImage'
    ]
  },
  table: {
    contentToolbar: [
      'tableColumn',
      'tableRow',
      'mergeTableCells',
      'tableCellProperties',
      'tableProperties'
    ]
  },
  licenseKey: '',
  htmlSupport: {
    allow: [
      {
        name: /.*/,
        attributes: true,
        classes: true,
        styles: true
      }
    ]
  }
};

const Ckeditor = ({ contentData, handleEditorReady, handleEditorChange, ...props }) => {

  return (
    <CKEditor
      {...props}
      editor={Editor}
      config={editorConfiguration}
      disabled={true}
      data={contentData}
      onReady={handleEditorReady}
      onChange={handleEditorChange}
      {...props}
    />
  );
}

export default Ckeditor