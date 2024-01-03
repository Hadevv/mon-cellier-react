import { Head } from "@/components/header/Head";
import Navigation from "@/components/header/Navigation";

export default function AuthLayout({ children, title }) {
  return (
    <>
      <Head title={title} />
      <Navigation />
      <div className="mt-[80px]" />
      <main className="h-full bg-[url('/src/assets/images/vin-vin.webp')] bg-cover bg-no-repeat bg-center">
        {children}
      </main>
    </>
  );
}
