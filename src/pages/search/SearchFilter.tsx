import { useState } from "react";

type Option = { label: string; value: string };
export type Section = {
    title: string;
    type: "checkbox" | "radio" | "slider" | "map" | "booking";
    options?: Option[];
    defaultOpen?: boolean;
};

export interface SearchFilterProps {
    sections: Section[];
    onChange?: (values: Record<string, any>) => void;
}

function SearchFilter(props: SearchFilterProps) {
    const { sections, onChange } = props;
    const initialOpen: Record<string, boolean> = {};
    sections.forEach((s) => (initialOpen[s.title] = s.defaultOpen ?? true));
    const [openSections, setOpenSections] = useState<Record<string, boolean>>(
        initialOpen
    );

    const [values, setValues] = useState<Record<string, any>>({});

    const toggleSection = (title: string) =>
        setOpenSections((p) => ({ ...p, [title]: !p[title] }));

    const toggleCheckbox = (section: string, value: string) => {
        setValues((prev) => {
            const curr = prev[section] ?? [];
            const next = curr.includes(value)
                ? curr.filter((v: string) => v !== value)
                : [...curr, value];
            const out = { ...prev, [section]: next };
            onChange?.(out);
            return out;
        });
    };

    const setRadio = (section: string, value: string) => {
        setValues((prev) => {
            const out = { ...prev, [section]: value };
            onChange?.(out);
            return out;
        });
    };

    const setSlider = (section: string, min: number, max: number) => {
        setValues((prev) => {
            const out = { ...prev, [section]: [min, max] };
            onChange?.(out);
            return out;
        });
    };

    const resetAll = () => {
        setValues({});
        onChange?.({});
    };

    return (
        <aside className="gradient-scroll-view-content poi-list-filter-container-view">
            <div className="filter-column-desktop">
                {sections.map((sec) => {
                    const isOpen = !!openSections[sec.title];
                    return (
                        <div key={sec.title} className="collapsable-section fcd-section">
                            <div
                                className="collapsable-section-title"
                                onClick={() => toggleSection(sec.title)}
                            >
                                <div>{sec.title}</div>
                                <div
                                    className={
                                        "collapsable-section-arrow " +
                                        (isOpen ? "collapsable-section-arrow-expanded" : "")
                                    }
                                />
                            </div>

                            <div className={`collapsable ${isOpen ? "" : "collapsable-collapsed"}`}>
                                <div className="collapsable-content">
                                    {/* booking/map special types */}
                                    {sec.type === "map" && (
                                        <section className="fcd-map">
                                            <a
                                                className="filter-map-block"
                                                href="#"
                                                onClick={(e) => e.preventDefault()}
                                            >
                                                <div className="filter-map-block-content">View Map</div>
                                            </a>
                                        </section>
                                    )}

                                    {sec.type === "booking" && (
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
                                    )}

                                    {/* checkbox / radio */}
                                    {(sec.type === "checkbox" || sec.type === "radio") &&
                                        sec.options?.map((opt) => {
                                            const checked =
                                                sec.type === "checkbox"
                                                    ? (values[sec.title] ?? []).includes(opt.value)
                                                    : values[sec.title] === opt.value;

                                            return (
                                                <div
                                                    key={opt.value}
                                                    className={
                                                        "filter-item-checkbox fcd-item " +
                                                        (sec.type === "radio" ? "fic-radio " : "") +
                                                        "fic-small"
                                                    }
                                                    onClick={() =>
                                                        sec.type === "checkbox"
                                                            ? toggleCheckbox(sec.title, opt.value)
                                                            : setRadio(sec.title, opt.value)
                                                    }
                                                >
                                                    <div
                                                        className={
                                                            "fic-checkbox " + (checked ? "fic-checkbox-checked" : "")
                                                        }
                                                    />
                                                    <div className="fic-text">{opt.label}</div>
                                                </div>
                                            );
                                        })}

                                    {/* slider */}
                                    {sec.type === "slider" && (
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
                                                    value={(values[sec.title]?.[0] ?? 0) as number}
                                                    onChange={(e) =>
                                                        setSlider(sec.title, Number(e.target.value), values[sec.title]?.[1] ?? 100)
                                                    }
                                                />
                                                <input
                                                    className="slider-thumb slider-thumb-right"
                                                    type="range"
                                                    min={0}
                                                    max={100}
                                                    value={(values[sec.title]?.[1] ?? 100) as number}
                                                    onChange={(e) =>
                                                        setSlider(sec.title, values[sec.title]?.[0] ?? 0, Number(e.target.value))
                                                    }
                                                />
                                            </div>
                                        </div>
                                    )}

                                    {/* "More" button pattern */}
                                    {sec.options && sec.options.length > 6 && (
                                        <div className="filter-more-button fcd-more" role="button">
                                            <div className="filter-more-button-icon" />
                                            <div>More</div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}

                {/* bottom buttons */}
                <div style={{ padding: 12 }}>
                    <button className="btn-reset" onClick={resetAll}>
                        Reset
                    </button>
                    <button
                        className="btn-apply"
                        onClick={() => {
                            onChange?.(values);
                        }}
                    >
                        Apply
                    </button>
                </div>
            </div>
        </aside>
    );
};

export default SearchFilter;
