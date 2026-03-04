"use client";

import { useState } from "react";
import { InputPassword } from "@/components/refine-ui/form/input-password";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useNotification, useRegister, useLink } from "@refinedev/core";

export const SignUpForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [role] = useState("user"); // default role, change if needed

  const { open } = useNotification();
  const Link = useLink();
  const { mutate: register } = useRegister();

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      open?.({
        type: "error",
        message: "Passwords don't match",
        description: "Please make sure both password fields contain the same value.",
      });
      return;
    }

    if (!email || !password || !name) {
      open?.({
        type: "error",
        message: "Missing fields",
        description: "Please fill in all required fields.",
      });
      return;
    }

    // Debug payload
    console.log("Register payload:", { email, password, name, role });

    register({
      email,
      password,
      name,
      role,
    });
  };

  const handleSignUpWithGoogle = () => {
    register({ providerName: "google" });
  };

  const handleSignUpWithGitHub = () => {
    register({ providerName: "github" });
  };

  return (
    <div className={cn("flex flex-col items-center justify-center px-6 py-8 min-h-svh")}>
      <Card className={cn("sm:w-[456px] p-12 mt-6")}>
        <CardHeader className={cn("px-0")}>
          <CardTitle className={cn("text-green-600 dark:text-green-400 text-3xl font-semibold")}>
            Sign up
          </CardTitle>
          <CardDescription className={cn("text-muted-foreground font-medium")}>
            Welcome! Create your account below.
          </CardDescription>
        </CardHeader>

        <Separator />

        <CardContent className={cn("px-0")}>
          <form onSubmit={handleSignUp}>
            <div className={cn("flex flex-col gap-2")}>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className={cn("flex flex-col gap-2 mt-4")}>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className={cn("flex flex-col gap-2 mt-4")}>
              <Label htmlFor="password">Password</Label>
              <InputPassword
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className={cn("flex flex-col gap-2 mt-4")}>
              <Label htmlFor="confirmPassword">Confirm password</Label>
              <InputPassword
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <Button type="submit" size="lg" className={cn("w-full mt-6 bg-green-600 hover:bg-green-700 text-white")}>
              Sign up
            </Button>
          </form>

          <div className={cn("flex items-center gap-4 mt-6")}>
            <Separator className={cn("flex-1")} />
            <span className={cn("text-sm text-muted-foreground")}>or</span>
            <Separator className={cn("flex-1")} />
          </div>

          <div className={cn("grid grid-cols-2 gap-6 mt-6")}>
            <Button variant="outline" className={cn("flex items-center gap-2")} onClick={handleSignUpWithGoogle}>
              Google
            </Button>
            <Button variant="outline" className={cn("flex items-center gap-2")} onClick={handleSignUpWithGitHub}>
              GitHub
            </Button>
          </div>
        </CardContent>

        <Separator />

        <CardFooter>
          <div className={cn("w-full text-center text-sm")}>
            Have an account?{" "}
            <Link to="/login" className={cn("text-blue-600 dark:text-blue-400 font-semibold underline")}>
              Sign in
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

SignUpForm.displayName = "SignUpForm";