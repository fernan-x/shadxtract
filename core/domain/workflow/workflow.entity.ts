import { WorkflowStatus } from './workflow-status.value-object';

export class Workflow {
  private readonly id: string;
  private readonly userId: string;
  private name: string;
  private description: string | null;
  private definition: string | null;
  private status: WorkflowStatus;
  private readonly createdAt: Date;
  private updatedAt: Date;

  constructor(
    id: string,
    userId: string,
    name: string,
    definition: string | null = null,
    status: WorkflowStatus,
    createdAt?: Date,
    updatedAt?: Date,
    description: string | null = null
  ) {
    if (!id.trim()) throw new Error('Workflow ID cannot be empty');
    if (!userId.trim()) throw new Error('User ID cannot be empty');
    if (!name.trim()) throw new Error('Workflow name cannot be empty');

    this.id = id;
    this.userId = userId;
    this.name = name;
    this.definition = definition;
    this.status = status;
    this.description = description;
    this.createdAt = createdAt ?? new Date();
    this.updatedAt = updatedAt ?? new Date();
  }

  getId(): string {
    return this.id;
  }

  getUserId(): string {
    return this.userId;
  }

  getName(): string {
    return this.name;
  }

  getDescription(): string | null {
    return this.description;
  }

  getDefinition(): string | null {
    return this.definition;
  }

  getStatus(): WorkflowStatus {
    return this.status;
  }

  getTimestamps() {
    return {
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  updateName(newName: string) {
    if (!newName.trim()) throw new Error('Workflow name cannot be empty');
    this.name = newName;
    this.updatedAt = new Date();
  }

  updateDescription(newDescription: string | null = null) {
    this.description = newDescription;
    this.updatedAt = new Date();
  }

  updateStatus(newStatus: WorkflowStatus) {
    this.status = newStatus;
    this.updatedAt = new Date();
  }

  updateDefinition(newDefinition: string) {
    if (!newDefinition.trim()) throw new Error('Workflow definition cannot be empty');
    this.definition = newDefinition;
    this.updatedAt = new Date();
  }

  toJSON() {
    return Object.freeze({
      id: this.id,
      userId: this.userId,
      name: this.name,
      description: this.description,
      definition: this.definition,
      status: this.status.getValue(),
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    });
  }
}
