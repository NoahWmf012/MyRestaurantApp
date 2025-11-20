import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import SpinWheel from './SpinWheel';
import { hideRouletteModal } from '../../redux/reducers/modalVisibleSlice';

function RoulettePopup() {
    const show = useAppSelector((state) => state.showRouletteModalState.visible);
    const dispatch = useAppDispatch();
    const [restaurants, setRestaurants] = useState(['Sushi Place', 'Noodle House', 'Burger Bar']);

    const onClose = () => {
        dispatch(hideRouletteModal());
    }

    if (!show) return null;

    return (
        <>
            <SpinWheel
                items={restaurants}
                onClose={() => onClose()}
                onItemsChange={setRestaurants}
            />
            <div className='blur-layer'></div>
        </>

    )
}

export default RoulettePopup
