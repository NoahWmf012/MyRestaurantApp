import { useState } from 'react';
import { useAppDispatch } from '../../redux/store';
import { hideRouletteModal } from '../../redux/reducers/modalVisibleSlice';

type RestaurantInputProps = {
    items: string[];
    onChange: (items: string[]) => void;
    onClose: () => void;
};

function RestaurantInput({ items, onChange, onClose }: RestaurantInputProps) {
    const [newName, setNewName] = useState('');
    const dispatch = useAppDispatch();

    const addItem = () => {
        const name = newName.trim();
        if (!name) return;
        if (items.some((i) => i.toLowerCase() === name.toLowerCase())) return;
        onChange([...items, name]);
        setNewName('');
    };

    const updateItemAt = (idx: number, value: string) => {
        const name = value;
        const copy = [...items];
        copy[idx] = name;
        onChange(copy);
    };

    const removeAt = (idx: number) => {
        const copy = items.filter((_, i) => i !== idx);
        onChange(copy);
    };

    const onCancelHandler = () => {
        dispatch(hideRouletteModal());
    };

    const canAdd = newName.trim().length > 0 && !items.some((i) => i.toLowerCase() === newName.trim().toLowerCase());

    return (
        <div className="restaurant-modal-overlay" role="dialog" aria-modal onClick={onCancelHandler}>
            <div className="restaurant-modal-box">
                <div className="restaurant-modal-header">
                    <span className="restaurant-modal-title">Edit Restaurants</span>
                </div>
                <div className="restaurant-modal-body">
                    <div className="restaurant-modal-add-row">
                        <input
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                            placeholder="Add a restaurant"
                            onKeyDown={(e) => { if (e.key === 'Enter' && canAdd) addItem(); }}
                            className="restaurant-modal-input"
                        />
                        <button
                            className={`restaurant-modal-add-btn ${!canAdd ? 'restaurant-modal-disabled' : ''}`}
                            onClick={addItem}
                            disabled={!canAdd}
                        >
                            Add
                        </button>
                    </div>
                    <div className="restaurant-modal-list">
                        {items.length === 0 && (
                            <div className="restaurant-modal-empty">No restaurants yet. Add some above.</div>
                        )}
                        {items.map((name, i) => (
                            <div key={i} className="restaurant-modal-list-row">
                                <input
                                    value={name}
                                    onChange={(e) => updateItemAt(i, e.target.value)}
                                    className="restaurant-modal-input"
                                />
                                <button
                                    className="restaurant-modal-remove-btn"
                                    onClick={() => removeAt(i)}
                                    title="Remove"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="restaurant-modal-footer">
                    <button className="restaurant-modal-cancel-btn" onClick={onCancelHandler}>Cancel</button>
                    <button className="restaurant-modal-ok-btn spinwheel-button-primary" onClick={onClose}>OK</button>
                </div>
            </div>
        </div>
    );
}

export default RestaurantInput