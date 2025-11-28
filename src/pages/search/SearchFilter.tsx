import { useEffect, useState, useCallback, useRef } from 'react';
import debounce from 'debounce';
import { SEARCH_FILTER_CUISINES, SEARCH_FILTER_DISTANCE, SEARCH_FILTER_LOCATIONS, SEARCH_FILTER_SORT_LIST } from '../../constants/searchFilterConstant';
import { type SearchCriteria, SearchOperation } from '../../interfaces/queryInterface/searchCriteriaInterface';
import type { SortFilterInterface } from '../../interfaces/queryInterface/base.types';
import { useGeolocation } from '../../hooks/useGeolocation';

interface CollapsibleSectionProps {
    title: string;
    children: React.ReactNode;
    defaultOpen?: boolean;
}

function CollapsibleSection({ title, children, defaultOpen = true }: CollapsibleSectionProps) {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <div className="collapsible-section">
            <button
                className="collapsible-header"
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
            >
                <span className="collapsible-title">{title}</span>
                <span className={`collapsible-icon ${isOpen ? 'open' : ''}`}>▼</span>
            </button>
            <div className={`collapsible-content ${isOpen ? 'open' : ''}`}>
                <div className="collapsible-content-inner">
                    {children}
                </div>
            </div>
        </div>
    );
}

type SearchFilterProps = {
    onChange: (filters: SearchCriteria[], sortFilter?: SortFilterInterface | null) => void
};

function SearchFilter({ onChange }: SearchFilterProps) {
    const [bookmarked, setBookmarked] = useState(false);
    const [locations, setLocations] = useState<string[]>([]);
    const [cuisines, setCuisines] = useState<string[]>([]);
    const [sortBy, setSortBy] = useState('reviews');
    const [locationMode, setLocationMode] = useState<'none' | 'current' | 'specific'>('none');
    // const [specificLocation, setSpecificLocation] = useState('');
    const [distance, setDistance] = useState<number | undefined>(undefined);
    // const [parking, setParking] = useState(false); //todo
    // const [payment, setPayment] = useState<string[]>([]);
    // const [dineInOnly, setDineInOnly] = useState(false);
    // const [takeOutOnly, setTakeOutOnly] = useState(false);
    const [spendingRange, setSpendingRange] = useState<[number, number]>([0, 200]);
    const [tempSpendingRange, setTempSpendingRange] = useState<[number, number]>([0, 200]);

    // Use geolocation hook
    const { loading: locationLoading, error: locationError, coordinates, getCurrentLocation } = useGeolocation();

    // Create debounced function for spending range updates
    const debouncedSetSpendingRange = useRef(debounce((newRange: [number, number]) => {
        setSpendingRange(newRange);
    }, 300)
    );

    const handleSpendingRangeChange = useCallback((newRange: [number, number]) => {
        setTempSpendingRange(newRange);
        debouncedSetSpendingRange.current(newRange);
    }, []);

    const handleLocationChange = (location: string) => {
        setLocations(prev =>
            prev.includes(location)
                ? prev.filter(l => l !== location)
                : [...prev, location]
        );
    };

    const handleCuisineChange = (cuisine: string) => {
        setCuisines(prev =>
            prev.includes(cuisine)
                ? prev.filter(c => c !== cuisine)
                : [...prev, cuisine]
        );
    };

    //handle onChange
    useEffect(() => {
        const filters: SearchCriteria[] = [];
        let sortFilter: SortFilterInterface | undefined = {
            sortBy: 'reviews',
            sortOrder: 'desc'
        }

        // if (bookmarked) { //todo
        //     filters.push({ type: 'bookmarked', value: true });
        // }

        if (locationMode === 'current' && coordinates && distance) {
            filters.push({ key: 'latitude', value: coordinates.latitude })
            filters.push({ key: 'longitude', value: coordinates.longitude })
            filters.push({ key: 'distance', value: distance })
        }
        // else if (locationMode === 'specific' && specificLocation.trim() && distance) {
        //     console.log('Specific location:', specificLocation);
        //     console.log('Selected distance radius:', distance, 'km');
        // }

        if (locations.length > 0) {
            //change the city into 'Toronto' if it is 'Downtown'
            if (locations.includes('Downtown')) {
                const updatedLocations = locations.map(loc => loc === 'Downtown' ? 'Toronto' : loc);
                filters.push({ key: 'city', value: updatedLocations, searchType: SearchOperation.IN });
            } else {
                filters.push({ key: 'city', value: locations, searchType: SearchOperation.IN });
            }
        }
        if (cuisines.length > 0) {
            filters.push({ key: 'cuisine', value: cuisines, searchType: SearchOperation.IN });
        }
        if (sortBy) {
            if (sortBy === 'low_high') {
                sortFilter = { sortBy: 'minPrice', sortOrder: 'asc' };
            } else if (sortBy === 'high_low') {
                sortFilter = { sortBy: 'maxPrice', sortOrder: 'desc' };
            } else {
                sortFilter = { sortBy, sortOrder: 'desc' };
            }
        }
        // if (parking) {
        //     filters.push({ key: 'parking', value: true });
        // }
        // if (payment.length > 0) {
        //     filters.push({ key: 'payment', value: payment });
        // }
        // if (dineInOnly) {
        //     filters.push({ key: 'dineInOnly', value: true });
        // }
        // if (takeOutOnly) {
        //     filters.push({ key: 'takeOutOnly', value: true });
        // }
        if (spendingRange) {
            filters.push({ key: 'minPrice', value: spendingRange[0], searchType: SearchOperation.GREATER_THAN_EQUAL });
            filters.push({ key: 'maxPrice', value: spendingRange[1], searchType: SearchOperation.LESS_THAN_EQUAL });
        }

        onChange(filters, sortFilter);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        // bookmarked,
        locationMode,
        // specificLocation,
        coordinates,
        distance,
        locations,
        cuisines,
        sortBy,
        // parking,
        // payment,
        // dineInOnly,
        // takeOutOnly,
        spendingRange
    ]);

    //todo
    // const handlePaymentChange = (method: string) => {
    //     setPayment(prev =>
    //         prev.includes(method)
    //             ? prev.filter(p => p !== method)
    //             : [...prev, method]
    //     );
    // };

    return (
        <div className="search-filter-container mb-8 bg-white rounded-xl shadow-md overflow-hidden">
            <div className="search-filter-gradient-top"></div>
            <div className="search-filter-scroll h-full overflow-y-auto p-1">
                {/* Bookmarked  */} {/* todo: member function */}
                <CollapsibleSection title="Bookmarked">
                    <div className="filter-option" title="Coming soon">
                        <label className="checkbox-label">
                            <input
                                type="checkbox"
                                checked={bookmarked}
                                onChange={(e) => setBookmarked(e.target.checked)}
                                disabled={true}
                            />
                            <span>Bookmarked</span>
                        </label>
                    </div>
                </CollapsibleSection>

                {/* Distance */}
                <CollapsibleSection title="Distance" defaultOpen={false}>
                    <div className="filter-options-list">
                        {/* Radio button for Current Location */}
                        <label className="radio-label">
                            <input
                                type="radio"
                                name="locationMode"
                                value="current"
                                checked={locationMode === 'current'}
                                onChange={(e) => {
                                    if (e.target.checked) {
                                        setLocationMode('current');
                                        // setSpecificLocation('');
                                        getCurrentLocation();
                                    }
                                }}
                            />
                            <span>
                                From Current Location
                                {locationMode === 'current' && locationLoading && <span className="ml-2 text-sm text-gray-500">(Loading...)</span>}
                                {locationMode === 'current' && locationError && <span className="ml-2 text-sm text-red-500" title={locationError}>(Error)</span>}
                            </span>
                        </label>

                        {/* Radio button for Specific Location */}
                        {/* <label className="radio-label">
                            <input
                                type="radio"
                                name="locationMode"
                                value="specific"
                                checked={locationMode === 'specific'}
                                onChange={(e) => {
                                    if (e.target.checked) {
                                        setLocationMode('specific');
                                        clearLocation();
                                        setDistance(undefined);
                                    }
                                }}
                            />
                            <span>From Specific Location</span>
                        </label> */}

                        {/* Input field for specific location */}
                        {/* {locationMode === 'specific' && (
                            <div className="ml-6 mt-2">
                                <input
                                    type="text"
                                    placeholder="Enter address or location..."
                                    value={specificLocation}
                                    onChange={(e) => setSpecificLocation(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        )} */}

                        {/* Distance options - show when current location is obtained OR specific location is entered */}
                        {/* {((locationMode === 'current' && coordinates) || (locationMode === 'specific' && specificLocation.trim())) && ( */}
                        {(locationMode === 'current' && coordinates) && (
                            <div>
                                <div className="text-sm text-gray-600 mb-2">
                                    Select distance radius:
                                </div>
                                <div>
                                    <select
                                        value={distance ?? ''}
                                        onChange={(e) => setDistance(e.target.value ? Number(e.target.value) : undefined)}
                                        className="w-full px-1 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        {SEARCH_FILTER_DISTANCE.map((option) => (
                                            <option key={option.label} value={option.value ?? ''}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        )}
                    </div>
                </CollapsibleSection>

                {/* Location */}
                <CollapsibleSection title="Location" defaultOpen={false}>
                    <div className="filter-options-list">
                        {SEARCH_FILTER_LOCATIONS.map((location) => (
                            <label key={location} className="checkbox-label">
                                <input
                                    type="checkbox"
                                    checked={locations.includes(location)}
                                    onChange={() => handleLocationChange(location)}
                                />
                                <span>{location}</span>
                            </label>
                        ))}
                    </div>
                </CollapsibleSection>

                {/* Cuisine */}
                <CollapsibleSection title="Cuisine">
                    <div className="filter-options-list">
                        {SEARCH_FILTER_CUISINES.map((cuisine) => (
                            <label key={cuisine} className="checkbox-label">
                                <input
                                    type="checkbox"
                                    checked={cuisines.includes(cuisine)}
                                    onChange={() => handleCuisineChange(cuisine)}
                                />
                                <span>{cuisine}</span>
                            </label>
                        ))}
                    </div>
                </CollapsibleSection>

                {/* Sort */}
                <CollapsibleSection title="Sort">
                    <div className="filter-options-list">
                        {SEARCH_FILTER_SORT_LIST.map((option) => (
                            <label key={option.value} className="radio-label">
                                <input
                                    type="radio"
                                    name="sortBy"
                                    value={option.value}
                                    checked={sortBy === option.value}
                                    onChange={(e) => setSortBy(e.target.value)}
                                />
                                <span>{option.label}</span>
                            </label>
                        ))}
                    </div>
                </CollapsibleSection>

                {/* Others */}
                {/* <CollapsibleSection title="Others" defaultOpen={false}>
                    <div className="filter-options-list">
                        <label className="checkbox-label">
                            <input
                                type="checkbox"
                                checked={parking}
                                onChange={(e) => setParking(e.target.checked)}
                            />
                            <span>Parking Available</span>
                        </label>

                        <div className="filter-subsection">
                            <div className="filter-subsection-title">Payment Methods</div>
                            {SEARCH_FILTER_PAYMENT_METHODS.map((method) => (
                                <label key={method} className="checkbox-label">
                                    <input
                                        type="checkbox"
                                        checked={payment.includes(method)}
                                        onChange={() => handlePaymentChange(method)}
                                    />
                                    <span>{method}</span>
                                </label>
                            ))}
                        </div>

                        <label className="checkbox-label">
                            <input
                                type="checkbox"
                                checked={dineInOnly}
                                onChange={(e) => setDineInOnly(e.target.checked)}
                            />
                            <span>Dine-in Only</span>
                        </label>

                        <label className="checkbox-label">
                            <input
                                type="checkbox"
                                checked={takeOutOnly}
                                onChange={(e) => setTakeOutOnly(e.target.checked)}
                            />
                            <span>Take-out Only</span>
                        </label>
                    </div>
                </CollapsibleSection> */}

                {/* Spending */}
                <CollapsibleSection title="Spending">
                    <div className="filter-option">
                        <div className="spending-range">
                            <div className="spending-values">
                                <span className="spending-value">${tempSpendingRange[0]}</span>
                                <span className="spending-value">${tempSpendingRange[1]}</span>
                            </div>
                            <div className="double-range-slider">
                                <div className="slider-track"></div>
                                <div
                                    className="slider-range"
                                    style={{
                                        left: `${(tempSpendingRange[0] / 200) * 100}%`,
                                        right: `${100 - (tempSpendingRange[1] / 200) * 100}%`
                                    }}
                                ></div>
                                <input
                                    type="range"
                                    min="0"
                                    max="200"
                                    step="10"
                                    value={tempSpendingRange[0]}
                                    onChange={(e) => {
                                        const newMin = parseInt(e.target.value);
                                        if (newMin < tempSpendingRange[1]) {
                                            handleSpendingRangeChange([newMin, tempSpendingRange[1]]);
                                        }
                                    }}
                                    className="spending-slider spending-slider-min"
                                />
                                <input
                                    type="range"
                                    min="0"
                                    max="200"
                                    step="10"
                                    value={tempSpendingRange[1]}
                                    onChange={(e) => {
                                        const newMax = parseInt(e.target.value);
                                        if (newMax > tempSpendingRange[0]) {
                                            handleSpendingRangeChange([tempSpendingRange[0], newMax]);
                                        }
                                    }}
                                    className="spending-slider spending-slider-max"
                                />
                            </div>
                            <div className="spending-inputs">
                                <input
                                    type="number"
                                    placeholder="Min"
                                    value={tempSpendingRange[0]}
                                    onChange={(e) => {
                                        const newMin = parseInt(e.target.value) || 0;
                                        if (newMin <= tempSpendingRange[1]) {
                                            handleSpendingRangeChange([newMin, tempSpendingRange[1]]);
                                        }
                                    }}
                                    className="spending-input"
                                />
                                <span>-</span>
                                <input
                                    type="number"
                                    placeholder="Max"
                                    value={tempSpendingRange[1]}
                                    onChange={(e) => {
                                        const newMax = parseInt(e.target.value) || 200;
                                        if (newMax >= tempSpendingRange[0]) {
                                            handleSpendingRangeChange([tempSpendingRange[0], newMax]);
                                        }
                                    }}
                                    className="spending-input"
                                />
                            </div>
                        </div>
                    </div>
                </CollapsibleSection>
            </div>
            <div className="search-filter-gradient-bottom"></div>
        </div>
    );
}

export default SearchFilter;