"use client";

import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormState } from "react-dom";
import login from "./actions";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ShieldX } from "lucide-react";
import { toast } from "sonner";
import { useEffect } from "react";

export const description =
    "A login page with two columns. The first column has the login form with email and password. There's a Forgot your passwork link and a link to sign up if you do not have an account. The second column has a cover image.";

const initialState = {
    error: "",
    success: "",
};

export default function Login() {
    const [state, formAction] = useFormState(login, initialState);

    // State Error detection
    useEffect(() => {
        if (state.error) {
            toast.error(state.error, {
                description: "Please check your credentials and try again",
                duration: 5000,
            });
        }
    });
    console.log("Form Data client action : ", formAction);
    return (
        <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-6 xl:min-h-screen ">
            <div className="flex items-center justify-center col-span-2 py-12">
                <div className="mx-auto grid w-[300px] gap-6">
                    <div className="grid gap-2 text-center ">
                        <h1 className="text-3xl font-bold">Login</h1>
                        <p className="text-balance text-muted-foreground">
                            Enter your Username below to login to your account
                        </p>
                    </div>
                    <form action={formAction}>
                        <div className="grid gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="username">Username</Label>
                                <Input
                                    id="username"
                                    name="username"
                                    type="text"
                                    placeholder="Please enter your username"
                                    required
                                />
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
                                    required
                                />
                            </div>
                            <Button className="w-full">Login</Button>
                        </div>
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
