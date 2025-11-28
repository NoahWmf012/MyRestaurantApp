import { useState, useRef, useEffect } from 'react';
import { useGeocodingAutocomplete, type LocationSuggestion, formatLocationDisplay } from '../hooks/useGeocodingAutocomplete';

interface LocationAutocompleteInputProps {
    value: string;
    onChange: (value: string, coordinates?: { lat: number; lon: number }) => void;
    placeholder?: string;
    className?: string;
    countryCode?: string;
}

function LocationAutocompleteInput({
    value,
    onChange,
    placeholder = 'Enter address or location...',
    className = '',
    countryCode = 'ca', // Default to Canada
}: LocationAutocompleteInputProps) {
    const [showDropdown, setShowDropdown] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const inputRef = useRef<HTMLInputElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const { suggestions, loading, searchLocation, clearSuggestions } = useGeocodingAutocomplete({
        countryCode,
        limit: 5,
        debounceMs: 300,
    });

    // Handle input change
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        onChange(newValue);
        searchLocation(newValue);
        setShowDropdown(true);
        setSelectedIndex(-1);
    };

    // Handle suggestion selection
    const handleSelectSuggestion = (suggestion: LocationSuggestion) => {
        const displayText = formatLocationDisplay(suggestion);
        onChange(displayText, {
            lat: parseFloat(suggestion.lat),
            lon: parseFloat(suggestion.lon),
        });
        setShowDropdown(false);
        clearSuggestions();
        setSelectedIndex(-1);
    };

    // Handle keyboard navigation
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (!showDropdown || suggestions.length === 0) return;

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setSelectedIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : prev));
                break;
            case 'ArrowUp':
                e.preventDefault();
                setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
                break;
            case 'Enter':
                e.preventDefault();
                if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
                    handleSelectSuggestion(suggestions[selectedIndex]);
                }
                break;
            case 'Escape':
                setShowDropdown(false);
                setSelectedIndex(-1);
                break;
        }
    };

    // Handle click outside to close dropdown
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node) &&
                inputRef.current &&
                !inputRef.current.contains(event.target as Node)
            ) {
                setShowDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Show dropdown when suggestions are available
    useEffect(() => {
        if (suggestions.length > 0) {
            setShowDropdown(true);
        }
    }, [suggestions]);

    return (
        <div className="relative">
            <input
                ref={inputRef}
                type="text"
                value={value}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                onFocus={() => {
                    if (suggestions.length > 0) {
                        setShowDropdown(true);
                    }
                }}
                placeholder={placeholder}
                className={className}
                autoComplete="off"
            />

            {/* Loading indicator */}
            {loading && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <div className="animate-spin h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full"></div>
                </div>
            )}

            {/* Dropdown with suggestions */}
            {showDropdown && suggestions.length > 0 && (
                <div
                    ref={dropdownRef}
                    className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto"
                >
                    {suggestions.map((suggestion, index) => {
                        const displayText = formatLocationDisplay(suggestion);
                        const isSelected = index === selectedIndex;

                        return (
                            <button
                                key={suggestion.place_id}
                                type="button"
                                onClick={() => handleSelectSuggestion(suggestion)}
                                className={`w-full text-left px-4 py-2 hover:bg-blue-50 focus:bg-blue-50 focus:outline-none border-b border-gray-100 last:border-b-0 ${isSelected ? 'bg-blue-50' : ''
                                    }`}
                            >
                                <div className="flex items-start">
                                    <span className="text-gray-400 mr-2 mt-1">📍</span>
                                    <div className="flex-1">
                                        <div className="text-sm font-medium text-gray-900">
                                            {displayText}
                                        </div>
                                        {suggestion.type && (
                                            <div className="text-xs text-gray-500 mt-0.5">
                                                {suggestion.type}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </button>
                        );
                    })}
                </div>
            )}

            {/* No results message */}
            {showDropdown && !loading && suggestions.length === 0 && value.length >= 3 && (
                <div
                    ref={dropdownRef}
                    className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg px-4 py-3"
                >
                    <div className="text-sm text-gray-500 text-center">
                        No locations found. Try a different search term.
                    </div>
                </div>
            )}
        </div>
    );
}

export default LocationAutocompleteInput;
