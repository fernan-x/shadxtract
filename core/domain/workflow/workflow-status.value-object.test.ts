import { WorkflowStatus } from '@/core/domain/workflow/workflow-status.value-object';

describe('VALUE OBJECT: WorkflowStatus', () => {
  it('should create a valid status', () => {
    const status = new WorkflowStatus('published');
    expect(status.getValue()).toBe('published');
  });

  it('should reject invalid statuses', () => {
    expect(() => new WorkflowStatus('invalid-status')).toThrow(
      'Invalid workflow status: invalid-status'
    );
  });

  it('should compare statuses correctly', () => {
    const status1 = new WorkflowStatus('published');
    const status2 = new WorkflowStatus('published');
    const status3 = new WorkflowStatus('draft');

    expect(status1.equals(status2)).toBe(true);
    expect(status1.equals(status3)).toBe(false);
  });
});
