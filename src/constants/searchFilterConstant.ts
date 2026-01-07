export const SEARCH_FILTER_LOCATIONS = [
    'North York',
    'Downtown',
    'Scarborough',
    'Etobicoke',
    'Mississauga',
    'Brampton',
    'Markham',
    'Vaughan',
    'Richmond Hill',
];

export const SEARCH_FILTER_CUISINES = [
    'Italian',
    'Chinese',
    'Indian',
    'Mexican',
    'Japanese',
    'Taiwanese',
    'Hong Kong',
    'Asian',
    'Vegan',
    'Thai',
    'French',
    'American',
    'Vietnamese',
];

export const SEARCH_FILTER_SORT_LIST = [
    { label: 'Reviews', value: 'googleReviews' },
    { label: 'Rating', value: 'googleRating' },
    { label: 'Most Bookmark', value: 'bookmark' },
    // { label: 'Distance', value: 'distance' }, todo: implement distance sort
    { label: 'Spending (low to high)', value: 'low_high' },
    { label: 'Spending (high to low)', value: 'high_low' },
];

export const SEARCH_FILTER_PAYMENT_METHODS = [
    'Credit Card',
    'Debit Card',
    'Cash'
];

export const SEARCH_FILTER_DISTANCE = [
    { label: 'Any Distance', value: undefined },
    { label: 'Within 5 km', value: 5 },
    { label: 'Within 10 km', value: 10 },
    { label: 'Within 15 km', value: 15 },
    { label: 'Within 25 km', value: 25 },
    { label: 'Within 50 km', value: 50 },
];

export const SEARCH_HISTTORY_KEY = 'searchHistory';

export const ZOOM_LEVELS = 12;

export enum RESTUARANT_SEARCH_FILEDS {
    TAG = 'tag',
    RANGED = 'ranged',
    CITY = 'city',
    CUISINE = 'cuisine',
    MIN_PRICE = 'minPrice',
    MAX_PRICE = 'maxPrice',
}