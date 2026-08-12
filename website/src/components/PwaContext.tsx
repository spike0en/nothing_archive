/**
 * @file PwaContext.tsx
 * @description Context provider and hook managing PWA installation prompts and status state across the site.
 * 
 * Layer: Global React context providers.
 * Boundary: Listens to browser beforeinstallprompt and appinstalled window events.
 */

import React, { createContext, useContext, useState, useEffect } from 'react';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

interface PwaContextType {
  isInstallable: boolean;
  isInstalled: boolean;
  install: () => Promise<void>;
}

const PwaContext = createContext<PwaContextType>({
  isInstallable: false,
  isInstalled: false,
  install: async () => {},
});

/**
 * Custom hook to access PwaContext values.
 * 
 * @returns Object containing isInstallable, isInstalled status flags and install launcher function.
 */
export const usePwa = () => useContext(PwaContext);

/**
 * PwaProvider component.
 * Tracks display mode and install events, managing the deferred install prompt.
 */
export function PwaProvider({ children }: { children: React.ReactNode }): React.JSX.Element {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || 
                        (window.navigator as any).standalone === true;
    setIsInstalled(isStandalone);

    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setIsInstallable(true);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setIsInstallable(false);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    window.addEventListener('appinstalled', handleAppInstalled);



    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const install = async () => {
    if (!deferredPrompt) return;
    try {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setIsInstalled(true);
        setIsInstallable(false);
      }
    } catch (err) {
      console.error('Failed to trigger PWA installation:', err);
    }
    setDeferredPrompt(null);
  };

  return (
    <PwaContext.Provider value={{ isInstallable, isInstalled, install }}>
      {children}
    </PwaContext.Provider>
  );
}
