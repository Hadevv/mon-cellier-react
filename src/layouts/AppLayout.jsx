import { Head } from "@/components/navigation/Head";
import Navigation from "@/components/navigation/Navigation";

export default function AppLayout({ children, title }) {
  return (
    <>
      <Head title={title} />
      <Navigation />
      <div className="mt-[90px]" />
      <main>{children}</main>
    </>
  );
}
