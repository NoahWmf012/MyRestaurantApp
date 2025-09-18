import React, { useState } from "react";

// Type Definitions
export type Option = {
    label: string;
    value: string;
};

export type SectionType = "checkbox" | "radio" | "slider" | "map" | "booking";

export type Section = {
    title: string;
    type: SectionType;
    options?: Option[];
    defaultOpen?: boolean;
};

// Filter Value Types
export type SliderValue = [number, number];
export type FilterValue = string[] | string | SliderValue;
export type FilterValues = Record<string, FilterValue>;

export interface SearchFilterProps {
    sections: Section[];
    onChange?: (values: FilterValues) => void;
}

// Component Functions
function SearchFilter(props: SearchFilterProps) {
    const { sections, onChange } = props;

    // Initialize section open/closed states
    const initialOpen: Record<string, boolean> = {};
    sections.forEach((section) => {
        initialOpen[section.title] = section.defaultOpen ?? true;
    });

    const [openSections, setOpenSections] = useState<Record<string, boolean>>(initialOpen);
    const [values, setValues] = useState<FilterValues>({});

    // Section toggle handler
    const toggleSection = (title: string): void => {
        setOpenSections((prev) => ({ ...prev, [title]: !prev[title] }));
    };

    // Checkbox value handler
    const toggleCheckbox = (section: string, value: string): void => {
        setValues((prev) => {
            const currentValues = (prev[section] as string[]) ?? [];
            const newValues = currentValues.includes(value)
                ? currentValues.filter((v: string) => v !== value)
                : [...currentValues, value];

            const updatedValues = { ...prev, [section]: newValues };
            onChange?.(updatedValues);
            return updatedValues;
        });
    };

    // Radio value handler
    const setRadio = (section: string, value: string): void => {
        setValues((prev) => {
            const updatedValues = { ...prev, [section]: value as string };
            onChange?.(updatedValues);
            return updatedValues;
        });
    };

    // Slider value handler
    const setSlider = (section: string, min: number, max: number): void => {
        setValues((prev) => {
            const updatedValues = { ...prev, [section]: [min, max] as SliderValue };
            onChange?.(updatedValues);
            return updatedValues;
        });
    };

    // Reset all filters
    const resetAll = (): void => {
        setValues({});
        onChange?.({});
    };

    // Apply current filters
    const applyFilters = (): void => {
        onChange?.(values);
    };

    // Helper function to check if option is selected
    const isOptionSelected = (section: Section, optionValue: string): boolean => {
        if (section.type === "checkbox") {
            const checkboxValues = values[section.title] as string[];
            return (checkboxValues ?? []).includes(optionValue);
        }
        if (section.type === "radio") {
            const radioValue = values[section.title] as string;
            return radioValue === optionValue;
        }
        return false;
    };

    // Helper function to get slider values
    const getSliderValues = (sectionTitle: string): [number, number] => {
        const sliderValue = values[sectionTitle] as SliderValue;
        return sliderValue ?? [0, 100];
    };

    // Render map section
    const renderMapSection = (): React.ReactElement => (
        <section className="fcd-map">
            <a
                className="filter-map-block"
                href="#"
                onClick={(e) => e.preventDefault()}
            >
                <div className="filter-map-block-content">View Map</div>
            </a>
        </section>
    );

    // Render booking section
    const renderBookingSection = (): React.ReactElement => (
        <div className="fcd-booking">
            <div className="fcd-booking-row">
                <div className="fcd-booking-column">
                    <div className="fcd-booking-icon fcd-booking-icon-date" />
                    <div className="fcd-booking-text">Date</div>
                </div>
            </div>
            <div className="fcd-booking-row">
                <div className="fcd-booking-column">
                    <div className="fcd-booking-icon fcd-booking-icon-seat" />
                    <div className="fcd-booking-text">Seat(s)</div>
                </div>
                <div className="fcd-booking-column">
                    <div className="fcd-booking-icon fcd-booking-icon-timeslot" />
                    <div className="fcd-booking-text">Time</div>
                </div>
            </div>
        </div>
    );

    // Render checkbox/radio option
    const renderOption = (section: Section, option: Option): React.ReactElement => {
        const isSelected = isOptionSelected(section, option.value);

        return (
            <div
                key={option.value}
                className={`filter-item-checkbox fcd-item ${section.type === "radio" ? "fic-radio " : ""
                    }fic-small`}
                onClick={() =>
                    section.type === "checkbox"
                        ? toggleCheckbox(section.title, option.value)
                        : setRadio(section.title, option.value)
                }
            >
                <div
                    className={`fic-checkbox ${isSelected ? "fic-checkbox-checked" : ""
                        }`}
                />
                <div className="fic-text">{option.label}</div>
            </div>
        );
    };

    // Render slider section
    const renderSliderSection = (sectionTitle: string): React.ReactElement => {
        const [minValue, maxValue] = getSliderValues(sectionTitle);

        return (
            <div className="filter-price-range fcd-price-range">
                <div className="filter-price-range-label">Any</div>
                <div className="input-slider">
                    <div className="slider-track">
                        <div className="slider-track-fill" />
                        <div className="slider-track-fill-spot-list">
                            <span className="slider-track-fill-spot hide-spot" />
                            <span className="slider-track-fill-spot" />
                            <span className="slider-track-fill-spot" />
                            <span className="slider-track-fill-spot" />
                            <span className="slider-track-fill-spot" />
                            <span className="slider-track-fill-spot" />
                            <span className="slider-track-fill-spot hide-spot" />
                        </div>
                    </div>
                    <input
                        className="slider-thumb"
                        type="range"
                        min={0}
                        max={100}
                        value={minValue}
                        onChange={(e) =>
                            setSlider(sectionTitle, Number(e.target.value), maxValue)
                        }
                    />
                    <input
                        className="slider-thumb slider-thumb-right"
                        type="range"
                        min={0}
                        max={100}
                        value={maxValue}
                        onChange={(e) =>
                            setSlider(sectionTitle, minValue, Number(e.target.value))
                        }
                    />
                </div>
            </div>
        );
    };

    // Render section content based on type
    const renderSectionContent = (section: Section): React.ReactElement => {
        switch (section.type) {
            case "map":
                return renderMapSection();

            case "booking":
                return renderBookingSection();

            case "checkbox":
            case "radio":
                return (
                    <>
                        {section.options?.map((option) => renderOption(section, option))}
                        {section.options && section.options.length > 6 && (
                            <div className="filter-more-button fcd-more" role="button">
                                <div className="filter-more-button-icon" />
                                <div>More</div>
                            </div>
                        )}
                    </>
                );

            case "slider":
                return renderSliderSection(section.title);

            default:
                return <></>;
        }
    };

    return (
        <aside className="gradient-scroll-view-content poi-list-filter-container-view">
            <div className="filter-column-desktop">
                {sections.map((section) => {
                    const isOpen = !!openSections[section.title];
                    return (
                        <div key={section.title} className="collapsable-section fcd-section">
                            <div
                                className="collapsable-section-title"
                                onClick={() => toggleSection(section.title)}
                            >
                                <div>{section.title}</div>
                                <div
                                    className={`collapsable-section-arrow ${isOpen ? "collapsable-section-arrow-expanded" : ""
                                        }`}
                                />
                            </div>

                            <div className={`collapsable ${isOpen ? "" : "collapsable-collapsed"}`}>
                                <div className="collapsable-content">
                                    {renderSectionContent(section)}
                                </div>
                            </div>
                        </div>
                    );
                })}

                {/* Bottom action buttons */}
                <div style={{ padding: 12 }}>
                    <button className="btn-reset" onClick={resetAll}>
                        Reset
                    </button>
                    <button className="btn-apply" onClick={applyFilters}>
                        Apply
                    </button>
                </div>
            </div>
        </aside>
    );
};

export default SearchFilter;
