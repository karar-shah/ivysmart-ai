"use client";

import React, { useState, useTransition } from "react";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterAction } from "../actions/Register";
import { LuBrain } from "react-icons/lu";

export default function SignUpComp() {
  const RegisterSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  });

  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof RegisterSchema>) => {
    setError(undefined);
    setSuccess(undefined);
    startTransition(async () => {
      console.log("values", values);
      const res = await RegisterAction(values);
      setError(res.error);
      setSuccess(res.success);
      if (!res.error) {
        router.push("/");
      }
    });
  };
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <div className="flex items-center justify-center mb-8">
          <LuBrain className="h-8 w-8 text-blue-500 mr-2" />
          <h1 className="text-2xl font-bold text-gray-900">IvySmart AI</h1>
        </div>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <input
            type="email"
            disabled={isPending}
            {...form.register("email")}
            placeholder="Email"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          />
          {form.formState.errors.email && (
            <span className="text-red-600">
              {form.formState.errors.email.message}
            </span>
          )}
          <input
            type="password"
            disabled={isPending}
            {...form.register("password")}
            placeholder="Password"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          />
          {form.formState.errors.password && (
            <span className="text-red-600">
              {form.formState.errors.password.message}
            </span>
          )}
          {/* Error and Success Messages */}
          {error && <p className="text-red-600">{error}</p>}
          {success && <p className="text-green-600">{success}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-emerald-700 hover:bg-emerald-600 text-white font-medium py-2 rounded-lg w-full"
            disabled={isPending}
          >
            {isPending ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}
