import { cookies } from "next/headers";
import axios from "axios";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Users } from "@/constants/data";
import { Config } from "@/lib/config";

import UserForm from "./user-form";

export default async function UserViewPage({ uid }: { uid: string }) {
  const cookieStore = await cookies();

  const fetchAllUsers = async () => {
    return await axios.post(
      `${Config.BACKEND_URL}/api/v1/admin/getUserDetailsById`,
      { uid },
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
    userDetails: Users;
  } = (await fetchAllUsers()).data;

  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-8">
        <UserForm data={data.userDetails} />
      </div>
    </ScrollArea>
  );
}
