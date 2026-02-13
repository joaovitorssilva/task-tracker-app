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
}

export interface List {
    id: number;
    name: string;
    tasks: Task[];
}

