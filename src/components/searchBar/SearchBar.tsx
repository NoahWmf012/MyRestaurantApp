import { useState, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import './SearchBar.style.scss';
import SearchPopup from './SearchPopup';
import { SUGGESTED_RESTAURANT_NAMES } from '../../constants/restaurantData';
import { SEARCH_HISTTORY_KEY } from '../../constants/searchFilterConstant';

const SearchBar = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get('query') || '';

    // Initialize history from localStorage
    const [history, setHistory] = useState<string[]>(() => {
        const savedHistory = localStorage.getItem(SEARCH_HISTTORY_KEY);
        return savedHistory ? JSON.parse(savedHistory) : [];
    });

    const [showPopup, setShowPopup] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    const handleSearch = async (keyword: string, popularSearch?: string) => {
        setShowPopup(false);
        setIsLoading(true);

        // Simulate search delay for better UX
        await new Promise(resolve => setTimeout(resolve, 300));

        const updatedHistory = [keyword, ...history.filter(h => h !== keyword)].slice(0, 5);
        setHistory(updatedHistory);
        localStorage.setItem(SEARCH_HISTTORY_KEY, JSON.stringify(updatedHistory));
        if (popularSearch && popularSearch.trim()) {
            const encryptedName = btoa(popularSearch.toString());
            navigate(`/restaurant-search/${encryptedName}`);
        } else {
            goToSearchPage(keyword);
        }
        setIsLoading(false);
    };

    const goToSearchPage = (keyword: string) => {
        if (keyword.trim()) {
            navigate(`/search?query=${encodeURIComponent(keyword)}`);
        }
    };

    const clearSearch = () => {
        if (inputRef.current) {
            inputRef.current.value = '';
        }
        setSearchParams({});
    };

    const clearHistory = () => {
        setHistory([]);
        localStorage.removeItem(SEARCH_HISTTORY_KEY);
    };

    return (
        <div
            className="modern-searchbar-wrapper"
            ref={wrapperRef}
            onBlur={(e) => {
                // Close popup when clicking outside
                if (!wrapperRef.current?.contains(e.relatedTarget as Node)) {
                    setShowPopup(false);
                }
            }}
        >
            <div className="modern-searchbar-container">
                <svg
                    className="search-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                >
                    <circle cx="11" cy="11" r="8" />
                    <path d="M21 21l-4.35-4.35" />
                </svg>

                <input
                    ref={inputRef}
                    type="text"
                    className="modern-searchbar-input"
                    placeholder="Search restaurants, cuisines, or dishes..."
                    defaultValue={query}
                    key={query} // Force re-render when query changes to sync value
                    onClick={() => setShowPopup(true)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && inputRef.current?.value.trim()) {
                            handleSearch(inputRef.current.value);
                        }
                    }}
                    disabled={isLoading}
                />

                {isLoading && (
                    <div className="search-loading">
                        <svg className="loading-spinner" viewBox="0 0 24 24">
                            <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
                            <path d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" fill="currentColor" />
                        </svg>
                    </div>
                )}

                {query && !isLoading && (
                    <button
                        className="clear-search-btn"
                        onClick={clearSearch}
                        aria-label="Clear search"
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>
                )}
            </div>

            {showPopup && (
                <SearchPopup
                    suggestions={SUGGESTED_RESTAURANT_NAMES}
                    history={history}
                    onSelect={handleSearch}
                    onClearHistory={clearHistory}
                />
            )}
        </div>
    );
};

export default SearchBar;
