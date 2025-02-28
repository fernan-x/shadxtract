'use client'

import React, { useCallback, useEffect } from 'react'
import { addEdge, Background, BackgroundVariant, Connection, Controls, Edge, ReactFlow, useEdgesState, useNodesState, useReactFlow } from '@xyflow/react'

import '@xyflow/react/dist/style.css'
import { createFlowNode } from '@/lib/workflow/createFlowNode'
import { AppNode } from '@/ui/types/app-node'
import NodeComponent from './nodes/NodeComponent'
import { WorkflowType } from '@/core/domain/workflow/workflow.entity'
import { useTheme } from 'next-themes'
import useSystemColorScheme from '@/ui/hooks/use-system-color-scheme'
import DeletableEdge from './nodes/edges/DeletableEdge'
import { TaskType } from '@/ui/types/task'

const nodeTypes = {
    ShadXTractNode: NodeComponent,
}

const edgeTypes = {
    default: DeletableEdge,
}

const snapGrid: [number, number] = [50, 50];
const fitViewOptions = { padding: 2 };

function FlowEditor({ workflow }: { workflow: WorkflowType }) {
    const [nodes, setNodes, onNodesChange] = useNodesState<AppNode>([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
    const {setViewport, screenToFlowPosition, updateNodeData} = useReactFlow();

    const { theme } = useTheme();
    const systemColorScheme = useSystemColorScheme();
    const colorMode = theme === 'dark' ? 'dark' : (theme === 'system' ? systemColorScheme : 'light');

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

    const onDragOver = useCallback((event: React.DragEvent) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    const onDrop = useCallback((event: React.DragEvent) => {
        event.preventDefault();
        const taskType = event.dataTransfer.getData('application/reactflow');
        if (!taskType) return;

        const position = screenToFlowPosition({ x: event.clientX, y: event.clientY });

        const node = createFlowNode(taskType as TaskType, position);
        setNodes((nds) => nds.concat(node));
    }, [screenToFlowPosition, setNodes]);

    const onConnect = useCallback((connection: Connection) => {
        setEdges(eds => addEdge({...connection, animated: true}, eds));
        if (!connection.target) return;

        const node = nodes.find(n => n.id === connection.target);
        if (!node) return;
        console.log(node);

        const { inputs } = node.data;
        delete inputs[connection.target];
        updateNodeData(node.id, { inputs });
    }, [nodes, setEdges, updateNodeData]);

    return (
        <main className='h-full w-full'>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                nodeTypes={nodeTypes}
                edgeTypes={edgeTypes}
                snapGrid={snapGrid}
                snapToGrid
                fitViewOptions={fitViewOptions}
                fitView
                onDragOver={onDragOver}
                onDrop={onDrop}
                colorMode={colorMode}
                onConnect={onConnect}
            >
                <Controls
                    position='top-left'
                    fitViewOptions={fitViewOptions}
                />
                <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
            </ReactFlow>
        </main>
    )
}

export default FlowEditor