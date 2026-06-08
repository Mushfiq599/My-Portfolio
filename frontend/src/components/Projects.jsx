import React, { useState, useEffect, useRef } from 'react';
import '../styles/Projects.css';
import { FaGithub, FaExternalLinkAlt, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const GITHUB_USER = 'Mushfiq599';
const GITHUB_URL = `https://github.com/${GITHUB_USER}`;
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
const contributionGraphSources = [
  `https://ghchart.rshah.org/${GITHUB_USER}`,
  `https://github.com/users/${GITHUB_USER}/contributions`,
];

const featuredProjects = [
  {
    title: 'Care.xyz',
    description: 'A trusted care platform for families, connecting verified caretakers with children, elderly parents, and sick family members.',
    technologies: ['React', 'Node.js', 'MongoDB'],
    github: `https://github.com/${GITHUB_USER}/care-xyz`,
    live: `https://github.com/${GITHUB_USER}/care-xyz`,
    image: 'https://i.ibb.co.com/zHB78qS7/Screenshot-354.png'
  },
  {
    title: 'StyleDecor-client',
    description: 'A premium decor landing page with vibrant visuals and smooth UX for decoration services and event styling.',
    technologies: ['React', 'CSS', 'UI Design'],
    github: `https://github.com/${GITHUB_USER}/stleDecor-client`,
    live: `https://github.com/${GITHUB_USER}/stleDecor-client`,
    image: 'https://i.ibb.co.com/CpvMLn9T/Screenshot-356.png'
  },
  {
    title: 'HomeHero-client',
    description: 'A clean home services UI with booking, service management, and responsive navigation for clients.',
    technologies: ['React', 'REST API', 'Tailwind'],
    github: `https://github.com/${GITHUB_USER}/HomeHero-client`,
    live: `https://github.com/${GITHUB_USER}/HomeHero-client`,
    image: 'https://i.ibb.co.com/bRRPVZK8/Screenshot-357.png'
  }
];

function formatGitHubEvent(event) {
  const repoName = event.repo?.name || 'a repository';
  const date = new Date(event.created_at).toLocaleDateString();

  switch (event.type) {
    case 'PushEvent':
      return `${event.actor?.login} pushed ${event.payload?.size || 1} commit${event.payload?.size === 1 ? '' : 's'} to ${repoName} · ${date}`;
    case 'PullRequestEvent':
      return `${event.actor?.login} ${event.payload?.action} a pull request in ${repoName} · ${date}`;
    case 'IssuesEvent':
      return `${event.actor?.login} ${event.payload?.action} an issue in ${repoName} · ${date}`;
    case 'CreateEvent':
      return `${event.actor?.login} created ${event.payload?.ref_type} in ${repoName} · ${date}`;
    default:
      return `${event.actor?.login} contributed to ${repoName} · ${date}`;
  }
}

export default function Projects() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activity, setActivity] = useState([]);
  const [loadingActivity, setLoadingActivity] = useState(true);
  const [error, setError] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [profileError, setProfileError] = useState(null);
  const [contributionSummary, setContributionSummary] = useState(null);
  const [contributionGraphIndex, setContributionGraphIndex] = useState(0);
  const [contributionSvg, setContributionSvg] = useState(null);
  const [tooltipText, setTooltipText] = useState('');
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipCoords, setTooltipCoords] = useState({ x: 0, y: 0 });
  const activityHeatmapRef = useRef(null);
  const [summaryLoading, setSummaryLoading] = useState(true);
  const [summaryError, setSummaryError] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loadingRepos, setLoadingRepos] = useState(true);
  const [reposError, setReposError] = useState(null);
  const [typedLines, setTypedLines] = useState([]);
  const [activeTyping, setActiveTyping] = useState('');

  const terminalLines = [
    'Initializing developer systems...',
    'Fetching GitHub activity...',
    'Loading repository telemetry...',
    'Synchronizing commits...',
    'Rendering contribution galaxy...',
  ];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? featuredProjects.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === featuredProjects.length - 1 ? 0 : prev + 1));
  };

  const currentProject = featuredProjects[currentIndex];
  const sliderRef = useRef(null);
  const contributionGraphUrl = contributionGraphSources[contributionGraphIndex];

  const summaryValues = {
    totalCommits: contributionSummary?.totalCommits,
    currentStreak: contributionSummary?.currentStreak,
    longestStreak: contributionSummary?.longestStreak,
    averageDaily: contributionSummary?.averageDaily,
  };

  const galaxyNodes = activity.slice(0, 14).map((event, index) => {
    const repoName = event.repo?.name || 'unknown/repo';
    const date = new Date(event.created_at).toLocaleDateString();
    const commits = event.type === 'PushEvent' ? event.payload?.size || 1 : 1;
    const message = event.payload?.commits?.[0]?.message || event.payload?.action || 'Updated activity';
    const intensity = Math.min(4, commits);
    const x = 10 + (index * 17) % 75;
    const y = 12 + (index * 11) % 72;
    const delay = index * 0.15;

    return {
      id: `${event.id || index}`,
      repoName,
      date,
      commits,
      message,
      intensity,
      x,
      y,
      delay,
      eventType: event.type,
    };
  });

  const repoCards = repos.slice(0, 4).map((repo, idx) => ({
    ...repo,
    x: 8 + idx * 22,
    y: 10 + (idx % 2) * 28,
  }));

  // Only show the latest 4 push events (commits) in the Recent GitHub Activity
  const recentCommits = activity
    .filter((e) => e.type === 'PushEvent')
    .slice(0, 4);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const handleMouseMove = (event) => {
      const rect = slider.getBoundingClientRect();
      slider.style.setProperty('--mouse-x', `${event.clientX - rect.left}px`);
      slider.style.setProperty('--mouse-y', `${event.clientY - rect.top}px`);
      slider.classList.add('mouse-visible');
    };

    const handleMouseLeave = () => {
      slider.classList.remove('mouse-visible');
    };

    slider.addEventListener('mousemove', handleMouseMove);
    slider.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      slider.removeEventListener('mousemove', handleMouseMove);
      slider.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  useEffect(() => {
    let timers = [];
    let delay = 0;

    terminalLines.forEach((line, index) => {
      for (let i = 0; i <= line.length; i++) {
        timers.push(setTimeout(() => {
          setActiveTyping(line.slice(0, i));
        }, delay + i * 40));
      }

      timers.push(setTimeout(() => {
        setTypedLines((prev) => [...prev, line]);
        setActiveTyping('');
      }, delay + line.length * 40 + 450));

      delay += line.length * 40 + 750;
    });

    return () => timers.forEach((timer) => clearTimeout(timer));
  }, []);

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/github/events/${GITHUB_USER}`);
        if (!response.ok) {
          throw new Error('Unable to fetch GitHub activity');
        }
        const data = await response.json();
        setActivity(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoadingActivity(false);
      }
    };

    const fetchRepos = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/github/repos/${GITHUB_USER}`);
        if (!response.ok) {
          throw new Error('Unable to fetch repositories');
        }
        const data = await response.json();
        setRepos(data);
      } catch (err) {
        setReposError(err.message);
      } finally {
        setLoadingRepos(false);
      }
    };

    const fetchContributionSummary = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/github/contributions-summary/${GITHUB_USER}`);
        if (!response.ok) {
          throw new Error('Unable to load contribution summary');
        }
        const summary = await response.json();
        setContributionSummary(summary);
      } catch (err) {
        setSummaryError(err.message);
      } finally {
        setSummaryLoading(false);
      }
    };

    const fetchProfile = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/github/user/${GITHUB_USER}`);
        if (!response.ok) {
          throw new Error('Unable to fetch GitHub profile');
        }
        const profileData = await response.json();
        setProfile(profileData);
      } catch (err) {
        setProfileError(err.message);
      } finally {
        setLoadingProfile(false);
      }
    };

    fetchActivity();
    fetchRepos();
    fetchContributionSummary();
    fetchProfile();
    fetchContributionSvg().catch((err) => {
      console.warn('Contribution SVG load failed:', err?.message || err);
    });
  }, []);

  // Fetch SVG (proxy first, then public sources) and recolor to match theme
  const fetchContributionSvg = async () => {
    // Prefer backend proxy (real GitHub contributions SVG) first, then ghchart
    const sources = [
      `${API_BASE_URL}/github/contributions/${GITHUB_USER}`,
      `https://ghchart.rshah.org/${GITHUB_USER}`,
      `https://github.com/users/${GITHUB_USER}/contributions`,
    ];

    for (const src of sources) {
      try {
        const res = await fetch(src, { headers: { 'User-Agent': 'Mozilla/5.0' } });
        if (!res.ok) throw new Error('no-svg');
        const text = await res.text();

        // Only accept a true <svg> fragment to avoid inlining full HTML
        const svgMatch = text.match(/<svg[\s\S]*?<\/svg>/i);
        if (!svgMatch) {
          // not an SVG response, try next source
          continue;
        }

        let svg = svgMatch[0];

        // Recolor common GitHub contribution colors to portfolio purple palette
        const colorMap = {
          '#ebedf0': '#0b0a0f', // empty -> dark
          '#c6e48b': '#3a1f45', // level1 -> dark purple
          '#7bc96f': '#6b3fb0', // level2 -> medium purple
          '#239a3b': '#b07bff', // level3 -> bright purple
          '#196127': '#d7b8ff', // level4 -> light highlight
        };

        Object.keys(colorMap).forEach((k) => {
          const v = colorMap[k];
          const re = new RegExp(k, 'gi');
          svg = svg.replace(re, v);
        });

        // Ensure SVG scales to container and preserves aspect ratio
        // If SVG has width/height attributes, convert them into a viewBox for responsive scaling
        const svgTagMatch = svg.match(/<svg[^>]*>/i);
        if (svgTagMatch) {
          const svgTag = svgTagMatch[0];
          const wMatch = svgTag.match(/width=["']?(\d+)(?:px)?["']?/i);
          const hMatch = svgTag.match(/height=["']?(\d+)(?:px)?["']?/i);
          if (wMatch && hMatch) {
            const w = parseInt(wMatch[1], 10);
            const h = parseInt(hMatch[1], 10);
            const newTag = svgTag
              .replace(/\swidth=["']?\d+(?:px)?["']?/i, '')
              .replace(/\sheight=["']?\d+(?:px)?["']?/i, '')
              .replace(/<svg/i, `<svg width="100%" preserveAspectRatio="xMinYMin meet" viewBox="0 0 ${w} ${h}"`);
            svg = svg.replace(svgTag, newTag);
          } else if (!/width=/.test(svgTag)) {
            svg = svg.replace('<svg', '<svg width="100%" preserveAspectRatio="xMinYMin meet"');
          } else {
            // ensure at least width is responsive
            svg = svg.replace(/width=["']?\d+(?:px)?["']?/i, 'width="100%"');
          }
        }

        // Inject rounding for <rect> elements that lack rx/ry
        svg = svg.replace(/<rect(?![^>]*\brx=)/gi, '<rect rx="4" ry="4"');

        // Reduce square size slightly so full 12 months fit, then inject inline SVG style to mark committed days and add hover/glow
        svg = svg.replace(/width=\"10\"/g, 'width="8"').replace(/height=\"10\"/g, 'height="8"');
        
        // Inject inline SVG style to mark committed days and add hover/glow
        const styleBlock = `<style>
          rect { transition: transform 0.12s ease, filter 0.12s ease; }
          rect[fill="#0b0a0f"] { opacity: 0.45; }
          rect:not([fill="#0b0a0f"]) { stroke: #d7b8ff; stroke-width: 1; filter: drop-shadow(0 6px 14px rgba(176,120,255,0.12)); }
          rect:hover { transform: scale(1.12); filter: drop-shadow(0 10px 30px rgba(176,120,255,0.22)); }
        </style>`;

        svg = svg.replace(/<svg[^>]*>/i, (m) => m + styleBlock);

        setContributionSvg(svg);
        return;
      } catch (e) {
        // try next source
        continue;
      }
    }

    setContributionSvg(null);
  };

  useEffect(() => {
    const container = activityHeatmapRef.current;
    if (!container) return;
    const svgRoot = container.querySelector('svg');
    if (!svgRoot) return;

    const rects = Array.from(svgRoot.querySelectorAll('rect'));
    const handleMouseEnter = (event) => {
      const rect = event.currentTarget;
      const date = rect.getAttribute('data-date') || rect.dataset.date || 'Unknown date';
      const count = rect.getAttribute('data-count') || rect.dataset.count || rect.getAttribute('data-level') || '0';
      setTooltipText(`${date} — ${count} contribution${count === '1' ? '' : 's'}`);
      setTooltipVisible(true);
    };

    const handleMouseMove = (event) => {
      const bounds = container.getBoundingClientRect();
      setTooltipCoords({
        x: event.clientX - bounds.left + 12,
        y: event.clientY - bounds.top + 12,
      });
    };

    const handleMouseLeave = () => {
      setTooltipVisible(false);
    };

    rects.forEach((rect) => {
      rect.addEventListener('mouseenter', handleMouseEnter);
      rect.addEventListener('mousemove', handleMouseMove);
      rect.addEventListener('mouseleave', handleMouseLeave);
      rect.style.cursor = 'pointer';
    });

    return () => {
      rects.forEach((rect) => {
        rect.removeEventListener('mouseenter', handleMouseEnter);
        rect.removeEventListener('mousemove', handleMouseMove);
        rect.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, [contributionSvg]);

  return (
    <section id="work" className="projects">
      <div className="projects-container">
        <div className="section-header">
          <h2>Featured GitHub Projects</h2>
          <p>Project snapshots from my portfolio and GitHub repos</p>
        </div>

        <div className="project-slider" ref={sliderRef}>
          <div className="slider-card" key={currentProject.title}>
            <div className="project-image">
              <img src={currentProject.image} alt={currentProject.title} />
              <div className="project-overlay">
                <div className="project-links">
                  <a href={currentProject.github} target="_blank" rel="noreferrer" className="project-link" title="View Code">
                    <FaGithub />
                  </a>
                  <a href={currentProject.live} target="_blank" rel="noreferrer" className="project-link" title="View Repo">
                    <FaExternalLinkAlt />
                  </a>
                </div>
              </div>
            </div>

            <div className="project-content">
              <h3>{currentProject.title}</h3>
              <p className="project-description">{currentProject.description}</p>

              <div className="project-technologies">
                {currentProject.technologies.map((tech, techIndex) => (
                  <span key={techIndex} className="tech-tag">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mouse-follow"></div>

          <div className="slider-controls">
            <button className="slider-arrow" onClick={handlePrev} aria-label="Previous project">
              <FaChevronLeft />
            </button>
            <button className="slider-arrow" onClick={handleNext} aria-label="Next project">
              <FaChevronRight />
            </button>
          </div>

          <div className="slider-dots">
            {featuredProjects.map((_, index) => (
              <button
                key={index}
                className={`slider-dot ${index === currentIndex ? 'active' : ''}`}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Show project ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="github-galaxy-section">
          <div className="github-galaxy-top">
            <div>
              <span className="galaxy-chip">DEVELOPER ACTIVITY UNIVERSE</span>
              <h2>GitHub Galaxy</h2>
              <p>Experience your GitHub contributions as a cinematic cyberpunk universe of glowing activity nodes, floating repos, and AI system logs.</p>
            </div>
            <div className="galaxy-stats">
              <div className="metric-card galaxy-metric">
                <span className="metric-label">Total contributions</span>
                <strong>{summaryLoading ? '--' : contributionSummary?.totalCommits ?? '0'}</strong>
              </div>
              <div className="metric-card galaxy-metric">
                <span className="metric-label">Current streak</span>
                <strong>{summaryLoading ? '--' : contributionSummary?.currentStreak ?? '0'}<small> days</small></strong>
              </div>
              <div className="metric-card galaxy-metric">
                <span className="metric-label">Longest streak</span>
                <strong>{summaryLoading ? '--' : contributionSummary?.longestStreak ?? '0'}<small> days</small></strong>
              </div>
              <div className="metric-card galaxy-metric">
                <span className="metric-label">Avg daily commits</span>
                <strong>{summaryLoading ? '--' : contributionSummary?.averageDaily ?? '0'}<small> / day</small></strong>
              </div>
            </div>
          </div>

          <div className="galaxy-content-grid">
            <div className="galaxy-canvas">
              <div className="galaxy-background" />
              <div className="galaxy-particles">
                {Array.from({ length: 14 }).map((_, index) => (
                  <span key={index} className="particle-dot" style={{ animationDelay: `${index * 0.2}s`, top: `${Math.random() * 92}%`, left: `${Math.random() * 92}%` }} />
                ))}
              </div>
              <div className="galaxy-lines">
                <span className="connection-line connection-a" />
                <span className="connection-line connection-b" />
                <span className="connection-line connection-c" />
              </div>
              {galaxyNodes.map((node, index) => (
                <div
                  key={node.id}
                  className={`galaxy-node level-${node.intensity}`}
                  style={{ top: `${node.y}%`, left: `${node.x}%`, animationDelay: `${node.delay}s` }}
                >
                  <div className="node-core" />
                  <div className="node-halo" />
                  <div className="node-info">
                    <span>{node.repoName}</span>
                    <strong>{node.commits} commit{node.commits > 1 ? 's' : ''}</strong>
                  </div>
                </div>
              ))}

              {repoCards.map((repo, index) => (
                <a
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  rel="noreferrer"
                  className="repo-card"
                  style={{ top: `${repo.y}%`, left: `${repo.x}%`, animationDelay: `${index * 0.15}s` }}
                >
                  <div className="repo-header">
                    <span>{repo.name}</span>
                    <span className="repo-stars">★ {repo.stargazers_count}</span>
                  </div>
                  <div className="repo-body">
                    <span className="repo-language">{repo.language || 'Unknown'}</span>
                    <p>{repo.description || 'Holographic project node in the galaxy.'}</p>
                  </div>
                  <div className="repo-footer">
                    <span>{repo.homepage ? 'Live' : 'GitHub'}</span>
                    <span>{repo.pushed_at ? new Date(repo.pushed_at).toLocaleDateString() : '—'}</span>
                  </div>
                </a>
              ))}
            </div>

            <div className="galaxy-terminal-panel">
              <div className="terminal-shell">
                <div className="terminal-header">
                  <span className="terminal-dot red" />
                  <span className="terminal-dot yellow" />
                  <span className="terminal-dot green" />
                  <span className="terminal-title">DEV-AI CONSOLE</span>
                </div>
                <div className="terminal-body">
                  {typedLines.map((line, index) => (
                    <div key={index} className="terminal-line">{line}</div>
                  ))}
                  <div className="terminal-line terminal-typing">
                    {activeTyping}
                    <span className="terminal-cursor">█</span>
                  </div>
                </div>
                <div className="terminal-status">
                  <span>STATUS:</span>
                  <strong>{summaryLoading || loadingRepos ? 'SYNCING...' : 'ONLINE'}</strong>
                </div>
              </div>
            </div>
          </div>

          {(summaryLoading || loadingRepos) && (
            <p className="projects-loading">Initializing the GitHub galaxy. Stand by...</p>
          )}
          {(summaryError || reposError) && (
            <p className="projects-error">{summaryError || reposError}</p>
          )}
        </div>

        <div className="github-profile-section">
          <div className="section-header activity-header">
            <h2>GitHub Profile</h2>
            <p>Live profile details and the latest contribution heatmap from my GitHub account.</p>
          </div>

          <div className="profile-grid">
            <div className="profile-card">
              {loadingProfile ? (
                <div className="profile-loading">Loading GitHub profile…</div>
              ) : profileError ? (
                <p className="projects-error">{profileError}</p>
              ) : (
                <>
                  <div className="profile-avatar-wrap">
                    <img src={profile?.avatar_url} alt={`${profile?.login} avatar`} className="profile-avatar" />
                  </div>
                  <div className="profile-details">
                    <div className="profile-main">
                      <h3>{profile?.name || profile?.login}</h3>
                      <p className="profile-login">@{profile?.login}</p>
                      <p className="profile-bio">{profile?.bio || 'Open source enthusiast, building tools and interfaces that scale.'}</p>
                    </div>

                    <div className="profile-meta">
                      <span>{profile?.location || 'Remote'}</span>
                      <span>{profile?.blog ? <a href={profile.blog.startsWith('http') ? profile.blog : `https://${profile.blog}`} target="_blank" rel="noreferrer">Website</a> : 'Website unavailable'}</span>
                    </div>

                    <div className="profile-stats-grid">
                      <div>
                        <strong>{profile?.public_repos ?? '--'}</strong>
                        <span>Repos</span>
                      </div>
                      <div>
                        <strong>{profile?.followers ?? '--'}</strong>
                        <span>Followers</span>
                      </div>
                      <div>
                        <strong>{profile?.following ?? '--'}</strong>
                        <span>Following</span>
                      </div>
                      <div>
                        <strong>{summaryValues.totalCommits ?? '--'}</strong>
                        <span>Year contributions</span>
                      </div>
                    </div>

                    <button className="btn-secondary" onClick={() => window.open(GITHUB_URL, '_blank')}>
                      Open GitHub Profile
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="activity-panel">
          <div className="section-header activity-header">
            <h2>Recent GitHub Activity</h2>
            <p>Latest contributions from my GitHub account</p>
          </div>

          <div className="activity-heatmap" ref={activityHeatmapRef}>
            {contributionSvg ? (
              <>
                <div className="contribution-svg" dangerouslySetInnerHTML={{ __html: contributionSvg }} />
                {tooltipVisible && (
                  <div className="heatmap-tooltip" style={{ left: tooltipCoords.x, top: tooltipCoords.y }}>
                    {tooltipText}
                  </div>
                )}
              </>
            ) : (
              <img
                src={contributionGraphUrl}
                alt="GitHub contribution heatmap"
                className="activity-heatmap-img"
                onError={() => {
                  setContributionGraphIndex((currentIndex) => {
                    if (currentIndex < contributionGraphSources.length - 1) {
                      return currentIndex + 1;
                    }
                    return currentIndex;
                  });
                }}
              />
            )}
          </div>

          {loadingActivity ? (
            <p className="projects-loading">Loading activity...</p>
          ) : (
            <div className="activity-list">
              {error && <p className="projects-error">{error}</p>}
              {recentCommits.length > 0 ? (
                recentCommits.map((event, index) => (
                  <div key={`${event.id || index}`} className="activity-card">
                    <p>{formatGitHubEvent(event)}</p>
                    {event.type === 'PushEvent' && event.payload?.commits?.length > 0 && (
                      <p className="commit-msg">"{event.payload.commits[0].message}"</p>
                    )}
                    <a href={`https://github.com/${event.repo?.name}`} target="_blank" rel="noreferrer">
                      View Repository
                    </a>
                  </div>
                ))
              ) : (
                <p className="projects-loading">No recent activity available.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
