import axios from "axios";

export interface RestoCafeData {
  data: Datum[];
}

export const fetchDishes = async (): Promise<RestoCafeData> => {
  try {
    const response = await axios.get(
      "https://zartek-task.vercel.app/api/resto-cafe"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching dishes:", error);
    throw error;
  }
};

interface Datum {
  restaurant_id: string;
  restaurant_name: string;
  restaurant_image: string;
  table_id: string;
  table_name: string;
  branch_name: string;
  nexturl: string;
  table_menu_list: Tablemenulist[];
}

interface Tablemenulist {
  menu_category: string;
  menu_category_id: string;
  menu_category_image: string;
  nexturl: string;
  category_dishes: Categorydish[];
}

export interface Categorydish {
  dish_id: string;
  dish_name: string;
  dish_price: number;
  dish_image: string;
  dish_currency: string;
  dish_calories: number;
  dish_description: string;
  dish_Availability: boolean;
  dish_Type: number;
  nexturl: string;
  addonCat: AddonCat[][];
}

interface AddonCat {
  addon_category: string;
  addon_category_id: string;
  addon_selection: number;
  nexturl: string;
  addons: Addon[];
}

interface Addon {
  dish_id: string;
  dish_name: string;
  dish_price: number;
  dish_image: string;
  dish_currency: string;
  dish_calories: number;
  dish_description: string;
  dish_Availability: boolean;
  dish_Type: number;
}
