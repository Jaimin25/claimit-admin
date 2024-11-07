"use client";
import { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { useUser } from "@/components/providers/user-provider";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Config } from "@/lib/config";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";

const signInFormSchema = z.object({
  email: z.string().email({ message: "Enter a valid email address" }),
  password: z.string().trim().min(6),
});

type UserFormValue = z.infer<typeof signInFormSchema>;

async function signInSubmit(values: z.infer<typeof signInFormSchema>) {
  return await axios.post(`${Config.APP_URL}/api/auth/signin`, {
    emailOrPhone: values.email,
    password: values.password,
  });
}

export default function UserAuthForm() {
  const { fetchUser } = useUser();
  const [toastId, setToastId] = useState<string | number>();
  const router = useRouter();
  const [loading, startTransition] = useTransition();
  const defaultValues = {
    email: "",
    password: "",
  };

  const form = useForm<UserFormValue>({
    resolver: zodResolver(signInFormSchema),
    defaultValues,
  });

  const mutation = useMutation({
    mutationFn: signInSubmit,
    onSuccess: async (res) => {
      const data = res.data;

      if (data.statusCode === 200) {
        toast.success(data.statusMessage, { id: toastId });
        await fetchUser();
        router.push("/dashboard/overview");
      } else {
        toast.error(data.statusMessage, { id: toastId });
      }
    },
    onError: (error) =>
      toast.error(`${error.name}: ${error.message}`, { id: toastId }),
  });

  const onSubmit = async (data: UserFormValue) => {
    startTransition(() => {
      mutation.mutate(data);
      const currentToastId = toast.loading("Signing in...");
      setToastId(currentToastId);
    });
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-2"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your email..."
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter your password..."
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={loading} className="ml-auto w-full" type="submit">
            Login
          </Button>
        </form>
      </Form>
    </>
  );
}
