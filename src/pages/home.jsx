import AuthLayout from "@/layouts/AuthLayout";
import { SearchBar } from "@/components/SearchBar";
import WineList from "@/components/WineList";

import SearchForm from "@/components/form/SearchForm";

export default function Home() {
  return (
    <AuthLayout title={"Home"} >
      <div className="p-6 grid grid-cols-1 md:grid-cols-4 gap-5 ">
        {/* Petite colonne 1 à gauche */}
        <div className="md:col-span-1">
          <SearchForm />
  
        </div>

        {/* Petite colonne 2 à gauche */}
        <div className="md:col-span-1">
          {/* Contenu de la deuxième petite colonne */}
          <div className="">
            <WineList />
          </div>
        </div>

        {/* Grande colonne à droite */}
        <div className="md:col-span-2">
          <div className="p-2 overflow-auto h-[250px] md:p-6 border-[2px] rounded-xl">
              <h2 className="text-[22px] font-bold">Recommended</h2>
              {/* Contenu de la grande colonne */}
            </div>
        </div>
      </div>
    </AuthLayout>
  );
}

