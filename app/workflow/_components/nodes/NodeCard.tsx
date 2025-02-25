'use client'

import React from 'react'

function NodeCard({ children, nodeId }: React.PropsWithChildren<{ nodeId: string }>) {
  return (
    <div>{children}</div>
  )
}

export default NodeCard