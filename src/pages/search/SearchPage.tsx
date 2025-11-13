import { useSearchParams } from "react-router-dom";
import SearchFilter from "./SearchFilter";
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
    // const [appliedFilters, setAppliedFilters] = useState<FilterValues>({});
    // console.log('Applied Filters:', appliedFilters);

    return (
        <div className="search-page-container mt-4 restaurant-list-page d-flex">
            <div className="grid grid-cols-1 lg:grid-cols-6 gap-8 w-full">
                <SearchFilter
                // sections={FILTER_CONFIG}
                // onChange={(filters) => setAppliedFilters(filters)}
                />
                <div className="col-span-4">
                    <SearchDetail list={filteredRestaurants} />
                </div>

                {/* Ads: col-span-1 */}
            </div>
        </div>
    );
}

export default SearchPage