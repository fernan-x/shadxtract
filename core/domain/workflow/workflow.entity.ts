export type Workflow = {
    id: string;
    userId: string;
    name: string;
    description?: string;
    definition: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}
