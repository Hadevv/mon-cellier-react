import AuthLayout from "@/layouts/AuthLayout";
import SearchBar from "@/components/SearchBar";
import WineList from "@/components/WineList";

export default function Home() {
  return (
    <AuthLayout title={"Home"}>
      <div
        className="
        flex
        flex-col
        justify-center
        items-center
        w-full
        h-full
        p-4
        rounded-lg
        shadow-lg
        overflow-y-auto
        overflow-x-hidden
        "
      >
        <div
          className="
        flex
        flex-col
        justify-center
        items-center
        w-full"
        >
          <WineList />
        </div>
      </div>
    </AuthLayout>
  );
}
