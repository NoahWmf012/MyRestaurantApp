import type { Section } from "../pages/search/SearchFilter";

export const FILTER_CONFIG: Section[] = [
    {
        title: "Booking",
        type: "checkbox",
        options: [
            { label: "Date", value: "date" },
            { label: "Seat(s)", value: "seat" },
            { label: "Time", value: "time" },
        ],
    },
    {
        title: "Sort",
        type: "radio",
        options: [
            { label: "Overall", value: "overall" },
            { label: "Score Smile", value: "score_smile" },
            { label: "Most Bookmark", value: "bookmark" },
            { label: "Distance", value: "distance" },
            { label: "Spending (low to high)", value: "low_high" },
            { label: "Spending (high to low)", value: "high_low" },
        ],
    },
    {
        title: "Location",
        type: "checkbox",
        options: [
            { label: "Hong Kong Island", value: "hk_island" },
            { label: "Causeway Bay", value: "causeway_bay" },
            { label: "Central", value: "central" },
            { label: "Kowloon", value: "kowloon" },
        ],
    },
    {
        title: "Spending",
        type: "slider",
    },
];