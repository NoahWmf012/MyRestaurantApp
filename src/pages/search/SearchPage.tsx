import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import SearchFilter, { type FilterValues } from "./SearchFilter";
import { FILTER_CONFIG } from "../../constants/searchFilterConstant";
import SearchDetail from "./SearchDetail";
import { useGetRestaurantsQuery } from "../../redux/services/api/restaurantAPI";
import "./SearchPage.scss";

function SearchPage() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('query') || '';

    const { data: restaurantData } = useGetRestaurantsQuery();

    // Filter restaurants based on search query
    const filteredRestaurants = restaurantData?.restaurantList.filter(restaurant =>
        restaurant.name.toLowerCase().includes(query.toLowerCase()) ||
        restaurant.cuisine?.toLowerCase().includes(query.toLowerCase()) ||
        restaurant.location?.toLowerCase().includes(query.toLowerCase()) ||
        restaurant.tags?.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
    ) ?? [];

    // Search filter sidebar
    const [appliedFilters, setAppliedFilters] = useState<FilterValues>({});
    console.log('Applied Filters:', appliedFilters);

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