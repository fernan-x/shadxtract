"use client";

import {
  ExecutionPhaseStatus,
  WorkflowExecutionStatus,
} from "@/core/domain/workflow/workflow.entity";
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
import React, { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { Separator } from "@/ui/components/ui/separator";
import { Button } from "@/ui/components/ui/button";
import { Badge } from "@/ui/components/ui/badge";
import { datesToDurationString } from "@/lib/helpers/dates";
import { getPhasesTotalCost } from "@/lib/helpers/phases";
import { GetWorkflowPhaseDetails } from "@/ui/actions/GetWorkflowPhaseDetails";
import LogViewer from "./LogViewer";
import ParameterViewer from "./ParameterViewer";
import PhaseStatusBadge from "./PhaseStatusBadge";

type ExecutionData = Awaited<ReturnType<typeof GetWorkflowExecution>>;

export default function ExecutionViewer({
  execution,
}: {
  execution: ExecutionData;
}) {
  const [selectedPhase, setSelectedPhase] = useState<string | null>(null);

  const query = useQuery({
    queryKey: ["execution", execution?.id],
    initialData: execution,
    queryFn: () => GetWorkflowExecution(execution!.id),
    refetchInterval: (q) =>
      q.state.data?.status === WorkflowExecutionStatus.RUNNING ? 1000 : false,
  });

  const phaseDetails = useQuery({
    queryKey: ["phaseDetails", selectedPhase],
    enabled: selectedPhase !== null,
    queryFn: () => GetWorkflowPhaseDetails(selectedPhase!),
  });

  const duration = datesToDurationString(
    query.data?.completedAt,
    query.data?.startedAt,
  );

  const creditsConsumed = getPhasesTotalCost(query.data?.phases ?? []);
  const isRunning = query.data?.status === WorkflowExecutionStatus.RUNNING;

  useEffect(() => {
    // Auto select the running phase
    const phases = query.data?.phases || [];
    if (isRunning) {
      const phaseToSelect = phases.toSorted((a, b) => a.startedAt! > b.startedAt! ? -1 : 1)[0];
      setSelectedPhase(phaseToSelect.id);
      return;
    }

    const phaseToSelect = phases.toSorted((a, b) => a.completedAt! > b.completedAt! ? -1 : 1)[0];
    setSelectedPhase(phaseToSelect.id);
  }, [isRunning, query.data?.phases, setSelectedPhase]);

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
                variant={selectedPhase === phase.id ? "secondary" : "ghost"}
                className="w-full justify-between"
                onClick={() => {
                  if (isRunning) {
                    return null;
                  }
                  setSelectedPhase(phase.id);
                }}
              >
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{index + 1}</Badge>
                  <p className="font-semi-bold">{phase.name}</p>
                </div>
                <PhaseStatusBadge
                  status={phase.status as ExecutionPhaseStatus}
                />
              </Button>
            ))}
          </div>
        </div>
      </aside>
      <div className="flex w-full h-full">
        {isRunning && (
          <div className="flex items-center flex-col gap-2 justify-center h-full w-full">
            <p className="font-bold">Run is in progress, please wait...</p>
          </div>
        )}
        {!isRunning && !selectedPhase && (
          <div className="flex items-center flex-col gap-2 justify-center h-full w-full">
            <div className="flex flex-col gap-1 text-center">
              <p className="font-bold">No phase selected</p>
              <p className="text-sm text-muted-foreground">
                Select a phase to view the details
              </p>
            </div>
          </div>
        )}
        {!isRunning && selectedPhase && phaseDetails.data && (
          <div className="flex flex-col py-4 container gap-4 overflow-auto">
            <div className="flex gap-2 items-center">
              <Badge variant="outline" className="space-x-4">
                <div className="flex gap-1 items-center">
                  <CoinsIcon size={18} className="stroke-muted-foreground" />
                  <span>Credits</span>
                </div>
                <span>TODO</span>
              </Badge>

              <Badge variant="outline" className="space-x-4">
                <div className="flex gap-1 items-center">
                  <ClockIcon size={18} className="stroke-muted-foreground" />
                  <span>Duration</span>
                </div>
                <span>
                  {datesToDurationString(
                    phaseDetails.data.completedAt,
                    phaseDetails.data.startedAt,
                  ) || "-"}
                </span>
              </Badge>
            </div>

            <ParameterViewer
              title="Inputs"
              subtitle="Inputs used for this phase"
              paramsJson={phaseDetails.data.inputs}
            />
            <ParameterViewer
              title="Outputs"
              subtitle="Outputs generated by this phase"
              paramsJson={phaseDetails.data.outputs}
            />

            <LogViewer logs={phaseDetails.data.logs} />
          </div>
        )}
      </div>
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
