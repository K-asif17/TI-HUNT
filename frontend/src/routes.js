import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/login'; // make sure this path is correct
import LogAnalysisPage from './components/mainpage/mainpage';
import IPScanner from './components/IPSCAN/ipscan';
import URLScanner from './components/URLSCAN/urlscan';
import HashScanner from './components/HASH/hashscan';
import ThreatFeedPage from './components/ThreatFeed/threatfeed';
import AboutPage from './components/about/about';
import Results from './components/result/result';

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        {/* You can add more routes here later */}
        <Route path="/main" element={<LogAnalysisPage />} />
        <Route path="/ipscan" element={<IPScanner />} />
        <Route path="/urlscan" element={<URLScanner />} />
       <Route path="/hashscan" element={<HashScanner/>}/> 
       <Route path="/threatfeed" element={<ThreatFeedPage />} /> 
       <Route path="/about" element={<AboutPage />} />  
       <Route path="/results" element={<Results />} />  
       </Routes>
    </Router>
  );
}

export default AppRoutes;
