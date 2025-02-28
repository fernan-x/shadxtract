'use client'

import React, { useCallback, useEffect } from 'react'
import { addEdge, Background, BackgroundVariant, Connection, Controls, Edge, getOutgoers, ReactFlow, useEdgesState, useNodesState, useReactFlow } from '@xyflow/react'

import '@xyflow/react/dist/style.css'
import { createFlowNode } from '@/lib/workflow/createFlowNode'
import { AppNode } from '@/ui/types/app-node'
import NodeComponent from './nodes/NodeComponent'
import { WorkflowType } from '@/core/domain/workflow/workflow.entity'
import { useTheme } from 'next-themes'
import useSystemColorScheme from '@/ui/hooks/use-system-color-scheme'
import DeletableEdge from './nodes/edges/DeletableEdge'
import { TaskType } from '@/ui/types/task'
import { TaskRegistry } from '@/lib/workflow/task/registry'

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
        if (!connection.target || !connection.targetHandle) return;

        const node = nodes.find(n => n.id === connection.target);
        if (!node) return;

        const { inputs } = node.data;
        updateNodeData(node.id, { inputs: {
            ...inputs,
            [connection.targetHandle]: '',
        } });
    }, [nodes, setEdges, updateNodeData]);

    const isValidConnection = useCallback((connection: Edge | Connection) => {
        // No self connections allowed
        if (connection.source === connection.target) return false;

        // Same taks param type connections not allowed
        const sourceNode = nodes.find(n => n.id === connection.source);
        const targetNode = nodes.find(n => n.id === connection.target);
        if (!sourceNode || !targetNode) {
            console.error('Invalid connection: source or target node not found');
            return false;
        }

        const sourceTask = TaskRegistry[sourceNode.data.type];
        const targetTask = TaskRegistry[targetNode.data.type];

        const output = sourceTask.outputs.find(o => o.name === connection.sourceHandle);
        const input = targetTask.inputs.find(o => o.name === connection.targetHandle);

        if (input?.type !== output?.type) {
            console.error('Invalid connection: input and output types do not match');
            return false;
        }

        const hasCycle = (node: AppNode, visited = new Set()): boolean => {
            if (visited.has(node.id)) return false;
            visited.add(node.id);

            for (const outgoer of getOutgoers(node, nodes, edges)) {
                if (outgoer.id === connection.source) return true;
                if (hasCycle(outgoer, visited)) return true;
            }

            return false;
        }

        const detectedCycle = hasCycle(targetNode, new Set());
        return !detectedCycle;
    }, [edges, nodes]);

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
                isValidConnection={isValidConnection}
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