'use client';

import { GetWorkflowExecution } from '@/ui/actions/GetWorkflowExecution';
import React from 'react'

type ExecutionData = Awaited<ReturnType<typeof GetWorkflowExecution>>;

function ExecutionViewer({ execution }: { execution: ExecutionData }) {
  return (
    <div>ExecutionViewer</div>
  )
}

export default ExecutionViewer