import logo from '../logo.svg';
import helloimg from '../assets/hello.png';

function HelloWorld() {
  return (
    // <header className="App-header">
    <>
      <img src={helloimg} className="App-logo" alt="logo" />
      <p>
        Hello, world! <br />
      </p>
      {/* <p>
          Edit <code>src/App.js</code> and save to reload.
        </p> */}
      {/* <a
        className="App-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn React
      </a> */}
      <a
        className="App-link"
        href="/pdf"
        target="_blank"
        rel="noopener noreferrer"
      >
        PDFをベース64エンコードへ
      </a>
    </>
    // </header>
  );
}

export default HelloWorld;
