interface ResultModalProps {
    winner: string;
    onClose: () => void;
    onSpinAgain: () => void;
    onRemove: () => void;
    remainingItems: number;
}

export default function ResultModal({ winner, onClose, onSpinAgain, onRemove, remainingItems }: ResultModalProps) {
    return (
        <div
            className="spinwheel-overlay"
            onClick={onClose}
            role="dialog"
            aria-modal
        >
            <div className="spinwheel-result-modal"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="result-modal-content">
                    <h3 className="result-winner">
                        🍜 {winner}
                    </h3>
                    <p className="result-subtitle">Time to enjoy your meal!</p>

                    <div className="result-actions">
                        {/* no show remove button if remainingItems <= 2 */}
                        {remainingItems > 2 && (
                            <button className="spinwheel-button spinwheel-button-secondary" onClick={onRemove}>
                                Remove from List
                            </button>
                        )}

                        <button className="spinwheel-button spinwheel-button-secondary" onClick={onSpinAgain}>
                            Spin Again
                        </button>

                        <button className="spinwheel-button spinwheel-button-primary" onClick={onClose}>
                            Let's Go!
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
