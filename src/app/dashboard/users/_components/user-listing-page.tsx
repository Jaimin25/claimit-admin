import { cookies } from "next/headers";
import Link from "next/link";
import axios from "axios";
import { Plus } from "lucide-react";

import PageContainer from "@/components/layout/page-container";
import { buttonVariants } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Users } from "@/constants/data";
import { Config } from "@/lib/config";
import { cn } from "@/lib/utils";

import UsersTable from "./user-tables";

type TUsersListingPage = {};

export default async function UsersListingPage({}: TUsersListingPage) {
  // Showcasing the use of search params cache in nested RSCs
  // const page = searchParamsCache.get("page");
  // const search = searchParamsCache.get("q");
  // const gender = searchParamsCache.get("gender");
  // const pageLimit = searchParamsCache.get("limit");
  const cookieStore = await cookies();

  const fetchAllUsers = async () => {
    return await axios.post(
      `${Config.BACKEND_URL}/api/v1/admin/getAllUsersDetails`,
      "",
      {
        headers: {
          cookie: `session=${cookieStore.get("session")?.value}`,
        },
      },
    );
  };

  const data: {
    statusCode: number;
    statusMessage: string;
    userDetails: Users[];
  } = (await fetchAllUsers()).data;

  data.userDetails.map(
    (i) => (i.createdAt = new Date(i.createdAt).toLocaleString()),
  );

  return (
    <PageContainer scrollable>
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <Heading
            title={`Users (${data?.userDetails.length})`}
            description="Manage users (Server side table functionalities.)"
          />

          <Link
            href={"/dashboard/users/new"}
            className={cn(buttonVariants({ variant: "default" }))}
          >
            <Plus className="mr-2 h-4 w-4" /> Add New
          </Link>
        </div>
        <Separator />
        <UsersTable
          data={data?.userDetails}
          totalData={data?.userDetails.length}
        />
      </div>
    </PageContainer>
  );
}
