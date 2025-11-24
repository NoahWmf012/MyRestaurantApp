import BaseRightSidePanel from '../common/BaseRightSidePanel';
import RestaurantListSelect, { type RestaurantOption } from '../vote/RestaurantListSelect';

type RestaurantInputProps = {
    items: string[];
    onChange: (items: string[]) => void;
};

function RestaurantInput({ items, onChange }: RestaurantInputProps) {
    const restaurantItems: RestaurantOption[] = items.map((name) => ({
        restaurantName: name,
    }));

    const handleAddRestaurant = (restaurant: RestaurantOption) => {
        onChange([...items, restaurant.restaurantName]);
    };

    const handleRemoveRestaurant = (index: number) => {
        const newItems = items.filter((_, i) => i !== index);
        onChange(newItems);
    };

    return (
        <BaseRightSidePanel
            className="restaurant-input-panel"
        >
            <div className="panel-header">
                <h2 className="panel-title">Add a new restaurant</h2>
            </div>

            <div className="panel-body">
                <div className="form-group">
                    <RestaurantListSelect
                        items={restaurantItems}
                        onAdd={handleAddRestaurant}
                        onRemove={handleRemoveRestaurant}
                        placeholder="Add a restaurant"
                    />
                </div>

                {items.length === 0 && (
                    <div className="restaurant-modal-empty" style={{ marginTop: 16, textAlign: 'center', color: '#999' }}>
                        No restaurants yet. Add some above.
                    </div>
                )}
            </div>
        </BaseRightSidePanel>
    );
}

export default RestaurantInput