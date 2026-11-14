import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { FaCopy, FaCheck, FaTimes, FaExternalLinkAlt } from 'react-icons/fa';
import { FaPaypal, FaIndianRupeeSign, FaMoneyBills, FaHandshake, FaClipboardList } from 'react-icons/fa6';
import donationsData from '../data/donations.json';
import donorsData from '../data/donors.json';
import SupporterWidget from './SupporterWidget';
import styles from './SupportModal.module.css';

interface DonationChannel {
  id: string;
  title: string;
  badge?: string;
  address: string;
  displayAddress?: string;
  directUrl?: string;
  proofUrl?: string;
  buttonText?: string;
}

interface SupportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SupportModal({ isOpen, onClose }: SupportModalProps): React.JSX.Element | null {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(isOpen);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsMounted(true);
      setIsExiting(false);
    } else if (isMounted) {
      setIsExiting(true);
      // 200ms matches exit animation duration before unmounting from DOM.
      const timer = setTimeout(() => {
        setIsMounted(false);
        setIsExiting(false);
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [isOpen, isMounted]);

  useEffect(() => {
    if (globalThis.document === undefined) return;
    if (isMounted) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMounted]);

  useEffect(() => {
    if (globalThis.window === undefined) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen && !isExiting) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isExiting, onClose]);

  if (!isMounted) return null;

  const handleCopy = (id: string, text: string) => {
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);

    if (globalThis.navigator !== undefined && globalThis.navigator.clipboard) {
      globalThis.navigator.clipboard.writeText(text).catch(() => {
        try {
          const textarea = document.createElement('textarea');
          textarea.value = text;
          textarea.style.position = 'fixed';
          textarea.style.opacity = '0';
          document.body.appendChild(textarea);
          textarea.select();
          document.execCommand('copy');
          document.body.removeChild(textarea);
        } catch {
          // Ignore fallback failure when document copy command is not supported.
        }
      });
    }
  };

  // SAFETY: Bundled static JSON matches the DonationChannel interface schema.
  const channels = donationsData as DonationChannel[];

  return (
    <div
      className={clsx(styles.overlay, isExiting && styles.overlayExiting)}
      onClick={() => {
        if (!isExiting) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="support-modal-title"
    >
      <div className={clsx(styles.modal, isExiting && styles.modalExiting)} onClick={e => e.stopPropagation()}>
        <div className={styles.header}>
          <div className={styles.headerTitleGroup}>
            <span className={styles.headerIcon} aria-hidden="true">
              <FaHandshake size={15} />
            </span>
            <h2 id="support-modal-title" className={styles.title}>SUPPORT THE PROJECT</h2>
          </div>
          <button
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Close dialog"
          >
            <FaTimes size={14} aria-hidden="true" />
          </button>
        </div>

        <div className={styles.body}>
          <div className={styles.introContainer}>
            <p className={styles.introText}>
              Nothing Archive is community-run. Keeping everything current takes real time and upkeep, from domain renewals and automated workflows to cloud compute, bandwidth, and heavy storage drive wear.
            </p>
            <p className={styles.subText}>
              If the archive has been useful to you, chipping in helps keep the infrastructure online. Donations are completely optional. Thank you for supporting the project.
            </p>

            <div className={styles.formCallout}>
              <div className={styles.formCalloutContent}>
                <span className={styles.formCalloutIcon} aria-hidden="true">
                  <FaClipboardList size={18} />
                </span>
                <div className={styles.formCalloutTextGroup}>
                  <h4 className={styles.formCalloutTitle}>Already donated?</h4>
                  <p className={styles.formCalloutSub}>
                    Fill out our supporter form so we can track your donation and feature you on the widget below.
                  </p>
                </div>
              </div>
              <a
                href="https://forms.gle/krJQjc5XshNaGSF58"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.formCalloutBtn}
                title="Fill Donation Tracking Form"
              >
                <span>Fill Form</span>
                <FaExternalLinkAlt size={10} className={styles.btnIcon} />
              </a>
            </div>

            <SupporterWidget donors={donorsData} />
          </div>

          <div className={styles.methodsSection}>
            <div className={styles.methodsHeader}>
              <span className={styles.methodsIcon} aria-hidden="true">
                <FaMoneyBills size={14} />
              </span>
              <h3 className={styles.methodsTitle}>DONATION METHODS</h3>
            </div>

            <div className={styles.methodsGrid}>
              {channels.map((channel) => (
                <div key={channel.id} className={styles.card}>
                  <div className={styles.cardHeader}>
                    <div className={styles.cardBrand}>
                      <div className={styles.cardIcon}>
                        {channel.id === 'paypal' ? (
                          <FaPaypal size={16} />
                        ) : (
                          <FaIndianRupeeSign size={15} />
                        )}
                      </div>
                      <h4 className={styles.cardTitle}>{channel.title}</h4>
                    </div>
                    {channel.badge && (
                      <span className={styles.channelBadge}>{channel.badge}</span>
                    )}
                  </div>

                  <div className={styles.addressField}>
                    <input
                      type="text"
                      readOnly
                      value={channel.displayAddress || channel.address}
                      className={styles.addressInput}
                      onClick={(e) => e.currentTarget.select()}
                      aria-label={`${channel.title} address`}
                    />
                    <button
                      className={`${styles.copyBtn} ${copiedId === channel.id ? styles.copied : ''}`}
                      onClick={() => handleCopy(channel.id, channel.address)}
                      title={copiedId === channel.id ? 'Copied to clipboard' : 'Copy address'}
                      aria-label={`Copy ${channel.title} address`}
                    >
                      {copiedId === channel.id ? (
                        <FaCheck size={13} className={styles.copiedIcon} />
                      ) : (
                        <FaCopy size={13} />
                      )}
                    </button>
                  </div>

                  {channel.proofUrl && (
                    <a
                      href={channel.proofUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.actionBtn}
                    >
                      <span>{channel.buttonText || 'Proceed'}</span>
                      <FaExternalLinkAlt size={10} className={styles.btnIcon} />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
