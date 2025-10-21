import React, { useEffect, useRef, useState } from "react";
import type {
    Control,
    FieldArrayWithId,
    UseFieldArrayAppend,
    UseFieldArrayRemove,
} from "react-hook-form";
import type {
    CreatePollRequest,
    CreatePollOptions,
} from "../../interfaces/queryInterface/pollAPIInterface";
import { useGetRestaurantsQuery } from "../../redux/services/api/restaurantAPI";
import type { RestaurantItem } from "../../interfaces/queryInterface/restaurantInterface";

interface Props {
    control: Control<CreatePollRequest, unknown, unknown>;
    append: UseFieldArrayAppend<CreatePollRequest, "options">;
    fields: FieldArrayWithId<CreatePollRequest, "options", "id">[];
    remove: UseFieldArrayRemove;
    restaurantList?: RestaurantItem[]; // optional override
    error?: string | undefined;
    placeholder?: string;
}

export default function RestaurantListSelect({
    append,
    fields,
    remove,
    // restaurantList = DEFAULT_RESTAURANTS,
    error,
    placeholder = "Enter restaurant name",
}: Props) {
    const [searchTerm, setSearchTerm] = useState("");
    const [suggestions, setSuggestions] = useState<RestaurantItem[]>([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const { data: restaurantList } = useGetRestaurantsQuery();
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

    const handleAddOption = (restaurant: RestaurantItem | null) => {
        const name = restaurant ? restaurant.name : searchTerm.trim();
        if (!name) return;
        const option: CreatePollOptions = restaurant
            ? { restaurantName: name, restaurantId: restaurant.id }
            : { restaurantName: name };
        append(option);
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
            <ul className="restaurant-list-select__options-list">
                {fields.map((f, i) => (
                    <li
                        key={f.id}
                        className="restaurant-list-select__option-item"
                    >
                        <span className="restaurant-list-select__option-name">
                            {f.restaurantName}{" "}
                        </span>
                        <button
                            type="button"
                            onClick={() => remove(i)}
                            aria-label={`Remove ${f.restaurantName}`}
                            className="restaurant-list-select__remove-button"
                        >
                            ✖
                        </button>
                    </li>
                ))}
            </ul>

            {error && (
                <div className="form-error restaurant-list-select__error">
                    <span className="error-icon">⚠</span> {error}
                </div>
            )}
        </div>
    );
}
