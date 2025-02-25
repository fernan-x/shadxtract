'use client'

import React from 'react'
import { Workflow } from '@/core/domain/workflow/workflow.entity'
import { Background, BackgroundVariant, Controls, ReactFlow, useEdgesState, useNodesState } from '@xyflow/react'

import '@xyflow/react/dist/style.css'
import { createFlowNode } from '@/lib/workflow/createFlowNode'
import { TaskType } from '@/ui/types/app-node'
import NodeComponent from './nodes/NodeComponent'

const nodeTypes = {
    ShadXTractNode: NodeComponent,
}

function FlowEditor({ workflow }: { workflow: Workflow }) {
    const [nodes, setNodes, onNodesChange] = useNodesState([
        createFlowNode(TaskType.LAUNCH_BROWSER),
    ]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);

    return (
        <main className='h-full w-full'>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                nodeTypes={nodeTypes}
            >
                <Controls position='top-left' />
                <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
            </ReactFlow>
        </main>
    )
}

export default FlowEditor