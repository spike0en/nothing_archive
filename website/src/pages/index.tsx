import React, { useEffect, useRef } from 'react';
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
  FaRegCompass, FaArrowRight,
} from 'react-icons/fa';
import { FaXTwitter, FaThreads, FaTiktok, FaGlobe, FaCrown } from 'react-icons/fa6';
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

/**
 * Renders the logo for Nothing.wiki using their live hosted image URL.
 *
 * @param size Target edge dimension in pixels for icon display
 */
function NothingWikiIcon({ size = 22 }: { size?: number }) {
  return (
    <img
      src="https://nothing.wiki/lib/tpl/mikio/images/logo_white.svg"
      width={size}
      height={size}
      alt="Nothing.wiki"
      className={styles.socialIconImg}
      loading="lazy"
    />
  );
}

/** Official web portals and developer resources. */
const officialPortalLinks = [
  { label: 'Community', href: 'https://nothing.community/', icon: <TbMessageCircle size={22} /> },
  { label: 'Discord', href: 'https://discord.com/invite/nothingtech', icon: <FaDiscord size={22} /> },
  { label: 'GitHub', href: 'https://github.com/NothingOSS', icon: <FaGithub size={22} /> },
  { label: 'Playground', href: 'https://playground.nothing.tech/', icon: <FaRocket size={22} /> },
  { label: 'Website', href: 'https://nothing.tech/', icon: <FaGlobe size={22} /> },
];

/** Community-maintained platform links. */
const communityMaintainedLinks = [
  { label: 'Community', ariaLabel: 'Community', href: 'https://t.me/s/NothingTechCommunity', icon: <FaTelegramPlane size={22} /> },
  { label: <span style={{ textTransform: 'none' }}>r/NothingTech</span>, ariaLabel: 'r/NothingTech', href: 'https://www.reddit.com/r/NothingTech', icon: <FaRedditAlien size={22} /> },
  { label: 'Updates', ariaLabel: 'Updates', href: 'https://t.me/NothingTelegramCommunity', icon: <FaTelegramPlane size={22} /> },
  { label: 'Wiki', ariaLabel: 'Wiki', href: 'https://nothing.wiki/', icon: <NothingWikiIcon size={22} /> },
  { label: 'XDA', ariaLabel: 'XDA', href: 'https://xdaforums.com/c/nothing.12583/', icon: <FaTerminal size={22} /> },
];

/** Official social media channels. */
const socialMediaLinks = [
  { label: 'CMF', href: 'https://x.com/cmfbynothing', icon: <FaXTwitter size={22} /> },
  { label: 'Community', href: 'https://www.instagram.com/nothing.community', icon: <FaInstagram size={22} /> },
  { label: 'Essential', href: 'https://x.com/essential', icon: <FaXTwitter size={22} /> },
  { label: 'Instagram', href: 'https://instagram.com/nothing', icon: <FaInstagram size={22} /> },
  { label: 'Nothing', href: 'https://x.com/nothing', icon: <FaXTwitter size={22} /> },
  { label: 'Threads', href: 'https://www.threads.net/@nothing', icon: <FaThreads size={22} /> },
  { label: 'TikTok', href: 'https://www.tiktok.com/@nothing', icon: <FaTiktok size={22} /> },
  { label: 'YouTube', href: 'https://www.youtube.com/@NothingTechnology', icon: <FaYoutube size={22} /> },
];



/**
 * Primary landing page hero header component.
 */
function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();

  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className="container">
        <AnnouncementBanner />
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <Heading as="h1" className={styles.heroTitle}>
              {siteConfig.title}
            </Heading>
            <p className={styles.heroSubtitle}>
              {siteConfig.tagline}
            </p>
            <div className={styles.buttons}>
              <Link className={clsx('button', styles.ctaButton)} to="/showcase">
                <span className={styles.ctaIconWrapper}>
                  <FaRegCompass className={styles.ctaCompassIcon} size={16} />
                </span>
                <span>Explore Apps & Projects</span>
                <FaArrowRight className={styles.ctaArrowIcon} size={12} />
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



interface ContributorMetadata {
  lead?: string;
  maintainers?: string[];
  foundational?: string[];
  core?: string[];
  key?: string[];
  roles?: Record<string, string>;
  customAvatars?: Record<string, string>;
  customUrls?: Record<string, string>;
  customNames?: Record<string, string>;
}

// SAFETY: Bundled static JSON matches the ContributorMetadata interface schema.
const metadata = contributorMetadata as ContributorMetadata;

/**
 * Resolves the display name for a contributor card, falling back to name or username.
 */
function getContributorName(contrib: Contributor): string {
  const customNames = metadata.customNames || {};
  if (customNames[contrib.login]) {
    return customNames[contrib.login];
  }
  return contrib.name || contrib.login;
}

/**
 * Resolves the profile or commit history link for a contributor card.
 */
function getContributorHref(contrib: Contributor): string {
  const customUrls = metadata.customUrls || {};
  if (customUrls[contrib.login]) {
    return customUrls[contrib.login];
  }
  return `https://github.com/spike0en/nothing_archive/commits?author=${contrib.login}`;
}

/**
 * Resolves the assigned contributor role from metadata.
 */
function getContributorRole(login: string): string | undefined {
  const roles = metadata.roles || {};
  return roles[login];
}

/**
 * Resolves the avatar URL for a contributor, preferring curated overrides.
 */
function getContributorAvatar(contrib: Contributor): string {
  const customAvatars = metadata.customAvatars || {};
  if (customAvatars[contrib.login]) {
    return customAvatars[contrib.login];
  }
  if (contrib.avatar_url && contrib.avatar_url.trim().length > 0) {
    return contrib.avatar_url;
  }
  return `https://avatars.githubusercontent.com/${contrib.login}?v=4`;
}

/**
 * Appends a dimension query parameter to GitHub avatar URLs for high-DPI rendering.
 */
function getOptimizedAvatarUrl(url: string, size: number = 96): string {
  if (!url) return url;
  if (url.includes('githubusercontent.com')) {
    const cleanUrl = url.replace(/([?&])s=\d+/g, '');
    const separator = cleanUrl.includes('?') ? '&' : '?';
    return `${cleanUrl}${separator}s=${size}`;
  }
  return url;
}

function formatContributorHandle(handleText: string): string {
  if (!handleText) return '';
  const clean = handleText.trim();
  if (clean.includes('/')) {
    return clean
      .split('/')
      .map((part) => {
        const p = part.trim();
        return p.startsWith('@') ? p : `@${p}`;
      })
      .join(' / ');
  }
  if (clean.includes(' ')) {
    return clean;
  }
  return clean.startsWith('@') ? clean : `@${clean}`;
}

interface ContributorDisplay {
  displayName: string;
  subName: string | null;
  role?: string;
  href: string;
  avatarUrl: string;
}

function resolveContributorDisplay(contrib: Contributor): ContributorDisplay {
  const role = getContributorRole(contrib.login);
  const rawName = getContributorName(contrib);
  const match = rawName.match(/^(.*?)\s*\((.*?)\)$/);
  const displayName = match ? match[1] : rawName;
  const rawSub = match
    ? match[2]
    : contrib.login.toLowerCase() !== displayName.toLowerCase()
    ? contrib.login
    : null;
  const subName = rawSub ? formatContributorHandle(rawSub) : null;
  const href = getContributorHref(contrib);
  const avatarUrl = getContributorAvatar(contrib);

  return { displayName, subName, role, href, avatarUrl };
}

function ContributorCard({
  contrib,
  variant,
}: {
  contrib: Contributor;
  variant: 'core' | 'key';
}) {
  const { displayName, subName, role, href, avatarUrl } = resolveContributorDisplay(contrib);
  const isCore = variant === 'core';
  const cardClass = isCore ? styles.coreCard : styles.keyCard;
  const avatarContainerClass = isCore ? styles.coreAvatarContainer : styles.keyAvatarContainer;
  const avatarClass = isCore ? styles.coreAvatar : styles.keyAvatar;
  const headerClass = isCore ? styles.coreHeader : styles.keyHeader;
  const titleClass = isCore ? styles.coreTitle : styles.keyTitle;
  const handleClass = isCore ? styles.coreHandle : styles.keyHandle;
  const roleClass = isCore ? styles.coreRoleBadge : styles.keyRoleBadge;
  const avatarPixelSize = isCore ? 50 : 44;
  const avatarFetchSize = isCore ? 110 : 96;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cardClass}
      aria-label={`View ${contrib.name || contrib.login}'s commits on GitHub`}
    >
      <div className={avatarContainerClass}>
        <img
          src={getOptimizedAvatarUrl(avatarUrl, avatarFetchSize)}
          alt={`${contrib.name || contrib.login}'s avatar`}
          className={avatarClass}
          width={avatarPixelSize}
          height={avatarPixelSize}
          loading="lazy"
        />
      </div>
      <div className={styles.cardContent}>
        <div className={clsx(styles.cardHeader, headerClass)}>
          <div className={clsx(styles.cardTitle, titleClass)}>{displayName}</div>
          {subName && <div className={clsx(styles.cardHandle, handleClass)}>{subName}</div>}
        </div>
        {role && <div className={clsx(styles.cardRoleBadge, roleClass)}>{role}</div>}
      </div>
    </a>
  );
}

function HomepageCommunity() {
  // Centralized GitHub data hook; shares cache across components.
  const { contributors } = useGitHubContributors();

  // Sort contributors descending by commit count to keep offline and live views aligned.
  const sortedContributors = React.useMemo(() => {
    return [...contributors].sort((a, b) => b.contributions - a.contributions);
  }, [contributors]);

  // Maintainers (lead and co-maintainers).
  const maintainerMembers = React.useMemo(() => {
    const maintainerLogins: string[] = metadata.maintainers || [
      metadata.lead || 'pikawee',
      'PHATWalrus',
    ];
    return maintainerLogins
      .map((login) => contributors.find((c) => c.login === login))
      .filter((c): c is Contributor => !!c);
  }, [contributors]);

  // Foundational members in configured display order.
  const foundationalMembers = React.useMemo(() => {
    const maintainerLogins = new Set(
      metadata.maintainers || [
        metadata.lead || 'pikawee',
        'PHATWalrus',
      ]
    );
    const logins: string[] = metadata.foundational ||
      (metadata.core || []).filter((l: string) => !maintainerLogins.has(l));
    return logins
      .filter((l: string) => !maintainerLogins.has(l))
      .map((login) => contributors.find((c) => c.login === login))
      .filter((c): c is Contributor => !!c);
  }, [contributors]);

  // Key contributors with dedicated profile cards.
  const keyMembers = React.useMemo(() => {
    const keyLogins: string[] = metadata.key || [
      'Earendel-lab',
      'burakdede0',
      'AdaaamB',
      'LukeSkyD',
    ];
    return keyLogins
      .map((login) => contributors.find((c) => c.login === login))
      .filter((c): c is Contributor => !!c);
  }, [contributors]);

  // Community contributors excluding maintainers, foundational, and key members.
  const communityContributors = React.useMemo(() => {
    const maintainerLogins = metadata.maintainers || [
      metadata.lead || 'pikawee',
      'PHATWalrus',
    ];
    const excludedLogins = new Set([
      ...maintainerLogins,
      ...(metadata.foundational || []),
      ...(metadata.key || []),
    ]);
    return sortedContributors.filter((c) => !excludedLogins.has(c.login));
  }, [sortedContributors]);

  return (
    <section className={styles.communitySection}>
      <div className="container">
        <Heading as="h2" className={styles.sectionLabel}>
          Hall of Fame
        </Heading>

        <Heading as="h3" className={styles.subSectionLabel}>
          Maintainers
        </Heading>
        <div className={styles.leadContainer}>
          {maintainerMembers.map((contrib) => {
            const { displayName, subName, role, href, avatarUrl } = resolveContributorDisplay(contrib);
            const isFounder = contrib.login === 'pikawee' || contrib.login === metadata.lead;

            return (
              <a
                key={contrib.login}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.leadCard}
                aria-label={`View ${contrib.name || contrib.login}'s commits on GitHub`}
              >
                <div className={styles.leadAvatarContainer}>
                  <img
                    src={getOptimizedAvatarUrl(avatarUrl, 130)}
                    alt={`${contrib.name || contrib.login}'s avatar`}
                    className={styles.leadAvatar}
                    width="62"
                    height="62"
                    loading="lazy"
                  />
                  {isFounder && (
                    <span
                      className={styles.crownBadge}
                      title="Founder & Project Lead"
                      aria-label="Founder & Project Lead"
                    >
                      <FaCrown size={10} />
                    </span>
                  )}
                </div>
                <div className={styles.cardContent}>
                  <div className={clsx(styles.cardHeader, styles.leadHeader)}>
                    <div className={clsx(styles.cardTitle, styles.leadTitle)}>
                      {displayName}
                    </div>
                    <div className={clsx(styles.cardHandle, styles.leadHandle)}>
                      {subName}
                    </div>
                  </div>
                  <div className={clsx(styles.cardRoleBadge, styles.leadRoleBadge)}>
                    {role || 'Maintainer'}
                  </div>
                </div>
              </a>
            );
          })}
        </div>

        {/* Foundational Contributors Subsection */}
        <Heading as="h3" className={clsx(styles.subSectionLabel, styles.subSectionLabelMargin)}>
          Foundational Contributors
        </Heading>
        <div className={styles.coreGrid}>
          {foundationalMembers.map((contrib) => (
            <ContributorCard key={contrib.login} contrib={contrib} variant="core" />
          ))}
        </div>

        <Heading as="h3" className={clsx(styles.subSectionLabel, styles.subSectionLabelMargin)}>
          Key Contributors
        </Heading>
        <div className={styles.keyGrid}>
          {keyMembers.map((contrib) => (
            <ContributorCard key={contrib.login} contrib={contrib} variant="key" />
          ))}
        </div>

        {communityContributors.length > 0 && (
          <div className={styles.communityBlock}>
            <Heading as="h3" className={clsx(styles.subSectionLabel, styles.subSectionLabelMargin)}>
              Community Contributors
            </Heading>
            <div className={styles.avatarCloud}>
              {communityContributors.map((contrib) => {
                const commits = contrib.contributions;
                const commitText = `${commits} ${commits === 1 ? 'commit' : 'commits'}`;
                const title = `${getContributorName(contrib)} (${commitText})`;
                return (
                  <a
                    key={contrib.login}
                    href={getContributorHref(contrib)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.avatarBubble}
                    title={title}
                    aria-label={title}
                  >
                    <img
                      src={getOptimizedAvatarUrl(getContributorAvatar(contrib), 96)}
                      alt={`${contrib.login}'s avatar`}
                      className={styles.avatarBubbleImg}
                      width="42"
                      height="42"
                      loading="lazy"
                      onError={(e) => {
                        const target = e.currentTarget;
                        if (!target.dataset.triedFallback) {
                          target.dataset.triedFallback = 'true';
                          target.src = `https://avatars.githubusercontent.com/${contrib.login}?v=4`;
                        }
                      }}
                    />
                  </a>
                );
              })}
            </div>
          </div>
        )}

        <div className={styles.toggleContainer}>
          <a
            href="https://github.com/spike0en/nothing_archive/graphs/contributors"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.toggleButton}
          >
            Show All on GitHub
          </a>
        </div>
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
 * Repository commit and firmware release activity feeds.
 */
function HomepageActivity() {
  return (
    <section className={styles.activitySection}>
      <div className="container">
        <Heading as="h2" className={styles.sectionLabel}>
          Activity
        </Heading>
        <div className={styles.telemetrySection}>
          <div className={styles.telemetryBox}>
            <CommitMatrix />
          </div>
          <div className={styles.telemetryBox}>
            <ReleaseFeed />
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Footer section listing external links divided into Community Maintained,
 * Official Portals, and Social Media categories.
 */
function HomepageSocials() {
  return (
    <section className={styles.socials}>
      <div className="container">
        <Heading as="h2" className={styles.sectionLabel}>
          Connect
        </Heading>

        <Heading as="h3" className={styles.subSectionLabel}>
          Community Maintained
        </Heading>
        <div className={styles.socialLinks}>
          {communityMaintainedLinks.map(({ label, ariaLabel, href, icon }) => (
            <a
              key={href}
              href={href}
              aria-label={ariaLabel}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
            >
              {icon}
              <span className={styles.socialLinkLabel}>{label}</span>
            </a>
          ))}
        </div>

        <Heading as="h3" className={clsx(styles.subSectionLabel, styles.subSectionLabelMargin)}>
          Official Portals
        </Heading>
        <div className={styles.socialLinks}>
          {officialPortalLinks.map(({ label, href, icon }) => (
            <a
              key={href}
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

        <Heading as="h3" className={clsx(styles.subSectionLabel, styles.subSectionLabelMargin)}>
          Social Media
        </Heading>
        <div className={styles.socialLinks}>
          {socialMediaLinks.map(({ label, href, icon }) => (
            <a
              key={href}
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
  const homepageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = homepageRef.current;
    if (!container) return;

    let lastClientX: number | null = null;
    let lastClientY: number | null = null;
    let animFrameId: number | null = null;

    const updateGlowPosition = () => {
      if (!container) return;

      // If mouse hasn't moved yet, default to top-right behind Hero Glyph logo
      if (lastClientX === null || lastClientY === null) {
        container.style.setProperty('--mouse-x', '75%');
        container.style.setProperty('--mouse-y', '200px');
        return;
      }

      const rect = container.getBoundingClientRect();
      const x = lastClientX - rect.left;
      const y = lastClientY - rect.top;

      container.style.setProperty('--mouse-x', `${x}px`);
      container.style.setProperty('--mouse-y', `${y}px`);
    };

    const requestUpdate = () => {
      if (animFrameId !== null) return;
      animFrameId = requestAnimationFrame(() => {
        animFrameId = null;
        updateGlowPosition();
      });
    };

    const handlePointerMove = (e: PointerEvent) => {
      lastClientX = e.clientX;
      lastClientY = e.clientY;
      requestUpdate();
    };

    const handleScroll = () => {
      requestUpdate();
    };

    const handleResize = () => {
      requestUpdate();
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    updateGlowPosition();

    return () => {
      if (animFrameId !== null) cancelAnimationFrame(animFrameId);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Layout
      title="Nothing OS Firmware, OTA Updates & Community Apps"
      description="Community-driven archive for the Nothing & CMF ecosystem. Download official Nothing OS firmware, OTA updates, and community apps, and browse technical guides."
    >
      <div ref={homepageRef} className={styles.homepageContainer}>
        <div className={styles.glyphGrid} aria-hidden="true" />
        <HomepageHeader />
        <main className={styles.main}>
          <HomepageFeatures />
          <HomepageActivity />
          <HomepageMilestones />
          <HomepageCommunity />
          <HomepageSocials />
        </main>
      </div>
    </Layout>
  );
}
