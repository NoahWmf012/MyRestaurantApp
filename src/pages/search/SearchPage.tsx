import { useSearchParams } from "react-router-dom";
import { RESTAURANT_LIST } from "../../constants/restaurantData";
import "./SearchPage.scss";
import { useState } from "react";
import SearchFilter from "./SearchFilter";
import { FILTER_CONFIG } from "../../constants/searchFilterConstant";
import SearchDetail from "./SearchDetail";

function SearchPage() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('query') || '';

    // Filter restaurants based on search query
    const filteredRestaurants = RESTAURANT_LIST.filter(restaurant =>
        restaurant.name.toLowerCase().includes(query.toLowerCase()) ||
        restaurant.cuisine.toLowerCase().includes(query.toLowerCase()) ||
        restaurant.location.toLowerCase().includes(query.toLowerCase()) ||
        restaurant.tags?.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
    );

    // Search filter sidebar
    const [appliedFilters, setAppliedFilters] = useState({});

    return (
        <div className="container mt-4 restaurant-list-page d-flex">
            <SearchFilter
                sections={FILTER_CONFIG}
                onChange={(filters) => setAppliedFilters(filters)}
            />
            <SearchDetail list={filteredRestaurants} />
        </div>
    );
}

export default SearchPage