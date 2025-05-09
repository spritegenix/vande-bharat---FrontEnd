"use client";
import { loginSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { CircleUser, KeyRound, PersonStandingIcon } from "lucide-react";
import { PasswordInput } from "./PasswordInput";
import { Checkbox } from "../ui/checkbox";
type LoginData = z.infer<typeof loginSchema>;
export default function LoginForm() {
  const form = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });
  function onSubmit(values: z.infer<typeof loginSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="flex items-center rounded-md border border-input bg-white px-3 py-2 focus-within:ring-2 focus-within:ring-ring">
                  <CircleUser className="mr-2 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="email"
                    placeholder="Enter your Email"
                    className="flex-1 border-0 outline-none ring-0 focus:bg-transparent focus:ring-0"
                    {...field}
                  />
                </div>
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
              <FormControl>
                <div className="flex items-center rounded-md border border-input bg-white px-3 py-2 focus-within:ring-2 focus-within:ring-ring">
                  <KeyRound className="mr-2 h-5 w-5 text-muted-foreground" />
                  <PasswordInput
                    {...field}
                    placeholder="Enter Your Password"
                    className="flex-1 border-0 outline-none ring-0 focus:bg-transparent focus:ring-0"
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center justify-between">
          <div className="items-top flex space-x-2">
            <Checkbox
              id="checkbox"
              className="border-gray-600 data-[state=checked]:bg-gray-700 data-[state=checked]:text-white"
            />

            <div className="grid gap-1.5 leading-none">
              <label
                htmlFor="checkbox"
                className="text-sm font-medium leading-none text-muted-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Remember me
              </label>
            </div>
          </div>
          <Button type="submit" className="bg-[#4684fb] px-5 py-2">
            Login
          </Button>
        </div>
      </form>
    </Form>
  );
}
