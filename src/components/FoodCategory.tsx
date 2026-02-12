import { useNavigate } from "react-router-dom";
import { FOOD_CATEGORIES } from "../constants/foodCategoryList"
import "./FoodCategory.style.scss"
import { useTranslation } from "react-i18next";

function FoodCategory() {
    const navigate = useNavigate();
    const { t } = useTranslation('tags');

    const handleCategoryClick = (keyword: string) => {
        navigate(`/search?query=${encodeURIComponent(keyword)}`);
    };

    return (
        <div className="food-category-container">
            {FOOD_CATEGORIES.map((category) => (
                <div
                    key={category.name}
                    className="food-category-item card-hover-animated shadow-md hover:shadow-xl transition"
                    onClick={() => handleCategoryClick(category.name)}
                >
                    <img
                        alt={`${category.name} category`}
                        className="food-category-icon"
                        src={category.iconSrc}
                    />
                    <span className="food-category-name">{t(category.name)}</span>
                </div>
            ))}
        </div>
    )
}

export default FoodCategory