import { Metadata } from "next";

import UserAuthForm from "./user-auth-form";

export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication forms built using the components.",
};

export default function SignInViewPage() {
  return (
    <div className="h-screen w-full flex-col items-center justify-center">
      <div className="flex h-full items-center p-4 lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <UserAuthForm />
        </div>
      </div>
    </div>
  );
}
