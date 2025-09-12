import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import SpinWheel from './SpinWheel';
import RestaurantInput from './RestaurantInput';
import { hideRouletteModal } from '../../redux/reducers/modalVisibleSlice';

function RoulettePopup() {
    const show = useAppSelector((state) => state.showRouletteModalState.visible);
    const dispatch = useAppDispatch();
    const [showInput, setShowInput] = useState(true);
    const [restaurants, setRestaurants] = useState(['Sushi Place', 'Noodle House', 'Burger Bar']);

    const onClose = () => {
        dispatch(hideRouletteModal());
        setShowInput(true);
    }

    if (!show) return null;

    return (
        <>
            {showInput ? <RestaurantInput items={restaurants} onChange={setRestaurants} onClose={() => setShowInput(false)} />
                : <SpinWheel
                    items={restaurants}
                    onClose={() => onClose()}
                    onItemsChange={setRestaurants}
                />}
        </>

    )
}

export default RoulettePopup
