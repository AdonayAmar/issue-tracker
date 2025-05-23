import { IssueStatusBadge, Link } from "@/app/components";
import { Issue, Status } from "@/app/generated/prisma/client";
import { ArrowDownIcon, ArrowUpIcon } from "@radix-ui/react-icons";
import { Table } from "@radix-ui/themes";
import NextLink from "next/link";

export interface IssueQuery {
  status: Status;
  orderBy: keyof Issue;
  sortedBy: "asc" | "desc";
  page: string;
}

interface Props {
  searchParams: IssueQuery;
  issues: Issue[];
}

const IssueTable = ({ searchParams, issues }: Props) => {
  const sortHandler = () => {
    if (searchParams.sortedBy === "asc") {
      return "desc";
    } else {
      return "asc";
    }
  };

  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          {columns.map((column) => (
            <Table.ColumnHeaderCell
              key={column.value}
              className={column.className}
            >
              <NextLink
                href={{
                  query: {
                    ...searchParams,
                    orderBy: column.value,
                    sortedBy: sortHandler(),
                  },
                }}
              >
                {column.label}
              </NextLink>
              {column.value === searchParams.orderBy &&
                searchParams.sortedBy === "asc" && (
                  <ArrowUpIcon className="inline" />
                )}
              {column.value === searchParams.orderBy &&
                searchParams.sortedBy === "desc" && (
                  <ArrowDownIcon className="inline" />
                )}
            </Table.ColumnHeaderCell>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {issues.map((issue) => (
          <Table.Row key={issue.id}>
            <Table.Cell>
              <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
              <div className="block md:hidden">
                <IssueStatusBadge status={issue.status} issueId={issue.id} />
              </div>
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              <IssueStatusBadge status={issue.status} issueId={issue.id} />
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              {issue.createdAt.toDateString()}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

const columns: {
  label: string;
  value: keyof Issue;
  className?: string;
}[] = [
  { label: "Issue", value: "title" },
  { label: "Status", value: "status", className: "hidden md:table-cell" },
  { label: "Created", value: "createdAt", className: "hidden md:table-cell" },
];

export const columnNames = columns.map((column) => column.value);

export default IssueTable;
