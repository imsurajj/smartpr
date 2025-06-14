interface PullRequestDetails {
  owner: string;
  repo: string;
  prNumber: string;
  files: Array<{
    filename: string;
    content: string;
    patch?: string;
  }>;
}

export class GitHubService {
  private static instance: GitHubService;
  private baseUrl = 'https://api.github.com';

  private constructor() {}

  public static getInstance(): GitHubService {
    if (!GitHubService.instance) {
      GitHubService.instance = new GitHubService();
    }
    return GitHubService.instance;
  }

  private parsePrUrl(url: string): { owner: string; repo: string; prNumber: string } {
    // Handle different GitHub URL formats
    const regex = /github\.com\/([^/]+)\/([^/]+)\/pull\/(\d+)/;
    const match = url.match(regex);
    
    if (!match) {
      throw new Error('Invalid GitHub PR URL format');
    }

    const [, owner, repo, prNumber] = match;
    return { owner, repo, prNumber };
  }

  async getPrDetails(prUrl: string): Promise<PullRequestDetails> {
    const { owner, repo, prNumber } = this.parsePrUrl(prUrl);
    
    // Get PR files
    const filesResponse = await fetch(
      `${this.baseUrl}/repos/${owner}/${repo}/pulls/${prNumber}/files`,
      {
        headers: {
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github.v3+json',
        },
      }
    );

    if (!filesResponse.ok) {
      throw new Error('Failed to fetch PR files');
    }

    const filesData = await filesResponse.json();
    
    // Get content for each file
    const files = await Promise.all(
      filesData.map(async (file: any) => {
        const contentResponse = await fetch(file.contents_url, {
          headers: {
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
            'Accept': 'application/vnd.github.v3+json',
          },
        });

        if (!contentResponse.ok) {
          return {
            filename: file.filename,
            content: '',
            patch: file.patch,
          };
        }

        const contentData = await contentResponse.json();
        const content = Buffer.from(contentData.content, 'base64').toString();

        return {
          filename: file.filename,
          content,
          patch: file.patch,
        };
      })
    );

    return {
      owner,
      repo,
      prNumber,
      files,
    };
  }

  async submitReviewComment(
    owner: string,
    repo: string,
    prNumber: string,
    commitId: string,
    path: string,
    position: number,
    body: string
  ) {
    const response = await fetch(
      `${this.baseUrl}/repos/${owner}/${repo}/pulls/${prNumber}/reviews`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          commit_id: commitId,
          body,
          event: 'COMMENT',
          comments: [
            {
              path,
              position,
              body,
            },
          ],
        }),
      }
    );

    if (!response.ok) {
      throw new Error('Failed to submit review comment');
    }

    return response.json();
  }
}

export const githubService = GitHubService.getInstance(); 