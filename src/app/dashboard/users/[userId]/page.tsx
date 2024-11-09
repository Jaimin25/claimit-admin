import UserViewPage from "../_components/user-view-page";

export const metadata = {
  title: "Dashboard : Users View",
};

export default async function Page({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  return <UserViewPage uid={(await params).userId} />;
}
