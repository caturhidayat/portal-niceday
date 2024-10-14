"use client";

import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormState } from "react-dom";
import login from "./actions";

export const description =
    "A login page with two columns. The first column has the login form with email and password. There's a Forgot your passwork link and a link to sign up if you do not have an account. The second column has a cover image.";

const initialState = {
    error: "",
    success: "",
};

export default function Login() {
    const [state, formAction] = useFormState(login, initialState);
    console.log("Form Data client action : ", formAction);
    return (
        <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
            <div className="flex items-center justify-center py-12">
                <div className="mx-auto grid w-[350px] gap-6">
                    {state.error !== undefined && (
                        <span className="text-destructive">{state.error}</span>
                    )}
                    <div className="grid gap-2 text-center">
                        <h1 className="text-3xl font-bold">Login</h1>
                        <p className="text-balance text-muted-foreground">
                            Enter your Username below to login to your account
                        </p>
                    </div>
                    <form action={formAction}>
                        <div className="grid gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="username">username</Label>
                                <Input
                                    id="username"
                                    name="username"
                                    type="text"
                                    placeholder="PY-IDXXXXX"
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
                                    required
                                />
                            </div>
                            <Button className="w-full">Login</Button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="hidden bg-muted lg:block">
                <Image
                    src="/images/drawkit-grape-1.svg"
                    alt="Image"
                    width="1920"
                    height="1080"
                    className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                />
            </div>
        </div>
    );
}
