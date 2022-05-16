import React, { useState, useEffect, useRef } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { APP_CONFIG } from '@/utils/env';
import { getAccessToken } from 'utils/jwt';
import { EditorModel } from './EditorModel';

const Editor = (props: EditorModel) => {
  const editorRef = useRef();
  const customConfig = {
    extraPlugins: [MyCustomUploadAdapterPlugin],
    toolbar: {
      items: [
        'heading',
        '|',
        'bold',
        'italic',
        'link',
        'bulletedList',
        'numberedList',
        '|',
        'blockQuote',
        'insertTable',
        '|',
        'imageUpload',
        'undo',
        'redo',
      ],
    },
    table: {
      contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells'],
    },
  };
  const [contentEditor, setContentEditor] = useState(props.content);

  useEffect(() => {
    setContentEditor(props.content || '');
  }, [props.content]);

  return (
    <div className="editor">
      <CKEditor
        className="mt-3 wrap-ckeditor"
        editor={ClassicEditor}
        config={customConfig}
        data={contentEditor}
        onChange={(event: any, editor: any) => {
          const dataHTML = editor.getData();
          props.change(dataHTML);
        }}
      />
    </div>
  );
};

function MyCustomUploadAdapterPlugin(editor: any) {
  editor.plugins.get('FileRepository').createUploadAdapter = (loader: any) => {
    return new MyUploadAdapter(loader);
  };
}

class MyUploadAdapter {
  loader: any;
  url: string;
  xhr: any;
  constructor(props: any) {
    // CKEditor 5's FileLoader instance.
    this.loader = props;
    // URL where to send files.
    this.url = `${APP_CONFIG.apiUrl}upload`;
  }

  // Starts the upload process.
  upload() {
    return new Promise((resolve, reject) => {
      this._initRequest();
      this._initListeners(resolve, reject);
      this._sendRequest();
    });
  }

  // Aborts the upload process.
  abort() {
    if (this.xhr) {
      this.xhr.abort();
    }
  }

  // Example implementation using XMLHttpRequest.
  _initRequest() {
    const xhr = (this.xhr = new XMLHttpRequest());

    xhr.open('POST', this.url, true);
    xhr.responseType = 'json';
    xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
    xhr.setRequestHeader('Authorization', 'Bearer ' + getAccessToken());
  }

  // Initializes XMLHttpRequest listeners.
  _initListeners(resolve: any, reject: any) {
    const xhr = this.xhr;
    const loader = this.loader;
    const genericErrorText = "Couldn't upload file:" + ` ${loader.file.name}.`;

    xhr.addEventListener('error', () => reject(genericErrorText));
    xhr.addEventListener('abort', () => reject());
    xhr.addEventListener('load', () => {
      const response = xhr.response;
      if (!response || response.error) {
        return reject(response && response.error ? response.error.message : genericErrorText);
      }
      // If the upload is successful, resolve the upload promise with an object containing
      // at least the "default" URL, pointing to the image on the server.
      resolve({
        // default: APP_CONFIG.imgUrl + response.s3Url,
        default: APP_CONFIG.imgUrl + response.data[0],
      });
    });

    if (xhr.upload) {
      xhr.upload.addEventListener('progress', (evt: any) => {
        if (evt.lengthComputable) {
          loader.uploadTotal = evt.total;
          loader.uploaded = evt.loaded;
        }
      });
    }
  }

  // Prepares the data and sends the request.
  _sendRequest() {
    const data = new FormData();

    this.loader.file.then((result: any) => {
      data.append('file[]', result);
      this.xhr.send(data);
    });
  }
}

export default Editor;
