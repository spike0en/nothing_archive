import React, { useState, useEffect, useRef } from 'react';
import { FaCopy, FaCheck, FaTimes, FaExternalLinkAlt, FaHeart } from 'react-icons/fa';
import donationsData from '../data/donations.json';
import donorsData from '../data/donors.json';
import SupporterWidget from './SupporterWidget';
import styles from './SupportModal.module.css';

interface DonationChannel {
  id: string;
  category: string;
  title: string;
  description?: string;
  address: string;
  extraInfo?: string;
  proofUrl?: string;
  buttonText?: string;
}

interface SupportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SupportModal({ isOpen, onClose }: SupportModalProps): React.JSX.Element | null {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [iframeLoading, setIframeLoading] = useState(true);
  const [scale, setScale] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  // Track and scale NOWPayments iframe to fit mobile viewport
  useEffect(() => {
    if (!isOpen || typeof window === 'undefined') return;

    const updateScale = () => {
      if (containerRef.current) {
        const width = containerRef.current.clientWidth;
        if (width > 0 && width < 346) {
          setScale(width / 346);
        } else {
          setScale(1);
        }
      }
    };

    updateScale();

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined' && containerRef.current) {
      resizeObserver = new ResizeObserver(() => {
        updateScale();
      });
      resizeObserver.observe(containerRef.current);
    } else {
      window.addEventListener('resize', updateScale);
    }

    const timer = setTimeout(updateScale, 100);

    return () => {
      clearTimeout(timer);
      if (resizeObserver) {
        resizeObserver.disconnect();
      } else {
        window.removeEventListener('resize', updateScale);
      }
    };
  }, [isOpen]);

  // Disable body scroll when modal is open
  useEffect(() => {
    if (typeof document === 'undefined') return;
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Escape key listener to close modal
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCopy = (id: string, text: string) => {
    if (typeof navigator === 'undefined' || !navigator.clipboard) return;
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }).catch(err => {
      console.error('Failed to copy address: ', err);
    });
  };

  return (
    <div
      className={styles.overlay}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="support-modal-title"
    >
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <div className={styles.header}>
          <div className={styles.headerTitleGroup}>
            <FaHeart className={styles.heartIcon} size={14} />
            <h2 id="support-modal-title" className={styles.title}>SUPPORT THE PROJECT</h2>
          </div>
          <button
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Close dialogue"
          >
            <FaTimes size={18} />
          </button>
        </div>
        
        <div className={styles.body}>
          <div className={styles.introContainer}>
            <div className={styles.introText}>
              <p>
                Nothing Archive is a community-driven project. Keeping it up to date and relevant takes time, effort, and ongoing costs (where applicable). If you've benefited from the archive and would like to support it, your donation helps cover these costs and allows the project to keep growing.
              </p>
              <p>
                Donations are completely optional, and every contribution is sincerely appreciated. 💛
              </p>
              <p>
                As a small thank-you, the supporters widget recognizes those who have made notable contributions. If you choose to support the project, your name can be featured there too.
              </p>
              <p>
                Thank you for being part of the journey!
              </p>
            </div>
            <SupporterWidget donors={donorsData} />
          </div>

          <h3 className={styles.donorsTitle}>
            <span className={styles.animatedEmoji}>💵</span> DONATION METHODS
          </h3>

          <div className={styles.contentLayout}>
            <div className={styles.leftColumn}>
              <div className={styles.stack}>
                {(donationsData as DonationChannel[]).map((channel) => (
                  <div key={channel.id} className={styles.card}>
                    <h3 className={styles.cardTitle}>{channel.title}</h3>
                    {channel.description && <p className={styles.cardDesc}>{channel.description}</p>}
                    
                    <div className={styles.addressContainer}>
                      <div className={styles.addressField}>
                        <input
                          type="text"
                          readOnly
                          value={channel.address}
                          className={styles.addressInput}
                          onClick={(e) => (e.target as HTMLInputElement).select()}
                          aria-label={`${channel.title} payment address`}
                        />
                        <button
                          className={`${styles.copyBtn} ${copiedId === channel.id ? styles.copied : ''}`}
                          onClick={() => handleCopy(channel.id, channel.address)}
                          title="Copy Address"
                          aria-label={`Copy ${channel.title} address`}
                        >
                          {copiedId === channel.id ? <FaCheck size={12} /> : <FaCopy size={12} />}
                        </button>
                      </div>
                    </div>

                    {channel.extraInfo && (
                      <div className={styles.extraInfo}>{channel.extraInfo}</div>
                    )}

                    {channel.proofUrl && (
                      <a
                        href={channel.proofUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.paidBtn}
                      >
                        <span>{channel.buttonText || 'Share Confirmation'}</span>
                        <FaExternalLinkAlt size={10} className={styles.btnIcon} />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.rightColumn}>
              <div className={`${styles.card} ${styles.cryptoCard}`}>
                <h3 className={styles.cardTitle}>NOWPayments</h3>
                <p className={styles.cardDesc}>
                  Donate securely using any major cryptocurrency via NOWPayments.
                </p>
                <div 
                  ref={containerRef} 
                  className={styles.iframeWrapper}
                  style={{
                    height: scale < 1 ? `${615 * scale}px` : '615px'
                  }}
                >
                  {iframeLoading && (
                    <div className={styles.spinnerContainer}>
                      <div className={styles.spinner} />
                      <span className={styles.spinnerText}>Loading Widget...</span>
                    </div>
                  )}
                  <iframe
                    src="https://nowpayments.io/embeds/donation-widget?api_key=5c5ff9c5-3853-4097-9453-03f55ea87d34"
                    width="346"
                    height="615"
                    frameBorder="0"
                    scrolling="no"
                    style={{ 
                      position: 'absolute',
                      left: '50%',
                      top: 0,
                      overflowY: 'hidden', 
                      display: 'block', 
                      borderRadius: '14px',
                      opacity: iframeLoading ? 0 : 1,
                      transition: 'opacity 0.3s ease',
                      transform: `translate(-50%, 0) scale(${scale})`,
                      transformOrigin: 'top center'
                    }}
                    title="NOWPayments Donation Widget"
                    onLoad={() => setIframeLoading(false)}
                  >
                    Can't load widget
                  </iframe>
                </div>
              </div>
            </div>
          </div>


        </div>
      </div>
    </div>
  );
}
