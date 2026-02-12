import RoomComponent from "@/component/RoomComponent";

export default function Home() {
  return (
    <div className="h-screen max-w-xl xl:max-w-2xl w-full mx-auto flex items-center justify-center">
      <div className="w-full">
        <RoomComponent />
      </div>
    </div>
  );
}
