'use client'

import { Input } from '@/ui/components/ui/input';
import { Label } from '@/ui/components/ui/label'
import { TaskInputType } from '@/ui/types/task';
import React, { useEffect, useId, useState } from 'react'

export type BaseParamFieldProps = {
  param: TaskInputType;
  value: string;
  onChange: (value: string) => void;
}

function StringParamField({ param, value, onChange }: BaseParamFieldProps) {
  const [internalValue, setInternalValue] = useState(value);
  const id = useId();

  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  return (
    <div className='space-y-1 p-1 w-full'>
      <Label htmlFor={id} className='text-xs flex'>
        {param.name}
        {param.required && <span className='text-red-400 px-2'>*</span>}
      </Label>
      <Input
        id={id}
        className='text-xs'
        value={internalValue}
        placeholder='Enter value here'
        onChange={(e) => setInternalValue(e.target.value)}
        onBlur={(e) => onChange(e.target.value)}
      />
      {param.helperText && <p className='text-muted-foreground px-2'>{param.helperText}</p>}
    </div>
  )
}

export default StringParamField