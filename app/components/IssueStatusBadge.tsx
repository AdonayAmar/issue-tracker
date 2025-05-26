"use client";
import React from "react";
import { Status } from "../generated/prisma/client";
import { Badge, Select } from "@radix-ui/themes";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const statusMap: Record<
  Status,
  {
    label: string;
    value: "OPEN" | "IN_PROGRESS" | "CLOSED";
    color: "red" | "violet" | "green";
  }
> = {
  OPEN: { label: "Open", value: "OPEN", color: "red" },
  IN_PROGRESS: { label: "In Progress", value: "IN_PROGRESS", color: "violet" },
  CLOSED: { label: "Closed", value: "CLOSED", color: "green" },
};

const statuses = [statusMap.OPEN, statusMap.IN_PROGRESS, statusMap.CLOSED];

interface Props {
  status: Status;
  issueId: number;
}

const IssueStatusBadge = ({ status, issueId }: Props) => {
  const assignStatus = (status: "OPEN" | "IN_PROGRESS" | "CLOSED") => {
    console.log(status);
    axios
      .patch("/api/issues/" + issueId, {
        status: status,
      })
      .then(() => {
        toast.success("Issue Updated");
      })
      .catch(() => {
        toast.error("Changes could not be saved.");
      });
  };

  return (
    <>
      <Select.Root
        defaultValue={statusMap[status].value}
        onValueChange={assignStatus}
      >
        <Select.Trigger />
        <Select.Content className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer">
          {statuses.map((status) => (
            <Select.Item key={status.label} value={status.value}>
              <Badge color={status.color}>{status.label}</Badge>
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
};

export default IssueStatusBadge;
