class Encoder {
  constructor() {
    this.encoderTextArea = document.getElementById('encoderTextArea');
    this.decoderTextArea = document.getElementById('decoderTextArea');
    this.resultTextArea = document.getElementById('resultTextArea');
    this.result = document.getElementById('result');
    this.selectMode = document.getElementById('mode');
    this.headsTextAreaEncoder = document.getElementById('headEncoder');
    this.headsTextAreaDecoder = document.getElementById('headDecoder');
    this.alertErrorDecode = document.getElementById('alertErrorDecode');
    this.mode = 'base64';

    this._addChangeDecoderTextArea();
    this._addChangeEncoderTextArea();
    this._addChangeMode();
  }

  _addChangeMode() {
    this.selectMode.addEventListener('change', (e) => {
      const textHeads = {
        base64: {
          encoder: 'Codificar a Base 64',
          decoder: 'Decodificar Base 64'
        },
        url: {
          encoder: 'Codificar a URL',
          decoder: 'Decodificar URL'
        },
        unicode: {
          encoder: 'Codificar a Unicode',
          decoder: 'Decodificar Unicode'
        }
      }
      this.mode = e.target.value;
      this.headsTextAreaDecoder.textContent = textHeads[this.mode].decoder;
      this.headsTextAreaEncoder.textContent = textHeads[this.mode].encoder;
    })
  }

  _addChangeDecoderTextArea() {
    const funChange = (e) => {
      const nameModes = {
        base64: 'Base 64',
        url: 'URL',
        unicode: 'Unicode'
      }
      this.decoder(e.target.value).then((textDecoder) => {
        this.alertErrorDecode.style.display = 'none';
        this.resultTextArea.value = textDecoder;
      }).catch(() => {
        this.resultTextArea.value = '';
        this.alertErrorDecode.textContent = `Ingrese una cadena codificada en ${ nameModes[this.mode] } válida`
        this.alertErrorDecode.style.display = '';
      })
    }
    this.decoderTextArea.addEventListener('change', funChange);
    this.decoderTextArea.addEventListener('keyup', funChange);
    this.decoderTextArea.addEventListener('paste', funChange);
    this.decoderTextArea.addEventListener('blur', funChange);
    this.decoderTextArea.addEventListener('focus', funChange);
  }

  _addChangeEncoderTextArea() {
    const funChange = (e) => {
      this.resultTextArea.value = this.encoder(e.target.value);
    }
    this.encoderTextArea.addEventListener('change', funChange);
    this.encoderTextArea.addEventListener('keyup', funChange);
    this.encoderTextArea.addEventListener('paste', funChange);
    this.encoderTextArea.addEventListener('blur', funChange);
    this.encoderTextArea.addEventListener('focus', funChange);
  }

  decoder(text) {
    let textDecoder = '';

    switch (this.mode) {
      case 'base64':
        {
          return new Promise((resolve, reject) => {
            try {
              textDecoder = atob(text);
            } catch {
              return reject();
            }
            return resolve(textDecoder);
          })
        }
      case 'url':
        {
          return new Promise((resolve, reject) => {
            try {
              textDecoder = text.replace(/%([a-zA-Z0-9]{2})/g, (match) => String.fromCharCode(parseInt(match.slice(1), 16)));
            } catch {
              return reject();
            }
            return resolve(textDecoder);
          })
        }

      case 'unicode':
        {
          return new Promise((resolve, reject) => {
            try {
              textDecoder = text.replace(/(\\u[0-9a-fA-F]{4})/g, (match) => String.fromCharCode(parseInt(match.slice(2), 16)));
            } catch {
              return reject();
            }
            return resolve(textDecoder);
          })
        }
    }
  }

  encoder(text) {
    let textEncoder = '';

    switch (this.mode) {
      case 'base64':
        {
          textEncoder = btoa(text);
          break;
        }

      case 'url':
        {
          for (let i = 0; i < text.length; i++) {
            textEncoder += "%" + text[i].charCodeAt(0).toString(16);
          }
          break;
        }

      case 'unicode':
        {
          let binchar;

          for (let i = 0; i < text.length; i++) {
            binchar = text[i].charCodeAt(0).toString(16);
            for (let j = 4 - binchar.length; j > 0; j--) {
              binchar = "0" + binchar;
            }
            textEncoder += "\\u" + binchar;
          }
          break;
        }
    }
    return textEncoder;
  }
}