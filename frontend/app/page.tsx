import ChatBox from "./components/ChatBox";

export default function Page() {
  return (
    <div className="relative h-[100vh]">
      <div className="fixed bottom-2 right-2">
        <ChatBox />
      </div>
    </div>
  );
}
