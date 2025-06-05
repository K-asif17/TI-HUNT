import React, { useState } from 'react';
import './mainpage.css';
import cyveonLogo from '../../assets/cyveon.jpeg';

function LogAnalysisPage() {
  const [fileUploaded, setFileUploaded] = useState(false);
  const [isScanning, setIsScanning] = useState(false);

  const handleFileUpload = (file) => {
    if (file) {
      setIsScanning(true);
      setTimeout(() => {
        setIsScanning(false);
        setFileUploaded(true);
      }, 3000);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    handleFileUpload(e.dataTransfer.files[0]);
  };

  return (
    <div className="page-wrapper">
      <nav className="navbar">
        <div className="nav-brand">
          <img src={cyveonLogo} alt="TI-Hunt Logo" className="logo" />
          <h1>TI-Hunt</h1>
        </div>
        <div className="profile">
          <button className="profile-btn" title="Profile">
            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </button>
        </div>
      </nav>

      <div className="container">
        <aside className="sidebar">
          <ul>
            <li><a href="/ipscan">IP Scanning</a></li>
            <li><a href="/urlscan">URL Scanning</a></li>
            <li><a href="/hashscan">HASH Scanning</a></li>
            <li><a href="/community">Community Forum</a></li>
          </ul>
          <a href="/logout" className="logout">Logout</a>
        </aside>

        <main className="main-content">
          <section className="log-analysis">
            <h2>Log File Analysis</h2>
            <p className="description">Upload your log file to scan for threats and vulnerabilities</p>

            <div
              className="upload-container"
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
            >
              <div className={`upload-area ${fileUploaded ? 'hidden' : ''}`}>
                <svg viewBox="0 0 24 24" width="48" height="48" stroke="currentColor" strokeWidth="2" fill="none">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
                <p>Drag and drop your file here or</p>
                <label htmlFor="fileInput" className="upload-btn">Choose File</label>
                <input
                  type="file"
                  id="fileInput"
                  accept=".log,.txt"
                  hidden
                  onChange={(e) => handleFileUpload(e.target.files[0])}
                />
              </div>
            </div>

            {isScanning && (
              <div className="scanning-animation">
                <div className="spinner"></div>
                <p>Analyzing log file...</p>
                <div className="progress-bar">
                  <div className="progress"></div>
                </div>
              </div>
            )}

            {!isScanning && fileUploaded && (
              <div className="results">
                <p>Scan completed. Results will be displayed here.</p>
                {/* Add dynamic result rendering later */}
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}

export default LogAnalysisPage;
