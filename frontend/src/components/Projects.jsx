import React, { useState, useEffect, useRef } from 'react';
import '../styles/Projects.css';
import { FaGithub, FaExternalLinkAlt, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const GITHUB_USER = 'Mushfiq599';
const GITHUB_URL = `https://github.com/${GITHUB_USER}`;

const contributionLegend = [
  { label: 'No activity', color: '#ebedf0' },
  { label: 'Low', color: '#c6e48b' },
  { label: 'Medium', color: '#7bc96f' },
  { label: 'High', color: '#239a3b' },
  { label: 'Very high', color: '#196127' },
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
  const [contributionLoadError, setContributionLoadError] = useState(null);
  const [contributionSummary, setContributionSummary] = useState(null);
  const [summaryLoading, setSummaryLoading] = useState(true);
  const [summaryError, setSummaryError] = useState(null);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? featuredProjects.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === featuredProjects.length - 1 ? 0 : prev + 1));
  };

  const currentProject = featuredProjects[currentIndex];
  const sliderRef = useRef(null);
  const [contributionImageUrl, setContributionImageUrl] = useState(`https://ghchart.rshah.org/${GITHUB_USER}`);
  const fallbackContributionImageUrl = `https://github-contributions.vercel.app/${GITHUB_USER}`;

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
    const fetchActivity = async () => {
      try {
        const response = await fetch(`https://api.github.com/users/${GITHUB_USER}/events/public?per_page=6`);
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

    const fetchContributionSummary = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000/api'}/github/contributions-summary/${GITHUB_USER}`);
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

    fetchActivity();
    fetchContributionSummary();
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

        <div className="contributions-panel">
          <div className="section-header contributions-header">
            <h2>GitHub Contribution Grid</h2>
            <p>Commit activity shown box by box, just like GitHub.</p>
          </div>

          <div className="legend-grid">
            {contributionLegend.map((item) => (
              <div key={item.label} className="legend-item">
                <span className="legend-swatch" style={{ background: item.color }} />
                <span>{item.label}</span>
              </div>
            ))}
          </div>

          <div className="contribution-graph">
            <img
              src={contributionImageUrl}
              alt="GitHub contribution heatmap"
              loading="lazy"
              onError={() => {
                if (contributionImageUrl === `https://ghchart.rshah.org/${GITHUB_USER}`) {
                  setContributionImageUrl(fallbackContributionImageUrl);
                } else {
                  setContributionLoadError('Contribution graph could not load. Please refresh or check your network.');
                }
              }}
            />
          </div>

          <div className="contribution-meta">
            <div className="streak-summary">
              <div className="metric-card">
                <span className="metric-label">💪 Total Commits</span>
                <strong>{summaryLoading ? '--' : contributionSummary?.totalCommits ?? '0'}</strong>
              </div>
              <div className="metric-card">
                <span className="metric-label">🔥 Current Streak</span>
                <strong>{summaryLoading ? '--' : contributionSummary?.currentStreak ?? '0'}<small> days</small></strong>
              </div>
              <div className="metric-card">
                <span className="metric-label">⭐ Longest Streak</span>
                <strong>{summaryLoading ? '--' : contributionSummary?.longestStreak ?? '0'}<small> days</small></strong>
              </div>
              <div className="metric-card">
                <span className="metric-label">📊 Daily Average</span>
                <strong>{summaryLoading ? '--' : contributionSummary?.averageDaily ?? '0'}<small> commits</small></strong>
              </div>
            </div>
          </div>

          {summaryLoading && (
            <p className="projects-loading">Fetching your GitHub contribution data...</p>
          )}
          {summaryError && (
            <p className="projects-error">{summaryError}</p>
          )}
        </div>

        <div className="projects-footer">
          <h3>Want to see more?</h3>
          <p>Explore my GitHub profile to view all projects and contributions.</p>
          <button className="btn-secondary" onClick={() => window.open(GITHUB_URL, '_blank')}>
            View GitHub Profile
          </button>
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
