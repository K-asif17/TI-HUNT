import React, { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import axios from "axios";
import "./threatfeed.css";

function ThreatFeedPage() {
  const [feeds, setFeeds] = useState([]);
  const [filteredFeeds, setFilteredFeeds] = useState([]);
  const [iocType, setIocType] = useState("");
  const [highConfidence, setHighConfidence] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // === Fetch from Flask Backend ===
  useEffect(() => {
    const fetchFeeds = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/threat-feed");
        const backendFeeds = response.data;

        // Normalize backend format to expected frontend format
        const formattedFeeds = backendFeeds.map((item) => ({
          ioc: item.Indicator,
          type: item.Type.toLowerCase(),
          threat_type: item.Threat || "Unknown",
          confidence: item.Confidence === "High" ? 90 : 60,
          first_seen: item["First Seen"] || "-",
          last_seen: item["Last Seen"] || "-"
        }));

        setFeeds(formattedFeeds);
        setFilteredFeeds(formattedFeeds);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch threat feeds:", err);
        setError("Failed to load threat feed data.");
        setLoading(false);
      }
    };

    fetchFeeds();
  }, []);

  // === Filtering Logic ===
  useEffect(() => {
    let result = [...feeds];

    if (iocType) {
      result = result.filter((item) => item.type === iocType);
    }

    if (highConfidence) {
      result = result.filter((item) => item.confidence >= 85);
    }

    setFilteredFeeds(result);
  }, [iocType, highConfidence, feeds]);

  return (
    <div className="feed-wrapper">
      <h2>🌐 Threat Feed Aggregator</h2>

      <div className="filter-bar">
        <select onChange={(e) => setIocType(e.target.value)} value={iocType}>
          <option value="">All Types</option>
          <option value="ip">IP</option>
          <option value="domain">Domain</option>
          <option value="hash">Hash</option>
        </select>

        <label>
          <input
            type="checkbox"
            checked={highConfidence}
            onChange={(e) => setHighConfidence(e.target.checked)}
          />
          High Confidence Only
        </label>

        <CSVLink data={filteredFeeds} filename="threat_feeds.csv" className="export-btn">
          Export CSV
        </CSVLink>
      </div>

      {loading ? (
        <p>Loading threat feed...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
        <table className="feed-table">
          <thead>
            <tr>
              <th>IOC</th>
              <th>Type</th>
              <th>Threat</th>
              <th>Confidence</th>
              <th>First Seen</th>
              <th>Last Seen</th>
            </tr>
          </thead>
          <tbody>
            {filteredFeeds.map((item, index) => (
              <tr key={index}>
                <td>{item.ioc}</td>
                <td>{item.type}</td>
                <td>{item.threat_type}</td>
                <td>
                  <span
                    className={
                      item.confidence >= 90
                        ? "high"
                        : item.confidence >= 70
                        ? "medium"
                        : "low"
                    }
                  >
                    {item.confidence}
                  </span>
                </td>
                <td>{item.first_seen}</td>
                <td>{item.last_seen}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ThreatFeedPage;
