import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import { useColorMode } from '@docusaurus/theme-common';
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

/* ============================================================
   STATIC DATA
   ============================================================ */

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
  { label: 'Telegram', href: 'https://t.me/s/Nothing_Archive', icon: <FaTelegramPlane size={24} /> },
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

/* ============================================================
   COMPONENTS
   ============================================================ */

/**
 * Primary landing page hero.
 * Renders the brand identity, primary call-to-actions, and a dynamic glyph-pattern background.
 */
function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  const { colorMode } = useColorMode();
  const heroLogoSrc = colorMode === 'dark' ? 'img/logo_dark.gif' : 'img/logo_light.gif';
  return (
    <header className={clsx('hero', styles.heroBanner)}>
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
            <img
              src={heroLogoSrc}
              alt="Nothing Archive"
              width={280}
              height={280}
              fetchPriority="high"
              loading="eager"
              className={styles.heroLogo}
            />
          </div>
        </div>
      </div>
    </header>
  );
}

/**
 * Interactive feature card component.
 * Wraps the entire surface in a navigation link for an expanded click target area.
 */
function Feature({ title, description, link, icon }: FeatureItem) {
  return (
    <div className={clsx('col col--3', styles.featureCol)}>
      <Link to={link} className={styles.featureLink}>
        <div className={styles.featureCard}>
          <span className={styles.featureIcon} aria-hidden="true">{icon}</span>
          <Heading as="h3" className={styles.featureTitle}>{title}</Heading>
          <p className={styles.featureDesc}>{description}</p>
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
 * Community engagement section.
 * Aggregates contributor avatars and GitHub repository support calls to action.
 */
function HomepageCommunity() {
  return (
    <section className={styles.communitySection}>
      <div className="container">
        <Heading as="h2" className={styles.sectionLabel}>
          Contributors
        </Heading>

        {/* Dynamic contributor graph sourced from contrib.rocks */}
        <div className={styles.contributorGrid}>
          <a
            href="https://github.com/spike0en/nothing_archive/graphs/contributors"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View all contributors on GitHub"
          >
            <img
              src="https://contrib.rocks/image?repo=spike0en/nothing_archive"
              alt="Grid of GitHub contributor avatars for Nothing Archive"
              className={styles.contribImage}
              width={800}
              height={42}
              loading="lazy"
            />
          </a>
        </div>

        {/* Star milestone progress tracker with integrated CTA */}
        <StarMilestones />
      </div>
    </section>
  );
}

/**
 * Social connectivity footer.
 * Renders a flexible grid of outbound links to external platforms.
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

/* ============================================================
   PAGE ROOT
   ============================================================ */

/**
 * Homepage route component.
 * Composes the layout wrapper and primary landing sections sequentially.
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
        <HomepageCommunity />
        <HomepageSocials />
      </main>
    </Layout>
  );
}
