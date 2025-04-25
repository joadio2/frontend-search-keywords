export interface Task {
  email: string | null;
  reportType: string | null;
  tags: string[];
  schedule: boolean;
  repeatMonthly?: boolean;
  scheduleAt?: string;
  title: string;
  urls?: string[];
  keywords?: string[];
  userId?: string;
}

export type ScheduleModalProps = {
  onClose: () => void;
  onNow: (data: Task) => void;
  onSchedule: (data: Task) => void;
};
