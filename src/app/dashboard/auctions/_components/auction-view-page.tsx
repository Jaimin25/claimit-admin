import { cookies } from "next/headers";
import axios from "axios";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Auctions } from "@/constants/data";
import { Config } from "@/lib/config";

import UserForm from "./auction-form";

export default async function UserViewPage({
  auctionId,
}: {
  auctionId: string;
}) {
  const cookieStore = await cookies();

  const fetchAllUsers = async () => {
    return await axios.post(
      `${Config.BACKEND_URL}/api/v1/admin/getAuctionDetailsById`,
      { auctionId },
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
    auctionDetails: Auctions;
  } = (await fetchAllUsers()).data;

  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-8">
        <UserForm data={data.auctionDetails} />
      </div>
    </ScrollArea>
  );
}
