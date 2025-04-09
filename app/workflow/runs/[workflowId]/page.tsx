import { GetWorkflowExecutions } from "@/ui/actions/GetWorkflowExecutions";
import TopBar from "../../_components/topbar/TopBar";
import { Suspense } from "react";
import { InboxIcon, Loader2Icon } from "lucide-react";

export default function ExecutionsPage({
  params,
}: {
  params: { workflowId: string };
}) {
  return (
    <div className="h-full w-full overflow-auto">
      <TopBar
        workflowId={params.workflowId}
        hideButtons
        title="All runs"
        subtitle="View all executions for this workflow"
      />
      <Suspense
        fallback={
          <div className="flex justify-center items-center h-full w-full">
            <Loader2Icon size={30} className="animate-spin stroke-primary" />
          </div>
        }
      >
        <ExecutionsTable workflowId={params.workflowId} />
      </Suspense>
    </div>
  );
}

async function ExecutionsTable({ workflowId }: { workflowId: string }) {
  const executions = await GetWorkflowExecutions(workflowId);
  if (!executions) {
    return <div>No data</div>;
  }

  if (executions.length === 0) {
    return (
      <div className="container w-full py-6">
        <div className="flex flex-col items-center gap-2 justify-center h-full w-full">
          <div className="rounded-full bg-accent w-20 h-20 flex items-center justify-center">
            <InboxIcon size={40} className="stroke-primary" />
          </div>
          <div className="flex flex-col gap-1 text-center">
            <p className="font-bold">
              No runs have been executed for this workflow yet.
            </p>
            <p className="text-sm text-muted-foreground">
              You can trigger a run in the editor page
            </p>
          </div>
        </div>
      </div>
    );
  }

  return <pre>{JSON.stringify(executions, null, 2)}</pre>;
}
