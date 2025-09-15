interface SuggestedItem {
    id: number;
    keyword: string;
    image: string;
}

interface SearchPopupProps {
    suggestions: SuggestedItem[];
    history: string[];
    onSelect: (keyword: string) => void;
}

const SearchPopup = ({ suggestions, history, onSelect }: SearchPopupProps) => {
    return (
        <div className="search-popup">
            {/* Search History */}
            {history.length > 0 && (
                <div className="search-section">
                    <h4>Recent Searches</h4>
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
                            key={item.id}
                            className="suggestion-card"
                            onClick={() => onSelect(item.keyword)}
                        >
                            <img src={item.image} alt={item.keyword} className="suggestion-image" />
                            <span className="suggestion-keyword">{item.keyword}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SearchPopup;
