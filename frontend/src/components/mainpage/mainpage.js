import React, { useState } from 'react';
import './mainpage.css';
import cyveonLogo from '../../assets/cyveon.jpeg';
import { useNavigate } from 'react-router-dom' // Ensure you have react-router-dom installed; 


function LogAnalysisPage() {
  const [fileUploaded, setFileUploaded] = useState(false);
  const [file, setFile] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [results, setResults] = useState(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  const navigate = useNavigate(); // ✅ ADD THIS LINE


  const handleFileUpload = async (selectedFile) => {
  if (!selectedFile) return;
  setFile(selectedFile);
  setIsScanning(true);
  setFileUploaded(false);

  const formData = new FormData();
  formData.append('file', selectedFile);

  try {
    const response = await fetch('http://127.0.0.1:5000/analyze-log', {
      method: 'POST',
      body: formData,
    });
    const data = await response.json();

    // ✅ Add filename and scan time
    const scanTime = new Date().toLocaleString();
    data.filename = selectedFile.name;
    data.scan_time = scanTime;

    setResults(data);
    setFileUploaded(true);
  } catch (error) {
    console.error('Error uploading file:', error);
  } finally {
    setIsScanning(false);
  }
};

  const handleDrop = (e) => {
    e.preventDefault();
    handleFileUpload(e.dataTransfer.files[0]);
  };

  const handleLogout = () => {
    window.location.href = '/';
  };

  const downloadPDF = async () => {
    if (!results) return alert("No results to download");

    try {
      const response = await fetch('http://127.0.0.1:5000/download-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(results),
        
      });

      if (!response.ok) throw new Error('Failed to download report');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = 'log_analysis_report.pdf';
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download error:', error);
      alert("Failed to download PDF report");
    }
  };

  return (
    
    <div className="page-wrapper">
      <nav className="navbar">
        <div className="nav-brand">
          <img src={cyveonLogo} alt="TI-Hunt Logo" className="logo" />
          <h1>TI-Hunt</h1>
        </div>
        <div className="nav-icons">
          <button className="about-btn" title="About" onClick={() => navigate('/about')}>
          <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none">
           <circle cx="12" cy="12" r="10" />
           <line x1="12" y1="16" x2="12" y2="12" />
           <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
          </button>

         

          

          <button className="profile-btn" title="Profile">
            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </button>
        </div>
      </nav>

      <button
        className="toggle-btn"
        onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
        aria-label="Toggle sidebar"
        title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{transform: 'rotate(90deg)'}}>
          <line x1="4" y1="4" x2="4" y2="20" />
          <line x1="12" y1="4" x2="12" y2="20" />
          <line x1="20" y1="4" x2="20" y2="20" />
        </svg>
      </button>

      <div className={`container ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
        <aside className={`sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}>
          <div className="sidebar-buttons">
            <button className="sidebar-button" onClick={() => window.location.href = '/ipscan'}>IP Scanning</button>
            <button className="sidebar-button" onClick={() => window.location.href = '/urlscan'}>URL Scanning</button>
            <button className="sidebar-button" onClick={() => window.location.href = '/hashscan'}>HASH Scanning</button>
            <button className="sidebar-button" onClick={() => window.location.href = '/threatfeed'}>Threat Feed</button>
          </div>
          <button className="logout" onClick={handleLogout}>Logout</button>
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
                {file && (
                  <div className="file-details">
                    <p className="file-name">Uploaded: {file.name} ({(file.size / 1024).toFixed(1)} KB)</p>
                    <button className="remove-btn" onClick={() => setFile(null)}>✖</button>
                  </div>
                )}
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

            {!isScanning && fileUploaded && results && (
              <div className="results-card">
                <h3>Scan Summary</h3>

                <button onClick={downloadPDF} className="download-btn">
                  📄 Download PDF Report
                </button>

                <div className="threat-category">
                  <h4>Critical Logs ({results.critical?.length || 0})</h4>
                  <ul>
                    {results.critical?.map((log, i) => (
                      <li key={`critical-${i}`}>{log}</li>
                    ))}
                  </ul>
                </div>

                <div className="threat-category">
                  <h4>Warning Logs ({results.warning?.length || 0})</h4>
                  <ul>
                    {results.warning?.map((log, i) => (
                      <li key={`warning-${i}`}>{log}</li>
                    ))}
                  </ul>
                </div>

                <div className="threat-category">
                  <h4>Info Logs ({results.info?.length || 0})</h4>
                  <ul>
                    {results.info?.map((log, i) => (
                      <li key={`info-${i}`}>{log}</li>
                    ))}
                  </ul>
                </div>

                <div className="ioc-results">
                  <h3>Extracted IOCs</h3>

                  {results.iocs?.ips?.length > 0 && (
                    <div className="ioc-block">
                      <h4>IP Addresses</h4>
                      <ul>
                        {results.iocs.ips.map((ip, i) => (
                          <li key={`ip-${i}`}>{ip}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {results.iocs?.urls?.length > 0 && (
                    <div className="ioc-block">
                      <h4>URLs</h4>
                      <ul>
                        {results.iocs.urls.map((url, i) => (
                          <li key={`url-${i}`}>{url}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {results.iocs?.hashes?.length > 0 && (
                    <div className="ioc-block">
                      <h4>Hashes</h4>
                      <ul>
                        {results.iocs.hashes.map((hash, i) => (
                          <li key={`hash-${i}`}>{hash}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}

export default LogAnalysisPage;
