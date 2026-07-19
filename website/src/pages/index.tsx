import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import { translate } from '@docusaurus/Translate';
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
      title: translate({id: 'homepage.feature.devices', message: 'Devices', description: 'Homepage feature card title'}),
      description: translate({id: 'homepage.feature.devices.description', message: 'Explore the full catalog of Nothing and CMF devices, including phones, audio gear, wearables, and accessories.', description: 'Homepage devices feature card description'}),
      link: '/docs/devices',
      icon: <FaMobileAlt size={20} />,
    },
    {
      title: translate({id: 'homepage.feature.firmware', message: 'Firmware', description: 'Homepage feature card title'}),
      description: translate({id: 'homepage.feature.firmware.description', message: 'Download official Nothing OS firmware, stock factory images, and delta OTA updates to flash, downgrade, restore, root, or manually sideload updates on your phones to skip staggered regional rollouts.', description: 'Homepage firmware feature card description'}),
      link: '/docs/firmware',
      icon: <FaDownload size={20} />,
    },
    {
      title: translate({id: 'homepage.feature.changelogs', message: 'OTA Changelogs', description: 'Homepage feature card title'}),
      description: translate({id: 'homepage.feature.changelogs.description', message: 'Learn how software updates work on Nothing & CMF phones and browse official Nothing OS changelogs', description: 'Homepage changelog feature card description'}),
      link: '/docs/changelogs',
      icon: <FaClipboardList size={20} />,
    },
    {
      title: translate({id: 'homepage.feature.guides', message: 'Guides', description: 'Homepage feature card title'}),
      description: translate({id: 'homepage.feature.guides.description', message: 'Step-by-step instructions to unlock bootloaders, root, and customize Nothing and CMF devices.', description: 'Homepage guides feature card description'}),
      link: '/docs/guides',
      icon: <FaBook size={20} />,
    },
    {
      title: translate({id: 'homepage.feature.official', message: 'Official Resources', description: 'Homepage feature card title'}),
      description: translate({id: 'homepage.feature.official.description', message: 'Find official Nothing apps, wallpapers, custom fonts, kernel sources, and developer tools.', description: 'Homepage official resources feature card description'}),
      link: '/docs/official',
      icon: <FaBoxOpen size={20} />,
    },
    {
      title: translate({id: 'homepage.feature.apps', message: 'Community Apps', description: 'Homepage feature card title'}),
      description: translate({id: 'homepage.feature.apps.description', message: 'Explore custom apps, Glyph tools, and productivity utilities made by the community.', description: 'Homepage community apps feature card description'}),
      link: '/docs/apps',
      icon: <FaRocket size={20} />,
    },
    {
      title: translate({id: 'homepage.feature.projects', message: 'Projects', description: 'Homepage feature card title'}),
      description: translate({id: 'homepage.feature.projects.description', message: 'Browse creative software, tools, and custom projects built for the Nothing ecosystem.', description: 'Homepage projects feature card description'}),
      link: '/docs/projects',
      icon: <FaCode size={20} />,
    },
    {
      title: translate({id: 'homepage.feature.photography', message: 'Photography', description: 'Homepage feature card title'}),
      description: translate({id: 'homepage.feature.photography.description', message: 'Improve your photos with GCAM ports, custom configurations, and presets tuned for Nothing and CMF phones.', description: 'Homepage photography feature card description'}),
      link: '/docs/photography',
      icon: <FaCameraRetro size={20} />,
    },
  ];
}

/** External community platform links. */
const socialLinks = [
  { label: 'Telegram', href: 'https://telegram.me/s/Nothing_Archive', icon: <FaTelegramPlane size={24} /> },
  { label: translate({id: 'homepage.social.community', message: 'Community', description: 'Label for the Nothing community link'}), href: 'https://nothing.community', icon: <TbMessageCircle size={24} /> },
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
  const tagline = translate({id: 'homepage.tagline', message: 'A curated hub for everything related to the Nothing ecosystem.', description: 'Homepage hero subtitle'});
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
              {tagline}
            </p>
            <div className={styles.buttons}>
              <Link className={clsx('button', styles.ctaButton)} to="/docs/intro">
                {translate({id: 'homepage.hero.exploreResources', message: 'Explore Resources', description: 'Homepage primary call to action'})}
              </Link>
              <a
                className={clsx('button', styles.ctaButtonSecondary)}
                href="https://github.com/spike0en/nothing_archive"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub size={16} />
                {translate({id: 'homepage.hero.viewOnGitHub', message: 'View on GitHub', description: 'Homepage secondary call to action'})}
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
          {translate({id: 'homepage.section.resources', message: 'Resources', description: 'Homepage feature card section heading'})}
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
/**
 * Renders a contributor name. If it contains a parenthesized suffix (e.g. "Real Name (username)"),
 * wraps the suffix in a distinct span to allow styling and breaking to a new line on smaller screens.
 */
function renderContributorName(name: string) {
  const match = name.match(/^([^(]+)\s*\(([^)]+)\)$/);
  if (match) {
    return (
      <>
        {match[1].trim()}
        <span className={styles.usernameSuffix}>({match[2].trim()})</span>
      </>
    );
  }
  return name;
}

/**
 * Resolves the display name for a contributor card. If a custom name is configured in metadata,
 * uses that custom name; otherwise defaults to contrib.name or contrib.login.
 */
function getContributorName(contrib: Contributor) {
  const customNames = (contributorMetadata as any).customNames || {};
  if (customNames[contrib.login]) {
    return customNames[contrib.login];
  }
  return contrib.name || contrib.login;
}

/**
 * Resolves the link for a contributor card. If a custom URL is configured in metadata,
 * uses that URL (e.g. for author commits filter via email); otherwise defaults to searching
 * repository commits by author username.
 */
function getContributorHref(contrib: Contributor) {
  const customUrls = (contributorMetadata as any).customUrls || {};
  if (customUrls[contrib.login]) {
    return customUrls[contrib.login];
  }
  return `https://github.com/spike0en/nothing_archive/commits?author=${contrib.login}`;
}

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

  // Resolve top contributors, excluding core members, capped at 6 for layout alignment and clean presentation
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
          {translate({id: 'homepage.section.hallOfFame', message: 'Hall of Fame', description: 'Homepage contributors section heading'})}
        </Heading>

        {/* Core Team Subsection */}
        <Heading as="h3" className={styles.subSectionLabel}>
          {translate({id: 'homepage.section.coreTeam', message: 'Core Team', description: 'Homepage core contributors heading'})}
        </Heading>
        <div className={styles.coreGrid}>
          {coreMembers.map((contrib) => (
            <a
              key={contrib.login}
              href={getContributorHref(contrib)}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.coreCard}
              aria-label={translate({id: 'homepage.contributor.viewCommits', message: "View {name}'s commits on GitHub", description: 'Accessible label for a contributor link'}, {name: contrib.name || contrib.login})}
            >
              <div className={styles.coreAvatarContainer}>
                <img
                  src={contrib.avatar_url}
                  alt={translate({id: 'homepage.contributor.avatar', message: "{name}'s avatar", description: 'Accessible label for a contributor avatar'}, {name: contrib.name || contrib.login})}
                  className={styles.coreAvatar}
                  loading="lazy"
                />
              </div>
              <div className={styles.coreName}>{renderContributorName(getContributorName(contrib))}</div>
            </a>
          ))}
        </div>

        {/* Branding Credit */}
        <div className={styles.brandingSection}>
          <span className={styles.brandingLabel}>{translate({id: 'homepage.branding', message: 'Branding', description: 'Homepage branding credit label'})}</span>
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
          {translate({id: 'homepage.section.topContributors', message: 'Top Contributors', description: 'Homepage contributor list heading'})}
        </Heading>
        <div className={styles.contributorGrid}>
          {topContributors.length > 0 ? (
            topContributors.map((contrib) => (
              <a
                key={contrib.login}
                href={getContributorHref(contrib)}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.contributorCard}
                aria-label={translate({id: 'homepage.contributor.viewCommits', message: "View {name}'s commits on GitHub", description: 'Accessible label for a contributor link'}, {name: contrib.login})}
              >
                <div className={styles.contributorAvatarContainer}>
                  <img
                    src={contrib.avatar_url}
                  alt={translate({id: 'homepage.contributor.avatar', message: "{name}'s avatar", description: 'Accessible label for a contributor avatar'}, {name: contrib.login})}
                    className={styles.contributorAvatar}
                    loading="lazy"
                  />
                </div>
                <div className={styles.contributorName}>
                  {renderContributorName(getContributorName(contrib))}
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
                {translate({id: 'homepage.contributor.viewAll', message: 'View all contributors on GitHub', description: 'Link to the full GitHub contributors list'})}
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
              {translate({id: 'homepage.contributor.showAll', message: 'Show All', description: 'Link to the full GitHub contributors list'})}
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
          {translate({id: 'homepage.section.milestones', message: 'Milestones', description: 'Homepage milestone section heading'})}
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
          {translate({id: 'homepage.section.connect', message: 'Connect', description: 'Homepage social links section heading'})}
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
  return (
    <Layout
      title={translate({id: 'homepage.metadata.title', message: 'Nothing OS Firmware & Resources', description: 'Homepage browser title'})}
      description={translate({id: 'homepage.tagline', message: 'A curated hub for everything related to the Nothing ecosystem.', description: 'Homepage hero subtitle'})}
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
