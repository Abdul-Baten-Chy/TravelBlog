type AuthorProfile = {
  name: string;
  bio: string;
  profilePicture: string;
  followers: string[];
  following: string[];
};

type Author = {
  profile: AuthorProfile;
  _id: string;
  email: string;
  role: string;
  verified: boolean;
  createdAt: string;
  updatedAt: string;
};

export type TPost = {
  _id: string;
  author: Author;
  title: string;
  content: string;
  images: string[];
  category: string;
  tags: string[];
  premium: boolean;
  upvotes: number;
  downvotes: number;
  comments: string[];
  createdAt: string;
  updatedAt: string;
};

export type ApiResponse = {
  success: boolean;
  statusCode: number;
  message: string;
  data: TPost[];
};
