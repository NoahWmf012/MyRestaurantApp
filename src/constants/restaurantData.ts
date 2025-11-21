import type { SuggestedItem } from "../interfaces/queryInterface/restaurantInterface";
import type { RestaurantInfoInterface } from "../interfaces/restaurantInterface";
import SUSHI_ICON from '../assets/icons/food_category/sushi.png';
import GRILL_ICON from '../assets/icons/food_category/grill.png';
import CHINESE_ICON from '../assets/icons/food_category/chinese.png';
import PHO_ICON from '../assets/icons/food_category/pho.png';
import TACO_ICON from '../assets/icons/food_category/taco.png';

// Promote Restaurant Data (todo: fetch from backend later)
export const RESTAURANT_LIST: RestaurantInfoInterface[] = [
    {
        id: 1,
        name: "j.san sushi & MARKET",
        cuisine: "Japanese",
        rating: 4.5,
        location: "3365 Steeles Ave E Unit B01, Toronto, ON M2H 0A7",
        phoneNum: "(905) 453-0116",
        desc: "A popular sushi spot known for its fresh ingredients and vibrant atmosphere."
    },
    {
        id: 2,
        name: "Gyubee Japanese Grill",
        cuisine: "Japanese",
        rating: 4.6,
        location: "7100 Woodbine Ave #100, Markham, ON L3R 5J2",
        phoneNum: "(905) 604-1904",
        desc: "A popular sushi spot known for its fresh ingredients and vibrant atmosphere."
    },
    {
        id: 3,
        name: "Phoenix Restaurant",
        cuisine: "Hong Kong",
        rating: 4.4,
        location: "7155 Woodbine Ave, Markham, ON L3R 1A3",
        phoneNum: "(905) 940-1113",
        desc: "A popular sushi spot known for its fresh ingredients and vibrant atmosphere."
    },
    {
        id: 4,
        name: "Tanuki Restaurant",
        cuisine: "Japanese",
        rating: 4.3,
        location: "3160 Steeles Ave E Unit 1, Markham, ON L3R 3Y2",
        phoneNum: "(905) 479-9319",
        desc: "A popular sushi spot known for its fresh ingredients and vibrant atmosphere."
    },
];

// Suggested Restaurant Names for Search Bar (todo: fetch from backend later)
export const SUGGESTED_RESTAURANT_NAMES: SuggestedItem[] = [
    { keyword: "j.san sushi & MARKET", value: "J San Sushi", image: SUSHI_ICON },
    { keyword: "Gyubee Japanese Grill 牛兵衛", value: "Gyubee Japanese Grill", image: GRILL_ICON },
    { keyword: "Hualien Tai Ping Hsiang BBQ 花蓮太平香", value: "Hualien Tai Ping Hsiang BBQ", image: CHINESE_ICON },
    { keyword: "Yunshang Rice Noodle 雲尚米線", value: "Yunshang Rice Noodle", image: PHO_ICON },
    { keyword: "Taco Fiesta", value: "Taco Fiesta", image: TACO_ICON },
];