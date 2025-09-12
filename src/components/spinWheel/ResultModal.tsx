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
            <div
                onClick={(e) => e.stopPropagation()}
                style={{
                    width: 360,
                    padding: 20,
                    borderRadius: 12,
                    background: 'white',
                    textAlign: 'center',
                    boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
                }}
            >
                <h3 style={{ marginBottom: 8 }}>🍜 Time to eat!</h3>
                <p style={{ fontWeight: 700, fontSize: 18, marginBottom: 12 }}>{winner}</p>
                <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
                    <button className="spinwheel-button spinwheel-button-primary" onClick={onClose}>OK</button>
                    <button className="spinwheel-button spinwheel-button-secondary" onClick={onSpinAgain}>Spin Again</button>

                    {/* no show remove button if remainingItems <= 2 */}
                    {remainingItems > 2 &&
                        <button className="spinwheel-button spinwheel-button-danger" onClick={onRemove}>Remove</button>
                    }
                </div>
            </div>
        </div>
    );
}
