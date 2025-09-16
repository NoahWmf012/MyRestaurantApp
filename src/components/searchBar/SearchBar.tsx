import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
    const [query, setQuery] = useState('');
    const [history, setHistory] = useState<string[]>([]);
    const [showPopup, setShowPopup] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Load history from localStorage on mount
        const savedHistory = localStorage.getItem('searchHistory');
        if (savedHistory) {
            setHistory(JSON.parse(savedHistory));
        }
    }, []);

    const handleSearch = (keyword: string) => {
        setQuery(keyword);
        setShowPopup(false);

        const updatedHistory = [keyword, ...history.filter(h => h !== keyword)].slice(0, 5); // keep top 5
        setHistory(updatedHistory);
        localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
        goToSearchPage(keyword);
    };

    const goToSearchPage = (keyword: string) => {
        if (keyword.trim()) {
            navigate(`/search?query=${encodeURIComponent(keyword)}`);
        }
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
        <div className="searchbar-wrapper" ref={wrapperRef}>
            <input
                type="text"
                className="searchbar-input bg-amber-50"
                placeholder="Search restaurants, cuisines..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onClick={() => setShowPopup(true)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' && query.trim()) {
                        handleSearch(query);
                    }
                }}
            />
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
