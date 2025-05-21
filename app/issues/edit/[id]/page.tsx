import React from "react";
import IssueForm from "../../_components/IssueForm";
import { prisma } from "@/prisma/client";
import { notFound } from "next/navigation";

const EditIssuePage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const id = (await params).id;
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(id) },
  });

  if (!issue) notFound();

  return <IssueForm issue={issue} />;
};

export const metadata = {
  title: "Issue Tracker - Edit Issue",
  description: "Edit an issues",
};

export default EditIssuePage;
