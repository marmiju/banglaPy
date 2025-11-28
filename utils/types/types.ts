export interface UserType {
  id: string,
  googleId: string,
  email: string,
  username: string,
  profile_picture: string
  submissions?: Submission[];
  badge?: Badge[]
  activities?: Activity[]
  learned?: Learned[]
  scores?: Score[]
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
  user?: UserType;
  problem?:Problem
}

export interface Score {
  id: string;
  userId: string;
  totalScore: number;
  solvedCount: number;
  lastUpdated: string;
  user?: UserType
}

export interface Resources {
  id: number
  topic: string
  desc: string
  source: string
  code: string
  quizs: Quiz[]
}

export interface Quiz {
  id: string
  question: string
  options: string[]
  correctAnswer: string
  resource_id: number
}

export interface Badge {
  id: string;
  name: string;
  description: string | null;
  iconUrl: string | null;
  category: string | null;
  level: number | null;
  conditions: any | null;   // because Prisma Json type → any
  userId: string;
  createdAt: string;        // ISO date string
  updatedAt: string;        // ISO date string
}

export interface Activity {
  id: string;
  userId: string;
  date: string | Date;
  count: number;
}

export interface Learned {
  id: string;
  resId: number;
  userId: string;
  res: Resources
}



