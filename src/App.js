import './App.css';
import Home from './components/HelloWorld';
import Pdf from './components/pdf/Pdf';
import Base64PdfViewer from './components/pdf/Base64PdfViewer';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" />
        <p>
          Hello, world! <br/>
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
        <Routes>
          <Route exact path="/" element={Home()} />
          <Route exact path="/helloworld" element={Home()} />
          <Route path="/pdf" Component={Pdf} />
          <Route path="/pdfviewer" element={Base64PdfViewer()} />
          <Route element={Home()} /> {/* This will render if no other route matches */}
        </Routes>
      </header>
    </div>
  );
}

export default App;
