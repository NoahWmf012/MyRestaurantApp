
const IMAGE_MAP = import.meta.glob(
    "../assets/restaurants/*/*.{png,jpg,jpeg,avif,webp}",
    { eager: true, as: "url" }
) as Record<string, string>;

export const getRestaurantImage1 = (id: number) => {
    const exts = ["avif", "webp", "jpg", "jpeg", "png"];
    for (const ext of exts) {
        const key = `../assets/restaurants/${id}/1.${ext}`;
        if (IMAGE_MAP[key]) return IMAGE_MAP[key];
    }
    return "";
};

export const getRestaurantImage2 = (id: number) => {
    const exts = ["avif", "webp", "jpg", "jpeg", "png"];
    for (const ext of exts) {
        const key = `../assets/restaurants/${id}/2.${ext}`;
        if (IMAGE_MAP[key]) return IMAGE_MAP[key];
    }
    return "";
};