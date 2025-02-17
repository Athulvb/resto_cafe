import Image from "next/image";
import { Minus, Plus } from "lucide-react";
import { Categorydish } from "@/api/listdish";

interface MenuItemProps {
  items: Categorydish[];
  itemCounts: { [key: string]: number };
  setItemCounts: React.Dispatch<
    React.SetStateAction<{ [key: string]: number }>
  >;
}

export default function MenuItem({
  items,
  itemCounts,
  setItemCounts,
}: MenuItemProps) {
  // Add handlers for increment and decrement
  const handleIncrement = (dishId: string) => {
    setItemCounts((prev) => ({
      ...prev,
      [dishId]: (prev[dishId] || 0) + 1,
    }));
  };

  const handleDecrement = (dishId: string) => {
    setItemCounts((prev) => ({
      ...prev,
      [dishId]: Math.max(0, (prev[dishId] || 0) - 1),
    }));
  };

  return (
    <>
      {items.map((item) => (
        <div
          key={item.dish_id}
          className="flex items-start gap-4 p-4 border rounded-lg hover:shadow-sm transition-shadow"
        >
          <div className="flex-1">
            <div className="flex items-start justify-between gap-4">
              <div className="flex gap-2">
                <div
                  className={`min-w-4 min-h-4 w-4 h-4 mt-1 border rounded flex-shrink-0 flex items-center justify-center ${
                    item?.dish_Type === 2
                      ? "border-green-600"
                      : "border-red-600"
                  }`}
                >
                  <span
                    className={`min-w-2 min-h-2 w-2 h-2 rounded-full ${
                      item?.dish_Type === 2 ? "bg-green-500" : "bg-red-500"
                    }`}
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{item.dish_name}</h3>
                  </div>
                  <div className="font-medium text-sm">
                    SAR {item.dish_price}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    {item.dish_description}
                  </p>
                  {!item.dish_Availability && (
                    <p className="text-red-500 text-sm mt-1">Not available</p>
                  )}
                  {item.addonCat.length > 0 && item.addonCat ? (
                    <p className="text-red-500 text-sm mt-1">
                      customization available
                    </p>
                  ) : null}
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-600  font-semibold mt-1">
                  {item.dish_calories} calories
                </div>
              </div>
            </div>
            {item.dish_Availability && (
              <div className="flex items-center gap-2 rounded-[40px]">
                <div className="flex items-center gap-2 mt-4 bg-green-600 rounded-[40px]">
                  <button
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-primary/10 text-white hover:bg-primary/20 transition-colors"
                    onClick={() => handleDecrement(item.dish_id)}
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-8 text-center text-white">
                    {itemCounts[item.dish_id] || 0}
                  </span>
                  <button
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-primary/10 text-white hover:bg-primary/20 transition-colors"
                    onClick={() => handleIncrement(item.dish_id)}
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="w-24 h-24 relative rounded-lg overflow-hidden flex-shrink-0">
            <Image
              src={item.dish_image || "/placeholder.svg"}
              alt={item.dish_name}
              fill
              className="object-cover"
            />
          </div>
        </div>
      ))}
    </>
  );
}
