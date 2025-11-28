# Geolocation Usage Guide

This guide explains how to access and use the user's location in your React application.

## Overview

The `useGeolocation` hook provides an easy way to access the user's current location using the browser's Geolocation API.

## Features

✅ Get user's current location (latitude, longitude, accuracy)
✅ Handle permission requests automatically
✅ Error handling with descriptive messages
✅ Loading states
✅ TypeScript support
✅ Watch location continuously (optional)

## Basic Usage

### 1. Import the Hook

```typescript
import { useGeolocation } from '../hooks/useGeolocation';
```

### 2. Use in Your Component

```typescript
function MyComponent() {
    const { loading, error, coordinates, getCurrentLocation, clearLocation } = useGeolocation();

    return (
        <div>
            <button onClick={getCurrentLocation}>Get Location</button>
            
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {coordinates && (
                <p>
                    Lat: {coordinates.latitude}, 
                    Lng: {coordinates.longitude}
                </p>
            )}
        </div>
    );
}
```

## API Reference

### `useGeolocation(options?)`

Returns an object with the following properties:

| Property | Type | Description |
|----------|------|-------------|
| `loading` | `boolean` | True while fetching location |
| `error` | `string \| null` | Error message if location access fails |
| `coordinates` | `GeolocationCoordinates \| null` | User's location data |
| `getCurrentLocation` | `() => void` | Function to request location |
| `clearLocation` | `() => void` | Function to clear stored location |

### Coordinates Object

```typescript
interface GeolocationCoordinates {
    latitude: number;    // Latitude in degrees
    longitude: number;   // Longitude in degrees
    accuracy: number;    // Accuracy in meters
}
```

### Options (Optional)

```typescript
interface PositionOptions {
    enableHighAccuracy?: boolean;  // Use GPS if available (default: true)
    timeout?: number;              // Timeout in milliseconds (default: 10000)
    maximumAge?: number;           // Max age of cached position (default: 0)
}
```

## Examples

### Example 1: Simple Location Button

```typescript
function LocationButton() {
    const { coordinates, getCurrentLocation } = useGeolocation();

    return (
        <div>
            <button onClick={getCurrentLocation}>
                Get My Location
            </button>
            {coordinates && (
                <p>You are at: {coordinates.latitude}, {coordinates.longitude}</p>
            )}
        </div>
    );
}
```

### Example 2: With Loading and Error States

```typescript
function LocationComponent() {
    const { loading, error, coordinates, getCurrentLocation } = useGeolocation();

    return (
        <div>
            <button onClick={getCurrentLocation} disabled={loading}>
                {loading ? 'Getting Location...' : 'Get Location'}
            </button>

            {error && (
                <div className="error">
                    {error}
                </div>
            )}

            {coordinates && (
                <div>
                    <p>Latitude: {coordinates.latitude}°</p>
                    <p>Longitude: {coordinates.longitude}°</p>
                    <p>Accuracy: ±{coordinates.accuracy}m</p>
                </div>
            )}
        </div>
    );
}
```

### Example 3: Auto-fetch on Mount

```typescript
function AutoLocation() {
    const { coordinates, getCurrentLocation } = useGeolocation();

    useEffect(() => {
        getCurrentLocation();
    }, []);

    return (
        <div>
            {coordinates ? (
                <p>Location: {coordinates.latitude}, {coordinates.longitude}</p>
            ) : (
                <p>Fetching location...</p>
            )}
        </div>
    );
}
```

### Example 4: Custom Options

```typescript
function HighAccuracyLocation() {
    const { coordinates, getCurrentLocation } = useGeolocation({
        enableHighAccuracy: true,  // Use GPS
        timeout: 15000,            // Wait up to 15 seconds
        maximumAge: 60000,         // Accept cached position up to 1 minute old
    });

    return (
        <div>
            <button onClick={getCurrentLocation}>Get Precise Location</button>
            {coordinates && <p>Accuracy: ±{coordinates.accuracy}m</p>}
        </div>
    );
}
```

### Example 5: Continuous Location Tracking

For continuous tracking, use `useGeolocationWatch`:

```typescript
import { useGeolocationWatch } from '../hooks/useGeolocation';

function TrackLocation() {
    const { coordinates, stopWatching } = useGeolocationWatch();

    return (
        <div>
            {coordinates && (
                <p>Current: {coordinates.latitude}, {coordinates.longitude}</p>
            )}
            <button onClick={stopWatching}>Stop Tracking</button>
        </div>
    );
}
```

## Integration in SearchFilter

The geolocation is already integrated into your SearchFilter component:

1. User clicks "From Current Location" checkbox
2. Browser requests location permission
3. Location is retrieved and displayed
4. User can select distance radius
5. Coordinates are available in the `coordinates` state

```typescript
// In SearchFilter.tsx
const { coordinates, getCurrentLocation } = useGeolocation();

// When checkbox is checked
if (checked) {
    getCurrentLocation();
}

// Use coordinates for backend query
if (coordinates && distance) {
    console.log('Search restaurants within', distance, 'km of:', coordinates);
    // Send to backend API
}
```

## Error Handling

The hook handles three main error types:

1. **Permission Denied**: User blocked location access
   - Solution: User must enable location in browser settings

2. **Position Unavailable**: Location service is unavailable
   - Solution: Check device settings, GPS, or try again

3. **Timeout**: Location request took too long
   - Solution: Increase timeout or try again

## Browser Compatibility

The Geolocation API is supported in all modern browsers:
- ✅ Chrome/Edge
- ✅ Firefox
- ✅ Safari
- ✅ Opera
- ✅ Mobile browsers

## Security Notes

⚠️ **HTTPS Required**: Geolocation only works on HTTPS (secure) sites, except for localhost.

⚠️ **User Permission**: The browser will always ask for user permission before accessing location.

⚠️ **Privacy**: Always respect user privacy and explain why you need location access.

## Testing Locally

1. Run your dev server: `npm run dev`
2. Open browser console
3. Click location button
4. Browser will show permission prompt
5. Allow access
6. Location coordinates will appear

## Troubleshooting

### "Geolocation is not supported by your browser"
- Your browser is too old. Update to a modern browser.

### "Location access denied"
- User blocked permission. Clear site settings and try again.
- Check browser location permissions.

### "Location information is unavailable"
- Location services might be disabled on the device.
- GPS signal might be weak.

### Nothing happens when I click the button
- Check browser console for errors.
- Make sure you're on HTTPS or localhost.
- Verify the hook is properly imported.

## Complete Working Example

See `src/components/LocationExample.tsx` for a complete, working example component you can use as reference.

## Next Steps

To fully integrate location-based search:

1. ✅ Frontend captures user location (Done!)
2. 🔄 Add backend API support for geolocation queries
3. 🔄 Update `SearchOperation` enum to include location-based operations
4. 🔄 Implement distance calculation on backend
5. 🔄 Return sorted results by proximity

---

**Need help?** Check the example component or review the hook source code at `src/hooks/useGeolocation.ts`.
