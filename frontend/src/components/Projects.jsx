import React, { useState, useEffect, useRef } from 'react';
import '../styles/Projects.css';
import { FaGithub, FaExternalLinkAlt, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const GITHUB_USER = 'Mushfiq599';
const GITHUB_URL = `https://github.com/${GITHUB_USER}`;
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
const contributionGraphSources = [
  `https://github.com/users/${GITHUB_USER}/contributions`,
  `https://github-contributions.vercel.app/${GITHUB_USER}`,
  `https://ghchart.rshah.org/${GITHUB_USER}`,
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
        const response = await fetch(`https://api.github.com/users/${GITHUB_USER}/events/public?per_page=30`);
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
        const response = await fetch(`https://api.github.com/users/${GITHUB_USER}/repos?sort=pushed&per_page=8`);
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
        const response = await fetch(`https://api.github.com/users/${GITHUB_USER}`);
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
  }, []);

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

            <div className="contribution-card">
              <div className="contribution-card-header">
                <h3>Contribution Heatmap</h3>
                <p>Actual yearly contribution activity rendered directly from GitHub with fallback public heatmaps.</p>
              </div>

              <div className="contribution-summary-grid">
                <div>
                  <strong>{summaryLoading ? '--' : summaryValues.totalCommits ?? '--'}</strong>
                  <span>Total contributions</span>
                </div>
                <div>
                  <strong>{summaryLoading ? '--' : summaryValues.currentStreak ?? '--'}</strong>
                  <span>Current streak</span>
                </div>
                <div>
                  <strong>{summaryLoading ? '--' : summaryValues.longestStreak ?? '--'}</strong>
                  <span>Longest streak</span>
                </div>
                <div>
                  <strong>{summaryLoading ? '--' : summaryValues.averageDaily ?? '--'}</strong>
                  <span>Daily average</span>
                </div>
              </div>

              <div className="contribution-graph">
                <img
                  src={contributionGraphUrl}
                  alt="GitHub contribution heatmap"
                  onError={() => {
                    setContributionGraphIndex((currentIndex) => {
                      if (currentIndex < contributionGraphSources.length - 1) {
                        return currentIndex + 1;
                      }
                      return currentIndex;
                    });
                  }}
                />
              </div>

              <p className="contribution-note">
                This section shows real GitHub contributions fetched live in a heatmap style, plus yearly commit statistics.
              </p>
            </div>
          </div>
        </div>

        <div className="activity-panel">
          <div className="section-header activity-header">
            <h2>Recent GitHub Activity</h2>
            <p>Latest contributions from my GitHub account</p>
          </div>

          {loadingActivity ? (
            <p className="projects-loading">Loading activity...</p>
          ) : (
            <div className="activity-list">
              {error && <p className="projects-error">{error}</p>}
              {activity.length > 0 ? (
                activity.map((event, index) => (
                  <div key={`${event.id || index}`} className="activity-card">
                    <p>{formatGitHubEvent(event)}</p>
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
