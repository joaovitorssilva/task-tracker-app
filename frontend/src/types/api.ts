export type Priority = 'LOW' | 'MEDIUM' | 'HIGH' | 'VERY_HIGH' 


export interface Task {
    id: number;
    title: string;
    description?: string;
    priority: Priority; 
    expectedFinishDate: string | null;
    finishDate: string | null;
    listId: number;
    createdAt: string;
    updatedAt: string;
    finished?: boolean;
}

export interface List {
    id: number;
    name: string;
    tasks: Task[];
}

export interface NewTaskProps {
    title: string;
    description: string;
    priority: Priority;
    expectedFinishDate: string | null;
    listId: number;
}