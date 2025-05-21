import Pagination from "@/app/components/Pagination";
import { Status } from "@/app/generated/prisma";
import { prisma } from "@/prisma/client";
import { Flex } from "@radix-ui/themes";
import IssueActions from "./IssueActions";
import IssueTable, { columnNames, IssueQuery } from "./IssueTable";

interface Props {
  searchParams: Promise<IssueQuery>;
}

const IssuesPage = async ({ searchParams }: Props) => {
  const statusParams = await searchParams;
  const statuses = Object.values(Status);

  const status = statuses.includes(statusParams.status)
    ? statusParams.status
    : undefined;

  const where = { status };

  const orderBy = columnNames.includes(statusParams.orderBy)
    ? { [statusParams.orderBy]: statusParams.sortedBy }
    : undefined;

  const page = parseInt(statusParams.page) || 1;
  const pageSize = 10;

  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const issueCount = await prisma.issue.count({ where });

  return (
    <Flex direction="column" gap="5">
      <IssueActions />
      <IssueTable searchParams={statusParams} issues={issues} />
      <Pagination
        pageSize={pageSize}
        currentPage={page}
        itemCount={issueCount}
      />
    </Flex>
  );
};

// Remove server cache layer
export const dynamic = "force-dynamic";

export const metadata = {
  title: "Issue Tracker - Issue List",
  description: "View all project issues",
};

export default IssuesPage;
