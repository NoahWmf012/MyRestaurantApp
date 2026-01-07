import { useSearchParams } from "react-router-dom";
import SearchFilter from "./SearchFilter";
import SearchDetail from "./SearchDetail";
import { useGetRestaurantsQuery } from "../../redux/services/api/restaurantAPI";
import { useState, useEffect } from "react";
import type { SearchCriteria } from "../../interfaces/queryInterface/searchCriteriaInterface";
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE, type SortFilterInterface } from "../../interfaces/queryInterface/base.types";
import "./SearchPage.scss";

function SearchPage() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('query') || '';
    const [appliedFilters, setAppliedFilters] = useState([] as SearchCriteria[]);
    const [sortFilter, setSortFilter] = useState<SortFilterInterface | null>(null);
    const [isFilterReady, setIsFilterReady] = useState(false);
    const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE);

    // Mark filter as ready after first render
    useEffect(() => {
        setIsFilterReady(true);
    }, []);

    // Reset to page 1 when filters or query change
    useEffect(() => {
        setCurrentPage(DEFAULT_PAGE);
    }, [query, appliedFilters, sortFilter]);

    const { data: restaurantData } = useGetRestaurantsQuery(
        { query, searchCriteria: appliedFilters, sortBy: sortFilter?.sortBy, sortOrder: sortFilter?.sortOrder, pageSize: DEFAULT_PAGE_SIZE, page: currentPage },
        { skip: !isFilterReady }
    );

    return (
        <div className="search-page-container restaurant-list-page">
            <div className="search-page-grid-container">
                <SearchFilter
                    onChange={(filters, sortFilter) => {
                        setAppliedFilters(filters);
                        setSortFilter(sortFilter);
                    }}
                />
                <div className="col-span-4">
                    <SearchDetail
                        list={restaurantData?.restaurantList || []}
                        currentPage={currentPage}
                        totalCount={restaurantData?.pagination.totalItems || 0}
                        pageSize={DEFAULT_PAGE_SIZE}
                        onPageChange={setCurrentPage}
                    />
                </div>

                {/* Ads: col-span-1 */}
            </div>
        </div>
    );
}

export default SearchPage