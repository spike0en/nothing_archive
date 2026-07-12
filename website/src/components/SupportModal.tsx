import React, { useState, useEffect } from 'react';
import { FaCopy, FaCheck, FaTimes, FaExternalLinkAlt, FaHeart } from 'react-icons/fa';
import donationsData from '../data/donations.json';
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
          <p className={styles.introText}>
            Nothing Archive is a community-driven initiative and will always remain completely free to use. However, keeping this platform online involves ongoing server hosting expenses for self hosted runners and running the backend pipelines that continuously fetch and process firmware updates. Contributions are entirely optional, but if you'd like to help cover these resource costs and motivate continued efforts for maintainers for their time put in for the community, any support is deeply appreciated!
          </p>

          <div className={styles.contentLayout}>
            <div className={styles.leftColumn}>
              <h3 className={styles.columnTitle}>Payment Methods</h3>
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
              <h3 className={styles.columnTitle}>Crypto (All Coins)</h3>
              <div className={styles.iframeCard}>
                <iframe
                  src="https://nowpayments.io/embeds/donation-widget?api_key=5c5ff9c5-3853-4097-9453-03f55ea87d34"
                  width="346"
                  height="623"
                  frameBorder="0"
                  scrolling="no"
                  style={{ overflowY: 'hidden', display: 'block', margin: '0 auto', borderRadius: '14px' }}
                  title="NOWPayments Donation Widget"
                >
                  Can't load widget
                </iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
