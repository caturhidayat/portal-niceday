"use client";

import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import login from "./actions";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { LoaderIcon, ShieldX } from "lucide-react";
import { toast } from "sonner";
import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";

export const description =
  "A login page with two columns. The first column has the login form with email and password. There's a Forgot your passwork link and a link to sign up if you do not have an account. The second column has a cover image.";

const initialState = {
  success: false,
  message: "",
  inputs: {
    username: "",
    password: "",
  },
};

export default function Login() {
  const router = useRouter();
  const [state, action, isPending] = useActionState(login, initialState);

  // Check if login is successful and redirect to dashboard
  useEffect(() => {
    if (state.success) {
      toast.success(state.message, {
        description: "Login successful",
        duration: 5000,
      });
      router.push("/dashboard");
    } else if (state.errors) {
      toast.error(state.message, {
        description: "Login failed, please try again",
        duration: 5000,
      });
    }
  }, [state.success, state.message, router, state.errors]);

  console.log("Form Data client action : ", action);

  return (
    <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-6 xl:min-h-screen ">
      <div className="flex items-center justify-center col-span-2 py-12">
        <div className="mx-auto grid w-[300px] gap-6">
          <div className="grid gap-2 text-center ">
            <h1 className="text-3xl font-bold">Sign In</h1>
            <p className="text-balance text-muted-foreground">
              Enter your Username below to login to your account
            </p>
          </div>
          <form action={action}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  name="username"
                  defaultValue={state.inputs?.username}
                  type="text"
                  placeholder="Please enter your username"
                />
                {state.errors?.username && (
                  <span id="username-error">{state.errors?.username[0]}</span>
                )}
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Please enter your password"
                />
                {state.errors?.password && (
                  <span id="password-error">{state.errors?.password[0]}</span>
                )}
              </div>
              <Button className="w-full" disabled={isPending}>
                {isPending ? (
                  <>
                    <LoaderIcon className="h-4 w-4 animate-spin" />
                    Signing In
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </div>
            {state.errors && (
              <Alert variant={"destructive"} className="mt-4">
                <ShieldX className="h-4 w-4" />
                <AlertTitle>Error!</AlertTitle>
                <AlertDescription>{state.message}</AlertDescription>
              </Alert>
            )}
          </form>
        </div>
      </div>
      <div className="hidden bg-muted lg:block lg:col-span-4">
        <Image
          src="/images/sarah-dorweiler.jpg"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
