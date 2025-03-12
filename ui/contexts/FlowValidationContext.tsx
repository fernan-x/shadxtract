import React, { createContext, ReactNode, useState } from 'react';
import { AppNodeInvalidInputs } from '../types/app-node';

type FlowValidationContextType = {
    invalidInputs: AppNodeInvalidInputs[];
    setInvalidInputs: React.Dispatch<React.SetStateAction<AppNodeInvalidInputs[]>>;
    clearErrors: () => void;
}

export const FlowValidationContext = createContext<FlowValidationContextType | null>(null);

export const FlowValidationProvider = ({ children }: { children: ReactNode }) => {
    const [invalidInputs, setInvalidInputs] = useState<AppNodeInvalidInputs[]>([]);

    const clearErrors = () => setInvalidInputs([]);

    return (
        <FlowValidationContext.Provider value={{
            invalidInputs,
            setInvalidInputs,
            clearErrors,
        }}>
            {children}
        </FlowValidationContext.Provider>
    )
}