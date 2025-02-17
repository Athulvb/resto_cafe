"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import MenuSection from "./menu-section";
import { fetchDishes } from "@/api/listdish";
import { useQuery } from "@tanstack/react-query";
import MenuItem from "./menu-item";

interface MenuTabsProps {
  itemCounts: { [key: string]: number };
  setItemCounts: React.Dispatch<
    React.SetStateAction<{ [key: string]: number }>
  >;
}

export default function MenuTabs({ itemCounts, setItemCounts }: MenuTabsProps) {
  const { data: categoriesData } = useQuery({
    queryKey: ["restaurant"],
    queryFn: fetchDishes,
  });

  const menuList = categoriesData?.data?.[0]?.table_menu_list;

  return (
    <Tabs defaultValue={menuList?.[0]?.menu_category} className="w-full">
      <div className="overflow-x-auto scrollbar-none">
        <TabsList className="inline-flex justify-start h-auto border-b rounded-none bg-transparent p-0 mb-6">
          {menuList?.map((category) => (
            <TabsTrigger
              key={category.menu_category_id}
              value={category.menu_category}
              className="border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent rounded-none pb-2"
            >
              {category.menu_category}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>
      {menuList?.map((category) => (
        <TabsContent
          key={category.menu_category_id}
          value={category.menu_category}
          className="w-full"
        >
          <MenuItem
            items={category.category_dishes}
            itemCounts={itemCounts}
            setItemCounts={setItemCounts}
          />
        </TabsContent>
      ))}
    </Tabs>
  );
}
