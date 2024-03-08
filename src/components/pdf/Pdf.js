import React, { Component } from 'react';
import { isPDF } from '../../utils/utils';
import { Form, Button, Table } from 'react-bootstrap';


class Pdf extends Component {

  constructor(props) {
    super(props);
    this.state = {
      fileList: [],
      showPdf: false,
      pdfUrl: null
    }
  }

  setUploadFile = (event) => {
    //ファイル拡張子の確認（PNG／JPG／JPEG）
    if (!isPDF(event.target.files[0])) {
      event.target.value = ""
      return;
    } else {
      this.setState({
        fileList: [...this.state.fileList, event.target.files[0]]
      });
    }
  }

  viewFile = () => {
    const reader = new FileReader();

    reader.onload = (event) => {
      console.log(event.target.result)
      const base64String = event.target.result.split(',')[1];
      const decodedContent = atob(base64String);
      const blob = new Blob([decodedContent], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);

      this.setState({
        isView: true,
        isView64: false,
        pdfUrl: url,
        testsrc: event.target.result
      })
    };
    reader.readAsDataURL(this.state.file);
  }

  viewFile64 = (index) => {
    if (this.state.fileList[index]) {
      const file = this.state.fileList[index];
      const reader = new FileReader();

      reader.onload = (event) => {
        const base64String = event.target.result.split(',')[1];
        const blob = this.b64toBlob(base64String, 'application/pdf')

        const url = URL.createObjectURL(blob);
        this.setPdfUrl(url);
        this.setShowPdf(true);
      };

      reader.readAsDataURL(file);
    }
  }

  setPdfUrl = (url) => {
    this.setState({
      pdfUrl: url
    })
  }

  setShowPdf = (toShow) => {
    this.setState({
      showPdf: toShow
    })
  }

  b64toBlob = (b64Data, contentType = '', sliceSize = 512) => {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }

  handleClosePdf = () => {
    // setPdfUrl('');
    this.setShowPdf(false); // Hide the PDF viewer
  };

  render() {
    var rowCount = 0;
    return (
      <>
        <div>
          <input type="file" accept=".pdf" id="file" onChange={this.setUploadFile} />
          {/* <button onClick={this.viewFile64}>ファイルを表示</button><br /> */}
          {/* <button onClick={this.viewFileBase64}>ファイル内容を表示</button> */}
          {/* <textarea rows="10" cols="50" value={this.state.testsrc} readOnly />*/}
        </div>
        <br />
        <div>
          <table>
            <tbody>
            {
              this.state.fileList?.length === 0 ? <tr><td>ファイルがありません。 </td></tr> :
                this.state.fileList.map((file, i) => {
                  return (
                    <>
                    <tr key={i}>
                      <td key={i}><a key={i} href='#' onClick={() => {this.viewFile64(i)}}>{file.name}</a></td>
                    </tr>
                    </>
                  );
                })
            }
            </tbody>
          </table>
        </div>
        {this.state.showPdf === true && (
          <>
            <a href='#' onClick={this.handleClosePdf}>Close</a>
            <iframe src={this.state.pdfUrl} title="PDF Viewer" style={{ width: '80vw', height: '90vh' }} />
          </>
        )}

      </>
    );
  }
}

export default Pdf;
