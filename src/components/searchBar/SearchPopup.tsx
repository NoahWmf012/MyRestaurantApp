import type { SuggestedItem } from "../../interfaces/queryInterface/restaurantInterface";

interface SearchPopupProps {
    suggestions: SuggestedItem[];
    history: string[];
    onSelect: (keyword: string) => void;
    onClearHistory: () => void;
}

const SearchPopup = ({ suggestions, history, onSelect, onClearHistory }: SearchPopupProps) => {
    return (
        <div className="search-popup">
            {/* Search History */}
            {history.length > 0 && (
                <div className="search-section">
                    <div className="search-history-header">
                        <h4>Recent Searches</h4>
                        <button
                            className="clear-history-btn"
                            onClick={onClearHistory}
                            title="Clear search history"
                        >
                            Clear
                        </button>
                    </div>
                    <div className="search-history">
                        {history.map((item, idx) => (
                            <button key={idx} className="history-item" onClick={() => onSelect(item)}>
                                {item}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Suggestions */}
            <div className="search-section">
                <h4>Popular Searches</h4>
                <div className="suggestion-grid">
                    {suggestions.map((item) => (
                        <div
                            key={item.keyword}
                            className="suggestion-card"
                            onClick={() => onSelect(item.keyword)}
                        >
                            <img src={item.image} alt={item.keyword} className="suggestion-image" />
                            <span className="suggestion-keyword"><strong>{item.keyword}</strong></span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SearchPopup;
