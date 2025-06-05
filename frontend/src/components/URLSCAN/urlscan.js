import React, { useState } from "react";
import "./urlscan.css"; // Reusing the same CSS
import logo from "../../assets/cyveon.jpeg";

const URLScanner = () => {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const statusColors = {
    harmless: "#28a745",
    malicious: "#dc3545",
    suspicious: "#ffc107",
    timeout: "#6c757d",
    undetected: "#17a2b8",
  };

  const handleScan = async () => {
    if (!url.trim()) {
      alert("Please enter a URL.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/scan-url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();
      console.log("Scan Result:", data);

      if (data.error) {
        alert("Error: " + data.error);
        setResult(null);
      } else {
        setResult(data);
      }
    } catch (error) {
      alert("Error fetching URL scan result.");
      console.error(error);
    }
    setLoading(false);
  };

  const handleReset = () => {
    setUrl("");
    setResult(null);
  };

  return (
    <div className="ip-wrapper">
      <div className="ip-container">
        <img src={logo} alt="TI-HUNT Logo" className="logo" />
        <h1>TI-HUNT URL Scanner</h1>

        <div className="search-box">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter URL (e.g., https://example.com)"
            autoComplete="off"
          />
          <div className="button-group">
            <button onClick={handleScan}>Search</button>
            <button onClick={handleReset} className="reset-btn">Reset</button>
          </div>
        </div>

        {loading && <p className="loading">🔍 Scanning URL...</p>}

        {result ? (
          <div className="results-container">
            {result.last_analysis_stats && (
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
                    {Object.entries(result.last_analysis_stats).map(([key, value]) => (
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

            {result.crowdsourced_context && result.crowdsourced_context.length > 0 && (
              <div className="result-box">
                <h3>Crowdsourced Context</h3>
                <ul>
                  {result.crowdsourced_context.map((item, index) => {
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
          !loading && <p className="no-results">No results to display. Please search for a URL.</p>
        )}
      </div>
    </div>
  );
};

export default URLScanner;
