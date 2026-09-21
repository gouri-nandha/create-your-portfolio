import { ProjectItem } from '../../types/portfolio';

export interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  topics?: string[];
  updated_at: string;
}

export async function fetchGitHubUserRepos(username: string): Promise<GitHubRepo[]> {
  const cleanUsername = username.trim().replace(/^@/, '');
  if (!cleanUsername) throw new Error('Please enter a GitHub username.');

  const res = await fetch(`https://api.github.com/users/${encodeURIComponent(cleanUsername)}/repos?sort=updated&per_page=20`, {
    headers: {
      Accept: 'application/vnd.github.v3+json',
    },
  });

  if (res.status === 404) {
    throw new Error(`GitHub user "${cleanUsername}" was not found.`);
  }

  if (res.status === 403) {
    throw new Error('GitHub API rate limit reached. Please wait a few moments or use manual entry.');
  }

  if (!res.ok) {
    throw new Error(`GitHub API error: ${res.statusText}`);
  }

  const repos: any[] = await res.json();
  return repos.filter(r => !r.fork).map(r => ({
    id: r.id,
    name: r.name,
    description: r.description || 'Open source project hosted on GitHub.',
    html_url: r.html_url,
    homepage: r.homepage || '',
    language: r.language || 'Code',
    stargazers_count: r.stargazers_count || 0,
    forks_count: r.forks_count || 0,
    topics: r.topics || [],
    updated_at: r.updated_at,
  }));
}

export function convertReposToProjects(repos: GitHubRepo[]): ProjectItem[] {
  return repos.map(repo => {
    const tech: string[] = [];
    if (repo.language) tech.push(repo.language);
    if (repo.topics && Array.isArray(repo.topics)) {
      tech.push(...repo.topics.slice(0, 3));
    }
    if (tech.length === 0) tech.push('GitHub');

    return {
      title: repo.name.replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      description: repo.description || 'Innovative project created with modern development workflows.',
      technologies: tech,
      githubUrl: repo.html_url,
      liveUrl: repo.homepage || '',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80',
    };
  });
}
