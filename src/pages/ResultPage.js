// ResultPage.js

import React from 'react';
import '../styles/ResultPage.css';

function ResultPage({ url, data }) {
  const results = Object.entries(data);

  return (
    <div className="results-container">
      <div className="title">
        <h1>{`Result for the scan of ${url}`}</h1>
        <button className="scan-again-button">Scan Again</button>
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Attribute</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {results.map(([attribute, value], index) => (
              <tr key={index}>
                <td>{attribute}</td>
                <td>{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ResultPage;


