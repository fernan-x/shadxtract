import { Loader2Icon } from "lucide-react";
import React from "react";

function loading() {
  return (
    <div className="flex flex-col h-screen w-full items-center justify-center gap-2">
      <Loader2Icon className="animate-spin stroke-primary" size={30} />
      <p className="text-muted-foreground text-sm">Loading your workflow...</p>
    </div>
  );
}

export default loading;
