/**
 * Business Rules:
 * - ID must not be empty
 * - User ID must not be empty
 * - Name must not be empty
 * - Definition can only be updated when workflow is in draft status
 * - Definition must not be empty when updating
 * - Created and updated dates default to current date if not provided
 */

export type WorkflowStatus = 'draft' | 'published';

export type Workflow = {
  id: string;
  userId: string;
  name: string;
  description: string | null;
  definition: string | null;
  status: WorkflowStatus;
  createdAt: Date;
  updatedAt: Date;
}
