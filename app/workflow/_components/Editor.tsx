'use client'

import { Workflow } from '@/core/domain/workflow/workflow.entity'
import React from 'react'
import { ReactFlowProvider } from '@xyflow/react'
import FlowEditor from './FlowEditor'
import { WorkflowFactoryData } from '@/core/domain/workflow/workflow.factory'
import TopBar from './topbar/TopBar'

function Editor({ workflow }: { workflow: WorkflowFactoryData }) {
  return (
    <ReactFlowProvider>
      <div className='flex flex-col h-full w-full overflow-hidden'>
        <TopBar title='Workflow editor' subtitle={workflow.name} workflowId={workflow.id}/>
        <section className='flex h-full overflow-auto'>
          <FlowEditor workflow={workflow} />
        </section>
      </div>
    </ReactFlowProvider>
  )
}

export default Editor