export interface ScheduledJob {
  _id: any;
  title: string;
  repeatMonthly: boolean;
  retries: number;

  scheduledAt: Date | string;
}
