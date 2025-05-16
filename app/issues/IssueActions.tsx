import React from "react";
import { Button } from "../components/Button";
import Link from "next/link";

const IssueActions = () => {
  return (
    <div className="mb-5">
      <Button>
        <Link href="/issues/new">New Issue</Link>
      </Button>
    </div>
  );
};

export default IssueActions;
