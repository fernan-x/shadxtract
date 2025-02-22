import { WorkflowStatus } from '@/core/domain/workflow/workflow-status.value-object';

describe('VALUE OBJECT: WorkflowStatus', () => {
  it('should create a valid status', () => {
    const status = new WorkflowStatus('active');
    expect(status.getValue()).toBe('active');
  });

  it('should reject invalid statuses', () => {
    expect(() => new WorkflowStatus('invalid-status')).toThrow(
      'Invalid workflow status: invalid-status'
    );
  });

  it('should compare statuses correctly', () => {
    const status1 = new WorkflowStatus('active');
    const status2 = new WorkflowStatus('active');
    const status3 = new WorkflowStatus('archived');

    expect(status1.equals(status2)).toBe(true);
    expect(status1.equals(status3)).toBe(false);
  });
});
