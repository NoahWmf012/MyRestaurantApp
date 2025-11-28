import { useGeolocation } from '../hooks/useGeolocation';

/**
 * Example component demonstrating how to use the useGeolocation hook
 * This is a standalone example - you can copy this pattern anywhere in your app
 */
function LocationExample() {
    const { loading, error, coordinates, getCurrentLocation, clearLocation } = useGeolocation({
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
    });

    return (
        <div className="p-6 bg-white rounded-lg shadow-md max-w-md">
            <h2 className="text-2xl font-bold mb-4">Geolocation Example</h2>

            <div className="space-y-4">
                {/* Action Buttons */}
                <div className="flex gap-2">
                    <button
                        onClick={getCurrentLocation}
                        disabled={loading}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Getting Location...' : 'Get My Location'}
                    </button>

                    <button
                        onClick={clearLocation}
                        disabled={!coordinates}
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                        Clear Location
                    </button>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                        <p className="font-semibold">Error:</p>
                        <p>{error}</p>
                    </div>
                )}

                {/* Success - Display Coordinates */}
                {coordinates && (
                    <div className="p-4 bg-green-100 border border-green-400 rounded">
                        <p className="font-semibold text-green-800 mb-2">Location Retrieved:</p>
                        <div className="space-y-1 text-sm">
                            <p><strong>Latitude:</strong> {coordinates.latitude.toFixed(6)}°</p>
                            <p><strong>Longitude:</strong> {coordinates.longitude.toFixed(6)}°</p>
                            <p><strong>Accuracy:</strong> ±{coordinates.accuracy.toFixed(2)} meters</p>
                        </div>

                        {/* Google Maps Link */}
                        <a
                            href={`https://www.google.com/maps?q=${coordinates.latitude},${coordinates.longitude}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block mt-3 text-blue-600 hover:underline"
                        >
                            View on Google Maps →
                        </a>
                    </div>
                )}

                {/* Info Message */}
                {!loading && !error && !coordinates && (
                    <div className="p-3 bg-blue-50 border border-blue-200 text-blue-700 rounded text-sm">
                        <p>Click "Get My Location" to retrieve your current position.</p>
                        <p className="mt-1 text-xs">Your browser will ask for permission to access your location.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default LocationExample;
