import React from 'react';

function Report() {
  const pdfUrl = "./Rapport_Docker_3.pdf";  // Update this path to where your PDF file is located

  return (
    <div className="report-page">
      <div className="report-content">
        <iframe
          src={pdfUrl}
          style={{ width: '100%', height: '500px', border: 'none' }}
          title="PDF in iframe"
        >
          This browser does not support PDFs. Please download the PDF to view it: <a href={pdfUrl}>Download PDF</a>.
        </iframe>
      </div>
    </div>
  );
}

export default Report;

