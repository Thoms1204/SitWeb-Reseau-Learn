export type Level = {
  id: number;
  name: string;
  description: string;
  order: number;
};

export type Lesson = {
  id: number;
  levelId: number;
  name: string;
  description: string;
  order: number;
  content: string;
};

export type ExerciseType = 'MCQ' | 'SUBNET_CALC' | 'DRAG_DROP' | 'FILL_BLANK';

export type Exercise = {
  id: number;
  lessonId: number;
  type: ExerciseType;
  questionData: any;
  answerData: any;
};

export type LevelStatus = 'LOCKED' | 'IN_PROGRESS' | 'COMPLETED';

export type LessonStatus = 'LOCKED' | 'IN_PROGRESS' | 'COMPLETED';

export type LevelProgress = {
  levelId: number;
  status: LevelStatus;
  completedLessons: number;
  totalLessons: number;
};

export type LessonProgress = {
  lessonId: number;
  status: LessonStatus;
  score?: number;
};

export type ExerciseAttempt = {
  id: string;
  userId: string;
  exerciseId: number;
  isCorrect: boolean;
  timeSpentSeconds: number;
  attemptNumber: number;
  createdAt: Date;
};
