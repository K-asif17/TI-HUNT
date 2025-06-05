import React, { useState } from "react";
import "./ipscan.css";
import logo from "../../assets/cyveon.jpeg";

const IPScanner = () => {
  const [ip, setIp] = useState("");
  const [crowdsourcedContext, setCrowdsourcedContext] = useState([]);
  const [analysisStats, setAnalysisStats] = useState(null);
  const [loading, setLoading] = useState(false);

  const statusColors = {
    harmless: "#28a745",
    malicious: "#dc3545",
    suspicious: "#ffc107",
    timeout: "#6c757d",
    undetected: "#17a2b8",
  };

  const handleSearch = async () => {
    if (!ip.trim()) {
      alert("Please enter an IP address.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/scan-ip", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ip }),
      });

      const data = await response.json();
      console.log("API Response:", data);

      if (data.error) {
        alert("Error: " + data.error);
        setAnalysisStats(null);
        setCrowdsourcedContext([]);
      } else {
        setCrowdsourcedContext(data.crowdsourced_context || []);
        setAnalysisStats(data.last_analysis_stats || null);
      }
    } catch (error) {
      alert("Error fetching IP scan result.");
      console.error(error);
    }
    setLoading(false);
  };

  const handleReset = () => {
    setIp("");
    setCrowdsourcedContext([]);
    setAnalysisStats(null);
  };

  return (
    <div className="ip-wrapper">
      <div className="ip-container">
        <img src={logo} alt="TI-HUNT Logo" className="logo" />
        <h1>TI-HUNT IP Scanner</h1>

        <div className="search-box">
          <input
            type="text"
            value={ip}
            onChange={(e) => setIp(e.target.value)}
            placeholder="Enter IP address"
            autoComplete="off"
          />
          <div className="button-group">
            <button onClick={handleSearch}>Search</button>
            <button onClick={handleReset} className="reset-btn">Reset</button>
          </div>
        </div>

        {loading && <p className="loading">🔍 Scanning IP address...</p>}

        {(analysisStats || crowdsourcedContext.length > 0) ? (
          <div className="results-container">
            {analysisStats && (
              <div className="result-box">
                <h3>Last Analysis Stats</h3>
                <table>
                  <thead>
                    <tr>
                      <th>Status</th>
                      <th>Count</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(analysisStats).map(([key, value]) => (
                      <tr
                        key={key}
                        style={{ backgroundColor: statusColors[key.toLowerCase()] + "22" }}
                      >
                        <td>{key}</td>
                        <td style={{ color: statusColors[key.toLowerCase()] }}>{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {crowdsourcedContext.length > 0 && (
              <div className="result-box">
                <h3>Crowdsourced Context</h3>
                <ul>
                  {crowdsourcedContext.map((item, index) => {
                    const severityClass = item.severity
                      ? `severity-${item.severity.toLowerCase()}`
                      : "";

                    return (
                      <li key={index} className={severityClass}>
                        <strong>Title:</strong> {item.title || "N/A"}<br />
                        <strong>Details:</strong> {item.details || "N/A"}<br />
                        <strong>Source:</strong> {item.source || "N/A"}<br />
                        <strong>Severity:</strong>{" "}
                        <span className={`severity-icon ${item.severity?.toLowerCase()}`}>
                          {item.severity === "high" && "🔴"}
                          {item.severity === "medium" && "🟠"}
                          {item.severity === "low" && "🟢"}
                        </span>
                        {item.severity || "N/A"}
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
        ) : (
          !loading && <p className="no-results">No results to display. Please search for an IP address.</p>
        )}
      </div>
    </div>
  );
};

export default IPScanner;
