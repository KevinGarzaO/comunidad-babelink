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
  social?: SocialLinks;
  badges: string[];
  isVerified: boolean;
  createdOn?: Timestamp | FieldValue | null | Date;
  updatedOn?: Timestamp | FieldValue | null | Date;
  lastAccess?: Timestamp | FieldValue | null | Date;
}

type SocialLinks = {
  youtube?: string;
  tiktok?: string;
  instagram?: string;
  linkedin?: string;
  facebook?: string;
  spotify?: string;
};
