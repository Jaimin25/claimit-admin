import React from "react";
import { SearchParams } from "nuqs/server";

import { searchParamsCache } from "@/lib/searchparams";

import AuctionsListingPage from "./_components/auciton-listing-page";

type pageProps = {
  searchParams: SearchParams;
};

export const metadata = {
  title: "Dashboard : Users",
};

export default async function Page({ searchParams }: pageProps) {
  // Allow nested RSCs to access the search params (in a type-safe way)
  const { q: query } = searchParamsCache.parse(searchParams);

  return <AuctionsListingPage />;
}
