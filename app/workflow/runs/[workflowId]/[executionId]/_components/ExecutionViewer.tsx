"use client";

import { WorkflowExecutionStatus } from "@/core/domain/workflow/workflow.entity";
import { GetWorkflowExecution } from "@/ui/actions/GetWorkflowExecution";
import { useQuery } from "@tanstack/react-query";
import {
  CalendarIcon,
  CircleDashedIcon,
  ClockIcon,
  CoinsIcon,
  Loader2Icon,
  LucideIcon,
  WorkflowIcon,
} from "lucide-react";
import React from "react";
import { formatDistanceToNow } from "date-fns";
import { Separator } from "@/ui/components/ui/separator";
import { Button } from "@/ui/components/ui/button";
import { Badge } from "@/ui/components/ui/badge";
import { datesToDurationString } from "@/lib/helpers/dates";
import { getPhasesTotalCost } from "@/lib/helpers/phases";

type ExecutionData = Awaited<ReturnType<typeof GetWorkflowExecution>>;

export default function ExecutionViewer({
  execution,
}: {
  execution: ExecutionData;
}) {
  const query = useQuery({
    queryKey: ["execution", execution?.id],
    initialData: execution,
    queryFn: () => GetWorkflowExecution(execution!.id),
    refetchInterval: (q) =>
      q.state.data?.status === WorkflowExecutionStatus.RUNNING ? 1000 : false,
  });

  const duration = datesToDurationString(
    query.data?.completedAt,
    query.data?.startedAt,
  );

  const creditsConsumed = getPhasesTotalCost(query.data?.phases ?? []);

  return (
    <div className="flex w-full h-full">
      <aside className="w-[440px] min-w-[440px] max-w-[440px] border-r-2 border-separate flex flex-grow flex-col overflow-hidden">
        <div className="py-4 px-2">
          <ExecutionLabel
            icon={CircleDashedIcon}
            label="Status"
            value={query.data?.status}
          />
          <ExecutionLabel
            icon={CalendarIcon}
            label="Started at"
            value={
              <span className="lowercase">
                {query.data?.startedAt
                  ? formatDistanceToNow(new Date(query.data?.startedAt), {
                      addSuffix: true,
                    })
                  : "-"}
              </span>
            }
          />
          <ExecutionLabel
            icon={ClockIcon}
            label="Duration"
            value={
              duration ? (
                duration
              ) : (
                <Loader2Icon className="animate-spin" size={20} />
              )
            }
          />
          <ExecutionLabel
            icon={CoinsIcon}
            label="Credits consumed"
            value={creditsConsumed}
          />

          <Separator />

          <div className="flex justify-center items-center px-4 py-2">
            <div className="text-muted-foreground flex items-center gap-2">
              <WorkflowIcon size={20} className="stroke-muted-foreground/80" />
              <span className="font-semi-bold">Phases</span>
            </div>
          </div>

          <Separator />

          <div className="overflow-auto h-full px-2 py-4">
            {query.data?.phases.map((phase, index) => (
              <Button
                key={phase.id}
                variant="ghost"
                className="w-full justify-between"
              >
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{index + 1}</Badge>
                  <p className="font-semi-bold">{phase.name}</p>
                </div>
              </Button>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
}

function ExecutionLabel({
  icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: string;
  value: React.ReactNode;
}) {
  const Icon = icon;
  return (
    <div className="flex justify-between items-center py-2 px-4 text-sm">
      <div className="text-muted-foreground flex items-center gap-2">
        <Icon size={20} className="stroke-muted-foreground/80" />
        <span>{label}</span>
      </div>
      <div className="font-semi-bold capitalize flex gap-2 items-center">
        {value}
      </div>
    </div>
  );
}
