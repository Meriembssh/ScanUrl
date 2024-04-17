import React from 'react';
import '../styles/ResultPage.css';

function LinkList({ links }) {
  // Check if 'links' is an object and convert it to an array using Object.values()
  if (typeof links === 'object' && links !== null && !Array.isArray(links)) {
    links = Object.values(links);
  }

  // Now 'links' is definitely an array and we can map over it
  return (
    <ul className="links-list">
      {links.map((link, index) => (
        <li key={index}>
          <a href={link} target="_blank" rel="noopener noreferrer">{link}</a>
        </li>
      ))}
    </ul>
  );
}


function ResultPage({ url, data }) {
  if (!data || Object.keys(data).length === 0) {
    return <div className="results-container">No results available</div>;
  }

  const results = Object.entries(data);

  const renderValue = (attribute, value) => {
    if (attribute === 'links_found') {
      return <LinkList links={value} />;
    }
    return typeof value === 'string' ? value : JSON.stringify(value, null, 2);
  };

  return (
    <div className="results-container">
      <div className="table-container">
        <table>
          <thead>
            <tr className="table-header-row">
              <th colSpan="2">
		<div className="header-content">
                  <span className="header-title">Result for the scan of {url}</span>
		  <a href="/">                
		  <button className="scan-again-button">Scan Again</button>
                  </a>
                </div>
	      </th>
            </tr>
            <tr className="attribute-header-row">
              <th>Attribute</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {results.map(([attribute, value], index) => (
              <tr key={index} className={index % 2 === 0 ? "even-row" : "odd-row"}>
                <td>{attribute}</td>
                <td>{renderValue(attribute, value)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ResultPage;

