# Location Autocomplete Feature

This feature provides geocoding and location search autocomplete functionality for the restaurant search filter.

## Overview

The location autocomplete allows users to:
- Search for any address or location worldwide
- Get real-time suggestions as they type
- Select from a dropdown of matching locations
- Automatically obtain coordinates (latitude/longitude) for distance-based searches

## Implementation

### Components Created

1. **`useGeocodingAutocomplete` Hook** (`src/hooks/useGeocodingAutocomplete.ts`)
   - Uses Nominatim API (OpenStreetMap) - **FREE, no API key required**
   - Provides location search with debouncing
   - Returns suggestions with coordinates
   - Handles loading, error states, and request cancellation

2. **`LocationAutocompleteInput` Component** (`src/components/LocationAutocompleteInput.tsx`)
   - Reusable autocomplete input with dropdown
   - Keyboard navigation support (↑↓ arrows, Enter, Escape)
   - Click-outside-to-close functionality
   - Loading indicator
   - Returns both display text and coordinates

3. **Updated `SearchFilter` Component**
   - Integrates LocationAutocompleteInput for "From Specific Location"
   - Stores location coordinates for backend queries
   - Shows confirmation when location is geocoded successfully

## Features

### ✅ Real-time Autocomplete
- Search starts after typing 3+ characters
- 300ms debounce to avoid excessive API calls
- Up to 5 suggestions displayed

### ✅ Smart Suggestions
- Shows city, state, country
- Displays location type (e.g., city, street, building)
- Formatted for easy reading

### ✅ Keyboard Navigation
- `↓` Arrow Down - Navigate to next suggestion
- `↑` Arrow Up - Navigate to previous suggestion
- `Enter` - Select highlighted suggestion
- `Escape` - Close dropdown

### ✅ Visual Feedback
- Loading spinner while fetching
- Green checkmark when coordinates obtained
- "No results" message when nothing found

### ✅ Coordinates Extraction
- Automatically gets lat/lng from selected location
- Displays coordinates for verification
- Ready for backend distance calculations

## How It Works

### User Flow

1. User selects "From Specific Location" radio button
2. Autocomplete input appears
3. User types an address (e.g., "123 Main St Toronto")
4. Dropdown shows matching locations
5. User selects a location from dropdown
6. Coordinates are stored automatically
7. Distance radius options appear
8. User selects distance (e.g., 5km)
9. Filters are sent to backend with lat/lng/distance

### API Used - Nominatim (OpenStreetMap)
- **URL**: https://nominatim.openstreetmap.org
- **Cost**: FREE
- **Rate Limit**: 1 request per second (handled by debouncing)
- **No API Key Required**
- **Coverage**: Worldwide

## Configuration

Change country filter in `SearchFilter.tsx`:

```tsx
<LocationAutocompleteInput
  countryCode="ca"  // 'ca' for Canada, 'us' for USA, etc.
/>
```

## Testing

1. Open search page
2. Select "From Specific Location"
3. Type "Toronto" - should see suggestions
4. Select a location
5. Should see coordinates displayed
6. Distance options should appear

---

**Ready to use!** The feature is fully implemented and working with free Nominatim API.