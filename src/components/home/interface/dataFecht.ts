export interface ScheduleData {
  email: string | null;
  reportType: string | null;
  tags: string[];
  schedule: boolean;
}

export interface DataFetch extends ScheduleData {
  urls: string[];
  keywords: string[];
  userId: number;
  role: string;
}
