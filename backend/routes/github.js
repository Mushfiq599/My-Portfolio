const express = require('express');
const axios = require('axios');

const router = express.Router();
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const defaultHeaders = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
};
if (GITHUB_TOKEN) {
  defaultHeaders.Authorization = `Bearer ${GITHUB_TOKEN}`;
}

// Fetch contribution stats from GitHub public API and contribution data
router.get('/contributions-summary/:username', async (req, res) => {
  const { username } = req.params;

  try {
    // Fetch user public profile data
    const userResponse = await axios.get(`https://api.github.com/users/${username}`, {
      headers: defaultHeaders,
    });
    const userData = userResponse.data;

    // Fetch contribution page to extract actual count
    // Use the contributions page which contains the yearly summary
    const pageResponse = await axios.get(`https://github.com/users/${username}/contributions`, {
      headers: {
        ...defaultHeaders,
        Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      },
    });
    
    // Extract contribution count from page (format: "256 contributions in the last year")
    const contributionMatch = pageResponse.data.match(/(\d+)\s+contributions?\s+in\s+the\s+last\s+year/);
    const totalCommits = contributionMatch ? parseInt(contributionMatch[1]) : 0;

    // Fetch public events to calculate streaks
    let events = [];
    try {
      const eventsResponse = await axios.get(`https://api.github.com/users/${username}/events/public?per_page=500`, {
        headers: defaultHeaders,
      });
      events = eventsResponse.data;
    } catch (eventsError) {
      console.warn('GitHub events fetch warning:', eventsError.response?.status || eventsError.message);
      // Continue without events if GitHub API events are rate limited or blocked
      events = [];
    }

    // Calculate streak statistics from events
    const contributionMap = {};

    events.forEach((event) => {
      const date = new Date(event.created_at).toISOString().split('T')[0];
      if (!contributionMap[date]) {
        contributionMap[date] = 0;
      }
      
      if (event.type === 'PushEvent') {
        const commits = event.payload?.size || 1;
        contributionMap[date] += commits;
      } else if (['PullRequestEvent', 'IssuesEvent', 'CreateEvent'].includes(event.type)) {
        contributionMap[date] += 1;
      }
    });

    // Sort dates and calculate streaks
    const sortedDates = Object.keys(contributionMap).sort();
    let currentStreak = 0;
    let longestStreak = 0;
    let tempStreak = 0;

    // Calculate current streak from most recent backwards
    const sortedDatesDesc = [...sortedDates].reverse();
    for (const date of sortedDatesDesc) {
      if (contributionMap[date] > 0) {
        currentStreak += 1;
      } else {
        break;
      }
    }

    // Calculate longest streak
    sortedDates.forEach((date) => {
      if (contributionMap[date] > 0) {
        tempStreak += 1;
        longestStreak = Math.max(longestStreak, tempStreak);
      } else {
        tempStreak = 0;
      }
    });

    const lastUpdated = sortedDates.length ? sortedDates[sortedDates.length - 1] : null;
    const averageDaily = totalCommits > 0 ? Math.round(totalCommits / 365) : 0;

    res.json({
      username,
      totalCommits,
      currentStreak,
      longestStreak: Math.max(longestStreak, 1),
      lastUpdated,
      publicRepos: userData.public_repos || 0,
      followers: userData.followers || 0,
      averageDaily,
    });
  } catch (error) {
    console.error('GitHub contribution summary error:', error.response?.status || error.message);
    const message = error.response?.status === 403
      ? 'GitHub rate limit or permission blocked the request. Set GITHUB_TOKEN in backend environment or try again later.'
      : 'Unable to load GitHub contribution summary';
    res.status(500).json({ 
      message,
      error: error.response?.data?.message || error.message,
      totalCommits: 0,
      currentStreak: 0,
      longestStreak: 0,
      lastUpdated: null,
      averageDaily: 0,
    });
  }
});

// Keep the old endpoint for backward compatibility
router.get('/contributions/:username', async (req, res) => {
  const { username } = req.params;

  try {
    const response = await axios.get(`https://github.com/users/${username}/contributions`, {
      headers: {
        ...defaultHeaders,
        Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      },
    });
    // Extract the <svg> element from the returned HTML so we serve a valid SVG image
    const html = response.data || '';
    const svgMatch = html.match(/<svg[\s\S]*?<\/svg>/i);
    if (svgMatch) {
      res.set('Content-Type', 'image/svg+xml');
      res.send(svgMatch[0]);
    } else {
      // Fallback: return the raw response (may include surrounding HTML)
      res.set('Content-Type', 'image/svg+xml');
      res.send(html);
    }
  } catch (error) {
    console.error('GitHub contributions proxy error:', error.message);
    res.status(500).json({ message: 'Unable to load GitHub contributions', error: error.message });
  }
});

router.get('/user/:username', async (req, res) => {
  const { username } = req.params;
  try {
    const response = await axios.get(`https://api.github.com/users/${username}`, {
      headers: defaultHeaders,
    });
    res.json(response.data);
  } catch (error) {
    console.error('GitHub user proxy error:', error.response?.status || error.message);
    res.status(error.response?.status || 500).json({ message: 'Unable to load GitHub user profile', error: error.response?.data?.message || error.message });
  }
});

router.get('/repos/:username', async (req, res) => {
  const { username } = req.params;
  try {
    const response = await axios.get(`https://api.github.com/users/${username}/repos?sort=pushed&per_page=8`, {
      headers: defaultHeaders,
    });
    res.json(response.data);
  } catch (error) {
    console.error('GitHub repos proxy error:', error.response?.status || error.message);
    res.status(error.response?.status || 500).json({ message: 'Unable to load GitHub repositories', error: error.response?.data?.message || error.message });
  }
});

router.get('/events/:username', async (req, res) => {
  const { username } = req.params;
  try {
    const response = await axios.get(`https://api.github.com/users/${username}/events/public?per_page=30`, {
      headers: defaultHeaders,
    });
    res.json(response.data);
  } catch (error) {
    console.error('GitHub events proxy error:', error.response?.status || error.message);
    res.status(error.response?.status || 500).json({ message: 'Unable to load GitHub activity events', error: error.response?.data?.message || error.message });
  }
});

module.exports = router;
