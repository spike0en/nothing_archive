import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import {
  FaTelegramPlane, FaDiscord, FaRedditAlien, FaYoutube,
  FaInstagram, FaGithub, FaTerminal, FaStar,
  FaMobileAlt, FaDownload, FaClipboardList, FaBook,
  FaBoxOpen, FaRocket, FaCode, FaCameraRetro,
} from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { TbMessageCircle } from 'react-icons/tb';

import styles from './index.module.css';
import { JSX } from 'react';

/* ============================================================
   DATA — Feature cards, social links
   ============================================================ */

type FeatureItem = {
  title: string;
  description: string;
  link: string;
  icon: JSX.Element;
};

/**
 * Resource cards displayed in the homepage grid.
 * Each card links to a top-level documentation page.
 */
const FeatureList: FeatureItem[] = [
  {
    title: 'Devices',
    description: 'Explore the complete catalog of Nothing & CMF devices—phones, audio gear, wearables, and accessories in one place.',
    link: '/docs/devices',
    icon: <FaMobileAlt size={20} />,
  },
  {
    title: 'Firmware Archive',
    description: 'Download official Nothing OS firmware, stock factory images, and delta OTA files for easy flashing, restoring, and sideloading updates.',
    link: '/docs/firmware',
    icon: <FaDownload size={20} />,
  },
  {
    title: 'OTA Changelogs',
    description: 'Read official Nothing OS update changelogs, feature updates, bug fixes, and version history for all devices.',
    link: '/docs/changelogs',
    icon: <FaClipboardList size={20} />,
  },
  {
    title: 'Guides',
    description: 'Step-by-step guides for bootloader unlocking, rooting, and device customization for both Nothing and CMF.',
    link: '/docs/guides',
    icon: <FaBook size={20} />,
  },
  {
    title: 'Official Resources',
    description: 'Access official Nothing apps, wallpapers, fonts, kernel sources, and developer tools in one organized hub.',
    link: '/docs/official',
    icon: <FaBoxOpen size={20} />,
  },
  {
    title: 'Community Apps',
    description: 'Discover community-built apps, Glyph tools, productivity utilities, and more for Nothing & CMF devices.',
    link: '/docs/apps',
    icon: <FaRocket size={20} />,
  },
  {
    title: 'Projects',
    description: 'Discover community projects, creative tools, and unique software designed for the Nothing ecosystem.',
    link: '/docs/projects',
    icon: <FaCode size={20} />,
  },
  {
    title: 'Photography',
    description: 'Get the best camera experience with GCAM ports, configs, and presets optimized for Nothing & CMF devices.',
    link: '/docs/photography',
    icon: <FaCameraRetro size={20} />,
  },
];

/** Social/community links rendered in the Connect section. */
const socialLinks = [
  { label: 'Telegram', href: 'https://t.me/s/Nothing_Archive', icon: <FaTelegramPlane size={24} /> },
  { label: 'Community', href: 'https://nothing.community', icon: <TbMessageCircle size={24} /> },
  { label: 'Discord', href: 'https://discord.com/invite/nothingtech', icon: <FaDiscord size={24} /> },
  { label: 'Reddit', href: 'https://www.reddit.com/r/NothingTech', icon: <FaRedditAlien size={24} /> },
  { label: 'XDA', href: 'https://xdaforums.com/c/nothing.12583/', icon: <FaTerminal size={24} /> },
  { label: 'YouTube', href: 'https://www.youtube.com/@NothingTechnology', icon: <FaYoutube size={24} /> },
  { label: 'X', href: 'https://x.com/nothing', icon: <FaXTwitter size={24} /> },
  { label: 'Instagram', href: 'https://instagram.com/nothing', icon: <FaInstagram size={24} /> },
  { label: 'NothingOSS', href: 'https://github.com/NothingOSS', icon: <FaGithub size={24} /> },
];

/* ============================================================
   COMPONENTS
   ============================================================ */

/**
 * Hero section — site title, tagline, dual CTA buttons, and logo.
 * Includes a glyph-inspired dot grid background for visual depth.
 */
function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className={styles.glyphGrid} aria-hidden="true" />
      <div className="container">
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <Heading as="h1" className={styles.heroTitle}>
              {siteConfig.title}
            </Heading>
            <p className={styles.heroSubtitle}>{siteConfig.tagline}</p>
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
              src="img/logo.png"
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
 * Individual feature card with icon, title, and description.
 * Entire card is wrapped in a link for full-surface click target.
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
 * Resource cards grid — 4-column layout on desktop (4+4 = 8 cards).
 */
function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <Heading as="h2" className={styles.sectionLabel}>Resources</Heading>
        <div className={clsx('row', styles.featureRow)}>
          {FeatureList.map((props) => (
            <Feature key={props.link} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * Community section — combines contributors display and GitHub star CTA.
 * Merges the previously separate "Support" and "Contributors" sections
 * into a single cohesive block to reduce vertical fragmentation.
 */
function HomepageCommunity() {
  return (
    <section className={styles.communitySection}>
      <div className="container">
        <Heading as="h2" className={styles.sectionLabel}>Community</Heading>

        {/* Contributor avatars */}
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
              loading="lazy"
            />
          </a>
        </div>

        {/* Star CTA */}
        <div className={styles.supportText}>
          <p>
            If you find this index helpful, consider starring the repository —
            it helps with discoverability and keeps the community growing.
          </p>
        </div>
        <div className={styles.supportActions}>
          <a
            href="https://github.com/spike0en/nothing_archive/stargazers"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.starButton}
            aria-label="Star Nothing Archive on GitHub"
          >
            <FaStar size={16} />
            Star on GitHub
          </a>
        </div>
      </div>
    </section>
  );
}

/**
 * Social links section — icon buttons linking to community platforms.
 */
function HomepageSocials() {
  return (
    <section className={styles.socials}>
      <div className="container">
        <Heading as="h2" className={styles.sectionLabel}>Connect</Heading>
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
 * Main homepage entry point.
 * Section order: Hero → Resources → Community → Social Links
 */
export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title="Nothing OS Firmware & Resources"
      description={siteConfig.tagline}
    >
      <HomepageHeader />
      <main className={styles.main}>
        <HomepageFeatures />
        <HomepageCommunity />
        <HomepageSocials />
      </main>
    </Layout>
  );
}
