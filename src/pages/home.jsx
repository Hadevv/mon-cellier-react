import AuthLayout from "@/layouts/AuthLayout";
import SearchBar from "@/components/SearchBar";
import WineList from "@/components/WineList";

export default function Home() {
  return (
    <AuthLayout title={"Home"}>
      <div className="flex flex-col justify-center items-center">
        <SearchBar />
      </div>

          <WineList />

    </AuthLayout>
  );
}
