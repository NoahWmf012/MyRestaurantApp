import { FOOD_CATEGORIES } from "../constants/foodCategoryList"
import "./FoodCategory.style.scss"

function FoodCategory() {
    return (
        <div className="food-category-container">
            {FOOD_CATEGORIES.map((category) => (
                <div
                    key={category.name}
                    className="food-category-item"
                >
                    <img
                        alt={`${category.name} category`}
                        className="food-category-icon"
                        src={category.iconSrc}
                    />
                    <span className="food-category-name">{category.name}</span>
                </div>
            ))}
        </div>
    )
}

export default FoodCategory