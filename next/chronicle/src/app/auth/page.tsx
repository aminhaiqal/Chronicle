"use client";

import GoogleButton from "./google"
import { AuthForm } from "@/app/auth/auth"
import { Separator } from "@/components/ui/separator"

export default function Auth() {
  return (
    <div className="flex items-center justify-center flex-col min-h-screen bg-zinc-900 gap-6 ml-4 mr-4">
      <div className="flex flex-col gap-2 items-center justify-center mb-6">
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
          Welcome to Chronicle
        </h4>
        <p className="text-sm text-muted-foreground text-center">We are a platform for writers to share their stories with the world. Sign up to start writing today.</p>
      </div>
      <GoogleButton />
      <Separator className="w-full sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4" />
      <AuthForm />
    </div>
  )
}