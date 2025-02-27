'use client'

import { Workflow } from '@/core/domain/workflow/workflow.entity'
import React from 'react'
import { ReactFlowProvider } from '@xyflow/react'
import FlowEditor from './FlowEditor'
import { WorkflowType } from '@/core/domain/workflow/workflow.entity'
import TopBar from './topbar/TopBar'
import TaskMenu from './TaskMenu'

function Editor({ workflow }: { workflow: WorkflowType }) {
  return (
    <ReactFlowProvider>
      <div className='flex flex-col h-full w-full overflow-hidden'>
        <TopBar title='Workflow editor' subtitle={workflow.name} workflowId={workflow.id}/>
        <section className='flex h-full overflow-auto'>
          <TaskMenu />
          <FlowEditor workflow={workflow} />
        </section>
      </div>
    </ReactFlowProvider>
  )
}

export default Editor