import React, { useState } from 'react';

function Base64PdfViewer() {
  const [pdfUrl, setPdfUrl] = useState('');
  const [showPdf, setShowPdf] = useState(false);

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
  
      reader.onload = (event) => {
        const base64String = event.target.result.split(',')[1];
        // const decodedContent = atob(base64String);
        // const blob = new Blob([decodedContent], { type: 'application/pdf' });
        const blob = b64toBlob(base64String, 'application/pdf')
  
        const url = URL.createObjectURL(blob);
        setPdfUrl(url);
        setShowPdf(true);
      };
  
      reader.readAsDataURL(file);
    }

  };

  const b64toBlob = (b64Data, contentType='', sliceSize=512) => {
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
      
    const blob = new Blob(byteArrays, {type: contentType});
    return blob;
  }

  const handleClosePdf = () => {
    // setPdfUrl('');
    setShowPdf(false); // Hide the PDF viewer
  };

  const viewPdf = () => {
    setShowPdf(!showPdf); // Show the PDF viewer
  };

  return (
    <div>
      <input type="file" accept=".pdf" onChange={handleFileChange} />
      <button onClick={viewPdf}> {showPdf ? "ファイルを非表示" : "ファイルを表示"}</button><br/>
      {showPdf && (
        <>
          <a href='#' onClick={handleClosePdf}>Close</a>
          <iframe src={pdfUrl} title="PDF Viewer"  style={{ width: '80vw', height: '90vh' }}  />
        </>
      )}
    </div>
  );
}

export default Base64PdfViewer;