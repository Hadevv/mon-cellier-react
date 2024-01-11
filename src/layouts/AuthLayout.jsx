import { Head } from "@/components/navigation/Head";
import Navigation from "@/components/navigation/Navigation";

export default function AuthLayout({ children, title }) {
  return (
    <>
      <Head title={title} />
      <Navigation />
      {/* image de fond */}
      <main className="h-full bg-[url('/src/assets/images/vin-vin.webp')] bg-cover bg-no-repeat bg-center">
        {children}
      </main>
    </>
  );
}
