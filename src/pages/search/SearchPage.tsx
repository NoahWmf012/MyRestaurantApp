import { useSearchParams } from "react-router-dom";
import SearchFilter from "./SearchFilter";
import SearchDetail from "./SearchDetail";
import { useGetRestaurantsQuery } from "../../redux/services/api/restaurantAPI";
import "./SearchPage.scss";

function SearchPage() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('query') || '';

    const { data: restaurantData } = useGetRestaurantsQuery(query);
    
    return (
        <div className="search-page-container mt-4 restaurant-list-page d-flex">
            <div className="grid grid-cols-1 lg:grid-cols-6 gap-8 w-full">
                <SearchFilter
                // onChange={(filters) => setAppliedFilters(filters)}
                />
                <div className="col-span-4">
                    <SearchDetail list={restaurantData?.restaurantList || []} />
                </div>

                {/* Ads: col-span-1 */}
            </div>
        </div>
    );
}

export default SearchPage