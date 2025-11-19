import React, { useEffect, useRef, useState } from "react";
import { useGetRestaurantsQuery } from "../../redux/services/api/restaurantAPI";
import type { RestaurantItem } from "../../interfaces/queryInterface/restaurantInterface";

export interface RestaurantOption {
    restaurantName: string;
    restaurantId?: number;
}

interface Props {
    items: RestaurantOption[];
    onAdd: (restaurant: RestaurantOption) => void;
    onRemove: (index: number) => void;
    error?: string | undefined;
    placeholder?: string;
    showList?: boolean;
}

export default function RestaurantListSelect({
    items,
    onAdd,
    onRemove,
    error,
    placeholder = "Enter restaurant name",
    showList = true,
}: Props) {
    const [searchTerm, setSearchTerm] = useState("");
    const [suggestions, setSuggestions] = useState<RestaurantItem[]>([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const { data: restaurantList } = useGetRestaurantsQuery({ query: searchTerm });
    const wrapperRef = useRef<HTMLDivElement | null>(null);

    // filter suggestions
    useEffect(() => {
        if (!searchTerm.trim()) {
            setSuggestions([]);
            setShowDropdown(false);
            return;
        }
        const filtered = restaurantList?.restaurantList?.filter((r) =>
            r.name.toLowerCase().includes(searchTerm.toLowerCase())
        ) || [];
        setSuggestions(filtered);
        setShowDropdown(filtered.length > 0);
    }, [searchTerm, restaurantList]);

    // click outside closes dropdown
    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
                setShowDropdown(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleAddOption = (restaurant: { name: string; id?: number } | null) => {
        const name = restaurant ? restaurant.name : searchTerm.trim();
        if (!name) return;

        // Check for duplicates (case-insensitive)
        const isDuplicate = items.some(
            (item) => item.restaurantName.toLowerCase() === name.toLowerCase()
        );

        if (isDuplicate) {
            alert("This restaurant has already been added."); //todo: improve UX
            setSearchTerm("");
            setShowDropdown(false);
            return;
        }

        const option: RestaurantOption = restaurant
            ? { restaurantName: name, restaurantId: restaurant.id }
            : { restaurantName: name };
        onAdd(option);
        setSearchTerm("");
        setShowDropdown(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            // only add free-text when no suggestions shown
            if (!showDropdown && searchTerm.trim()) {
                handleAddOption(null);
            }
        }
        if (e.key === "Escape") {
            setShowDropdown(false);
        }
    };

    const canAdd = (() => {
        const trimmedName = searchTerm.trim().toLowerCase();

        if (!trimmedName) return false;

        const isDuplicate = items.some(
            (item) => item.restaurantName.toLowerCase() === trimmedName
        );

        return !isDuplicate;
    })();

    return (
        <div className="restaurant-list-select" ref={wrapperRef}>
            <div className="restaurant-list-select__input-wrapper">
                <input
                    type="text"
                    placeholder={placeholder}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onFocus={() => suggestions.length > 0 && setShowDropdown(true)}
                    className="form-input"
                    aria-label="Add restaurant option"
                />
                <button
                    className={`restaurant-modal-add-btn ${!canAdd ? 'restaurant-modal-disabled' : ''}`}
                    onClick={handleAddOption.bind(null, null)}
                    disabled={!canAdd}
                >
                    Add
                </button>
                {showDropdown && (
                    <ul
                        role="listbox"
                        className="restaurant-suggestions"
                    >
                        {suggestions.map((r) => (
                            <li
                                key={r.id}
                                role="option"
                                onClick={() => handleAddOption(r)}
                            >
                                {r.name}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* list of added options */}
            {showList && (
                <ul className="restaurant-list-select__options-list">
                    {items.map((item, i) => (
                        <li
                            key={i}
                            className="restaurant-list-select__option-item"
                        >
                            <span className="restaurant-list-select__option-name">
                                {item.restaurantName}{" "}
                            </span>
                            <button
                                type="button"
                                onClick={() => onRemove(i)}
                                aria-label={`Remove ${item.restaurantName}`}
                                className="restaurant-list-select__remove-button"
                            >
                                ✖
                            </button>
                        </li>
                    ))}
                </ul>
            )}

            {error && (
                <div className="form-error restaurant-list-select__error">
                    <span className="error-icon">⚠</span> {error}
                </div>
            )}
        </div>
    );
}
