import { useState } from 'react';
import { createPortal } from 'react-dom';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import SpinWheel from './SpinWheel';
import { hideRouletteModal } from '../../redux/reducers/modalVisibleSlice';

const STORAGE_KEY = 'roulette_restaurants';
const DEFAULT_RESTAURANTS = ['J San Sushi', 'Gyubee Japanese Grill 牛兵衛', 'Hualien Tai Ping Hsiang BBQ 花蓮太平香', 'Yunshang Rice Noodle 雲尚米線'];

function RoulettePopup() {
    const show = useAppSelector((state) => state.showRouletteModalState.visible);
    const dispatch = useAppDispatch();

    // Initialize from localStorage or use defaults
    const [restaurants, setRestaurants] = useState<string[]>(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : DEFAULT_RESTAURANTS;
    });

    const onClose = () => {
        dispatch(hideRouletteModal());
    }

    const handleSetRestaurants = (newRestaurants: string[]) => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newRestaurants));
        setRestaurants(newRestaurants);
    }

    if (!show) return null;

    return createPortal(
        <>
            <div className='blur-layer'></div>
            <SpinWheel
                items={restaurants}
                onClose={() => onClose()}
                onItemsChange={handleSetRestaurants}
            />
        </>,
        document.body // overlay to body
    )
}

export default RoulettePopup
