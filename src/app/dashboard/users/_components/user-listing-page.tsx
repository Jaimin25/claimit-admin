import Link from "next/link";
import { Plus } from "lucide-react";

import PageContainer from "@/components/layout/page-container";
import { buttonVariants } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Users } from "@/constants/data";
import { fakeUsers } from "@/constants/mock-api";
import { searchParamsCache } from "@/lib/searchparams";
import { cn } from "@/lib/utils";

import UsersTable from "./user-tables";

type TUsersListingPage = {};

export default async function UsersListingPage({}: TUsersListingPage) {
  // Showcasing the use of search params cache in nested RSCs
  // const page = searchParamsCache.get("page");
  // const search = searchParamsCache.get("q");
  // const gender = searchParamsCache.get("gender");
  // const pageLimit = searchParamsCache.get("limit");

  const filters = {
    page: 1,
    limit: 10,
  };

  // mock api call
  const data = await fakeUsers.getUsers(filters);
  const totalUsers = data.total_users;
  const employee: Users[] = data.users;

  return (
    <PageContainer scrollable>
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <Heading
            title={`Employee (${totalUsers})`}
            description="Manage employees (Server side table functionalities.)"
          />

          <Link
            href={"/dashboard/employee/new"}
            className={cn(buttonVariants({ variant: "default" }))}
          >
            <Plus className="mr-2 h-4 w-4" /> Add New
          </Link>
        </div>
        <Separator />
        <UsersTable data={employee} totalData={totalUsers} />
      </div>
    </PageContainer>
  );
}
