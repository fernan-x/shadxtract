import { AppNode } from '@/ui/types/app-node'
import React, { useCallback } from 'react'
import StringParamField from './param/StringParamField';
import { useReactFlow } from '@xyflow/react';
import BrowserInstanceParamField from './param/BrowserInstanceParamField';
import { TaskInputType, TaskParamType } from '@/ui/types/task';

function NodeParamField({ param, nodeId, disabled }: { param: TaskInputType, nodeId: string, disabled: boolean }) {
    const { updateNodeData, getNode } = useReactFlow();
    const node = getNode(nodeId) as AppNode;
    const value = node?.data.inputs?.[param.name];

    const updateNodeParamValue = useCallback((value: string) => {
        updateNodeData(nodeId, {
            inputs: {
                ...node?.data.inputs,
                [param.name]: value,
            }
        })
    }, [updateNodeData, nodeId, node?.data.inputs, param.name]);

    switch (param.type) {
        case TaskParamType.STRING:
            return <StringParamField
                param={param}
                value={value}
                onChange={updateNodeParamValue}
                disabled={disabled}
            />
        case TaskParamType.BROWSER_INSTANCE:
            return <BrowserInstanceParamField
                param={param}
                value={''}
                onChange={updateNodeParamValue}
            />
        default:
            return (
                <div className='w-full'>
                    <p className='text-xs text-muted-foreground'>Not implemented</p>
                </div>
            );
    }
}

export default NodeParamField