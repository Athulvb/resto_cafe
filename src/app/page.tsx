"use client";

import { ShoppingCart } from "lucide-react";
import MenuTabs from "./components/menu-tabs";
import { fetchDishes } from "@/api/listdish";
import { useQuery } from "@tanstack/react-query";

export default function Page() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["restaurant"],
    queryFn: fetchDishes,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading menu</div>;

  console.log("first", data?.data?.[0]?.restaurant_name);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <header className="flex justify-between items-center mb-6 px-2">
        <h1 className="text-2xl font-semibold">
          {data?.data?.[0]?.restaurant_name}
        </h1>
        <div className="flex items-center gap-2">
          <span className="text-sm">My Orders</span>
          <div className="relative">
            <ShoppingCart className="w-6 h-6" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              0
            </span>
          </div>
        </div>
      </header>

      <MenuTabs />
    </div>
  );
}
