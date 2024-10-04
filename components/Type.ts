// Profile interface
interface AuthorProfile {
  name: string;
  bio?: string; // Optional, as it may not be present in every profile
  profilePicture: string;
  followers?: string[]; // Array of user IDs
  following?: string[]; // Array of user IDs
}

// Author interface
interface Author {
  _id: string; // User ID
  email: string;
  role: string;
  verified: boolean;
  createdAt: Date;
  updatedAt: Date;
  profile: AuthorProfile; // Profile information
}

interface CommentProfile {
  name: string;
  profilePicture: string;
}

// Author interface for the comment
interface CommentAuthor {
  _id: string; // User ID
  profile: CommentProfile;
}

interface Comment {
  _id: string; // Comment ID
  post: string; // ID of the associated post
  author: CommentAuthor; // Author details
  content: string; // Content of the comment
  createdAt: Date; // Creation timestamp
  updatedAt: Date; // Last update timestamp
}

// Post interface
export interface TPost {
  _id: string; // Post ID
  author: Author; // Author of the post
  title: string;
  content: string;
  images: string[]; // Array of image URLs
  category: string;
  tags: string[];
  premium: boolean;
  upvotes: number;
  downvotes: number;
  comments: Comment[]; // Array of comments
  createdAt: Date;
  updatedAt: Date;
}

// Response interface for the post retrieval
export interface ApiResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: TPost[];
}
