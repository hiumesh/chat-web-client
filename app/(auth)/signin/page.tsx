"use client";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

let formSchema = z
  .object({
    email: z.string().trim().email(),
    password: z.string().trim().min(8),
  })
  .required();

export default function SignIn() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: { email: "", password: "" },
    resolver: zodResolver(formSchema),
  });

  const router = useRouter();

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    setLoading(true);
    signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    })
      .then((res) => {
        setLoading(false);
        if (res?.error) {
          toast({
            title: res.error,
            description: "There was a problem with your request.",
          });
        } else {
          router.push("/");
        }
      })
      .catch((error) => {
        setLoading(false);
        toast({
          title: "Something went wrong!",
          description:
            error?.message || "There was a problem with your request.",
        });
      });
  };
  return (
    <MaxWidthWrapper>
      <div className="flex min-h-screen items-center justify-center">
        <Card>
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Form {...form}>
              <form
                className="space-y-5"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="flex flex-col space-y-1.5">
                      <FormLabel className="font-normal">Email</FormLabel>
                      <FormControl>
                        <Input type="email" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="flex flex-col space-y-1.5">
                      <FormLabel className="font-normal">Password</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Sign In
                </Button>
              </form>
              <p className="text-sm mt-4">
                Don&apos;t have an account &nbsp;
                <Link
                  href="/signup"
                  className="text-blue-500 hover:text-blue-400"
                >
                  sign up
                </Link>
              </p>
            </Form>
          </CardContent>
        </Card>
      </div>
    </MaxWidthWrapper>
  );
}
