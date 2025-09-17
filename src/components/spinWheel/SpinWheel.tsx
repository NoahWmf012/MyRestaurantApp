import { useState } from 'react';
import WheelCanvas from './WheelCanvas';
import ResultModal from './ResultModal';
import './SpinWheel.styles.scss';

interface SpinWheelProps {
    items: string[];
    onClose: () => void;
    onItemsChange: (newItems: string[]) => void;
}

export default function SpinWheel({ items, onClose, onItemsChange }: SpinWheelProps) {
    const [rotation, setRotation] = useState(0);
    const [isSpinning, setIsSpinning] = useState(false);
    const [prizeIndex, setPrizeIndex] = useState<number | null>(null);
    const [showResult, setShowResult] = useState(false);

    const startSpin = () => {
        if (isSpinning || items.length === 0) return;
        const count = items.length;
        const spins = 6 + Math.floor(Math.random() * 4);
        const index = Math.floor(Math.random() * count);

        const anglePer = 360 / count;
        const centerAngle = -90 + index * anglePer + anglePer / 2;
        const normalize = (deg: number) => ((deg % 360) + 360) % 360;
        const needed = normalize(-90 - centerAngle - normalize(rotation));

        const totalRotation = rotation + spins * 360 + needed;

        setIsSpinning(true);
        setPrizeIndex(index);
        setRotation(totalRotation);
    };

    const onTransitionEnd = () => {
        setIsSpinning(false);
        if (prizeIndex !== null) setShowResult(true);
    };

    const handleRemoveWinner = () => {
        if (items.length <= 2) return;
        if (prizeIndex !== null) {
            const updated = items.filter((_, i) => i !== prizeIndex);
            onItemsChange(updated);
            setShowResult(false);
            setPrizeIndex(null);
        }
    };

    return (
        <div className="spinwheel-overlay" onClick={onClose}>
            <div className="spinwheel-popup" onClick={(e) => e.stopPropagation()}>
                <h2 className="spinwheel-title">Restaurant Roulette</h2>
                <div className="spinwheel-wheel-wrapper">
                    <WheelCanvas
                        items={items}
                        rotation={rotation}
                        isSpinning={isSpinning}
                        onTransitionEnd={onTransitionEnd}
                    />
                </div>
                <div className="spinwheel-button-container">
                    <button className="spinwheel-button spinwheel-button-secondary"
                        onClick={onClose}
                        disabled={isSpinning}
                    >
                        Close
                    </button>

                    <button
                        className={`spinwheel-button spinwheel-button-primary ${isSpinning ? 'spinwheel-disabled' : ''}`}
                        onClick={startSpin}
                        disabled={isSpinning || items.length === 0}
                    >
                        {isSpinning ? 'Spinning...' : 'Start Spin'}
                    </button>
                </div>
            </div>

            {showResult && prizeIndex !== null && (
                <ResultModal
                    winner={items[prizeIndex]}
                    onClose={() => setShowResult(false)}
                    onSpinAgain={() => {
                        setShowResult(false);
                        setTimeout(() => startSpin(), 250);
                    }}
                    onRemove={handleRemoveWinner}
                    remainingItems={items.length}
                />
            )}
        </div>
    );
}
