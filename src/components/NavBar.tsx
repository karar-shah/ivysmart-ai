import { auth, signOut } from "@/auth";
import Link from "next/link";
import React from "react";
import { LuBrain } from "react-icons/lu";

export default async function NavBar() {
  const session = await auth();
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between max-md:justify-center">
        {/* Logo and Title */}
        <Link href="/" className="flex items-center space-x-2">
          <LuBrain className="h-8 w-8 text-emerald-500 mr-2" />
          <h1 className="text-2xl font-bold text-gray-900 sm:text-lg">
            IvySmart AI
          </h1>
        </Link>

        {/* Sign Out & User Info */}
        <div className="flex items-center space-x-4 mt-2 sm:mt-0">
          {session?.user?.email ? (
            <p className="text-sm sm:text-xs text-gray-600 hover:text-gray-900 border px-4 py-2 rounded-full shadow-md">
              {session.user.email}
            </p>
          ) : (
            <p className="text-sm sm:text-xs text-gray-600 hover:text-gray-900 border px-4 py-2 rounded-full shadow-md">
              No Login Info!
            </p>
          )}
          <form
            action={async () => {
              "use server";
              await signOut();
            }}
          >
            <button
              type="submit"
              className="text-sm sm:text-xs text-gray-600 hover:text-gray-900 border px-4 py-2 rounded-full shadow-md"
            >
              Sign Out
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}
