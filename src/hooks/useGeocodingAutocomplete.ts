import { useState, useEffect, useCallback, useRef } from 'react';
import debounce from 'debounce';

export interface LocationSuggestion {
    display_name: string;
    lat: string;
    lon: string;
    place_id: number;
    type: string;
    address: {
        city?: string;
        town?: string;
        village?: string;
        state?: string;
        country?: string;
        postcode?: string;
    };
}

export interface UseGeocodingAutocompleteReturn {
    suggestions: LocationSuggestion[];
    loading: boolean;
    error: string | null;
    searchLocation: (query: string) => void;
    clearSuggestions: () => void;
}

/**
 * Custom hook for geocoding autocomplete using Nominatim (OpenStreetMap)
 * Free to use, no API key required
 * 
 * @param options - Configuration options
 * @returns Autocomplete state and functions
 */
export const useGeocodingAutocomplete = (
    options?: {
        countryCode?: string; // e.g., 'ca' for Canada, 'us' for USA
        limit?: number; // Number of results (default: 5)
        debounceMs?: number; // Debounce delay (default: 300ms)
    }
): UseGeocodingAutocompleteReturn => {
    const [suggestions, setSuggestions] = useState<LocationSuggestion[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const abortControllerRef = useRef<AbortController | null>(null);

    const { countryCode, limit = 5, debounceMs = 300 } = options || {};

    const fetchSuggestions = async (query: string) => {
        if (!query || query.trim().length < 3) {
            setSuggestions([]);
            setLoading(false);
            return;
        }

        // Cancel previous request
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }

        // Create new abort controller
        abortControllerRef.current = new AbortController();

        setLoading(true);
        setError(null);

        try {
            // Build query parameters
            const params = new URLSearchParams({
                q: query.trim(),
                format: 'json',
                addressdetails: '1',
                limit: limit.toString(),
            });

            if (countryCode) {
                params.append('countrycodes', countryCode);
            }

            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?${params.toString()}`,
                {
                    signal: abortControllerRef.current.signal,
                    headers: {
                        'Accept': 'application/json',
                        // Nominatim requires a User-Agent header
                        'User-Agent': 'RestaurantSearchApp/1.0',
                    },
                }
            );

            if (!response.ok) {
                throw new Error('Failed to fetch location suggestions');
            }

            const data: LocationSuggestion[] = await response.json();
            setSuggestions(data);
            setError(null);
        } catch (err) {
            if (err instanceof Error) {
                if (err.name === 'AbortError') {
                    // Request was cancelled, do nothing
                    return;
                }
                setError(err.message);
            } else {
                setError('An unknown error occurred');
            }
            setSuggestions([]);
        } finally {
            setLoading(false);
        }
    };

    // Create debounced search function
    const debouncedFetchSuggestions = useRef(
        debounce((query: string) => {
            fetchSuggestions(query);
        }, debounceMs)
    ).current;

    const searchLocation = useCallback(
        (query: string) => {
            debouncedFetchSuggestions(query);
        },
        [debouncedFetchSuggestions]
    );

    const clearSuggestions = useCallback(() => {
        setSuggestions([]);
        setError(null);
        setLoading(false);
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }
    }, []);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
        };
    }, []);

    return {
        suggestions,
        loading,
        error,
        searchLocation,
        clearSuggestions,
    };
};

/**
 * Format location suggestion for display
 */
export const formatLocationDisplay = (suggestion: LocationSuggestion): string => {
    const { address } = suggestion;
    const parts: string[] = [];

    // Add city/town/village
    const locality = address.city || address.town || address.village;
    if (locality) parts.push(locality);

    // Add state
    if (address.state) parts.push(address.state);

    // Add country
    if (address.country) parts.push(address.country);

    return parts.length > 0 ? parts.join(', ') : suggestion.display_name;
};
