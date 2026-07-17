import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import {
  FaTelegramPlane, FaDiscord, FaRedditAlien, FaYoutube,
  FaInstagram, FaGithub, FaTerminal,
  FaMobileAlt, FaDownload, FaClipboardList, FaBook,
  FaBoxOpen, FaRocket, FaCode, FaCameraRetro,
} from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { TbMessageCircle } from 'react-icons/tb';

import styles from './index.module.css';
import { JSX } from 'react';
import CommitMatrix from '../components/CommitMatrix';
import ReleaseFeed from '../components/ReleaseFeed';
import AnnouncementBanner from '../components/AnnouncementBanner';
import StarMilestones from '../components/StarMilestones';
import HeroGlyphLogo from '../components/HeroGlyphLogo';
import { useGitHubContributors } from '../utils/github-cache';
import type { Contributor } from '../utils/github-cache';
import contributorMetadata from '../data/contributor-metadata.json';



type FeatureItem = {
  title: string;
  description: string;
  link: string;
  icon: JSX.Element;
};

/**
 * Returns the collection of feature cards for the resources grid.
 */
function getFeatureList(): FeatureItem[] {
  return [
    {
      title: 'Devices',
      description: 'Explore the full catalog of Nothing and CMF devices, including phones, audio gear, wearables, and accessories.',
      link: '/docs/devices',
      icon: <FaMobileAlt size={20} />,
    },
    {
      title: 'Firmware',
      description: 'Download official Nothing OS firmware, stock factory images, and delta OTA updates to flash, downgrade, restore, root, or manually sideload updates on your phones to skip staggered regional rollouts.',
      link: '/docs/firmware',
      icon: <FaDownload size={20} />,
    },
    {
      title: 'OTA Changelogs',
      description: 'Learn how software updates work on Nothing & CMF phones and browse official Nothing OS changelogs',
      link: '/docs/changelogs',
      icon: <FaClipboardList size={20} />,
    },
    {
      title: 'Guides',
      description: 'Step-by-step instructions to unlock bootloaders, root, and customize Nothing and CMF devices.',
      link: '/docs/guides',
      icon: <FaBook size={20} />,
    },
    {
      title: 'Official Resources',
      description: 'Find official Nothing apps, wallpapers, custom fonts, kernel sources, and developer tools.',
      link: '/docs/official',
      icon: <FaBoxOpen size={20} />,
    },
    {
      title: 'Community Apps',
      description: 'Explore custom apps, Glyph tools, and productivity utilities made by the community.',
      link: '/docs/apps',
      icon: <FaRocket size={20} />,
    },
    {
      title: 'Projects',
      description: 'Browse creative software, tools, and custom projects built for the Nothing ecosystem.',
      link: '/docs/projects',
      icon: <FaCode size={20} />,
    },
    {
      title: 'Photography',
      description: 'Improve your photos with GCAM ports, custom configurations, and presets tuned for Nothing and CMF phones.',
      link: '/docs/photography',
      icon: <FaCameraRetro size={20} />,
    },
  ];
}

/** External community platform links. */
const socialLinks = [
  { label: 'Telegram', href: 'https://telegram.me/s/Nothing_Archive', icon: <FaTelegramPlane size={24} /> },
  { label: 'Community', href: 'https://nothing.community', icon: <TbMessageCircle size={24} /> },
  { label: 'Discord', href: 'https://discord.com/invite/nothingtech', icon: <FaDiscord size={24} /> },
  { label: 'Reddit', href: 'https://www.reddit.com/r/NothingTech', icon: <FaRedditAlien size={24} /> },
  { label: 'XDA', href: 'https://xdaforums.com/c/nothing.12583/', icon: <FaTerminal size={24} /> },
  { label: 'YouTube', href: 'https://www.youtube.com/@NothingTechnology', icon: <FaYoutube size={24} /> },
  { label: 'GitHub', href: 'https://github.com/NothingOSS', icon: <FaGithub size={24} /> },
  { label: 'X', href: 'https://x.com/nothing', icon: <FaXTwitter size={24} /> },
  { label: 'Instagram', href: 'https://instagram.com/nothing', icon: <FaInstagram size={24} /> },
  { label: 'X (Nothing Updates Bot)', href: 'https://x.com/Nothing_Update', icon: <FaXTwitter size={24} /> },
];



/**
 * Primary landing page hero component.
 */
function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    let headerRect = header.getBoundingClientRect();
    const updateHeaderRect = () => {
      headerRect = header.getBoundingClientRect();
    };

    const handlePointerMove = (e: PointerEvent) => {
      const x = e.clientX - headerRect.left;
      const y = e.clientY - headerRect.top;
      header.style.setProperty('--mouse-x', `${x}px`);
      header.style.setProperty('--mouse-y', `${y}px`);
    };

    header.addEventListener('pointerenter', updateHeaderRect);
    header.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('resize', updateHeaderRect);
    return () => {
      header.removeEventListener('pointerenter', updateHeaderRect);
      header.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('resize', updateHeaderRect);
    };
  }, []);

  return (
    <header ref={headerRef} className={clsx('hero', styles.heroBanner)}>
      <div className={styles.glyphGrid} aria-hidden="true" />
      <div className="container">
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <Heading as="h1" className={styles.heroTitle}>
              {siteConfig.title}
            </Heading>
            <p className={styles.heroSubtitle}>
              {siteConfig.tagline}
            </p>
            <div className={styles.buttons}>
              <Link className={clsx('button', styles.ctaButton)} to="/docs/intro">
                Explore Resources
              </Link>
              <a
                className={clsx('button', styles.ctaButtonSecondary)}
                href="https://github.com/spike0en/nothing_archive"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub size={16} />
                View on GitHub
              </a>
            </div>
          </div>
          <div className={styles.heroImage}>
            <HeroGlyphLogo />
          </div>
        </div>
      </div>
    </header>
  );
}

/**
 * Feature card component linking to a resource category.
 */
function Feature({ title, description, link, icon }: FeatureItem) {
  return (
    <div className={clsx('col col--3', styles.featureCol)}>
      <Link to={link} className={styles.featureLink}>
        <div className={styles.featureCard}>
          <div className={styles.featureHeader}>
            <span className={styles.featureIcon} aria-hidden="true">{icon}</span>
            <Heading as="h3" className={styles.featureTitle}>{title}</Heading>
          </div>
          <div className={styles.featureInner}>
            <p className={styles.featureDesc}>{description}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}

/**
 * Responsive grid container for resource feature cards.
 */
function HomepageFeatures() {
  const featureList = getFeatureList();
  return (
    <section className={styles.features}>
      <div className="container">
        <Heading as="h2" className={styles.sectionLabel}>
          Resources
        </Heading>
        <div className={clsx('row', styles.featureRow)}>
          {featureList.map((props) => (
            <Feature key={props.link} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}



/**
 * Community contribution section.
 * Fetches contributors from the GitHub API at runtime with localStorage caching.
 */
function HomepageCommunity() {
  // Centralized GitHub data hook — shares cache with other components
  const { contributors } = useGitHubContributors();

  // GitHub's contributors endpoint is typically sorted by contributions,
  // but explicit client-side sorting ensures consistency across cached offline
  // loads and fallback datasets.
  const sortedContributors = React.useMemo(() => {
    return [...contributors].sort((a, b) => b.contributions - a.contributions);
  }, [contributors]);

  // Resolve core members in the exact order specified in configuration
  const coreMembers = React.useMemo(() => {
    return contributorMetadata.core
      .map((login) => contributors.find((c) => c.login === login))
      .filter((c): c is Contributor => !!c);
  }, [contributors]);

  // Resolve top contributors, excluding core members, capped at 6 for a premium look
  const topContributors = React.useMemo(() => {
    const coreLogins = new Set(contributorMetadata.core);
    return sortedContributors
      .filter((c) => !coreLogins.has(c.login))
      .slice(0, 6);
  }, [sortedContributors]);

  const brandingMember = contributorMetadata.branding;

  return (
    <section className={styles.communitySection}>
      <div className="container">
        <Heading as="h2" className={styles.sectionLabel}>
          Hall of Fame
        </Heading>

        {/* Core Team Subsection */}
        <Heading as="h3" className={styles.subSectionLabel}>
          Core Team
        </Heading>
        <div className={styles.coreGrid}>
          {coreMembers.map((contrib) => (
            <a
              key={contrib.login}
              href={`https://github.com/spike0en/nothing_archive/commits?author=${contrib.login}`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.coreCard}
              aria-label={`View ${contrib.name || contrib.login}'s commits on GitHub`}
            >
              <div className={styles.coreAvatarContainer}>
                <img
                  src={contrib.avatar_url}
                  alt={`${contrib.name || contrib.login}'s avatar`}
                  className={styles.coreAvatar}
                  loading="lazy"
                />
              </div>
              <div className={styles.coreName}>{contrib.name || contrib.login}</div>
            </a>
          ))}
        </div>

        {/* Branding Credit */}
        <div className={styles.brandingSection}>
          <span className={styles.brandingLabel}>Branding</span>
          <a
            href={brandingMember.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.brandingCard}
          >
            <img
              src={brandingMember.avatar_url}
              alt={brandingMember.name}
              className={styles.brandingAvatar}
              loading="lazy"
            />
            <span className={styles.brandingName}>{brandingMember.name}</span>
          </a>
        </div>

        {/* General Contributors Subsection */}
        <Heading as="h3" className={styles.subSectionLabel}>
          Top Contributors
        </Heading>
        <div className={styles.contributorGrid}>
          {topContributors.length > 0 ? (
            topContributors.map((contrib) => (
              <a
                key={contrib.login}
                href={`https://github.com/spike0en/nothing_archive/commits?author=${contrib.login}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.contributorCard}
                aria-label={`View ${contrib.login}'s commits on GitHub`}
              >
                <div className={styles.contributorAvatarContainer}>
                  <img
                    src={contrib.avatar_url}
                    alt={`${contrib.login}'s avatar`}
                    className={styles.contributorAvatar}
                    loading="lazy"
                  />
                </div>
                <div className={styles.contributorName}>
                  {contrib.name || contrib.login}
                </div>
              </a>
            ))
          ) : (
            <div style={{ textAlign: 'center', width: '100%', gridColumn: '1 / -1', opacity: 0.7, padding: '2rem 0' }}>
              <a
                href="https://github.com/spike0en/nothing_archive/graphs/contributors"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'var(--ifm-color-primary)', fontWeight: 'bold' }}
              >
                View all contributors on GitHub
              </a>
            </div>
          )}
        </div>

        {sortedContributors.length > 10 && (
          <div className={styles.toggleContainer}>
            <a
              href="https://github.com/spike0en/nothing_archive/graphs/contributors"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.toggleButton}
            >
              Show All
            </a>
          </div>
        )}
      </div>
    </section>
  );
}

/**
 * Star milestones progress tracker section.
 */
function HomepageMilestones() {
  return (
    <section className={styles.milestonesSection}>
      <div className="container">
        <Heading as="h2" className={styles.sectionLabel}>
          Milestones
        </Heading>
        <StarMilestones />
      </div>
    </section>
  );
}

/**
 * Footer section listing external social/community links.
 */
function HomepageSocials() {
  return (
    <section className={styles.socials}>
      <div className="container">
        <Heading as="h2" className={styles.sectionLabel}>
          Connect
        </Heading>
        <div className={styles.socialLinks}>
          {socialLinks.map(({ label, href, icon }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
            >
              {icon}
              <span className={styles.socialLinkLabel}>{label}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}



/**
 * Main homepage component.
 */
export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();

  return (
    <Layout
      title="Nothing OS Firmware & Resources"
      description={siteConfig.tagline}
    >
      <AnnouncementBanner />
      <HomepageHeader />
      <main className={styles.main}>
        <div className={clsx('container', styles.telemetryContainer)}>
          <div className={styles.telemetrySection}>
            <div className={styles.telemetryBox}>
              <CommitMatrix />
            </div>
            <div className={styles.telemetryBox}>
              <ReleaseFeed />
            </div>
          </div>
        </div>
        <HomepageFeatures />
        <HomepageMilestones />
        <HomepageCommunity />
        <HomepageSocials />
      </main>
    </Layout>
  );
}
