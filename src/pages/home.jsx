import AuthLayout from "@/layouts/AuthLayout";
import SearchBar from "@/components/SearchBar";

export default function Home() {
  return (
    <AuthLayout title={"Home"}>
      <div
        className="
        flex
        flex-col
        items-start
        justify-center
        w-full
        h-full
        px-4
        py-2
        space-y-4
        ">
        <SearchBar />
      </div>
    </AuthLayout>
  );
}
