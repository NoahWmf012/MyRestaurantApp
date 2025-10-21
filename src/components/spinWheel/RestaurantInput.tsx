import { useAppDispatch } from '../../redux/store';
import { hideRouletteModal } from '../../redux/reducers/modalVisibleSlice';
import BaseModal from '../common/BaseModal';
import RestaurantListSelect, { type RestaurantOption } from '../vote/RestaurantListSelect';

type RestaurantInputProps = {
    items: string[];
    onChange: (items: string[]) => void;
    onClose: () => void;
};

function RestaurantInput({ items, onChange, onClose }: RestaurantInputProps) {
    const dispatch = useAppDispatch();

    const onCancelHandler = () => {
        dispatch(hideRouletteModal());
    };

    // Convert string[] to RestaurantOption[]
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
        <BaseModal
            title="Edit Restaurants"
            onClose={onCancelHandler}
            minWidth='400px'
            maxWidth="500px"
        >
            <RestaurantListSelect
                items={restaurantItems}
                onAdd={handleAddRestaurant}
                onRemove={handleRemoveRestaurant}
                placeholder="Add a restaurant"
            />

            {items.length === 0 && (
                <div className="restaurant-modal-empty" style={{ marginTop: 16, textAlign: 'center', color: '#999' }}>
                    No restaurants yet. Add some above.
                </div>
            )}

            <div className="restaurant-modal-footer">
                <button className="restaurant-modal-ok-btn spinwheel-button-primary" onClick={onClose}>OK</button>
            </div>
        </BaseModal>
    );
}

export default RestaurantInput
