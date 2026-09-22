export type ConsentCategory = 'ESSENTIAL' | 'ANALYTICS' | 'MARKETING';

export type ConsentRecord = {
  id: string;
  userId: string;
  category: ConsentCategory;
  granted: boolean;
  ip: string;
  userAgent: string;
  createdAt: Date;
};

export type DataRequestType = 'EXPORT' | 'DELETION';

export type DataRequestStatus = 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED' | 'CANCELLED';

export type GdprDataRequest = {
  id: string;
  userId: string;
  type: DataRequestType;
  status: DataRequestStatus;
  createdAt: Date;
  completedAt?: Date;
  expiresAt?: Date;
};

export type ExportData = {
  user: any;
  progress: any;
  attempts: any;
  xpHistory: any;
  consents: any;
  badges: any;
  streakHistory: any;
};

export type FeedbackOutput = {
  title: string;
  message: string;
  explanation: string;
  steps: string[];
  tip?: string;
  relatedConcept?: string;
};
