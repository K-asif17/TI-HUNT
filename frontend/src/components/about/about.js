import React, { useState } from "react";
import "./about.css";
import logo from "../../assets/cyveon.jpeg";

function AboutPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // Later: send data to backend
    e.target.reset();
  };

  return (
    <div className="about-wrapper">
      <div className="about-header">
        <img src={logo} alt="TI-HUNT Logo" className="logo" />
        <h1>TI-HUNT</h1>
        <p className="tagline">Threat Intelligence-Driven Hunting Platform</p>
      </div>

      <section className="about-section">
        <h2>🔎 What is TI-HUNT?</h2>
        <p>
          <strong>TI-HUNT</strong> is a centralized threat detection and analysis platform that empowers
          security teams, students, and researchers to proactively identify, scan, and respond to
          cyber threats using real-time threat intelligence and behavioral data.
        </p>
      </section>

      <section className="about-section">
        <h2>🚀 Key Features</h2>
        <ul className="feature-list">
          <li>🧠 <strong>IP Scanner:</strong> Analyze IP reputation and detect known malicious addresses.</li>
          <li>🌐 <strong>URL Scanner:</strong> Identify phishing or redirect-based threats from URLs.</li>
          <li>🔐 <strong>Hash Scanner:</strong> Detect known malware using file hash lookups.</li>
          <li>📄 <strong>Log File Analysis:</strong> Upload and analyze logs to extract IOCs and anomalies.</li>
          <li>📡 <strong>Threat Feed Aggregator:</strong> Real-time IOC feeds from AlienVault, AbuseIPDB, etc.</li>
          <li>📊 <strong>Interactive Dashboard:</strong> Visual summaries of threat data and scan results.</li>
          <li>🧩 <strong>IOC Filtering:</strong> Filter data by IP, domain, hash and confidence score.</li>
          <li>📤 <strong>CSV Export:</strong> Export reports and filtered results to CSV files.</li>
        </ul>
      </section>

      <section className="about-section roadmap">
        <h2>📈 What’s Next?</h2>
        <p>
          We're actively improving TI-HUNT. More powerful features are coming soon including YARA scanning,
          MITRE ATT&CK mapping, email alerts, and SIEM integrations.
        </p>
      </section>

      <section className="about-section">
        <h2>📬 Feedback & Contact</h2>
        <p>
          Have a suggestion or found a bug? Reach out at:{" "}
          <a href="mailto:kasif.cyberdev@example.com">kasif.cyberdev@example.com</a>
        </p>
        <p>You can also submit feedback below 👇</p>
  
  <form className="contact-form">
    <label htmlFor="name">Your Name</label>
    <input type="text" id="name" placeholder="John Doe" />

    <label htmlFor="email">Your Email</label>
    <input type="email" id="email" placeholder="john@example.com" />

    <label htmlFor="message">Message</label>
    <textarea id="message" rows="4" placeholder="Write your message here..."></textarea>

    <button type="submit">Send Feedback</button>
  </form>
</section>


      <footer className="about-footer">
        <p>© 2025 TI-HUNT | Developed by Kasif</p>
        <p className="contact">Stay Secure. Stay Aware.</p>
      </footer>
    </div>
  );
}

export default AboutPage;
