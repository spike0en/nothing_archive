import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import { FaTelegramPlane, FaDiscord, FaRedditAlien, FaYoutube, FaInstagram, FaGithub, FaTerminal, FaStar } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { TbMessageCircle } from 'react-icons/tb';

import styles from './index.module.css';
import { JSX } from 'react';

/**
 * Renders the top hero section of the homepage with the site title, tagline, and call-to-action button.
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
            </div>
          </div>
          <div className={styles.heroImage}>
            <img src="img/logo.png" alt="Nothing Archive" width={280} height={280} fetchPriority="high" loading="eager" className={styles.heroLogo} />
          </div>
        </div>
      </div>
    </header>
  );
}

type FeatureItem = {
  title: string;
  description: string;
  link: string;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Devices',
    description: 'Complete catalog of Nothing & CMF phones, earbuds, watches, and accessories.',
    link: '/docs/devices',
  },
  {
    title: 'Nothing OS Firmware Archive',
    description: 'Complete firmware release index for all Nothing and CMF devices.',
    link: '/docs/firmware',
  },
  {
    title: 'Guides',
    description: 'Step-by-step guides for bootloader, rooting, and device customization.',
    link: '/docs/guides',
  },
  {
    title: 'Official Resources',
    description: 'Apps, wallpapers, fonts, kernel sources, and developer SDKs from Nothing.',
    link: '/docs/official',
  },
  {
    title: 'Community Apps',
    description: 'Glyph-powered apps, productivity tools, and utilities built by the community.',
    link: '/docs/apps',
  },
  {
    title: 'Projects',
    description: 'Glyph tools, Matrix toys, modules, and other community projects.',
    link: '/docs/projects',
  },
  {
    title: 'Photography',
    description: 'GCAM ports, configs, and camera presets for Nothing devices.',
    link: '/docs/photography',
  },
];

/**
 * Renders an individual feature card in the resources grid.
 */
function Feature({ title, description, link }: FeatureItem) {
  return (
    <div className={clsx('col col--4', styles.featureCol)}>
      <Link to={link} className={styles.featureLink}>
        <div className={styles.featureCard}>
          <span className={styles.featureDot} />
          <Heading as="h3" className={styles.featureTitle}>{title}</Heading>
          <p className={styles.featureDesc}>{description}</p>
        </div>
      </Link>
    </div>
  );
}

/**
 * Renders the main grid of documentation categories and resources.
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
 * Renders a row of social media icons and community links.
 */
function HomepageSocials() {
  const links = [
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
  return (
    <section className={styles.socials}>
      <div className="container">
        <Heading as="h2" className={styles.sectionLabel}>Connect</Heading>
        <div className={styles.socialLinks}>
          {links.map(({ label, href, icon }) => (
            <a key={label} href={href} aria-label={label} target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
              {icon}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * Renders a compact call-to-action encouraging users to star the repository on GitHub.
 */
function HomepageSupport() {
  return (
    <section className={styles.supportSection}>
      <div className="container">
        <Heading as="h2" className={styles.sectionLabel}>Support the Project</Heading>
        <div className={styles.supportText}>
          <p>
            If you find this index helpful, please consider starring the repository on GitHub.
            It helps with discoverability, encourages maintenance, and makes the community grow!
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
 * Renders contributor avatars using the contrib.rocks service.
 * Links to the GitHub contributors graph for the full list.
 */
function HomepageContributors() {
  return (
    <section className={styles.contributorsSection}>
      <div className="container">
        <Heading as="h2" className={styles.sectionLabel}>Project Contributors</Heading>
        <div className={styles.contributorGrid}>
          <a
            href="https://github.com/spike0en/nothing_archive/graphs/contributors"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View all contributors on GitHub"
          >
            <img
              src="https://contrib.rocks/image?repo=spike0en/nothing_archive"
              alt="Nothing Archive Contributors"
              className={styles.contribImage}
              loading="lazy"
            />
          </a>
        </div>
      </div>
    </section>
  );
}

/**
 * Main application entry point for the homepage.
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
        <HomepageSupport />
        <HomepageContributors />
        <HomepageSocials />
      </main>
    </Layout>
  );
}
