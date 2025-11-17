import { FieldValue, Timestamp } from "firebase/firestore";

export interface UserProfile {
  id: string;
  name: string;
  username: string;
  email: string;
  avatar: string;
  coverImage: string | null;
  specialty: string;
  bio: string;
  location: string | null;
  website: string | null;
  joinedDate: string;
  stats: {
    posts: number;
    followers: number;
    following: number;
  };
  social: Record<string, string>;
  badges: string[];
  isVerified: boolean;
  createdOn?: Timestamp | FieldValue | null;
  updatedOn?: Timestamp | FieldValue | null;
  lastAccess?: Timestamp | FieldValue | null;
}
