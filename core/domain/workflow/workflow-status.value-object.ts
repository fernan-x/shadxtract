export class WorkflowStatus {
    private readonly value: string;

    private static readonly ALLOWED_STATUSES = ['draft', 'active', 'archived'];

    constructor(status: string) {
        if (!WorkflowStatus.ALLOWED_STATUSES.includes(status)) {
            throw new Error(`Invalid workflow status: ${status}`);
        }
        this.value = status;
    }

    getValue(): string {
        return this.value;
    }

    equals(other: WorkflowStatus): boolean {
        return this.value === other.value;
    }
}
