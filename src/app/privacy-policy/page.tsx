'use client'

import React, { useState, useEffect } from 'react'

const PDFViewer = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent))
  }, [])

  const handleLoadError = () => {
    setError('Failed to load PDF')
    setIsLoading(false)
  }

  return (
    <div className="pdf-container">
      {isMobile ? (
        <div className="pdf-mobile-notice">
          <p>For best viewing experience:</p>
          <a href="/privacy-policy.pdf" download className="pdf-download-link">
            Download PDF
          </a>
          <p>or</p>
          <a 
            href="/privacy-policy.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="pdf-open-link"
          >
            Open PDF in new tab
          </a>
        </div>
      ) : (
        <iframe
          src={`/privacy-policy.pdf#view=FitH&scrollbar=1&toolbar=1`}
          title="PDF Viewer"
          className="pdf-viewer"
          onLoad={() => setIsLoading(false)}
          onError={handleLoadError}
        />
      )}

      {isLoading && <div className="pdf-loading">Loading PDF...</div>}
      {error && <div className="pdf-error">{error}</div>}

      <style jsx>{`
        .pdf-container {
          width: 100%;
          height: 100vh;
          position: relative;
        }
        .pdf-viewer {
          width: 100%;
          height: 100%;
          border: none;
          overflow: auto;
          -webkit-overflow-scrolling: touch;
        }
        .pdf-mobile-notice {
          padding: 20px;
          text-align: center;
        }
        .pdf-download-link,
        .pdf-open-link {
          display: block;
          margin: 10px auto;
          padding: 12px 20px;
          background: #007AFF;
          color: white;
          text-decoration: none;
          border-radius: 6px;
          max-width: 200px;
        }
        .pdf-loading {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        .pdf-error {
          position: absolute;
          top: 60%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: red;
        }
      `}</style>
    </div>
  )
}

export default PDFViewer
