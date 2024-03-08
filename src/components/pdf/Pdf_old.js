import React, { Component } from 'react';
import { isPDF } from '../../utils/utils';
import { Form, Button } from 'react-bootstrap';


class PdfOld extends Component {

  constructor(props) {
    super(props);
    this.state = {
      fileList: null,
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
      this.setState(prevState => ({
        fileList: [...this.prevState.fileList, event.target.files[0]]
      }));
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

  viewFile64 = () => {
    const reader = new FileReader();

    reader.onload = (event) => {{
      console.log(event.target.result)}
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

  // viewFileBase64 = (event) => {
  //   const file = this.state.file;
  //   if (file) {
  //     const reader = new FileReader();

  //     reader.readAsDataURL(this.state.file);
  //     reader.addEventListener('load', (event) => {
  //         const base64String = event.target.result.split(',')[1];
  //         const decodedContent = atob(base64String);
  //         const blob = new Blob([decodedContent], { type: 'application/pdf' });
  //         const url = URL.createObjectURL(blob);
  //         this.setState({
  //           isView: false,
  //           isView64: true,
  //           pdfUrl: url
  //         })
  //     }, false);
  //   }
  // };


  render() {
    return (
      <>
      <div>
          <input type="file" accept=".pdf" id="file" onChange={this.setUploadFile} /><br/>
          <button onClick={this.viewFile}>ファイルを表示</button><br/>
          {/* <button onClick={this.viewFileBase64}>ファイル内容を表示</button> */}
          {/* <textarea rows="10" cols="50" value={this.state.testsrc} readOnly />*/}
      </div> 
        {this.state.isView && (
          <iframe src={this.state.testsrc} title="PDF Viewer" style={{ width: '80vw', height: '90vh' }} />
          // <embed type="application/pdf" src={this.testsrc}></embed>
        )}
      </>
    );
  }
}

export default PdfOld;
