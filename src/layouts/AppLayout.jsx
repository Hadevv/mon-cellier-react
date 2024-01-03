import { Head } from "@/components/header/Head";
import Navigation from "@/components/header/Navigation";

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
