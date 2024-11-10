import UserViewPage from "../_components/auction-view-page";

export const metadata = {
  title: "Dashboard : Users View",
};

export default async function Page({
  params,
}: {
  params: Promise<{ auctionId: string }>;
}) {
  return <UserViewPage auctionId={(await params).auctionId} />;
}
