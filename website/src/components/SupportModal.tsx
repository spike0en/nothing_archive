/**
 * @file SupportModal.tsx
 * @description Component rendering the donation modal options, supporting NOWPayments
 * widget embedding, copyable transaction addresses, and a supporter recognition widget.
 *
 * Layer: Global modal overlay components.
 * Boundary: Integrates with donations.json, donors.json, and the local SupporterWidget.
 */

import React, { useState, useEffect, useRef } from 'react';
import { translate } from '@docusaurus/Translate';
import { FaCopy, FaCheck, FaTimes, FaExternalLinkAlt, FaHeart } from 'react-icons/fa';
import donationsData from '../data/donations.json';
import donorsData from '../data/donors.json';
import SupporterWidget from './SupporterWidget';
import styles from './SupportModal.module.css';

interface DonationChannel {
  id: string;
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

/**
 * SupportModal component.
 * Displays various payment channels and hooks keyboard listeners to close the dialog.
 *
 * @param props Props containing isOpen and onClose callback
 */
export default function SupportModal({ isOpen, onClose }: SupportModalProps): React.JSX.Element | null {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [iframeLoading, setIframeLoading] = useState(true);
  const [loadPaymentWidget, setLoadPaymentWidget] = useState(false);
  const [scale, setScale] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  // Track and scale NOWPayments iframe to fit mobile viewport
  useEffect(() => {
    if (!isOpen || typeof window === 'undefined') return;

    const updateScale = () => {
      if (containerRef.current) {
        const width = containerRef.current.clientWidth;
        if (width > 0) {
          setScale(width / 346);
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

  const donationChannels = (donationsData as DonationChannel[]).map((channel) => {
    switch (channel.id) {
      case 'upi':
        return {
          ...channel,
          title: translate({id: 'support.modal.channel.upi.title', message: 'UPI (India)', description: 'UPI donation method title'}),
          description: translate({id: 'support.modal.channel.upi.description', message: 'Send via any UPI app (PhonePe / GPay / Paytm) to the ID below. Add reference: NOTHING ARCHIVE.', description: 'UPI donation method description'}),
          extraInfo: translate({id: 'support.modal.channel.upi.holder', message: 'holder: Harshit Sinha', description: 'UPI payment account holder information'}),
          buttonText: translate({id: 'support.modal.shareConfirmation', message: 'Share Confirmation', description: 'Donation proof button label'}),
        };
      case 'kofi':
        return {
          ...channel,
          description: translate({id: 'support.modal.channel.kofi.description', message: 'One-tap tip via Ko-fi (card / Apple Pay / Google Pay).', description: 'Ko-fi donation method description'}),
          buttonText: translate({id: 'support.modal.channel.kofi.button', message: 'Open Ko-fi', description: 'Ko-fi donation method button label'}),
        };
      case 'paypal':
        return {
          ...channel,
          description: translate({id: 'support.modal.channel.paypal.description', message: "Send via PayPal.me — 'Friends & Family' if possible.", description: 'PayPal donation method description'}),
          buttonText: translate({id: 'support.modal.channel.paypal.button', message: 'Open PayPal', description: 'PayPal donation method button label'}),
        };
      case 'boosty':
        return {
          ...channel,
          title: translate({id: 'support.modal.channel.boosty.title', message: 'Boosty (Russia)', description: 'Boosty donation method title'}),
          description: translate({id: 'support.modal.channel.boosty.description', message: 'Support the archive via Boosty (available for cards in Russia).', description: 'Boosty donation method description'}),
          buttonText: translate({id: 'support.modal.channel.boosty.button', message: 'Open Boosty', description: 'Boosty donation method button label'}),
        };
      default:
        return channel;
    }
  });

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
            <h2 id="support-modal-title" className={styles.title}>{translate({id: 'support.modal.title', message: 'SUPPORT THE PROJECT', description: 'Support donation modal title'})}</h2>
          </div>
          <button
            className={styles.closeBtn}
            onClick={onClose}
            aria-label={translate({id: 'support.modal.close', message: 'Close dialogue', description: 'Accessible label for the support modal close button'})}
          >
            <FaTimes size={18} />
          </button>
        </div>
        
        <div className={styles.body}>
          <div className={styles.introContainer}>
            <div className={styles.introText}>
              <p>
                {translate({id: 'support.modal.intro.community', message: "Nothing Archive is a community-driven project. Keeping it up to date and relevant takes time, effort, and ongoing costs (where applicable). If you've benefited from the archive and would like to support it, your donation helps cover these costs and allows the project to keep growing.", description: 'Support modal introduction paragraph'})}
              </p>
              <p>
                {translate({id: 'support.modal.intro.optional', message: 'Donations are completely optional, and every contribution is sincerely appreciated. 💛', description: 'Support modal introduction paragraph'})}
              </p>
              <p>
                {translate({id: 'support.modal.intro.supporters', message: 'As a small thank-you, the supporters widget recognizes those who have made notable contributions. If you choose to support the project, your name can be featured there too.', description: 'Support modal introduction paragraph'})}
              </p>
              <p>
                {translate({id: 'support.modal.intro.thanks', message: 'Thank you for being part of the journey!', description: 'Support modal introduction paragraph'})}
              </p>
            </div>
            <SupporterWidget donors={donorsData} />
          </div>

          <h3 className={styles.donorsTitle}>
            <span className={styles.animatedEmoji}>💵</span> {translate({id: 'support.modal.methods', message: 'DONATION METHODS', description: 'Donation methods section heading'})}
          </h3>

          <div className={styles.contentLayout}>
            <div className={styles.leftColumn}>
              <div className={styles.stack}>
                {donationChannels.map((channel) => (
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
                          aria-label={translate({id: 'support.modal.paymentAddress', message: '{channel} payment address', description: 'Accessible label for a donation payment address'}, {channel: channel.title})}
                        />
                        <button
                          className={`${styles.copyBtn} ${copiedId === channel.id ? styles.copied : ''}`}
                          onClick={() => handleCopy(channel.id, channel.address)}
                          title={translate({id: 'support.modal.copyAddress', message: 'Copy Address', description: 'Tooltip for copying a donation address'})}
                          aria-label={translate({id: 'support.modal.copyChannelAddress', message: 'Copy {channel} address', description: 'Accessible label for copying a donation address'}, {channel: channel.title})}
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
                        <span>{channel.buttonText || translate({id: 'support.modal.shareConfirmation', message: 'Share Confirmation', description: 'Donation proof button label'})}</span>
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
                  {translate({id: 'support.modal.nowPayments.description', message: 'Donate securely using any major cryptocurrency via NOWPayments.', description: 'NOWPayments donation method description'})}
                </p>
                <div 
                  ref={containerRef} 
                  className={styles.iframeWrapper}
                  style={{
                    height: loadPaymentWidget ? `${615 * scale}px` : 'auto',
                  }}
                >
                  {loadPaymentWidget && iframeLoading && (
                    <div className={styles.spinnerContainer}>
                      <div className={styles.spinner} />
                      <span className={styles.spinnerText}>{translate({id: 'support.modal.loadingWidget', message: 'Loading Widget...', description: 'NOWPayments widget loading message'})}</span>
                    </div>
                  )}
                  {loadPaymentWidget ? (
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
                      title={translate({id: 'support.modal.nowPayments.title', message: 'NOWPayments Donation Widget', description: 'Title for the embedded NOWPayments donation widget'})}
                      onLoad={() => setIframeLoading(false)}
                    >
                      {translate({id: 'support.modal.widgetFallback', message: "Can't load widget", description: 'Fallback content for the embedded NOWPayments donation widget'})}
                    </iframe>
                  ) : (
                    <button type="button" className={styles.paidBtn} onClick={() => setLoadPaymentWidget(true)}>
                      {translate({id: 'support.modal.loadWidget', message: 'Load payment widget', description: 'Button that loads the NOWPayments donation widget'})}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>


        </div>
      </div>
    </div>
  );
}
