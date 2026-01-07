import { useEffect, useState, useCallback, useRef } from 'react';
import debounce from 'debounce';
import {
    RESTUARANT_SEARCH_FILEDS,
    SEARCH_FILTER_CUISINES,
    SEARCH_FILTER_DISTANCE,
    SEARCH_FILTER_LOCATIONS,
} from '../../constants/searchFilterConstant';
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

type MapFilterProps = {
    onChange: (filters: SearchCriteria[], sortFilter?: SortFilterInterface) => void;
    selectedLocation?: { name: string; latitude: number; longitude: number } | null;
};

function MapFilter({ onChange, selectedLocation }: MapFilterProps) {
    const [locations, setLocations] = useState<string[]>([]);
    const [cuisines, setCuisines] = useState<string[]>([]);
    const [recommended, setRecommended] = useState(true);
    const [locationMode, setLocationMode] = useState<'none' | 'current' | 'selected'>('none');
    const [distance, setDistance] = useState<number | undefined>(undefined);
    const [spendingRange, setSpendingRange] = useState<[number, number]>([0, 200]);
    const [tempSpendingRange, setTempSpendingRange] = useState<[number, number]>([0, 200]);

    const { loading: locationLoading, error: locationError, coordinates, getCurrentLocation } = useGeolocation();

    const debouncedSetSpendingRange = useRef(debounce((newRange: [number, number]) => {
        setSpendingRange(newRange);
    }, 300));

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

    useEffect(() => {
        const filters: SearchCriteria[] = [];

        if (recommended) {
            filters.push({ key: RESTUARANT_SEARCH_FILEDS.TAGS, value: ['recommended'], searchType: SearchOperation.IN });
        }

        if (locationMode === 'current' && coordinates && distance) {
            filters.push({ key: RESTUARANT_SEARCH_FILEDS.RANGED, value: [coordinates.latitude, coordinates.longitude, distance] })
        }

        if (locationMode === 'selected' && selectedLocation && distance) {
            filters.push({ key: RESTUARANT_SEARCH_FILEDS.RANGED, value: [selectedLocation.latitude, selectedLocation.longitude, distance] })
        }

        if (locations.length > 0) {
            const updatedLocations = locations.map(loc => loc === 'Downtown' ? 'Toronto' : loc);
            filters.push({ key: RESTUARANT_SEARCH_FILEDS.CITY, value: updatedLocations, searchType: SearchOperation.IN });
        }

        if (cuisines.length > 0) {
            filters.push({ key: RESTUARANT_SEARCH_FILEDS.CUISINE, value: cuisines, searchType: SearchOperation.IN });
        }

        if (spendingRange) {
            filters.push({ key: RESTUARANT_SEARCH_FILEDS.MIN_PRICE, value: spendingRange[0], searchType: SearchOperation.GREATER_THAN_EQUAL });
            filters.push({ key: RESTUARANT_SEARCH_FILEDS.MAX_PRICE, value: spendingRange[1], searchType: SearchOperation.LESS_THAN_EQUAL });
        }

        onChange(filters);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        recommended,
        locationMode,
        coordinates,
        distance,
        locations,
        cuisines,
        spendingRange,
        selectedLocation
    ]);

    return (
        <div className="map-filter-container">
            {/* Recommended */}
            <CollapsibleSection title="Recommended" defaultOpen={true}>
                <div className="filter-options-list">
                    <label className="checkbox-label">
                        <input
                            type="checkbox"
                            checked={recommended}
                            onChange={() => setRecommended(!recommended)}
                        />
                        <span>Recommended</span>
                    </label>
                </div>
            </CollapsibleSection>

            {/* Distance */}
            <CollapsibleSection title="Distance" defaultOpen={false}>
                <div className="filter-options-list">
                    <label className="radio-label">
                        <input
                            type="radio"
                            name="locationMode"
                            value="current"
                            checked={locationMode === 'current'}
                            onChange={(e) => {
                                if (e.target.checked) {
                                    setLocationMode('current');
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

                    <label className="radio-label">
                        <input
                            type="radio"
                            name="locationMode"
                            value="selected"
                            checked={locationMode === 'selected'}
                            onChange={(e) => {
                                if (e.target.checked) {
                                    setLocationMode('selected');
                                }
                            }}
                            disabled={!selectedLocation}
                        />
                        <span>
                            From Selected Location
                            {selectedLocation && <span className="ml-2 text-sm text-gray-600">({selectedLocation.name})</span>}
                            {!selectedLocation && <span className="ml-2 text-sm text-gray-400">(Search for a location first)</span>}
                        </span>
                    </label>

                    {((locationMode === 'current' && coordinates) || (locationMode === 'selected' && selectedLocation)) && (
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
            <CollapsibleSection title="Cuisine" defaultOpen={false}>
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

            {/* Spending */}
            <CollapsibleSection title="Spending" defaultOpen={false}>
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
    );
}

export default MapFilter;
