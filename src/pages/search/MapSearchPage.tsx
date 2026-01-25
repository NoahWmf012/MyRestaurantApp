
import { useState, useRef, useCallback, useEffect } from 'react';
import Map, { Marker, NavigationControl, GeolocateControl, Popup } from 'react-map-gl/mapbox';
import type { MapRef, ViewStateChangeEvent, MarkerEvent } from 'react-map-gl/mapbox';
import SpinnerIcon from '../../assets/utils/spinner.svg'
import MapFilter from './MapFilter';
import { useGetRestaurantsQuery } from '../../redux/services/api/restaurantAPI';
import type { SearchCriteria } from '../../interfaces/queryInterface/searchCriteriaInterface';
import type { SortFilterInterface } from '../../interfaces/queryInterface/base.types';
import type { RestaurantPrismaInterface } from '../../interfaces/schemaPrismaInterface';
import { useGeolocation } from '../../hooks/useGeolocation';
import { ZOOM_LEVELS } from '../../constants/searchFilterConstant';
import { useNavigate } from 'react-router-dom';
import 'mapbox-gl/dist/mapbox-gl.css';
import './MapSearchPage.scss';

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN || '';

// Default center: Toronto (fallback if geolocation fails)
const DEFAULT_VIEWPORT = {
    latitude: 43.6532,
    longitude: -79.3832,
    zoom: ZOOM_LEVELS
};

interface GeocodingResult {
    id: string;
    place_name: string;
    center: [number, number]; // [longitude, latitude]
    text: string;
}

function MapSearchPage() {
    const mapRef = useRef<MapRef>(null);
    const [viewState, setViewState] = useState(DEFAULT_VIEWPORT);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<GeocodingResult[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const searchTimeout = useRef<NodeJS.Timeout | undefined>(undefined);
    const [selectedLocation, setSelectedLocation] = useState<{ name: string; latitude: number; longitude: number } | null>(null);
    const navigate = useNavigate();

    // Get user's current location
    const { coordinates, error: locationError, getCurrentLocation } = useGeolocation();

    // Filter states
    const [filters, setFilters] = useState<SearchCriteria[]>([]);
    const [sortFilter, setSortFilter] = useState<SortFilterInterface>({
        sortBy: 'googleReviews',
        sortOrder: 'desc'
    });

    // Popup state
    const [selectedRestaurant, setSelectedRestaurant] = useState<RestaurantPrismaInterface | null>(null);

    // Try to get user's current location on mount
    useEffect(() => {
        getCurrentLocation();
    }, [getCurrentLocation]);

    // Update viewport when coordinates are available
    useEffect(() => {
        if (coordinates && !locationError) {
            setViewState({
                latitude: coordinates.latitude,
                longitude: coordinates.longitude,
                zoom: ZOOM_LEVELS
            });
        }
    }, [coordinates, locationError]);

    // Fetch restaurants with filters
    const { data: restaurantData, isLoading: restaurantsLoading } = useGetRestaurantsQuery({
        page: 1,
        pageSize: 100, // Get more restaurants for map view
        searchCriteria: filters,
        ...sortFilter
    });

    const restaurants = restaurantData?.restaurantList || [];

    // Geocoding search using Mapbox Geocoding API
    const searchLocation = useCallback(async (query: string) => {
        if (!query.trim() || !MAPBOX_TOKEN) {
            setSearchResults([]);
            return;
        }

        setIsSearching(true);
        try {
            // Search within Toronto area (bias results to this region)
            const proximity = `${DEFAULT_VIEWPORT.longitude},${DEFAULT_VIEWPORT.latitude}`;
            const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?` +
                `access_token=${MAPBOX_TOKEN}&` +
                `proximity=${proximity}&` +
                `country=ca&` + // Limit to Canada
                `limit=5`;

            const response = await fetch(url);
            const data = await response.json();

            setSearchResults(data.features || []);
        } catch (error) {
            console.error('Geocoding error:', error);
            setSearchResults([]);
        } finally {
            setIsSearching(false);
        }
    }, []);

    // Debounced search
    useEffect(() => {
        if (searchTimeout.current) {
            clearTimeout(searchTimeout.current);
        }

        searchTimeout.current = setTimeout(() => {
            searchLocation(searchQuery);
        }, 300);

        return () => {
            if (searchTimeout.current) {
                clearTimeout(searchTimeout.current);
            }
        };
    }, [searchQuery, searchLocation]);

    // Handle selecting a search result
    const handleSelectLocation = useCallback((result: GeocodingResult) => {
        const [longitude, latitude] = result.center;

        // Save selected location
        setSelectedLocation({
            name: result.place_name,
            latitude,
            longitude
        });

        // Fly to the selected location
        mapRef.current?.flyTo({
            center: [longitude, latitude],
            zoom: 14,
            duration: 1500
        });

        // Clear search
        setSearchQuery('');
        setSearchResults([]);
    }, []);

    // Handle filter changes
    const handleFilterChange = useCallback((newFilters: SearchCriteria[], newSortFilter?: SortFilterInterface) => {
        setFilters(newFilters);
        if (newSortFilter) {
            setSortFilter(newSortFilter);
        }
    }, []);

    // Handle restaurant marker click
    const handleMarkerClick = useCallback((restaurant: RestaurantPrismaInterface) => {
        setSelectedRestaurant(restaurant);

        // Fly to restaurant location
        if (restaurant.latitude && restaurant.longitude) {
            mapRef.current?.flyTo({
                center: [restaurant.longitude, restaurant.latitude],
                zoom: 15,
                duration: 1000
            });
        }
    }, []);

    const handlePopupClick = useCallback(() => {
        if (selectedRestaurant) {
            if (selectedRestaurant.tags.includes('recommended')) {
                const encodedId = btoa(String(selectedRestaurant.id));
                navigate(`/restaurant/${encodedId}`);
            } else {
                const encryptedId = btoa(selectedRestaurant.id.toString());
                navigate(`/restaurant-search/${encryptedId}`);
            }
        }
    }, [selectedRestaurant, navigate]);

    return (
        <div className="map-search-page">
            {/* Filter Sidebar */}
            <div className="map-sidebar">
                <div className="sidebar-header">
                    <h2>Filter Restaurants</h2>
                    <p>{restaurants.length} restaurants found</p>
                </div>
                <div className="sidebar-content">
                    <MapFilter
                        onChange={handleFilterChange}
                        selectedLocation={selectedLocation}
                    />
                </div>
            </div>

            {/* Search Box */}
            <div className="map-search-box">
                <div className="search-input-container">
                    <input
                        type="text"
                        placeholder="Search for a location..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <span className="search-icon">🔍</span>
                </div>

                {/* Search Results */}
                {searchQuery && (
                    <div className="search-results">
                        {isSearching ? (
                            <div className="no-results">Searching...</div>
                        ) : searchResults.length > 0 ? (
                            searchResults.map((result) => (
                                <div
                                    key={result.id}
                                    className="search-result-item"
                                    onClick={() => handleSelectLocation(result)}
                                >
                                    <div className="result-name">{result.text}</div>
                                    <div className="result-address">{result.place_name}</div>
                                </div>
                            ))
                        ) : (
                            <div className="no-results">No results found</div>
                        )}
                    </div>
                )}
            </div>

            <div className="map-container">
                <Map
                    ref={mapRef}
                    {...viewState}
                    onMove={(evt: ViewStateChangeEvent) => setViewState(evt.viewState)}
                    mapboxAccessToken={MAPBOX_TOKEN}
                    mapStyle="mapbox://styles/mapbox/streets-v12"
                    style={{ width: '100%', height: '100%' }}
                >
                    {/* Navigation Controls */}
                    <NavigationControl position="top-right" />

                    {/* Geolocation Control */}
                    <GeolocateControl
                        position="top-right"
                        trackUserLocation
                        showUserHeading
                    />

                    {/* Restaurant Markers */}
                    {restaurants.map((restaurant) => {
                        // Only show restaurants with valid coordinates
                        if (!restaurant.latitude || !restaurant.longitude) return null;

                        return (
                            <Marker
                                key={restaurant.id}
                                latitude={restaurant.latitude}
                                longitude={restaurant.longitude}
                                anchor="bottom"
                                onClick={(e: MarkerEvent<MouseEvent>) => {
                                    e.originalEvent?.stopPropagation();
                                    handleMarkerClick(restaurant);
                                }}
                            >
                                {/* todo: changer icon */}
                                <div className="map-marker">
                                    📍
                                </div>
                            </Marker>
                        );
                    })}

                    {/* Restaurant Popup */}
                    {selectedRestaurant && selectedRestaurant.latitude && selectedRestaurant.longitude && (
                        <Popup
                            latitude={selectedRestaurant.latitude}
                            longitude={selectedRestaurant.longitude}
                            anchor="top"
                            onClose={() => setSelectedRestaurant(null)}
                            closeButton={true}
                            closeOnClick={false}
                        >
                            <div className="marker-popup" onClick={handlePopupClick}>
                                <div className="popup-content">
                                    <h3>{selectedRestaurant.name}</h3>

                                    {selectedRestaurant.cuisine && selectedRestaurant.cuisine.length > 0 && (
                                        <div className="popup-info cuisine">
                                            {selectedRestaurant.cuisine.join(', ')}
                                        </div>
                                    )}

                                    {selectedRestaurant.googleRating && (
                                        <div className="popup-info rating">
                                            <span className="star">⭐</span>
                                            <span>{selectedRestaurant.googleRating.toFixed(1)}</span>
                                            {selectedRestaurant.googleReviews && (
                                                <span> ({selectedRestaurant.googleReviews})</span>
                                            )}
                                        </div>
                                    )}

                                    {(selectedRestaurant.minPrice || selectedRestaurant.maxPrice) && (
                                        <div className="popup-info">
                                            ${selectedRestaurant.minPrice || 0} - ${selectedRestaurant.maxPrice || 0}
                                        </div>
                                    )}

                                    {selectedRestaurant.address && (
                                        <div className="popup-address">
                                            {selectedRestaurant.address}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </Popup>
                    )}
                </Map>

                {/* Loading Overlay */}
                {restaurantsLoading && (
                    <div className="map-loading">
                        <img src={SpinnerIcon} alt="Loading..." className="loading-spinner" />
                    </div>
                )}
            </div>
        </div>
    );
}

export default MapSearchPage;