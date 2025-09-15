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
                <h3 style={{ marginBottom: 8 }}>🍜 Time to eat!</h3>
                <p style={{ fontWeight: 700, fontSize: 18, marginBottom: 12 }}>{winner}</p>
                <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>

                    {/* no show remove button if remainingItems <= 2 */}
                    {remainingItems > 2 &&
                        <button className="spinwheel-button spinwheel-button-danger" onClick={onRemove}>Remove</button>
                    }

                    <button className="spinwheel-button spinwheel-button-secondary" onClick={onSpinAgain}>Spin Again</button>
                    <button className="spinwheel-button spinwheel-button-primary" onClick={onClose}>OK</button>
                </div>
            </div>
        </div>
    );
}
