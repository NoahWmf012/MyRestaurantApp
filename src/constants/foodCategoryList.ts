import type { FoodCategory } from "../interfaces/foodCategoryInterface";
import ChineseIcon from "../assets/icons/food_category/chinese.png";
import PhoIcon from "../assets/icons/food_category/pho.png";
import GrillIcon from "../assets/icons/food_category/grill.png";
import PizzaIcon from "../assets/icons/food_category/pizza.png";
import SushiIcon from "../assets/icons/food_category/sushi.png";
import BurgerIcon from "../assets/icons/food_category/burger.png";
import PastaIcon from "../assets/icons/food_category/pasta.png";
import TacoIcon from "../assets/icons/food_category/taco.png";
import DessertIcon from "../assets/icons/food_category/dessert.png";

export const FOOD_CATEGORIES: FoodCategory[] = [
    { name: 'Chinese', iconSrc: ChineseIcon },
    { name: 'Pho', iconSrc: PhoIcon },
    { name: 'Grill', iconSrc: GrillIcon },
    { name: 'Pizza', iconSrc: PizzaIcon },
    { name: 'Sushi', iconSrc: SushiIcon },
    { name: 'Burgers', iconSrc: BurgerIcon },
    { name: 'Pasta', iconSrc: PastaIcon },
    { name: 'Tacos', iconSrc: TacoIcon },
    { name: 'Desserts', iconSrc: DessertIcon }
];