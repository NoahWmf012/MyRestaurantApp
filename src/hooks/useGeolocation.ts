import { useState, useEffect, useCallback } from 'react';

export interface GeolocationCoordinates {
    latitude: number;
    longitude: number;
    accuracy: number;
}

export interface GeolocationState {
    loading: boolean;
    error: string | null;
    coordinates: GeolocationCoordinates | null;
}

export interface UseGeolocationReturn extends GeolocationState {
    getCurrentLocation: () => void;
    clearLocation: () => void;
}

/**
 * Custom hook to access user's geolocation
 * @param options - Geolocation options (enableHighAccuracy, timeout, maximumAge)
 * @returns GeolocationState with coordinates, loading state, error, and control functions
 */
export const useGeolocation = (options?: PositionOptions): UseGeolocationReturn => {
    const [state, setState] = useState<GeolocationState>({
        loading: false,
        error: null,
        coordinates: null,
    });

    const handleSuccess = useCallback((position: GeolocationPosition) => {
        setState({
            loading: false,
            error: null,
            coordinates: {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                accuracy: position.coords.accuracy,
            },
        });
    }, []);

    const handleError = useCallback((error: GeolocationPositionError) => {
        let errorMessage: string;

        switch (error.code) {
            case error.PERMISSION_DENIED:
                errorMessage = 'Location access denied. Please enable location permissions in your browser settings.';
                break;
            case error.POSITION_UNAVAILABLE:
                errorMessage = 'Location information is unavailable.';
                break;
            case error.TIMEOUT:
                errorMessage = 'Location request timed out.';
                break;
            default:
                errorMessage = 'An unknown error occurred while getting location.';
        }

        setState({
            loading: false,
            error: errorMessage,
            coordinates: null,
        });
    }, []);

    const getCurrentLocation = useCallback(() => {
        if (!navigator.geolocation) {
            setState({
                loading: false,
                error: 'Geolocation is not supported by your browser.',
                coordinates: null,
            });
            return;
        }

        setState(prev => ({ ...prev, loading: true, error: null }));

        const defaultOptions: PositionOptions = {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0,
            ...options,
        };

        navigator.geolocation.getCurrentPosition(
            handleSuccess,
            handleError,
            defaultOptions
        );
    }, [options, handleSuccess, handleError]);

    const clearLocation = useCallback(() => {
        setState({
            loading: false,
            error: null,
            coordinates: null,
        });
    }, []);

    return {
        ...state,
        getCurrentLocation,
        clearLocation,
    };
};

/**
 * Hook to watch user's location continuously
 * @param options - Geolocation options
 * @returns GeolocationState with coordinates, loading state, and error
 */
export const useGeolocationWatch = (options?: PositionOptions): GeolocationState & { stopWatching: () => void } => {
    const [state, setState] = useState<GeolocationState>({
        loading: true,
        error: null,
        coordinates: null,
    });
    const [watchId, setWatchId] = useState<number | null>(null);

    useEffect(() => {
        if (!navigator.geolocation) {
            setState({
                loading: false,
                error: 'Geolocation is not supported by your browser.',
                coordinates: null,
            });
            return;
        }

        const defaultOptions: PositionOptions = {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0,
            ...options,
        };

        const handleSuccess = (position: GeolocationPosition) => {
            setState({
                loading: false,
                error: null,
                coordinates: {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    accuracy: position.coords.accuracy,
                },
            });
        };

        const handleError = (error: GeolocationPositionError) => {
            let errorMessage: string;

            switch (error.code) {
                case error.PERMISSION_DENIED:
                    errorMessage = 'Location access denied.';
                    break;
                case error.POSITION_UNAVAILABLE:
                    errorMessage = 'Location information is unavailable.';
                    break;
                case error.TIMEOUT:
                    errorMessage = 'Location request timed out.';
                    break;
                default:
                    errorMessage = 'An unknown error occurred.';
            }

            setState({
                loading: false,
                error: errorMessage,
                coordinates: null,
            });
        };

        const id = navigator.geolocation.watchPosition(
            handleSuccess,
            handleError,
            defaultOptions
        );

        setWatchId(id);

        return () => {
            if (id !== null) {
                navigator.geolocation.clearWatch(id);
            }
        };
    }, [options]);

    const stopWatching = useCallback(() => {
        if (watchId !== null) {
            navigator.geolocation.clearWatch(watchId);
            setWatchId(null);
        }
    }, [watchId]);

    return {
        ...state,
        stopWatching,
    };
};
