import { flowToExecutionPlan } from '@/lib/workflow/executionPlan';
import { useReactFlow } from '@xyflow/react';
import { useCallback } from 'react';
import { AppNode } from '../types/app-node';

const useExecutionPlan = () => {
    const { toObject } = useReactFlow();

    const generateExecutionPlan = useCallback(() => {
        const { nodes, edges } = toObject();
        const result = flowToExecutionPlan(nodes as AppNode[], edges);
    }, [toObject]);

    return generateExecutionPlan;
};

export default useExecutionPlan;