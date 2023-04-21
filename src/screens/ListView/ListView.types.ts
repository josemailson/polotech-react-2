export interface ITaskState {
    id: string;
    label: string;
    isComplete: boolean;
    date: number;
    userId?: string;
}