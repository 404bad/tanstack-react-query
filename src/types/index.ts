export interface Post {
  id: number;
  title: string;
  body: string;
}

export interface GitHubUser {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
}
