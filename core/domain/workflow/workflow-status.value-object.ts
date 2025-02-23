export class WorkflowStatus {
    private readonly value: WorkflowStatusType;

    public static readonly ALLOWED_STATUSES = ['draft', 'published'] as const;

    constructor(status: WorkflowStatusType) {
        if (!WorkflowStatus.ALLOWED_STATUSES.includes(status)) {
            throw new Error(`Invalid workflow status: ${status}`);
        }
        this.value = status;
    }

    getValue(): WorkflowStatusType {
        return this.value;
    }

    equals(other: WorkflowStatus): boolean {
        return this.value === other.value;
    }
}

export type WorkflowStatusType = typeof WorkflowStatus.ALLOWED_STATUSES[number];
