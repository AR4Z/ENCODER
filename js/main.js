class Encoder {
  constructor() {
    this.encoderTextArea = document.getElementById('encoderTextArea');
    this.decoderTextArea = document.getElementById('decoderTextArea');
    this.resultTextArea = document.getElementById('resultTextArea');
    this.result = document.getElementById('result');
    this.selectMode = document.getElementById('mode');
    this.headsTextAreaEncoder = document.getElementById('headEncoder');
    this.headsTextAreaDecoder = document.getElementById('headDecoder');
    this.mode = 'base64';

    this._addChangeDecoderTextArea();
    this._addChangeEncoderTextArea();
    this._addChangeMode();
  }

  _addChangeMode() {
    this.selectMode.addEventListener('change', (e) => {
      const textHeads = {
        base64: {
          encoder: 'Codificar base64',
          decoder: 'Decodificar base64'
        },
        url: {
          encoder: 'Codificar url',
          decoder: 'Decoficiar url'
        },
        unicode: {
          encoder: 'Codificar unicode',
          decoder: 'Deodificar unicode'
        }
      }
      this.mode = e.target.value;
      this.headsTextAreaDecoder.textContent = textHeads[this.mode].decoder;
      this.headsTextAreaEncoder.textContent = textHeads[this.mode].encoder;
    })
  }

  _addChangeDecoderTextArea() {
    this.decoderTextArea.addEventListener('change', (e) => {

      this.resultTextArea.value = this.decoder(e.target.value);
    })
  }

  _addChangeEncoderTextArea() {
    this.encoderTextArea.addEventListener('change', (e) => {
      this.resultTextArea.value = this.encoder(e.target.value);
    })
  }

  decoder(text) {
    let textDecoder = '';

    switch (this.mode) {
      case 'base64':
        {
          textDecoder = atob(text);
          break;
        }

      case 'url':
        {
          textDecoder = text.replace(/%([a-zA-Z0-9]{2})/g, function (match) {
            return String.fromCharCode(parseInt(match.slice(1), 16))
          });
          break;
        }

      case 'unicode':
        {
          textDecoder = text.replace(/(\\u[0-9a-fA-F]{4})/g, function (match) {
            return String.fromCharCode(parseInt(match.slice(2), 16))
          });
          break;
        }
    }

    return textDecoder;
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