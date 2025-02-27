'use client'

import React, { useEffect } from 'react'
import { Workflow } from '@/core/domain/workflow/workflow.entity'
import { Background, BackgroundVariant, Controls, ReactFlow, useEdgesState, useNodesState, useReactFlow } from '@xyflow/react'

import '@xyflow/react/dist/style.css'
import { createFlowNode } from '@/lib/workflow/createFlowNode'
import { TaskType } from '@/ui/types/app-node'
import NodeComponent from './nodes/NodeComponent'
import { WorkflowType } from '@/core/domain/workflow/workflow.entity'

const nodeTypes = {
    ShadXTractNode: NodeComponent,
}

const snapGrid: [number, number] = [50, 50];
const fitViewOptions = { padding: 2 };

function FlowEditor({ workflow }: { workflow: WorkflowType }) {
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const {setViewport} = useReactFlow();

    useEffect(() => {
        try {
            const flow = JSON.parse(workflow.definition ?? '');
            if (!flow) return;
            setNodes(flow.nodes || []);
            setEdges(flow.edges || []);

            // If we need to set the viewport, we can do it here
            // if (!flow.viewport) return;
            // const { x = 0, y = 0, zoom = 1 } = flow.viewport;
            // setViewport({ x, y, zoom });
        } catch (error) {
            console.error(error);
        }
    }, [setEdges, setNodes, setViewport, workflow.definition]);

    return (
        <main className='h-full w-full'>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                nodeTypes={nodeTypes}
                snapGrid={snapGrid}
                snapToGrid
                fitViewOptions={fitViewOptions}
                fitView
            >
                <Controls position='top-left' fitViewOptions={fitViewOptions} />
                <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
            </ReactFlow>
        </main>
    )
}

export default FlowEditor