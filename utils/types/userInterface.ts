export interface UserType {
    id: string,
    googleId: string,
    email: string,
    username: string,
    profile_picture: string
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
}