export interface BlogPost {
    title: string;
    date: string;
    slug: string;
    excerpt: string;
    content: string;
    views: number;
    history?: CommitHistory[];
  }
  
  export interface CommitHistory {
    hash: string;
    date: string;
    message: string;
    diff?: string;
  }
  
  export class BlogSystem {
    private posts: BlogPost[] = [
      {
        title: "Building Scalable Microservices",
        date: "2024-01-15",
        slug: "building-scalable-microservices",
        excerpt: "Insights from building and deploying microservices at scale...",
        content: `# Building Scalable Microservices
  
  \`\`\`typescript
  // Example service configuration
  interface ServiceConfig {
    name: string;
    version: string;
    dependencies: string[];
  }
  \`\`\`
  
  ## Architecture Overview
  Our microservices architecture follows these principles...
  
  \`\`\`diff
  - const oldConfig = { timeout: 1000 };
  + const newConfig = { timeout: 2000, retries: 3 };
  \`\`\``,
        views: 156,
        history: [
          {
            hash: "a1b2c3d",
            date: "2024-01-15",
            message: "Initial post",
            diff: null
          },
          {
            hash: "e4f5g6h",
            date: "2024-01-16",
            message: "Added code examples",
            diff: `diff --git a/post.md b/post.md
  - # Building Scalable Microservices
  + # Building Scalable Microservices with TypeScript`
          }
        ]
      },
      // Add more posts...
    ];
  
    ls(flags: string[] = []): string[] {
      if (flags.includes('l')) {
        return this.posts.map(post => 
          `${post.date} ${post.views.toString().padStart(5)} ${post.title}`
        );
      }
      return this.posts.map(post => post.title);
    }
  
    cat(slug: string): string[] {
      const post = this.posts.find(p => p.slug === slug);
      if (!post) return ['Post not found'];
      post.views++;
      return this.formatPost(post);
    }
  
    private formatPost(post: BlogPost): string[] {
      // Process markdown and syntax highlighting
      return post.content
        .split('\n')
        .map(line => {
          if (line.startsWith('```')) {
            // Handle code blocks with syntax highlighting
            return this.formatCodeBlock(line);
          }
          return line;
        });
    }
  
    private formatCodeBlock(line: string): string {
      // Add ANSI color codes for syntax highlighting
      return line.replace(/([a-zA-Z]+)/g, '\x1b[32m$1\x1b[0m')
                 .replace(/([0-9]+)/g, '\x1b[33m$1\x1b[0m');
    }
  
    log(slug: string): string[] {
      const post = this.posts.find(p => p.slug === slug);
      if (!post || !post.history) return ['No history available'];
      
      return post.history.map(commit => 
        `\x1b[33m${commit.hash}\x1b[0m ${commit.date} ${commit.message}`
      );
    }
  
    diff(slug: string, hash: string): string[] {
      const post = this.posts.find(p => p.slug === slug);
      if (!post || !post.history) return ['No history available'];
      
      const commit = post.history.find(c => c.hash.startsWith(hash));
      if (!commit || !commit.diff) return ['No diff available'];
      
      return commit.diff.split('\n').map(line => {
        if (line.startsWith('+')) return `\x1b[32m${line}\x1b[0m`;
        if (line.startsWith('-')) return `\x1b[31m${line}\x1b[0m`;
        return line;
      });
    }
  
    top(count: number = 5): string[] {
      return this.posts
        .sort((a, b) => b.views - a.views)
        .slice(0, count)
        .map(post => `${post.views.toString().padStart(5)} ${post.title}`);
    }
  }