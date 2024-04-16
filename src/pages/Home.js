import React, { useState } from 'react';
import '../App.css';
import ProgressPage from './ProgressPage';
import ResultPage from './ResultPage';
import Logo from '../logo-no-background.png';
import axios from 'axios'; 

function Home() {
  const [scanning, setScanning] = useState(false);
  const [url, setUrl] = useState('');
  const [depth, setDepth] = useState(0);
  const [results, setResults] = useState([]);
  const [urlError, setUrlError] = useState('');
  const [depthError, setDepthError] = useState('');

  const handleScan = async () => {
    console.log('Starting scan...');
    if (!isValidUrl(url)) {
      setUrlError('A valid URL needs to be entered before scanning.');
      console.log('Invalid URL:', url);
      return;
    }

    if (depth < 0 || depth > 100) {
      setDepthError('Depth must be between 0 and 100.');
      console.log('Invalid depth:', depth);
      return;
    }

    setScanning(true);
    console.log('Scanning...');

    try {
	const formData = new URLSearchParams();
	formData.append('url', url);
	formData.append('depth', depth);  
        const response = await axios.post(
        'http://10.130.163.33:8000/start_worker', 
        formData,
	{
	headers: {
		'Content-Type': 'application/x-www-form-urlencoded',
		'Access-Control-Allow-Origin': '*'
	         }
        }
      );

      console.log('Scan response:', response.data);
      await waitForScanCompletion(response.data.id);
    } catch (error) {
      console.error('Error during scan:', error);
    } finally {
      setScanning(false);
    }
  };

  const isValidUrl = (url) => {
    const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w.-]*)*\/?$/;
    return urlPattern.test(url);
  };

  const waitForScanCompletion = async () => {
    console.log('Waiting for scan completion...');
    const poll = async () => {
      try {
        const response = axios.get(`http://10.130.163.33:8000/stats`);
	
	console.log(response.data);
        if (response.data && 'scanstate' in response.data && response.data.scanstate === 0) {
          console.log(response.data);
		console.log(response);
		return false;
        } else {
          setResults(response.data);
	  console.log(response.data);
          return true;
        }
      } catch (error) {
        console.error('Error while polling for scan completion:', error);
        return false;
      }
    };

    const pollInterval = 1000;

    while (true) {
      const scanComplete = await poll();
      if (scanComplete) {
        console.log('Scan completed.');
        return;
      }
      await new Promise(resolve => setTimeout(resolve, pollInterval));
    }
  };

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
    setUrlError('');
  };

  const handleDepthChange = (e) => {
    const newDepth = parseInt(e.target.value, 10);
    if (!isNaN(newDepth)) { // Check if newDepth is a valid number
      setDepth(newDepth);
      setDepthError('');
    } else {
      setDepthError('Depth must be a valid number.'); // Display an error message for invalid input
    }
  };
  
  return (
    <div className="App">
      {scanning ? (
        <ProgressPage url={url} />
      ) : (
        results.length > 0 ? (
          <ResultPage results={results} />
        ) : (
          <div className="container">
            <div className="background-shapes"></div>
            <div className="content">
              <div className="header">
                <img src={Logo} alt="" id='logo'></img>
                <p>Enter a URL below to scan</p>
              </div>
              <div className="search-bar">
                <input
                  type="text"
                  placeholder="Enter URL to scan"
                  value={url}
                  onChange={handleUrlChange}
                  className="url-input"
                />
                <input
                  type="number"
                  placeholder="Depth"
                  min="0"
                  value={depth}
                  onChange={handleDepthChange}
                  className="depth-input"
                />
                <button onClick={handleScan}>Scan</button>
              </div>
              {urlError && <p className="error">{urlError}</p>}
              {depthError && <p className="error">{depthError}</p>}
            </div>
          </div>
        )
      )}
    </div>
  );
}

export default Home;
