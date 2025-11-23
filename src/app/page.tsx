'use client';

import { useState } from 'react';
import VideoPlayer from '@/components/VideoPlayer';

interface VideoData {
  thumbnail: string;
  filename: string;
  size: string;
  downloadUrl: string;
}

export default function Home() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [videoData, setVideoData] = useState<VideoData | null>(null);
  const [showPlayer, setShowPlayer] = useState(false);
  const [thumbnailRevealed, setThumbnailRevealed] = useState(false);

  const handlePaste = async () => {
    try {
      // Check if clipboard API is available
      if (!navigator.clipboard || !navigator.clipboard.readText) {
        // Fallback: Show alert for manual paste
        alert('Please paste the URL manually. Clipboard access requires HTTPS on mobile devices.');
        return;
      }

      const text = await navigator.clipboard.readText();
      if (text) {
        setUrl(text);
      }
    } catch (err) {
      console.error('Failed to read clipboard:', err);
      // If permission denied or other error, show helpful message
      alert('Unable to access clipboard. Please paste the URL manually.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setVideoData(null);
    setShowPlayer(false);
    setThumbnailRevealed(false);

    if (!url.trim()) {
      setError('Please enter a TeraBox URL');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/resolve', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Enhanced error messages
        if (data.error?.includes('All APIs failed')) {
          throw new Error('⚠️ Link broken or changed. Video file not available. Note: Links with multiple files are not supported.');
        }
        throw new Error(data.error || 'Failed to resolve URL');
      }

      setVideoData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (videoData?.downloadUrl) {
      // Create a temporary anchor element to trigger download
      const link = document.createElement('a');
      link.href = videoData.downloadUrl;
      link.download = videoData.filename || 'video.mp4';
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleWatch = () => {
    setShowPlayer(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 animated-bg">
      {/* Animated Background Elements */}
      <div className="background-animation">
        <div className="floating-circle circle-1"></div>
        <div className="floating-circle circle-2"></div>
        <div className="floating-circle circle-3"></div>
        <div className="floating-circle circle-4"></div>
        <div className="floating-circle circle-5"></div>
      </div>

      <div className="container">
        <header className="header">
          <h1 className="title">
            <span className="title-gradient">TeraPlay</span>
          </h1>
          <p className="subtitle">Download & Watch TeraBox Videos Instantly</p>
          <div className="title-decoration">
            <span className="decoration-line"></span>
            <span className="decoration-dot"></span>
            <span className="decoration-line"></span>
          </div>
        </header>

        <main className="main-content">
          <form onSubmit={handleSubmit} className="form-container">
            <div className="input-wrapper">
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Paste your TeraBox URL here..."
                className="url-input"
                disabled={loading}
              />
              <button
                type="button"
                onClick={handlePaste}
                className="paste-button"
                disabled={loading}
                title="Paste from clipboard"
              >
                <svg className="paste-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </button>
              <button
                type="submit"
                disabled={loading}
                className="submit-button"
              >
                {loading ? (
                  <span className="loading-spinner"></span>
                ) : (
                  'Get Video'
                )}
              </button>
            </div>
          </form>

          {error && (
            <div className="error-message">
              <svg className="error-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="error-text">{error}</div>
            </div>
          )}

          {videoData && !showPlayer && (
            <div className="video-card">
              <div
                className={`video-thumbnail-wrapper ${!thumbnailRevealed ? 'spoiler-blur' : ''}`}
                onClick={() => setThumbnailRevealed(true)}
                style={{ cursor: thumbnailRevealed ? 'default' : 'pointer' }}
              >
                <img
                  src={videoData.thumbnail}
                  alt={videoData.filename}
                  className="video-thumbnail"
                />
                {!thumbnailRevealed && (
                  <div className="spoiler-overlay">
                    <svg className="eye-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    <p className="spoiler-text">Click to reveal thumbnail</p>
                  </div>
                )}
                {thumbnailRevealed && (
                  <div className="play-overlay">
                    <svg className="play-icon" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                    </svg>
                  </div>
                )}
              </div>

              <div className="video-info">
                <h2 className="video-filename">{videoData.filename}</h2>
                <p className="video-size">Size: {videoData.size}</p>

                <div className="button-group">
                  <button onClick={handleDownload} className="action-button download-button">
                    <svg className="button-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Download
                  </button>
                  <button onClick={handleWatch} className="action-button watch-button">
                    <svg className="button-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Watch Now
                  </button>
                </div>
              </div>
            </div>
          )}

          {showPlayer && videoData && (
            <div className="player-container">
              <button onClick={() => setShowPlayer(false)} className="back-button">
                <svg className="back-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Info
              </button>
              <VideoPlayer videoUrl={videoData.downloadUrl} thumbnail={videoData.thumbnail} />
            </div>
          )}
        </main>

        <footer className="footer">
          <p>Powered by TeraBox API • Made with ❤️</p>
        </footer>
      </div>
    </div>
  );
}
