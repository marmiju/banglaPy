export interface UserType {
    id: string,
    googleId: string,
    email: string,
    username: string,
    profile_picture: string
    submissions?: Submission[];
}

export interface Problem {
  id: string;
  title: string;
  description: string;
  sampleInput: string;
  sampleOutput: string;
  sampleExplanation: string;
  created_at: string; // ISO date string
  submissions?: Submission[];
}

export interface Submission {
  length: number;
  id: string;
  code: string;
  created_at: string; // You can also use Date if you convert it
  updated_at: string; // You can also use Date
  isCorrect: boolean;
  problemId: string;
  score: number;
  userId: string;
}

export interface Score {
  id: string;
  userId: string;
  totalScore: number;
  solvedCount: number;
  lastUpdated: string;
  user?: UserType
}


