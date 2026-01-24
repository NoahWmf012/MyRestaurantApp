import { useNavigate } from 'react-router-dom';
import { getRestaurantImage1 } from '../../hooks/getImageSrcHook';
import Pagination from '../../components/common/Pagination';
import type { RestaurantPrismaInterface } from '../../interfaces/schemaPrismaInterface';

type SearchDetailProps = {
    list: RestaurantPrismaInterface[];
    currentPage: number;
    totalCount: number;
    pageSize: number;
    onPageChange: (page: number) => void;
}

function SearchDetail({ list, currentPage, totalCount, pageSize, onPageChange }: SearchDetailProps) {
    const navigate = useNavigate();
    const totalPages = Math.ceil(totalCount / pageSize);

    const handleRestaurantClick = (restaurantId: number) => {
        //encript restaurantId
        const encryptedId = btoa(restaurantId.toString());
        navigate(`/restaurant-search/${encryptedId}`);
    };

    return (
        <div id='search-detail'>
            {list.length === 0 ? (
                <div className="no-results">
                    <h3>No restaurants found</h3>
                    <p>Try searching with different keywords like cuisine type or location.</p>
                </div>
            ) : (
                <>
                    <div className="search-results-header">
                        <p className="results-count">
                            Showing {((currentPage - 1) * pageSize) + 1} - {Math.min(currentPage * pageSize, totalCount)} of {totalCount} restaurants
                        </p>
                    </div>
                    <div className="restaurant-grid">
                        {list.map((restaurant) => (
                            <div
                                key={restaurant.id}
                                className="restaurant-card"
                                onClick={() => handleRestaurantClick(restaurant.id)}
                            >
                                <div className="restaurant-image-wrapper">
                                    <img
                                        src={restaurant.photos?.[0] || getRestaurantImage1(restaurant.id)}
                                        alt={restaurant.name || 'Restaurant Image'}
                                        className="restaurant-image"
                                    />
                                </div>
                                <div className="restaurant-info grid grid-cols-12 gap-3 w-full">
                                    <h3 className="restaurant-name col-span-3">{restaurant.name}</h3>
                                    <div className="restaurant-meta col-span-4">
                                        <span className="rating">
                                            {'★'.repeat(Math.floor(restaurant.googleRating ?? 0))} {restaurant.googleRating} {restaurant.googleReviews ? `(${restaurant.googleReviews})` : ''}
                                        </span>
                                        <span>{restaurant.cuisine.map(e => <span className="cuisine-badge">{e}</span>)}</span>
                                    </div>
                                    <div className="col-span-5">
                                        <p className="restaurant-description">{restaurant.description}</p>
                                        {/* <p className="restaurant-location">{restaurant.location}</p> */}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={onPageChange}
                    />
                </>
            )}
        </div>
    )
}

export default SearchDetail