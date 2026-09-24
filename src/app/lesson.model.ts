export interface Lesson {
  id: number;
  track?: 'Angular' | 'HTML' | 'CSS' | 'JavaScript' | 'TypeScript' | 'Node.js';
  level: string;
  title: string;
  summary: string;
  duration: string;
  tag: string;
  accent: string;
  concept: string;
  analogy: string;
  example: string;
  takeaway: string;
  quiz: { question: string; options: string[]; answer: number };
}

export interface LessonSection {
  title: string;
  explanation: string;
  example: string;
  notes?: string[];
}

export interface LessonQuestion {
  question: string;
  options: string[];
  answer: number;
  explanation: string;
}
