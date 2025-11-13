import { useState } from 'react';
import { SEARCH_FILTER_LOCATIONS } from '../../constants/searchFilterConstant';

interface CollapsibleSectionProps {
    title: string;
    children: React.ReactNode;
    defaultOpen?: boolean;
}

function CollapsibleSection({ title, children, defaultOpen = true }: CollapsibleSectionProps) {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <div className="collapsible-section">
            <button
                className="collapsible-header"
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
            >
                <span className="collapsible-title">{title}</span>
                <span className={`collapsible-icon ${isOpen ? 'open' : ''}`}>▼</span>
            </button>
            <div className={`collapsible-content ${isOpen ? 'open' : ''}`}>
                <div className="collapsible-content-inner">
                    {children}
                </div>
            </div>
        </div>
    );
}

function SearchFilter() {
    const [bookmarked, setBookmarked] = useState(false);
    const [locations, setLocations] = useState<string[]>([]);
    const [cuisines, setCuisines] = useState<string[]>([]);
    const [sortBy, setSortBy] = useState('overall');
    const [parking, setParking] = useState(false);
    const [payment, setPayment] = useState<string[]>([]);
    const [dineInOnly, setDineInOnly] = useState(false);
    const [takeOutOnly, setTakeOutOnly] = useState(false);
    const [spendingRange, setSpendingRange] = useState<[number, number]>([0, 1000]);

    const handleLocationChange = (location: string) => {
        setLocations(prev =>
            prev.includes(location)
                ? prev.filter(l => l !== location)
                : [...prev, location]
        );
    };

    const handleCuisineChange = (cuisine: string) => {
        setCuisines(prev =>
            prev.includes(cuisine)
                ? prev.filter(c => c !== cuisine)
                : [...prev, cuisine]
        );
    };

    const handlePaymentChange = (method: string) => {
        setPayment(prev =>
            prev.includes(method)
                ? prev.filter(p => p !== method)
                : [...prev, method]
        );
    };

    return (
        <div className="search-filter-container mb-3 bg-white rounded-xl shadow-md overflow-hidden">
            <div className="search-filter-gradient-top"></div>
            <div className="search-filter-scroll h-full overflow-y-auto p-1">
                {/* Bookmarked */}
                <CollapsibleSection title="Bookmarked" defaultOpen={false}>
                    <div className="filter-option">
                        <label className="checkbox-label">
                            <input
                                type="checkbox"
                                checked={bookmarked}
                                onChange={(e) => setBookmarked(e.target.checked)}
                            />
                            <span>Show only bookmarked restaurants</span>
                        </label>
                    </div>
                </CollapsibleSection>

                {/* Location */}
                <CollapsibleSection title="Location">
                    <div className="filter-options-list">
                        {SEARCH_FILTER_LOCATIONS.map((location) => (
                            <label key={location} className="checkbox-label">
                                <input
                                    type="checkbox"
                                    checked={locations.includes(location)}
                                    onChange={() => handleLocationChange(location)}
                                />
                                <span>{location}</span>
                            </label>
                        ))}
                    </div>
                </CollapsibleSection>

                {/* Cuisine */}
                <CollapsibleSection title="Cuisine">
                    <div className="filter-options-list">
                        {['Chinese', 'Japanese', 'Korean', 'Western', 'Thai', 'Vietnamese', 'Indian', 'Italian'].map((cuisine) => (
                            <label key={cuisine} className="checkbox-label">
                                <input
                                    type="checkbox"
                                    checked={cuisines.includes(cuisine)}
                                    onChange={() => handleCuisineChange(cuisine)}
                                />
                                <span>{cuisine}</span>
                            </label>
                        ))}
                    </div>
                </CollapsibleSection>

                {/* Sort */}
                <CollapsibleSection title="Sort">
                    <div className="filter-options-list">
                        {[
                            { label: 'Overall', value: 'overall' },
                            { label: 'Score Smile', value: 'score_smile' },
                            { label: 'Most Bookmark', value: 'bookmark' },
                            { label: 'Distance', value: 'distance' },
                            { label: 'Spending (low to high)', value: 'low_high' },
                            { label: 'Spending (high to low)', value: 'high_low' },
                        ].map((option) => (
                            <label key={option.value} className="radio-label">
                                <input
                                    type="radio"
                                    name="sortBy"
                                    value={option.value}
                                    checked={sortBy === option.value}
                                    onChange={(e) => setSortBy(e.target.value)}
                                />
                                <span>{option.label}</span>
                            </label>
                        ))}
                    </div>
                </CollapsibleSection>

                {/* Others */}
                <CollapsibleSection title="Others">
                    <div className="filter-options-list">
                        <label className="checkbox-label">
                            <input
                                type="checkbox"
                                checked={parking}
                                onChange={(e) => setParking(e.target.checked)}
                            />
                            <span>Parking Available</span>
                        </label>

                        <div className="filter-subsection">
                            <div className="filter-subsection-title">Payment Methods</div>
                            {['Cash', 'Credit Card', 'Octopus', 'AlipayHK', 'WeChat Pay'].map((method) => (
                                <label key={method} className="checkbox-label">
                                    <input
                                        type="checkbox"
                                        checked={payment.includes(method)}
                                        onChange={() => handlePaymentChange(method)}
                                    />
                                    <span>{method}</span>
                                </label>
                            ))}
                        </div>

                        <label className="checkbox-label">
                            <input
                                type="checkbox"
                                checked={dineInOnly}
                                onChange={(e) => setDineInOnly(e.target.checked)}
                            />
                            <span>Dine-in Only</span>
                        </label>

                        <label className="checkbox-label">
                            <input
                                type="checkbox"
                                checked={takeOutOnly}
                                onChange={(e) => setTakeOutOnly(e.target.checked)}
                            />
                            <span>Take-out Only</span>
                        </label>
                    </div>
                </CollapsibleSection>

                {/* Spending */}
                <CollapsibleSection title="Spending">
                    <div className="filter-option">
                        <div className="spending-range">
                            <div className="spending-values">
                                <span>${spendingRange[0]}</span>
                                <span>${spendingRange[1]}</span>
                            </div>
                            <input
                                type="range"
                                min="0"
                                max="1000"
                                step="50"
                                value={spendingRange[1]}
                                onChange={(e) => setSpendingRange([spendingRange[0], parseInt(e.target.value)])}
                                className="spending-slider"
                            />
                            <div className="spending-inputs">
                                <input
                                    type="number"
                                    placeholder="Min"
                                    value={spendingRange[0]}
                                    onChange={(e) => setSpendingRange([parseInt(e.target.value) || 0, spendingRange[1]])}
                                    className="spending-input"
                                />
                                <span>-</span>
                                <input
                                    type="number"
                                    placeholder="Max"
                                    value={spendingRange[1]}
                                    onChange={(e) => setSpendingRange([spendingRange[0], parseInt(e.target.value) || 1000])}
                                    className="spending-input"
                                />
                            </div>
                        </div>
                    </div>
                </CollapsibleSection>
            </div>
            <div className="search-filter-gradient-bottom"></div>
        </div>
    );
}

export default SearchFilter;