import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WowMomentsApp from './WowMomentsApp';
import GTMNoScript from './GTMNoScript';
import { PrivacyPolicy, TermsOfService, CookieConsentBanner } from './components/legal';
import CoreMetricsTracking from './components/CoreMetricsTracking';

function App() {
  return (
    <Router>
      <div className="App">
        <CoreMetricsTracking />
        <GTMNoScript />
        <Routes>
          <Route path="/" element={<WowMomentsApp />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
        </Routes>
        <CookieConsentBanner />
      </div>
    </Router>
  );
}

export default App;