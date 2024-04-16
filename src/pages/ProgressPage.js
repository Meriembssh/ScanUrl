import React from 'react';
import '../styles/ProgressPage.css'; // Import CSS file for styling

function ProgressPage({ url, scanTime }) {
  return (
    <div className="progress-container">
      <div className="content">
        <div className="header">
          <h1>Scanning {url}</h1>
          <p className="info-text">This operation can take a moment. Do not refresh the page.</p>
        </div>
        <div className="progress-bar" style={{ animationDuration: `${scanTime}ms` }}></div>
      </div>
    </div>
  );
}

export default ProgressPage;

