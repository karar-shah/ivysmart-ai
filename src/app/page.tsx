import AuthForm from "@/components/AuthForm";
import Image from "next/image";
import { LuBrain } from "react-icons/lu";

export default function Home() {
  return (
    <div>
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
          <div className="flex items-center justify-center mb-8">
            <LuBrain className="h-8 w-8 text-blue-500 mr-2" />
            <h1 className="text-2xl font-bold text-gray-900">IvySmart AI</h1>
          </div>
          <AuthForm />
        </div>
      </div>
    </div>
  );
}
