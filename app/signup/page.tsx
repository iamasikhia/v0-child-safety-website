"use client"

import { SignupForm } from "@/components/signup-form"
import { ChildSignupForm } from "@/components/child-signup-form"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

export default function SignupPage() {
  const [userType, setUserType] = useState<"parent" | "child">("parent")

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left side - Signup Form */}
      <div className="flex flex-col justify-center px-6 py-12 lg:px-16">
        <div className="mx-auto w-full max-w-md">
          <Link href="/" className="flex items-center gap-3 mb-8">
            <Image src="/sacredeyes-logo.jpeg" alt="SacredEyes Logo" width={48} height={48} className="rounded-lg" />
            <span className="text-2xl font-bold text-foreground">SacredEyes</span>
          </Link>

          <div className="flex gap-2 p-1 bg-muted rounded-lg mb-8">
            <button
              onClick={() => setUserType("parent")}
              className={`flex-1 py-2.5 px-4 rounded-md text-sm font-medium transition-colors ${
                userType === "parent"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Parent Signup
            </button>
            <button
              onClick={() => setUserType("child")}
              className={`flex-1 py-2.5 px-4 rounded-md text-sm font-medium transition-colors ${
                userType === "child"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Child Signup
            </button>
          </div>

          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">
              {userType === "parent" ? "Create your account" : "Create your child account"}
            </h1>
            <p className="text-muted-foreground">
              {userType === "parent" ? "Start protecting your family online today" : "Get help staying safe online"}
            </p>
          </div>

          {userType === "parent" ? <SignupForm /> : <ChildSignupForm />}

          <p className="mt-8 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>

      {/* Right side - Image */}
      <div className="hidden lg:block relative bg-gradient-to-br from-primary/5 to-primary/10">
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <div className="relative">
            <Image
              src="/child-with-device.jpg"
              alt="Child using mobile device"
              width={500}
              height={700}
              className="rounded-2xl shadow-2xl object-cover"
              priority
            />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/40 to-transparent" />
            <div className="absolute bottom-8 left-8 right-8 text-white">
              <h2 className="text-3xl font-bold mb-3">Guard their digital journey</h2>
              <p className="text-lg text-white/90">Join thousands of parents creating safer online experiences.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
