interface WheelCanvasProps {
    items: string[];
    rotation: number;
    isSpinning: boolean;
    onTransitionEnd: () => void;
}

const PALETTE = [
    '#FF6B6B', '#FFAD5A', '#FFD76B', '#8BD3A7',
    '#9BD3FF', '#E19BFF', '#FFC3C3', '#F6E5A2'
];

export default function WheelCanvas({ items, rotation, isSpinning, onTransitionEnd }: WheelCanvasProps) {
    const size = 400;
    const cx = size / 2;
    const cy = size / 2;
    const radius = size * 0.45;

    const deg2rad = (deg: number) => (deg * Math.PI) / 180;

    const polarToCartesian = (r: number, angle: number) => {
        const a = deg2rad(angle);
        return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
    };

    const describeArc = (start: number, end: number) => {
        const startPt = polarToCartesian(radius, end);
        const endPt = polarToCartesian(radius, start);
        const largeArc = end - start <= 180 ? '0' : '1';
        return [
            `M ${cx} ${cy}`,
            `L ${endPt.x} ${endPt.y}`,
            `A ${radius} ${radius} 0 ${largeArc} 1 ${startPt.x} ${startPt.y}`,
            'Z',
        ].join(' ');
    };

    const getAngles = (index: number, total: number) => {
        const per = 360 / total;
        const start = -90 + index * per;
        const end = start + per;
        const center = start + per / 2;
        return { start, end, center, per };
    };

    return (
        <div className="spinwheel-wheel-wrapper">
            <div
                className="spinwheel-rotor"
                style={{
                    transition: `transform ${isSpinning ? 5.2 : 0}s cubic-bezier(.12,.8,.32,1)`,
                    transform: `rotate(${rotation}deg)`,
                }}
                onTransitionEnd={onTransitionEnd}
            >
                <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
                    {items.map((label, i) => {
                        const { start, end, center } = getAngles(i, items.length);
                        const path = describeArc(start, end);
                        const color = PALETTE[i % PALETTE.length];

                        const textPos = polarToCartesian(radius * 0.62, center);
                        let textRotation = center + 90;

                        if (items.length >= 5) {
                            textRotation = center;
                        }

                        return (
                            <g key={i}>
                                <path d={path} fill={color} stroke="#fff" strokeWidth={2} />
                                <text
                                    className="spinwheel-segment-text"
                                    x={textPos.x}
                                    y={textPos.y}
                                    textAnchor="middle"
                                    dominantBaseline="middle"
                                    transform={`rotate(${textRotation} ${textPos.x} ${textPos.y})`}
                                >
                                    {label}
                                </text>
                            </g>
                        );
                    })}
                </svg>
            </div>

            {/* Pointer */}
            <div className="spinwheel-pointer" />
        </div>
    );
}
