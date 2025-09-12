export type Segment = {
    id: number;
    label: string;
};

export interface SpinWheelProps {
    items: string[];
    onClose: () => void;
    onItemsChange: (newItems: string[]) => void;
}