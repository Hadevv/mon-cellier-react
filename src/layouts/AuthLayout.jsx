import { Head } from "@/components/navigation/Head";
import Navigation from "@/components/navigation/Navigation";

export default function AuthLayout({ children, title }) {
  return (
    <>
      <Head title={title} />
      <Navigation />
      {/* image de fond */}
      <main className="h-full">{children}</main>
    </>
  );
}
