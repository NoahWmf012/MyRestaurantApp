import { useState } from 'react';
import { useAppSelector } from '../../redux/store';
import SpinWheel from './SpinWheel';
import RestaurantInput from './RestaurantInput';

type RoulettePopupProps = {
    onClose: () => void;
}

function RoulettePopup(props: RoulettePopupProps) {
    const show = useAppSelector((state) => state.showRouletteModalState.visible);
    const [restaurants, setRestaurants] = useState(['Sushi Place', 'Noodle House', 'Burger Bar']);
    if (!show) return null;

    return (
        <>
            <RestaurantInput />
            <SpinWheel
                items={restaurants}
                onClose={() => props.onClose()}
                onItemsChange={setRestaurants}
            />
        </>

    )
}

export default RoulettePopup