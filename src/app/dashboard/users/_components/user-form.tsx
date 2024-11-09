"use client";
import * as React from "react";
import { Shield, ShieldHalf, UserRound } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ACCOUNT_ROLE,
  ACCOUNT_STATUS,
  ACCOUNT_TYPE,
  Users,
} from "@/constants/data";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  firstname: z.string(),
  lastname: z.string(),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  emailVerified: z.boolean(),
  identityVerified: z.boolean(),
  username: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  account_status: z.nativeEnum(ACCOUNT_STATUS),
  role: z.nativeEnum(ACCOUNT_ROLE),
  accountType: z.nativeEnum(ACCOUNT_TYPE),
  streetAddress: z.string(),
  city: z.string(),
  state: z.string(),
  country: z.string(),
  zipcode: z.string(),
});

export default function UserForm({ data }: { data: Users }) {
  console.log(data);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: data.username,
      firstname: data.firstname,
      lastname: data.lastname,
      emailVerified: data.emailVerified,
      identityVerified: data.identityVerified,
      email: data.email,
      account_status: data.accountStatus as ACCOUNT_STATUS,
      role: data.role as ACCOUNT_ROLE,
      accountType: data.accountType as ACCOUNT_TYPE,
      streetAddress: data.streetAddress,
      city: data.city,
      state: data.state,
      country: data.country,
      zipcode: data.zipcode,
    },
  });

  return (
    <Card className="mx-auto w-full">
      <CardHeader>
        <CardTitle className="text-left text-2xl font-bold">
          User Information
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="space-y-8">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your name"
                        {...field}
                        value={data.username}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="firstname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Firstname</FormLabel>
                    <FormControl>
                      <Input placeholder="Firstname" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Lastname</FormLabel>
                    <FormControl>
                      <Input placeholder="Lastname" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="emailVerified"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2 space-y-0 ">
                    <FormControl>
                      <Checkbox checked={field.value} onChange={() => {}} />
                    </FormControl>
                    <FormLabel>Email Verified</FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="identityVerified"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2 space-y-0 ">
                    <FormControl>
                      <Checkbox checked={field.value} onChange={() => {}} />
                    </FormControl>
                    <FormLabel>Identity Verified</FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="account_status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Account Status</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value.toString()}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Account Status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent defaultValue={"active"}>
                        <SelectItem value="ACTIVE" disabled>
                          <Badge
                            variant={"outline"}
                            className="bg-emerald-500 text-white"
                          >
                            ACTIVE
                          </Badge>
                        </SelectItem>
                        <SelectItem value="BLACKLIST" disabled>
                          <Badge
                            variant={"outline"}
                            className="bg-orange-500 text-white"
                          >
                            BLACKLIST
                          </Badge>
                        </SelectItem>
                        <SelectItem value="BANNED" disabled>
                          <Badge
                            variant={"outline"}
                            className="bg-red-500 text-white"
                          >
                            BANNED
                          </Badge>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="accountType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Account Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value.toString()}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Account Status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent defaultValue={"active"}>
                        <SelectItem value="FREE" disabled>
                          <Badge
                            variant={"outline"}
                            className="bg-indigo-500 text-white"
                          >
                            FREE
                          </Badge>
                        </SelectItem>
                        <SelectItem value="PREMIUM" disabled>
                          <Badge
                            variant={"outline"}
                            className="bg-yellow-500 text-white"
                          >
                            PREMIUM
                          </Badge>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>User Role</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value.toString()}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="User Role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="USER" disabled>
                          <Badge
                            variant={"outline"}
                            className="flex bg-cyan-500 text-white items-center space-x-1"
                          >
                            <UserRound size={16} />
                            <p>USER</p>
                          </Badge>
                        </SelectItem>
                        <SelectItem value="MOD" disabled>
                          <Badge
                            variant={"outline"}
                            className="flex bg-lime-500 text-white items-center space-x-1"
                          >
                            <ShieldHalf size={16} />
                            <p>MOD</p>
                          </Badge>
                        </SelectItem>
                        <SelectItem value="ADMIN" disabled>
                          <Badge
                            variant={"outline"}
                            className="flex bg-blue-500 text-white items-center space-x-1"
                          >
                            <Shield size={16} />
                            <p>ADMIN</p>
                          </Badge>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="streetAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Street</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>State</FormLabel>
                    <FormControl>
                      <Input placeholder="Firstname" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <FormControl>
                      <Input placeholder="Lastname" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="zipcode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Zipcode</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
