import React, { useCallback, useEffect, useState } from "react";
import './App.css';

const SampleCodes = [
  {
    key: "8QYE6C",
    expectedValue: "8QYE6C",
    src: "qr_8QYE6C.png"
  },
  {
    key: "google.com",
    expectedValue: "google.com",
    src: "qr_google_dot_com.png"
  },
  {
    key: "loremipsum",
    expectedValue: "loremipsum",
    src: "qr_loremipsum.png"
  },
  {
    key: "cocoon_code",
    expectedValue: "https://shopifybookings.com/users/8QYE6C",
    src: "cocoon_code.png"
  }
];

function App() {
  const [scanResults, setScanResults] = useState([]);
  const clearAllScanResults = () => setScanResults([]);
  const appendScanResult = (value) => setScanResults((prev) =>{
    if (prev.length > 0) {
      const head = prev.slice(0, prev.length - 1);
      return [...head, prev[prev.length - 1] + value];
    } else {
      return [value];
    }
  });

  const handleInput = useCallback((e) => {
    const value = e.key;   
      if (value === "Enter") {
        setScanResults((prev) => [...prev, ""]);
      } else {
        appendScanResult(value);
      }
  }, []);
  

  useEffect(() => {
    // Barcode scanner is set up as a keyboard input device
    // so it will send a keypress event for each character when a barcode / qr code is scanned
    // The Enter key is used to indicate the end of a scan

    window.addEventListener("keypress", handleInput);

    return () => {
      window.removeEventListener("keypress", handleInput);
    }
  }, [handleInput]);
  
  return (
    <div className="App">
      <header className="App-header">
        <h1>Check-In</h1>
      </header>
      <main className="App-body">
        <h3>Scan Results:</h3>

        <ul>
          {scanResults.map((result, index) => result ? (
            <li key={index}>{result}</li>
          ) : null)}
        </ul>

        
        <button onClick={clearAllScanResults}>Clear</button>
        
        {SampleCodes.map(({ expectedValue, key, src }) => (
          <div style={styles.imageContainer} key={key}>
            <img src={src} alt={expectedValue} width="300" />
            <p>Expected Value: {expectedValue}</p>
          </div>
        ))}
      </main>
    </div>
  );
}

const styles = {
  main: {
    display: "flex",
    flexDirection: "column",
  },
  imageContainer: {
    margin: "2rem",
  }
}


export default App;
