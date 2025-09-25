import ChatUI from "@/components/ChatUI";
import DropDowns from "@/components/DropDowns";
import FeatureGrid from "@/components/FeatureGrid";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();

  if (!session) {
    redirect(`/signup`);
  }

  return (
    <div className="bg-gray-50 h-[calc(100vh-70px)]">
      {" "}
      {/* Adjust 64px based on NavBar height */}
      <div className="py-3 mx-1 md:py-6 md:mx-20 h-full">
        <div className="shadow-lg rounded-lg h-full">
          <div className="h-full flex flex-col w-full bg-white rounded-lg overflow-hidden">
            <div className="flex-shrink-0">
              <FeatureGrid />
            </div>
            <div className="flex-shrink-0">
              <DropDowns />
            </div>
            <div className="flex-grow overflow-hidden">
              <ChatUI />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
