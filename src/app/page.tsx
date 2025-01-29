import ChatUI, { Message } from "@/components/ChatUI";
import DropDowns from "@/components/DropDowns";
import FeatureGrid from "@/components/FeatureGrid";

export default function Home() {
  const sampleMessages: Message[] = [
    { role: "assistant", content: "Hello, how can I assist you today?" },
    { role: "user", content: "I need help with my order." },
    {
      role: "assistant",
      content: "Sure! Can you please provide your order number?",
    },
    { role: "user", content: "My order number is 12345." },
    {
      role: "assistant",
      content: "Thank you! I'll check your order status right away.",
    },
  ];

  return (
    <div className="bg-gray-50">
      <div className="py-3 mx-5 md:py-6 md:mx-20">
        <div className="shadow-lg rounded-lg">
          <div className="min-h-screen flex flex-col w-full bg-white rounded-lg">
            <FeatureGrid />
            {/* <DropDowns /> */}
            <ChatUI />
          </div>
        </div>
      </div>
    </div>
  );
}
