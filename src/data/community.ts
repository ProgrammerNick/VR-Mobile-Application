
export interface CommunityPost {
  id: string;
  author: {
    name: string;
    avatarUrl: string;
  };
  timestamp: string;
  content: string;
  game?: {
    name: string;
    imageUrl: string;
  };
  likes: number;
  comments: number;
}
