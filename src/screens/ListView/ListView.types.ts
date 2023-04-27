export interface ITaskState {
    id: string;
    label: string;
    isCompleted: boolean;
    date: number;
    userId?: string;
}