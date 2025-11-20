import { useState, useRef, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import './SearchBar.css';
import SearchPopup from './SearchPopup';

interface SuggestedItem {
    id: number;
    keyword: string;
    image: string;
}

interface SearchBarProps {
    suggestions: SuggestedItem[];
}

const SearchBar = ({ suggestions }: SearchBarProps) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get('query') || '';
    const [history, setHistory] = useState<string[]>([]);
    const [showPopup, setShowPopup] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Load history from localStorage on mount
        const savedHistory = localStorage.getItem('searchHistory');
        if (savedHistory) {
            setHistory(JSON.parse(savedHistory));
        }
    }, []);

    const handleSearch = async (keyword: string) => {
        setShowPopup(false);
        setIsLoading(true);

        // Simulate search delay for better UX
        await new Promise(resolve => setTimeout(resolve, 300));

        const updatedHistory = [keyword, ...history.filter(h => h !== keyword)].slice(0, 5);
        setHistory(updatedHistory);
        localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
        goToSearchPage(keyword);
        setIsLoading(false);
    };

    const goToSearchPage = (keyword: string) => {
        if (keyword.trim()) {
            navigate(`/search?query=${encodeURIComponent(keyword)}`);
        }
    };

    const setQuery = (value: string) => {
        setSearchParams({ query: value });
    };

    const clearHistory = () => {
        setHistory([]);
        localStorage.removeItem('searchHistory');
    };

    // Close popup when clicking outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
                setShowPopup(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="modern-searchbar-wrapper" ref={wrapperRef}>
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
                    type="text"
                    className="modern-searchbar-input"
                    placeholder="Search restaurants, cuisines, or dishes..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onClick={() => setShowPopup(true)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && query.trim()) {
                            handleSearch(query);
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
                        onClick={() => setSearchParams({})}
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
                    suggestions={suggestions}
                    history={history}
                    onSelect={handleSearch}
                    onClearHistory={clearHistory}
                />
            )}
        </div>
    );
};

export default SearchBar;
