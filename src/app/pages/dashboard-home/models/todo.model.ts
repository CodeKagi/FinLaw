export interface TodoItem {
  id: number;
  urgent: boolean;
  urgentDate: string;
  requestedBy: string;
  fileNo: string;
  clientName: string;
  agent: string;
  description: string;
  fileAgeDays: number;
  phonedDays: number;
  selected?: boolean;
}
